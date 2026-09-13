// Real Chromium DOM/canvas/input checks; extension APIs are mocked in an isolated tab.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { buildSync } = require('esbuild');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const headed = process.argv.includes('--headed');
  const executable = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'autodoc-browser-test-'));
  const browser = spawn(executable, [...(headed ? ['--new-window', '--window-size=1400,1000'] : ['--headless=new']), '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'],
    { windowsHide: !headed, stdio: 'ignore' });
  let socket;
  try {
    const portFile = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !fs.existsSync(portFile); i++) await delay(100);
    const [port, endpoint] = fs.readFileSync(portFile, 'utf8').trim().split(/\r?\n/);
    socket = new WebSocket(`ws://127.0.0.1:${port}${endpoint}`);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let id = 0;
    const pending = new Map();
    socket.onmessage = ({ data }) => {
      const message = JSON.parse(data), waiter = pending.get(message.id);
      if (waiter) { pending.delete(message.id); message.error ? waiter.reject(message.error) : waiter.resolve(message.result); }
    };
    const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Browser did not respond: ${method}`)), 10000);
      const messageId = ++id; pending.set(messageId, {
        resolve(value) { clearTimeout(timer); resolve(value); },
        reject(error) { clearTimeout(timer); reject(error); },
      });
      socket.send(JSON.stringify({ id: messageId, method, params, sessionId }));
    });
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    await send('Target.activateTarget', { targetId });
    const cdp = (method, params) => send(method, params, sessionId);
    await cdp('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    const evaluate = async expression => {
      const result = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      return result.result.value;
    };
    await evaluate(`document.body.innerHTML = '<button id="target" style="position:absolute;left:30px;top:30px;width:150px;height:50px">Continue</button><input id="field" style="position:absolute;top:100px;left:30px">';
      window.messages = []; window.fail = false; window.hiddenDuringCapture = false;
      window.chrome = { runtime: {
        onMessage: { addListener(fn) { window.receiver = fn; } },
        async sendMessage(message) {
          messages.push(message);
          if (message.type === 'GET_STATE') return { type:'STATE_UPDATE', isRecording:true, isPaused:false, stepCount:0, sessionId:'test' };
          if (message.type === 'CAPTURE_STEP') {
            await new Promise(resolve => receiver({ type:'PREPARE_CAPTURE' }, {}, resolve));
            hiddenDuringCapture = document.querySelector('[data-autodoc-overlay]').style.visibility === 'hidden';
            return fail ? { ok:false, error:'Test save failure' } : { ok:true };
          }
          return { ok:true };
        }
      }};`);
    const bundle = file => buildSync({ entryPoints: [file], bundle: true, write: false, format: 'iife',
      globalName: 'ImageEditor', platform: 'browser' }).outputFiles[0].text;
    await evaluate(bundle('src/content/content-script.ts'));
    const click = async (x, y, modifiers = 0) => {
      if (headed) await delay(700);
      await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1, modifiers });
      await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1, modifiers });
    };
    const key = (type, modifiers = 0) => cdp('Input.dispatchKeyEvent', { type, key:'c', code:'KeyC', windowsVirtualKeyCode:67, modifiers });
    const count = () => evaluate(`messages.filter(m => m.type === 'CAPTURE_STEP').length`);
    await click(80, 50); assert.equal(await count(), 0);
    await key('keyDown'); await click(80, 50); await key('keyUp');
    await delay(650);
    assert.equal(await count(), 1);
    assert.equal(await evaluate('hiddenDuringCapture'), true);
    assert.equal(await evaluate(`document.querySelector('[data-autodoc-overlay]').shadowRoot.querySelector('#status').textContent`), 'Saved');
    await click(80, 50); assert.equal(await count(), 1);
    for (const modifier of [1, 2, 4, 8]) {
      await key('keyDown'); await click(80, 50, modifier); await key('keyUp');
    }
    assert.equal(await count(), 1);
    await click(80, 110); await key('keyDown'); await click(80, 50); await key('keyUp');
    assert.equal(await count(), 1);
    await evaluate(`fail = true; document.querySelector('[data-autodoc-overlay]').shadowRoot.querySelector('#capture').click()`);
    await delay(650);
    assert.equal(await count(), 2);
    assert.equal(await evaluate(`document.querySelector('[data-autodoc-overlay]').shadowRoot.querySelector('#status').textContent`), 'Test save failure');
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-autodoc-overlay]')).visibility`), 'visible');
    await evaluate(`receiver({ type:'STATE_UPDATE', isRecording:true, isPaused:true, stepCount:2, sessionId:'test' }, {}, () => {})`);
    await key('keyDown'); await click(80, 50); await key('keyUp'); assert.equal(await count(), 2);
    assert.equal(await evaluate(`document.querySelector('[data-autodoc-overlay]').shadowRoot.querySelector('#capture').disabled`), true);
    console.log('PASS: trusted C + click, plain/modifier clicks, typing, toolbar capture, hidden controls, save failure, pause.');

    await evaluate(`receiver({ type:'STATE_UPDATE', isRecording:false, stepCount:2, sessionId:'test' }, {}, () => {});
      const style = document.createElement('style'); style.textContent = ${JSON.stringify(fs.readFileSync('src/editor/editor.css', 'utf8'))}; document.head.append(style);`);
    await evaluate(bundle('src/editor/image-editor.ts'));
    await evaluate(`window.saved = null;
      const source = document.createElement('canvas'); source.width = 800; source.height = 500;
      const ctx = source.getContext('2d'); ctx.fillStyle = 'white'; ctx.fillRect(0,0,800,500);
      window.step = { id:'one', rawScreenshotDataUrl:source.toDataURL(), screenshotDataUrl:source.toDataURL(), clickXPercent:.5, clickYPercent:.5, elementTag:'BUTTON' };
      ImageEditor.openImageEditor(step, async (dataUrl, edits) => { saved = { dataUrl, edits }; });`);
    const drag = async (x1, y1, x2, y2) => {
      if (headed) await delay(1200);
      const box = await evaluate(`(() => { const r = document.querySelector('#image-editor canvas').getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; })()`);
      const mouse = (type, x, y) => cdp('Input.dispatchMouseEvent', { type,
        x: box.x + x / 800 * box.width, y: box.y + y / 500 * box.height,
        button:'left', buttons:type === 'mouseReleased' ? 0 : 1, clickCount:1 });
      await mouse('mousePressed', x1, y1); await mouse('mouseMoved', x2, y2); await mouse('mouseReleased', x2, y2);
    };
    await drag(350, 215, 370, 225); // move the initial arrow
    await evaluate(`document.querySelector('[data-tool="highlight"]').click()`);
    await drag(100, 100, 220, 180);
    await evaluate(`document.querySelector('[data-tool="crop"]').click()`);
    await drag(50, 50, 650, 400);
    // Inspect the real dialog while all tools and crop are visible.
    const screenshot = await cdp('Page.captureScreenshot', { format:'png' });
    fs.mkdirSync('artifacts', { recursive:true });
    fs.writeFileSync('artifacts/image-editor.png', Buffer.from(screenshot.data, 'base64'));
    await evaluate(`document.querySelector('#image-save').click()`);
    await delay(100);
    const saved = await evaluate('saved');
    assert.equal(saved.edits.marks.length, 2);
    assert.equal(Math.round(saved.edits.marks[0].x), 320);
    assert.equal(Math.round(saved.edits.crop.width), 600);
    const dimensions = await evaluate(`new Promise(resolve => { const img = new Image(); img.onload=()=>resolve([img.naturalWidth,img.naturalHeight]); img.src=saved.dataUrl; })`);
    assert.deepEqual(dimensions, [600, 350]);
    await evaluate(`ImageEditor.openImageEditor({ ...step, imageEdits:saved.edits }, async () => { throw new Error('Storage full'); })`);
    await evaluate(`document.querySelector('#image-reset').click(); document.querySelector('#image-undo').click(); document.querySelector('#image-save').click()`);
    await delay(100);
    assert.match(await evaluate(`document.querySelector('#image-status').textContent`), /Storage full/);
    assert.equal(await evaluate(`document.querySelector('#image-editor').open`), true);
    console.log('PASS: real canvas arrow move, highlight, crop, exported dimensions, edit reopening, reset/undo, save failure.');
    if (headed) {
      await evaluate(`document.querySelector('#image-cancel').click();
        ImageEditor.openImageEditor({ ...step, imageEdits:saved.edits }, async (dataUrl, edits) => { saved = { dataUrl, edits }; });`);
      console.log('Visible Chrome is left open for inspection. This test page mocks extension APIs.');
    }
  } finally {
    socket?.close();
    if (headed) {
      browser.unref();
    } else {
      browser.kill();
      await delay(500);
      // This is a newly created isolated profile, never the user's browser profile.
      if (path.resolve(profile).startsWith(path.resolve(os.tmpdir()) + path.sep)) {
        fs.rmSync(profile, { recursive:true, force:true, maxRetries:5, retryDelay:200 });
      }
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
