/**
 * AutoDoc - Background Service Worker
 *
 * Responsibilities:
 * - Manage recording state (isRecording, activeTabId, activeSessionId)
 * - Capture screenshots via chrome.tabs.captureVisibleTab()
 * - Coordinate with content script for click events and annotation
 * - Handle keyboard shortcuts (chrome.commands)
 * - Persist sessions to chrome.storage.local
 */

import {
  getActiveSessionId,
  getIsRecording,
  getSettings,
  saveSession,
  generateId,
  generateSessionName,
  setActiveSessionId,
  setActiveTabId,
  setIsRecording,
  getSession,
  pruneExpiredSessions,
  clearAllData,
} from '../lib/storage';
import type {
  ExtensionMessage,
  CaptureStepMessage,
  Step,
  Session,
  SessionMetadata,
  StateUpdateMessage,
} from '../lib/types';

// Keep capture, undo and recording controls in order, including across tabs.
let operations: Promise<unknown> = Promise.resolve();
function serialize<T>(operation: () => Promise<T>): Promise<T> {
  const result = operations.then(operation);
  operations = result.catch(() => {});
  return result;
}
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
async function withTimeout<T>(task: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([task, new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error('The page did not respond in time. Please try again.')), ms);
    })]);
  } finally { clearTimeout(timer); }
}

async function broadcastState(): Promise<void> {
  const state = await getState();
  const session = state.sessionId ? await getSession(state.sessionId) : null;
  await Promise.all((session?.trackedTabIds ?? []).map(tabId =>
    chrome.tabs.sendMessage(tabId, state).catch(() => {})));
  await chrome.runtime.sendMessage(state).catch(() => {});
}

async function setPaused(isPaused: boolean): Promise<{ ok: boolean; error?: string }> {
  const id = await getActiveSessionId();
  const session = id ? await getSession(id) : null;
  if (!session?.isRecording) return { ok: false, error: 'No active recording.' };
  await saveSession({ ...session, isPaused });
  await broadcastState();
  return { ok: true };
}

async function undoCapture(): Promise<{ ok: boolean; error?: string }> {
  const id = await getActiveSessionId();
  const session = id ? await getSession(id) : null;
  const last = session?.steps.filter(step => !step.isNote)
    .sort((a, b) => b.timestamp - a.timestamp)[0];
  if (!session || !last) return { ok: false, error: 'No capture to undo.' };
  let number = 0;
  const steps = session.steps.filter(step => step.id !== last.id)
    .map(step => step.isNote ? step : { ...step, stepNumber: ++number });
  await saveSession({ ...session, steps });
  await broadcastState();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Message Listener
// ─────────────────────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, sender, sendResponse) => {
    // All handlers are async, so we return true to keep the channel open
    serialize(() => handleMessage(message, sender))
      .then(sendResponse)
      .catch((err) => {
        console.error('[AutoDoc SW] Message handler error:', err);
        sendResponse({ error: String(err) });
      });
    return true;
  }
);

