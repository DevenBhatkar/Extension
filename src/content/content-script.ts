/** AutoDoc: explicit capture gestures and recording controls. */
import { annotateScreenshot } from '../lib/annotate';
import type { ExtensionMessage, CaptureStepMessage, StateUpdateMessage } from '../lib/types';

let isRecording = false;
let isPaused = false;
let isCapturing = false;
let captureKeyHeld = false;
let captureArmed = false;
let armTimer: ReturnType<typeof setTimeout> | undefined;
let pointerCaptureStarted = false;

function clearCaptureGesture(): void {
  captureKeyHeld = false;
  captureArmed = false;
  clearTimeout(armTimer);
}

let stepCount = 0;
let host: HTMLDivElement | null = null;
let status: HTMLElement | null = null;
let captureButton: HTMLButtonElement | null = null;
let pauseButton: HTMLButtonElement | null = null;
let undoButton: HTMLButtonElement | null = null;
let restoreTimer: ReturnType<typeof setTimeout> | undefined;
let finishReceived = false;
let lastStatus = '';
let lastStatusError = false;

function hasModifiers(event: KeyboardEvent | MouseEvent): boolean {
  return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (hasModifiers(event) || event.code !== 'KeyC') clearCaptureGesture();
  if (!isRecording || isPaused || event.code !== 'KeyC' || event.repeat ||
      event.isComposing || hasModifiers(event) || !event.isTrusted) return;
  const editing = event.composedPath().some(node => node instanceof HTMLElement && (
    node.isContentEditable || node.matches('input, textarea, select, [role="textbox"], [data-autodoc-overlay]')
  ));
  if (!editing) {
    captureKeyHeld = true;
    captureArmed = true;
    clearTimeout(armTimer);
    setStatus('Ready: click or tap to capture. Escape cancels.');
  }
}, true);
document.addEventListener('keyup', event => {
  if (event.code !== 'KeyC') return;
  captureKeyHeld = false;
  if (captureArmed) armTimer = setTimeout(() => {
    captureArmed = false;
    setStatus('Capture shortcut expired. Press C to arm again.');
  }, 5000);
}, true);
window.addEventListener('blur', clearCaptureGesture);
document.addEventListener('visibilitychange', clearCaptureGesture);

function captureGesture(event: MouseEvent): boolean {
  if (!isRecording || isPaused || isCapturing || !(captureKeyHeld || captureArmed) || !event.isTrusted ||
      event.button !== 0 || hasModifiers(event)) return false;
  if (event.composedPath().includes(host!)) return false;
  const target = event.composedPath().find(node => node instanceof HTMLElement) as HTMLElement | undefined;
  if (!target) return false;
  captureArmed = false;
  clearTimeout(armTimer);
  void requestCapture(event.clientX, event.clientY, target);
  return true;
}

// Start on contact, before click handlers navigate or dismiss the target UI.
// Pointer events cover physical clicks, touchpad taps, pen and touch input.
document.addEventListener('pointerdown', event => {
  pointerCaptureStarted = event.isPrimary && captureGesture(event);
}, true);
document.addEventListener('click', event => {
  if (pointerCaptureStarted) { pointerCaptureStarted = false; return; }
  // Fallback for devices that deliver a click without a pointerdown.
  captureGesture(event);
}, true);

async function requestCapture(x: number, y: number, target?: HTMLElement): Promise<void> {
  if (!isRecording || isPaused || isCapturing) return;
  isCapturing = true;
  finishReceived = false;
  renderControls();
  setStatus('Capturing...');
  const message: CaptureStepMessage = {
    type: 'CAPTURE_STEP', manual: !target,
    clickX: x, clickY: y, clickXPercent: x / innerWidth, clickYPercent: y / innerHeight,
    pageUrl: location.href, pageTitle: document.title,
    elementTag: target?.tagName ?? '',
    elementText: (target?.innerText || target?.getAttribute('aria-label') ||
      target?.getAttribute('title') || target?.getAttribute('placeholder') || '').trim().slice(0, 100),
    viewportWidth: innerWidth, viewportHeight: innerHeight,
  };
  try {
    const result = await chrome.runtime.sendMessage(message);
    if (!finishReceived) finishCapture(result?.ok === true, result?.error);
  } catch {
    if (!finishReceived) finishCapture(false, 'Could not reach AutoDoc. Reload the page and try again.');
  }
}

function finishCapture(ok: boolean, error?: string): void {
  finishReceived = true;
  isCapturing = false;
  restoreOverlay();
  renderControls();
  setStatus(ok ? 'Saved' : error || 'Capture failed. Please try again.', !ok);
}

function setStatus(text: string, error = false): void {
  lastStatus = text;
  lastStatusError = error;
  if (status) {
    status.textContent = text;
    status.style.color = error ? '#b91c1c' : '#475569';
  }
}

function restoreOverlay(): void {
  clearTimeout(restoreTimer);
  host?.style.removeProperty('visibility');
}

