const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { buildSync } = require('esbuild');
const source = buildSync({ entryPoints: ['src/editor/image-editor.ts'], bundle: true,
  write: false, format: 'iife', globalName: 'Editor', platform: 'browser' }).outputFiles[0].text;
const context = {};
vm.runInNewContext(source, context);
const mark = { kind: 'text', text: '<Click here>', fontSize: 32, color: '#ff0000',
  x: 20, y: 30, endX: 180, endY: 69 };
test('text renders literally with its saved size, color and bounds', () => {
  let rendered;
  const ctx = { save() {}, restore() {}, fillText(...args) { rendered = args; } };
  context.Editor.drawMark(ctx, mark);
  assert.deepEqual(rendered, ['<Click here>', 20, 30, 160]);
  assert.equal(ctx.font, '32px sans-serif');
  assert.equal(ctx.fillStyle, '#ff0000');
  assert.equal(ctx.textBaseline, 'top');
});
test('text can be selected across its full box after saving and reopening', () => {
  const reopened = JSON.parse(JSON.stringify(mark));
  assert.equal(context.Editor.hitMark(reopened, { x: 25, y: 65 }, 0), true);
  assert.equal(context.Editor.hitMark(reopened, { x: 185, y: 65 }, 0), false);
  assert.equal(context.Editor.hitMark(reopened, { x: 185, y: 65 }, 6), true);
});

test('text resize scales font and bounds while anchoring the opposite corner', () => {
  const resized = context.Editor.resizeText(mark, { x: 340, y: 108 }, 'end', 800, 500);
  assert.equal(resized.fontSize, 64);
  assert.equal(resized.x, 20);
  assert.equal(resized.y, 30);
  assert.equal(resized.endX, 340);
  assert.equal(resized.endY, 108);
  const bounded = context.Editor.resizeText(mark, { x: 2000, y: 2000 }, 'end', 400, 200);
  assert.ok(bounded.endX <= 400 && bounded.endY <= 200);
  assert.equal(bounded.text, mark.text);
});

test('add a second label, move it independently, and save both labels', async () => {
  const elements = new Map();
  const drawing = new Proxy({ measureText: text => ({ width: text.length * 16 }) }, {
    get(target, key) { return key in target ? target[key] : () => {}; },
  });
  function element(key) {
    if (elements.has(key)) return elements.get(key);
    const listeners = {};
    const el = { value: '', dataset: {}, disabled: false, hidden: false,
      addEventListener(type, fn) { (listeners[type] ||= []).push(fn); },
      fire(type, event = {}) { for (const fn of listeners[type] || []) fn(event); },
      click() { if (!this.disabled) { this.fire('click'); this.onclick?.(); } },
      setAttribute() {}, focus() {}, setPointerCapture() {}, releasePointerCapture() {},
      getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 500 }; },
      getContext() { return drawing; }, toDataURL() { return 'data:image/png;base64,text'; },
      showModal() {}, close() {}, remove() {},
    };
    elements.set(key, el); return el;
  }
  const toolButtons = ['move', 'text', 'arrow', 'highlight', 'crop'].map(tool => {
    const el = element(tool); el.dataset.tool = tool; return el;
  });
  const dialog = element('dialog');
  dialog.querySelector = selector => {
    const tool = selector.match(/data-tool="(.*?)"/);
    return element(tool ? tool[1] : selector);
  };
  dialog.querySelectorAll = selector => selector.includes('data-tool') ? toolButtons : [...elements.values()];
  element('#image-text-size').value = '28'; element('#image-text-color').value = '#ff0000';
  const browser = {
    document: { querySelector() { return null; }, body: { appendChild() {} },
      createElement(tag) { return tag === 'dialog' ? dialog : element('output'); } },
    Image: class { naturalWidth = 800; naturalHeight = 500; set src(value) { this.onload(); } },
  };
  vm.runInNewContext(source, browser);
  let saved;
  await browser.Editor.openImageEditor({ screenshotDataUrl: 'image', imageEdits: { marks: [], crop: null } },
    async (_, edits) => { saved = edits; });
  const canvas = element('canvas');
  const pointer = (type, x, y) => canvas.fire(type, { button: 0, pointerId: 1, clientX: x, clientY: y, preventDefault() {} });
  element('text').click(); element('#image-text').value = 'First';
  pointer('pointerdown', 50, 50); pointer('pointerup', 50, 50);
  element('#image-text-add').click();
  assert.equal(element('#image-text').value, '', 'Adding another label clears the draft');
  element('#image-text').value = 'Second';
  pointer('pointerdown', 300, 200); pointer('pointerup', 300, 200);
  pointer('pointerdown', 340, 215); pointer('pointermove', 380, 245); pointer('pointerup', 380, 245);
  await element('#image-save').onclick();
  assert.equal(saved.marks.length, 2);
  assert.equal(saved.marks[0].text, 'First');
  assert.equal(saved.marks[0].x, 50);
  assert.equal(saved.marks[1].text, 'Second');
  assert.equal(saved.marks[1].x, 340);
  assert.equal(saved.marks[1].y, 230);
});
