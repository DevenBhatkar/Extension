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
  getActiveTabId,
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

// ─────────────────────────────────────────────────────────────────────────────
// Message Listener
// ─────────────────────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, sender, sendResponse) => {
    // All handlers are async, so we return true to keep the channel open
    handleMessage(message, sender)
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
    case 'START_RECORDING':
      return startRecording(message.sessionName, message.tabId ?? sender.tab?.id, message.featureName, message.environmentType);

    case 'STOP_RECORDING':
      return stopRecording();

    case 'CAPTURE_STEP':
      return captureStep(message as CaptureStepMessage, sender.tab?.id);

    case 'GET_STATE':
      return getState();

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
  // Always clear the previous session's data before starting a new recording.
  // This ensures the user can review / re-export their last report until they
  // explicitly begin a new recording session.
  await clearAllData();
  // Also clear the browser-session marker (if any) so it doesn't trigger
  // a redundant clear on a subsequent recording in the same browser session.
  await chrome.storage.session.remove(BROWSER_SESSION_KEY).catch(() => {});
  console.log('[AutoDoc SW] Previous session data cleared — starting fresh.');

  const targetTabId = tabId ?? (await getCurrentTabId());
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
    activeTabId: targetTabId,
    trackedTabIds: targetTabId ? [targetTabId] : [],
    metadata,
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
  const tabId = await getActiveTabId();

  await setIsRecording(false);

  // Update the session's isRecording flag
  const sessionId = await getActiveSessionId();
  let session: Awaited<ReturnType<typeof getSession>> = null;
  if (sessionId) {
    session = await getSession(sessionId);
    if (session) {
      await saveSession({ ...session, isRecording: false, updatedAt: Date.now() });
    }
  }

  // Notify ALL tracked tabs (not just the active one) so every content script
  // clears its recording state and stops showing the capture indicator.
  const trackedTabIds = session?.trackedTabIds ?? (tabId ? [tabId] : []);
  for (const tid of trackedTabIds) {
    try {
      await chrome.tabs.sendMessage(tid, {
        type: 'STATE_UPDATE',
        isRecording: false,
        stepCount: 0,
        sessionId: null,
      } satisfies StateUpdateMessage);
    } catch {
      // Tab may have been closed or navigated away — ignore
    }
  }

  console.log('[AutoDoc SW] Recording stopped.');
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Screenshot Capture + Step Saving
// ─────────────────────────────────────────────────────────────────────────────

