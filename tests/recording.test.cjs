const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { buildSync } = require('esbuild');

const source = buildSync({ entryPoints: ['src/background/service-worker.ts'], bundle: true,
  write: false, format: 'iife', platform: 'browser' }).outputFiles[0].text;

function worker() {
  const data = {}, sent = [], captures = [];
  let listener;
  let failCapture = false, failSave = false;
  let tab = { id: 7, windowId: 3, active: true, status: 'complete', url: 'https://example.com/' };
  const event = { addListener() {} };
  const storage = {
    async get(key) { return structuredClone({ [key]: data[key] }); },
    async set(values) { if (failSave) throw new Error('Storage failed'); Object.assign(data, structuredClone(values)); },
    async remove(keys) { for (const key of Array.isArray(keys) ? keys : [keys]) delete data[key]; },
  };
  const chrome = {
    storage: { local: storage, session: storage },
    runtime: { onMessage: { addListener(fn) { listener = fn; } },
      onStartup: event, onInstalled: event,
      getURL: path => `chrome-extension://test/${path}`, async sendMessage(message) { sent.push(message); } },
    commands: { onCommand: event },
    scripting: { async insertCSS() {}, async executeScript() {} },
    tabs: { onCreated: event, onActivated: event, onRemoved: event,
      async query() { return [tab]; }, async get() { return { ...tab }; },
      async captureVisibleTab(windowId) { captures.push(windowId); if (failCapture) throw new Error('Screenshot permission denied'); return 'data:image/png;base64,raw'; },
      async sendMessage(tabId, message) {
        sent.push({ tabId, ...message });
        if (message.type === 'PREPARE_CAPTURE') return { pageUrl: tab.url, pageTitle: 'Example', viewportWidth: 1000, viewportHeight: 800 };
        if (message.type === 'ANNOTATE_SCREENSHOT') return { annotatedDataUrl: 'data:image/png;base64,annotated' };
        return { ok: true };
      },
    },
  };
  vm.runInNewContext(source, { chrome, console, setTimeout, clearTimeout });
  const send = (message, sender = {}) => new Promise(resolve => listener(message, sender, resolve));
  const capture = (extra = {}) => send({ type: 'CAPTURE_STEP', clickX: 20, clickY: 30,
    clickXPercent: .02, clickYPercent: .0375, pageUrl: 'https://example.com/', pageTitle: 'Example',
    viewportWidth: 1000, viewportHeight: 800, elementTag: 'BUTTON', elementText: 'Continue', ...extra }, { tab });
  return { data, sent, captures, send, capture,
    setTab(value) { tab = { ...tab, ...value }; },
    failCapture() { failCapture = true; }, failSave() { failSave = true; } };
}

test('pause/resume preserves session and steps; undo removes last capture', async () => {
  const w = worker();
  const started = await w.send({ type: 'START_RECORDING', tabId: 7, featureName: 'Feature', environmentType: 'Pre Deployment' });
  assert.equal(started.ok, true);
  assert.equal((await w.capture()).ok, true);
  assert.deepEqual(w.captures, [3]);
  await w.send({ type: 'PAUSE_RECORDING' });
  const paused = await w.send({ type: 'GET_STATE' });
  assert.equal(paused.isPaused, true); assert.equal(paused.stepCount, 1);
  assert.equal((await w.capture()).ok, false);
  await w.send({ type: 'RESUME_RECORDING' });
  assert.equal((await w.send({ type: 'GET_STATE' })).sessionId, started.sessionId);
  assert.equal((await w.capture({ manual: true })).ok, true);
  await w.send({ type: 'UNDO_CAPTURE' });
  assert.equal((await w.send({ type: 'GET_STATE' })).stepCount, 1);
  await w.send({ type: 'STOP_RECORDING' });
  const stopped = await w.send({ type: 'GET_STATE' });
  assert.equal(stopped.isRecording, false); assert.equal(stopped.stepCount, 1);
  assert.equal(w.data.autodoc_sessions[0].metadata.featureName, 'Feature');
});

test('capture failures and tab switches never save a step or report success', async () => {
  for (const failure of ['failCapture', 'failSave', 'switch']) {
    const w = worker();
    await w.send({ type: 'START_RECORDING', tabId: 7 });
    if (failure === 'switch') w.setTab({ active: false }); else w[failure]();
    const result = await w.capture();
    assert.equal(result.ok, false); assert.ok(result.error);
    assert.equal(w.data.autodoc_sessions[0].steps.length, 0);
    assert.equal(w.sent.filter(m => m.type === 'CAPTURE_FINISHED').at(-1).ok, false);
  }
});

test('navigation does not silently save a different page', async () => {
  const w = worker(); await w.send({ type: 'START_RECORDING', tabId: 7 });
  w.setTab({ url: 'https://example.com/next' });
  const result = await w.capture();
  assert.equal(result.ok, false);
  assert.match(result.error, /navigated/);
  assert.equal(w.data.autodoc_sessions[0].steps.length, 0);
});

test('capture does not wait for loading or an artificial delay', async () => {
  const w = worker(); await w.send({ type: 'START_RECORDING', tabId: 7 });
  w.setTab({ status: 'loading' });
  const started = performance.now();
  assert.equal((await w.capture()).ok, true);
  assert.ok(performance.now() - started < 250, 'Worker must not add a stabilization delay');
});

test('capture and undo are serialized; image updates preserve other data', async () => {
  const w = worker(); const { sessionId } = await w.send({ type: 'START_RECORDING', tabId: 7 });
  const results = await Promise.all([w.capture(), w.send({ type: 'UNDO_CAPTURE' })]);
  assert.ok(results.every(result => result.ok));
  assert.equal(w.data.autodoc_sessions[0].steps.length, 0);
  await w.capture();
  const step = w.data.autodoc_sessions[0].steps[0];
  const edit = { type: 'UPDATE_STEP_IMAGE', sessionId, stepId: step.id,
    screenshotDataUrl: 'data:image/png;base64,edited', imageEdits: { marks: [], crop: null } };
  assert.equal((await w.send(edit)).ok, true);
  const saved = w.data.autodoc_sessions[0].steps[0];
  assert.equal(saved.rawScreenshotDataUrl, step.rawScreenshotDataUrl);
  assert.equal(saved.description, step.description);
  assert.equal(saved.screenshotDataUrl, edit.screenshotDataUrl);
  assert.equal((await w.send({ ...edit, stepId: 'missing' })).ok, false);
});

test('untracked pages cannot capture and receive inactive state', async () => {
  const w = worker(); await w.send({ type: 'START_RECORDING', tabId: 7 });
  const state = await w.send({ type: 'GET_STATE' }, { tab: { id: 90 } });
  assert.equal(state.isRecording, false);
  w.setTab({ id: 90 }); assert.equal((await w.capture()).ok, false);
});