async function handleMessage(
  message: ExtensionMessage,
  sender: chrome.runtime.MessageSender
): Promise<unknown> {
  switch (message.type) {
    case 'UPDATE_STEP_IMAGE': {
      if (sender.tab?.url && !sender.tab.url.startsWith(chrome.runtime.getURL('editor/'))) {
        return { ok: false, error: 'Image edits must come from the editor.' };
      }
      const session = await getSession(message.sessionId);
      if (!session?.steps.some(step => step.id === message.stepId)) {
        return { ok: false, error: 'This step was removed. Close the image editor and select another step.' };
      }
      await saveSession({ ...session, steps: session.steps.map(step => step.id === message.stepId
        ? { ...step, screenshotDataUrl: message.screenshotDataUrl, imageEdits: message.imageEdits } : step) });
      return { ok: true };
    }
    case 'START_RECORDING':
      return startRecording(message.sessionName, message.tabId ?? sender.tab?.id, message.featureName, message.environmentType);

    case 'PAUSE_RECORDING':
      return setPaused(true);
    case 'RESUME_RECORDING':
      return setPaused(false);
    case 'UNDO_CAPTURE':
      return undoCapture();

    case 'STOP_RECORDING':
      return stopRecording();

    case 'CAPTURE_STEP':
      return captureStep(message as CaptureStepMessage, sender.tab?.id);

    case 'GET_STATE':
      return getState(sender.tab?.id);

    case 'EXPORT_PDF':
      // PDF export is handled in the editor page context
      return { ok: true };

    case 'CLEAR_SESSION_DATA':
      // Kept for backward compatibility but cleanup now happens in startRecording.
      return { ok: true };

    default:
      return { error: 'Unknown message type' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Recording Control
// ─────────────────────────────────────────────────────────────────────────────

// chrome.storage.session key used to detect the first recording after a browser restart
const BROWSER_SESSION_KEY = 'autodoc_new_browser_session';

async function startRecording(
  sessionName?: string,
  tabId?: number,
  featureName?: string,
  environmentType?: 'Pre Deployment' | 'Post Deployment'
): Promise<{ ok: boolean; sessionId: string }> {
  const targetTabId = tabId ?? (await getCurrentTabId());
  if (targetTabId === undefined) throw new Error('Open a web page before starting a recording.');
  const target = await chrome.tabs.get(targetTabId);
  if (!target.url?.match(/^https?:\/\//)) throw new Error('Recording is available on HTTP and HTTPS web pages.');
  if (await getIsRecording()) await stopRecording();
  // Always clear the previous session's data before starting a new recording.
  // This ensures the user can review / re-export their last report until they
  // explicitly begin a new recording session.
  await clearAllData();
  // Also clear the browser-session marker (if any) so it doesn't trigger
  // a redundant clear on a subsequent recording in the same browser session.
  await chrome.storage.session.remove(BROWSER_SESSION_KEY).catch(() => {});
  console.log('[AutoDoc SW] Previous session data cleared — starting fresh.');

  const id = generateId();
  const name = sessionName ?? featureName ?? generateSessionName();

  // Build session metadata from the setup dialog
  const todayISO = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const metadata: SessionMetadata | undefined =
    featureName && environmentType
      ? { featureName, environmentType, recordingDate: todayISO }
      : undefined;

  const newSession: Session = {
    id,
    name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    steps: [],
    isRecording: true,
    ...(targetTabId !== undefined ? { activeTabId: targetTabId } : {}),
    trackedTabIds: targetTabId ? [targetTabId] : [],
    ...(metadata ? { metadata } : {}),
  };

  await saveSession(newSession);
  await setActiveSessionId(id);
  await setIsRecording(true);
  await setActiveTabId(targetTabId ?? null);

  // Notify content script on the active tab
  if (targetTabId) {
    await ensureContentScript(targetTabId);
    await chrome.tabs.sendMessage(targetTabId, {
      type: 'STATE_UPDATE',
      isRecording: true,
      stepCount: 0,
      sessionId: id,
    } satisfies StateUpdateMessage);
  }

  console.log('[AutoDoc SW] Recording started. Session:', id);
  return { ok: true, sessionId: id };
}

async function stopRecording(): Promise<{ ok: boolean }> {
  await setIsRecording(false);
  const sessionId = await getActiveSessionId();
  const session = sessionId ? await getSession(sessionId) : null;
  if (session) await saveSession({ ...session, isRecording: false, isPaused: false });
  await broadcastState();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Screenshot Capture + Step Saving
// ─────────────────────────────────────────────────────────────────────────────

async function captureStep(message: CaptureStepMessage, tabId?: number): Promise<{ ok: boolean; error?: string }> {
  const sessionId = await getActiveSessionId();
  const session = sessionId ? await getSession(sessionId) : null;
  if (!session?.isRecording || session.isPaused || tabId === undefined ||
      !session.trackedTabIds?.includes(tabId)) {
    return { ok: false, error: 'Recording is paused or this tab is not being recorded.' };
  }

  let result: { ok: boolean; error?: string } = { ok: false };
  try {
    // Keep the request in the worker so it survives navigation in the source tab.
    await delay(350);
    let prepared: { pageUrl: string; pageTitle: string; viewportWidth: number; viewportHeight: number } | undefined;
    const deadline = Date.now() + 8000;
    while (Date.now() < deadline) {
      const tab = await chrome.tabs.get(tabId);
      if (!tab.active) throw new Error('Capture cancelled because you switched tabs. Return to the page and capture again.');
      if (tab.status === 'complete') {
        try {
          prepared = await withTimeout(chrome.tabs.sendMessage(tabId, { type: 'PREPARE_CAPTURE' }), 3000);
          if (prepared?.viewportWidth) break;
        } catch { /* A navigation may have replaced the content script. */ }
      }
      await delay(150);
    }
    if (!prepared?.viewportWidth) throw new Error('Page is still loading. Wait for it to finish, then capture again.');
    const tab = await chrome.tabs.get(tabId);
    if (!tab.active || tab.status !== 'complete' || tab.url !== prepared.pageUrl) {
      throw new Error('Page changed during capture. Please try again.');
    }
    const rawDataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' });
    const after = await chrome.tabs.get(tabId);
    if (!after.active || after.url !== prepared.pageUrl || after.status !== 'complete') {
      throw new Error('Page changed during capture. Please try again.');
    }
    const settings = await getSettings();
    const latest = await getSession(session.id);
    if (!latest) throw new Error('Recording session no longer exists.');
    const stepNumber = latest.steps.filter(step => !step.isNote).length + 1;
    const step: Step = {
      id: generateId(), stepNumber, timestamp: Date.now(),
      screenshotDataUrl: rawDataUrl, rawScreenshotDataUrl: rawDataUrl,
      clickX: message.clickX, clickY: message.clickY,
      clickXPercent: message.clickXPercent, clickYPercent: message.clickYPercent,
      ...prepared,
      description: message.manual ? 'View the current page' : settings.autoDescription
        ? generateAutoDescription(message.elementTag, message.elementText) : '',
      elementTag: message.elementTag ?? '', elementText: message.elementText ?? '',
    };
    // A manual capture has no clicked page element to annotate.
    if (!message.manual && message.pageUrl === prepared.pageUrl) {
      const annotated = await withTimeout(chrome.tabs.sendMessage(tabId, {
        type: 'ANNOTATE_SCREENSHOT', rawDataUrl, clickX: step.clickX, clickY: step.clickY,
        stepNumber, viewportWidth: prepared.viewportWidth, viewportHeight: prepared.viewportHeight,
      }), 3000);
      if (!annotated?.annotatedDataUrl) throw new Error('Could not annotate the screenshot. Please try again.');
      step.screenshotDataUrl = annotated.annotatedDataUrl;
    } else {
      step.imageEdits = { marks: [], crop: null };
    }
    // Re-read after annotation so edits or tab tracking are not overwritten.
    const current = await getSession(session.id);
    if (!current) throw new Error('Recording session no longer exists.');
    await saveSession({ ...current, steps: [...current.steps, step] });
    result = { ok: true };
    await broadcastState();
  } catch (error) {
    result = { ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    await chrome.tabs.sendMessage(tabId, { type: 'CAPTURE_FINISHED', ...result }).catch(() => {});
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// State Query
// ─────────────────────────────────────────────────────────────────────────────

async function getState(tabId?: number): Promise<StateUpdateMessage> {
  const isRecording = await getIsRecording();
  const sessionId = await getActiveSessionId();
  let stepCount = 0;
  let isPaused = false;
  let tracked = true;

  if (sessionId) {
    const session = await getSession(sessionId);
    stepCount = session?.steps.length ?? 0;
    isPaused = session?.isPaused ?? false;
    tracked = tabId === undefined || (session?.trackedTabIds?.includes(tabId) ?? false);
  }

  return {
    type: 'STATE_UPDATE',
    isRecording: isRecording && tracked,
    isPaused,
    stepCount,
    sessionId,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Shortcut Commands
// ─────────────────────────────────────────────────────────────────────────────

chrome.commands.onCommand.addListener((command) => { void serialize(async () => {
  if (command === 'toggle-recording') {
    const isRecording = await getIsRecording();
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording(undefined, activeTab?.id);
    }
  }

  if (command === 'export-pdf') {
    const sessionId = await getActiveSessionId();
    if (sessionId) {
      // Open editor page with export flag
      const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${sessionId}&action=export`);
      await chrome.tabs.create({ url });
    }
  }
}).catch(console.error); });

// ─────────────────────────────────────────────────────────────────────────────
// Tab Management
// ─────────────────────────────────────────────────────────────────────────────

// Track new tabs opened from existing tracked tabs
chrome.tabs.onCreated.addListener((tab) => { void serialize(async () => {
  const isRecording = await getIsRecording();
  if (!isRecording || !tab.id || !tab.openerTabId) return;

  const sessionId = await getActiveSessionId();
  if (!sessionId) return;

  const session = await getSession(sessionId);
  if (!session || !session.trackedTabIds) return;

  if (session.trackedTabIds.includes(tab.openerTabId)) {
    const updatedTracked = [...session.trackedTabIds, tab.id];
    await saveSession({ ...session, trackedTabIds: updatedTracked, activeTabId: tab.id });
    await setActiveTabId(tab.id);
    console.log(`[AutoDoc SW] Tracking new tab ${tab.id} opened from ${tab.openerTabId}`);
  }
}).catch(console.error); });

// Update active tab when switching between tracked tabs
chrome.tabs.onActivated.addListener((activeInfo) => { void serialize(async () => {
  const isRecording = await getIsRecording();
  if (!isRecording) return;

  const sessionId = await getActiveSessionId();
  if (!sessionId) return;

  const session = await getSession(sessionId);
  if (!session || !session.trackedTabIds) return;

  if (session.trackedTabIds.includes(activeInfo.tabId)) {
    await saveSession({ ...session, activeTabId: activeInfo.tabId });
    await setActiveTabId(activeInfo.tabId);
    
    // Ensure content script is ready and state is updated
    await ensureContentScript(activeInfo.tabId);
    try {
      await chrome.tabs.sendMessage(activeInfo.tabId, {
        type: 'STATE_UPDATE',
        isRecording: true,
        isPaused: session.isPaused ?? false,
        stepCount: session.steps.length,
        sessionId,
      } satisfies StateUpdateMessage);
    } catch {
      // Ignore if tab isn't fully loaded yet
    }
  }
}).catch(console.error); });

// Stop recording if all tracked tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => { void serialize(async () => {
  const isRecording = await getIsRecording();
  if (!isRecording) return;

  const sessionId = await getActiveSessionId();
  if (!sessionId) return;

  const session = await getSession(sessionId);
  if (!session || !session.trackedTabIds) return;

  if (session.trackedTabIds.includes(tabId)) {
    const updatedTracked = session.trackedTabIds.filter(id => id !== tabId);
    if (updatedTracked.length === 0) {
      await stopRecording();
    } else {
      await saveSession({ ...session, trackedTabIds: updatedTracked });
    }
  }
}).catch(console.error); });

// ─────────────────────────────────────────────────────────────────────────────
// Startup & Install — Data Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * On browser startup: set a marker in chrome.storage.session.
 * chrome.storage.session is wiped when Chrome closes, so this marker
 * reliably indicates "this is the first run after a browser restart".
 *
 * We do NOT call clearAllData() here to avoid a race condition:
 * clearAllData() could run concurrently with startRecording() and wipe
 * a session that was just created, preventing steps from being found
 * when the editor opens. Instead, the cleanup is deferred to startRecording().
 */
chrome.runtime.onStartup.addListener(async () => {
  await chrome.storage.session.set({ [BROWSER_SESSION_KEY]: true });
  console.log('[AutoDoc SW] Browser started: new-session marker set (data will be cleared on first record).');
});

/**
 * On extension install/update: only prune sessions older than 24 hours.
 * A full wipe here would destroy an active session during a dev reload.
 */
chrome.runtime.onInstalled.addListener(async () => {
  await pruneExpiredSessions();
  console.log('[AutoDoc SW] Installed/updated: expired sessions pruned.');
});

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Auto-generate a step description from the clicked element's context.
 */
function generateAutoDescription(
  elementTag?: string,
  elementText?: string
): string {
  if (!elementTag || !elementText) return '';

  const text = elementText.slice(0, 60);

  switch (elementTag.toUpperCase()) {
    case 'BUTTON':
    case 'INPUT':
      return `Click the "${text}" button`;
    case 'A':
      return `Click the "${text}" link`;
    case 'SELECT':
      return `Select an option from the dropdown`;
    case 'TEXTAREA':
      return `Enter text in the "${text || 'text'}" field`;
    default:
      return `Click on "${text}"`;
  }
}

async function getCurrentTabId(): Promise<number | undefined> {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return activeTab?.id;
}

async function ensureContentScript(tabId: number): Promise<void> {
  try {
    await chrome.tabs.sendMessage(tabId, { type: 'GET_STATE' });
    return;
  } catch {
    // The tab may have loaded before the extension was installed or reloaded.
  }

  try {
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ['content/content-styles.css'],
    });
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content/content-script.js'],
    });
  } catch (err) {
    console.warn('[AutoDoc SW] Could not inject content script:', err);
  }
}