async function captureStep(
  message: CaptureStepMessage,
  tabId?: number
): Promise<{ ok: boolean; stepId?: string }> {
  const isRecording = await getIsRecording();
  if (!isRecording) return { ok: false };

  const sessionId = await getActiveSessionId();
  if (!sessionId) return { ok: false };

  const session = await getSession(sessionId);
  if (!session) return { ok: false };

  // Capture the visible tab
  let rawDataUrl: string;
  try {
    rawDataUrl = await chrome.tabs.captureVisibleTab(undefined, {
      format: 'png',
      quality: 100,
    });
  } catch (err) {
    console.error('[AutoDoc SW] captureVisibleTab failed:', err);
    return { ok: false };
  }

  const settings = await getSettings();
  const stepNumber = session.steps.length + 1;
  const stepId = generateId();

  // Check for duplicates (compare with the last screenshot)
  if (settings.detectDuplicates && session.steps.length > 0) {
    const lastStep = session.steps[session.steps.length - 1];
    if (lastStep?.rawScreenshotDataUrl) {
      // Send both raw screenshots to content script for comparison
      // (Canvas APIs are available in content scripts, not service workers)
      if (tabId) {
        const similarityResult = await chrome.tabs.sendMessage(tabId, {
          type: 'DUPLICATE_CHECK_RESULT',
          rawDataUrl,
          previousDataUrl: lastStep.rawScreenshotDataUrl,
          threshold: settings.duplicateThreshold,
        });

        if (similarityResult?.isDuplicate) {
          // Notify popup/editor of the duplicate prompt
          console.log('[AutoDoc SW] Duplicate detected, prompting user...');
          return { ok: false };
        }
      }
    }
  }

  // Build the step object with the raw screenshot
  // The content script will annotate it and send back the annotated version
  const autoDescription = settings.autoDescription && message.elementText
    ? generateAutoDescription(message.elementTag, message.elementText, message.pageTitle)
    : '';

  const step: Step = {
    id: stepId,
    stepNumber,
    timestamp: Date.now(),
    screenshotDataUrl: rawDataUrl, // Will be replaced by annotated version
    rawScreenshotDataUrl: rawDataUrl,
    clickX: message.clickX,
    clickY: message.clickY,
    clickXPercent: message.clickXPercent,
    clickYPercent: message.clickYPercent,
    pageUrl: message.pageUrl,
    pageTitle: message.pageTitle,
    description: autoDescription,
    elementTag: message.elementTag,
    elementText: message.elementText,
    viewportWidth: message.viewportWidth,
    viewportHeight: message.viewportHeight,
  };

  // Ask content script to annotate the screenshot
  if (tabId) {
    try {
      const annotatedResult = await chrome.tabs.sendMessage(tabId, {
        type: 'ANNOTATE_SCREENSHOT',
        rawDataUrl,
        clickX: message.clickX,
        clickY: message.clickY,
        stepNumber,
        viewportWidth: message.viewportWidth,
        viewportHeight: message.viewportHeight,
      });

      if (annotatedResult?.annotatedDataUrl) {
        step.screenshotDataUrl = annotatedResult.annotatedDataUrl;
      }
    } catch (err) {
      console.warn('[AutoDoc SW] Annotation failed, using raw screenshot:', err);
    }
  }

  // Save the step to the session
  const updatedSession: Session = {
    ...session,
    steps: [...session.steps, step],
    updatedAt: Date.now(),
  };
  await saveSession(updatedSession);

  // Notify popup to update step count badge
  try {
    chrome.runtime.sendMessage({
      type: 'STATE_UPDATE',
      isRecording: true,
      stepCount: updatedSession.steps.length,
      sessionId,
    } satisfies StateUpdateMessage);
  } catch {
    // Popup may be closed — ignore
  }

  if (tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: 'STATE_UPDATE',
        isRecording: true,
        stepCount: updatedSession.steps.length,
        sessionId,
      } satisfies StateUpdateMessage);
    } catch {
      // Content script may be unavailable after navigation.
    }
  }

  console.log(`[AutoDoc SW] Step ${stepNumber} captured.`);
  return { ok: true, stepId };
}

// ─────────────────────────────────────────────────────────────────────────────
// State Query
// ─────────────────────────────────────────────────────────────────────────────

async function getState(): Promise<StateUpdateMessage> {
  const isRecording = await getIsRecording();
  const sessionId = await getActiveSessionId();
  let stepCount = 0;

  if (sessionId) {
    const session = await getSession(sessionId);
    stepCount = session?.steps.length ?? 0;
  }

  return {
    type: 'STATE_UPDATE',
    isRecording,
    stepCount,
    sessionId,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Shortcut Commands
// ─────────────────────────────────────────────────────────────────────────────

chrome.commands.onCommand.addListener(async (command) => {
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
});

// ─────────────────────────────────────────────────────────────────────────────
// Tab Management
// ─────────────────────────────────────────────────────────────────────────────

// Track new tabs opened from existing tracked tabs
chrome.tabs.onCreated.addListener(async (tab) => {
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
});

// Update active tab when switching between tracked tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
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
        stepCount: session.steps.length,
        sessionId,
      } satisfies StateUpdateMessage);
    } catch {
      // Ignore if tab isn't fully loaded yet
    }
  }
});

// Stop recording if all tracked tabs are closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
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
});

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
  elementText?: string,
  pageTitle?: string
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