/** Hide only our controls; never wait for page loading or DOM changes. */
async function prepareCapture(): Promise<unknown> {
  host?.style.setProperty('visibility', 'hidden', 'important');
  clearTimeout(restoreTimer);
  restoreTimer = setTimeout(restoreOverlay, 10000);
  // Allow the hidden toolbar to be painted before captureVisibleTab runs.
  await new Promise<void>(resolve => {
    const fallback = setTimeout(resolve, 50);
    requestAnimationFrame(() => requestAnimationFrame(() => { clearTimeout(fallback); resolve(); }));
  });
  return { pageUrl: location.href, pageTitle: document.title, viewportWidth: innerWidth, viewportHeight: innerHeight };
}

function applyState(state: StateUpdateMessage): void {
  isRecording = state.isRecording;
  isPaused = state.isPaused ?? false;
  stepCount = state.stepCount;
  if (!isRecording || isPaused) clearCaptureGesture();
  renderControls();
}

function renderControls(): void {
  if (!isRecording) {
    host?.remove(); host = null; status = null;
    return;
  }
  if (!host) {
    host = document.createElement('div');
    host.setAttribute('data-autodoc-overlay', 'true');
    host.style.cssText = 'all:initial!important;position:fixed!important;bottom:20px!important;right:20px!important;z-index:2147483647!important;';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { color-scheme: light; }
        .panel { font:12px/1.5 system-ui,sans-serif; background:white; color:#0f172a; border:1px solid #cbd5e1;
          border-radius:12px; padding:12px; box-shadow:0 4px 20px #0002; width:280px; }
        .row { display:flex; gap:6px; margin:8px 0; }
        button { font:inherit; border:1px solid #cbd5e1; background:#f8fafc; color:#0f172a; border-radius:6px; padding:6px 10px; cursor:pointer; }
        button:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
        button:disabled { opacity:.5; cursor:default; }
        #capture { background:#2563eb; color:white; border-color:#2563eb; }
        #status { overflow-wrap:anywhere; }
      </style>
      <section class="panel" aria-label="AutoDoc recording controls">
        <strong id="count"></strong>
        <div class="row"><button id="capture">Capture</button><button id="pause">Pause</button><button id="undo">Undo last</button></div>
        <div>Hold C + click, or press C then tap (5s).</div>
        <div id="status" role="status" aria-live="polite"></div>
      </section>`;
    document.documentElement.appendChild(host);
    captureButton = shadow.querySelector('#capture');
    pauseButton = shadow.querySelector('#pause');
    undoButton = shadow.querySelector('#undo');
    status = shadow.querySelector('#status');
    setStatus(lastStatus, lastStatusError);
    captureButton!.addEventListener('click', () => { void requestCapture(innerWidth / 2, innerHeight / 2); });
    pauseButton!.addEventListener('click', () => { void control(isPaused ? 'RESUME_RECORDING' : 'PAUSE_RECORDING'); });
    undoButton!.addEventListener('click', () => { void control('UNDO_CAPTURE'); });
  }
  host.shadowRoot!.querySelector('#count')!.textContent = `${isPaused ? 'Paused' : 'Recording'} - ${stepCount} steps`;
  captureButton!.disabled = isPaused || isCapturing;
  pauseButton!.textContent = isPaused ? 'Resume' : 'Pause';
  pauseButton!.disabled = isCapturing;
  undoButton!.disabled = isCapturing || stepCount === 0;
}

async function control(type: 'PAUSE_RECORDING' | 'RESUME_RECORDING' | 'UNDO_CAPTURE'): Promise<void> {
  pauseButton!.disabled = true;
  undoButton!.disabled = true;
  try {
    const result = await chrome.runtime.sendMessage({ type });
    if (!result?.ok) throw new Error(result?.error || 'Action failed. Please try again.');
    setStatus(type === 'UNDO_CAPTURE' ? 'Last capture removed' : type === 'PAUSE_RECORDING' ? 'Recording paused' : 'Recording resumed');
  } catch (error) { setStatus(String(error), true); }
  finally { renderControls(); }
}

chrome.runtime.onMessage.addListener((message: ExtensionMessage, _sender, respond) => {
  (async () => {
    switch (message.type) {
      case 'STATE_UPDATE': applyState(message); return { ok: true };
      case 'GET_STATE': return { ok: true };
      case 'PREPARE_CAPTURE': return prepareCapture();
      case 'CAPTURE_FINISHED': finishCapture(message.ok, message.error); return { ok: true };
      case 'ANNOTATE_SCREENSHOT':
        return { annotatedDataUrl: await annotateScreenshot(message.rawDataUrl, message) };
      default: return { error: 'Unknown message' };
    }
  })().then(respond).catch(error => respond({ error: String(error) }));
  return true;
});

void chrome.runtime.sendMessage({ type: 'GET_STATE' }).then(state => {
  if (state?.type === 'STATE_UPDATE') applyState(state);
}).catch(() => {});
