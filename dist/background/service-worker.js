import { c as clearAllData, g as generateId, a as generateSessionName, s as saveSession, b as setActiveSessionId, d as setIsRecording, e as setActiveTabId, f as getActiveTabId, h as getActiveSessionId, i as getSession, j as getIsRecording, k as getSettings, p as pruneExpiredSessions } from "../chunks/storage-LAwyUxjd.js";
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    handleMessage(message, sender).then(sendResponse).catch((err) => {
      console.error("[AutoDoc SW] Message handler error:", err);
      sendResponse({ error: String(err) });
    });
    return true;
  }
);
async function handleMessage(message, sender) {
  switch (message.type) {
    case "START_RECORDING":
      return startRecording(message.sessionName, message.tabId ?? sender.tab?.id, message.featureName, message.environmentType);
    case "STOP_RECORDING":
      return stopRecording();
    case "CAPTURE_STEP":
      return captureStep(message, sender.tab?.id);
    case "GET_STATE":
      return getState();
    case "EXPORT_PDF":
      return { ok: true };
    case "CLEAR_SESSION_DATA":
      return { ok: true };
    default:
      return { error: "Unknown message type" };
  }
}
const BROWSER_SESSION_KEY = "autodoc_new_browser_session";
async function startRecording(sessionName, tabId, featureName, environmentType) {
  await clearAllData();
  await chrome.storage.session.remove(BROWSER_SESSION_KEY).catch(() => {
  });
  console.log("[AutoDoc SW] Previous session data cleared — starting fresh.");
  const targetTabId = tabId ?? await getCurrentTabId();
  const id = generateId();
  const name = sessionName ?? featureName ?? generateSessionName();
  const todayISO = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const metadata = featureName && environmentType ? { featureName, environmentType, recordingDate: todayISO } : void 0;
  const newSession = {
    id,
    name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    steps: [],
    isRecording: true,
    activeTabId: targetTabId,
    trackedTabIds: targetTabId ? [targetTabId] : [],
    metadata
  };
  await saveSession(newSession);
  await setActiveSessionId(id);
  await setIsRecording(true);
  await setActiveTabId(targetTabId ?? null);
  if (targetTabId) {
    await ensureContentScript(targetTabId);
    await chrome.tabs.sendMessage(targetTabId, {
      type: "STATE_UPDATE",
      isRecording: true,
      stepCount: 0,
      sessionId: id
    });
  }
  console.log("[AutoDoc SW] Recording started. Session:", id);
  return { ok: true, sessionId: id };
}
async function stopRecording() {
  const tabId = await getActiveTabId();
  await setIsRecording(false);
  const sessionId = await getActiveSessionId();
  let session = null;
  if (sessionId) {
    session = await getSession(sessionId);
    if (session) {
      await saveSession({ ...session, isRecording: false, updatedAt: Date.now() });
    }
  }
  const trackedTabIds = session?.trackedTabIds ?? (tabId ? [tabId] : []);
  for (const tid of trackedTabIds) {
    try {
      await chrome.tabs.sendMessage(tid, {
        type: "STATE_UPDATE",
        isRecording: false,
        stepCount: 0,
        sessionId: null
      });
    } catch {
    }
  }
  console.log("[AutoDoc SW] Recording stopped.");
  return { ok: true };
}
async function captureStep(message, tabId) {
  const isRecording = await getIsRecording();
  if (!isRecording) return { ok: false };
  const sessionId = await getActiveSessionId();
  if (!sessionId) return { ok: false };
  const session = await getSession(sessionId);
  if (!session) return { ok: false };
  let rawDataUrl;
  try {
    rawDataUrl = await chrome.tabs.captureVisibleTab(void 0, {
      format: "png",
      quality: 100
    });
  } catch (err) {
    console.error("[AutoDoc SW] captureVisibleTab failed:", err);
    return { ok: false };
  }
  const settings = await getSettings();
  const stepNumber = session.steps.length + 1;
  const stepId = generateId();
  if (settings.detectDuplicates && session.steps.length > 0) {
    const lastStep = session.steps[session.steps.length - 1];
    if (lastStep?.rawScreenshotDataUrl) {
      if (tabId) {
        const similarityResult = await chrome.tabs.sendMessage(tabId, {
          type: "DUPLICATE_CHECK_RESULT",
          rawDataUrl,
          previousDataUrl: lastStep.rawScreenshotDataUrl,
          threshold: settings.duplicateThreshold
        });
        if (similarityResult?.isDuplicate) {
          console.log("[AutoDoc SW] Duplicate detected, prompting user...");
          return { ok: false };
        }
      }
    }
  }
  const autoDescription = settings.autoDescription && message.elementText ? generateAutoDescription(message.elementTag, message.elementText, message.pageTitle) : "";
  const step = {
    id: stepId,
    stepNumber,
    timestamp: Date.now(),
    screenshotDataUrl: rawDataUrl,
    // Will be replaced by annotated version
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
    viewportHeight: message.viewportHeight
  };
  if (tabId) {
    try {
      const annotatedResult = await chrome.tabs.sendMessage(tabId, {
        type: "ANNOTATE_SCREENSHOT",
        rawDataUrl,
        clickX: message.clickX,
        clickY: message.clickY,
        stepNumber,
        viewportWidth: message.viewportWidth,
        viewportHeight: message.viewportHeight
      });
      if (annotatedResult?.annotatedDataUrl) {
        step.screenshotDataUrl = annotatedResult.annotatedDataUrl;
      }
    } catch (err) {
      console.warn("[AutoDoc SW] Annotation failed, using raw screenshot:", err);
    }
  }
  const updatedSession = {
    ...session,
    steps: [...session.steps, step],
    updatedAt: Date.now()
  };
  await saveSession(updatedSession);
  try {
    chrome.runtime.sendMessage({
      type: "STATE_UPDATE",
      isRecording: true,
      stepCount: updatedSession.steps.length,
      sessionId
    });
  } catch {
  }
  if (tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: "STATE_UPDATE",
        isRecording: true,
        stepCount: updatedSession.steps.length,
        sessionId
      });
    } catch {
    }
  }
  console.log(`[AutoDoc SW] Step ${stepNumber} captured.`);
  return { ok: true, stepId };
}
async function getState() {
  const isRecording = await getIsRecording();
  const sessionId = await getActiveSessionId();
  let stepCount = 0;
  if (sessionId) {
    const session = await getSession(sessionId);
    stepCount = session?.steps.length ?? 0;
  }
  return {
    type: "STATE_UPDATE",
    isRecording,
    stepCount,
    sessionId
  };
}
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-recording") {
    const isRecording = await getIsRecording();
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording(void 0, activeTab?.id);
    }
  }
  if (command === "export-pdf") {
    const sessionId = await getActiveSessionId();
    if (sessionId) {
      const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${sessionId}&action=export`);
      await chrome.tabs.create({ url });
    }
  }
});
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
    await ensureContentScript(activeInfo.tabId);
    try {
      await chrome.tabs.sendMessage(activeInfo.tabId, {
        type: "STATE_UPDATE",
        isRecording: true,
        stepCount: session.steps.length,
        sessionId
      });
    } catch {
    }
  }
});
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const isRecording = await getIsRecording();
  if (!isRecording) return;
  const sessionId = await getActiveSessionId();
  if (!sessionId) return;
  const session = await getSession(sessionId);
  if (!session || !session.trackedTabIds) return;
  if (session.trackedTabIds.includes(tabId)) {
    const updatedTracked = session.trackedTabIds.filter((id) => id !== tabId);
    if (updatedTracked.length === 0) {
      await stopRecording();
    } else {
      await saveSession({ ...session, trackedTabIds: updatedTracked });
    }
  }
});
chrome.runtime.onStartup.addListener(async () => {
  await chrome.storage.session.set({ [BROWSER_SESSION_KEY]: true });
  console.log("[AutoDoc SW] Browser started: new-session marker set (data will be cleared on first record).");
});
chrome.runtime.onInstalled.addListener(async () => {
  await pruneExpiredSessions();
  console.log("[AutoDoc SW] Installed/updated: expired sessions pruned.");
});
function generateAutoDescription(elementTag, elementText, pageTitle) {
  if (!elementTag || !elementText) return "";
  const text = elementText.slice(0, 60);
  switch (elementTag.toUpperCase()) {
    case "BUTTON":
    case "INPUT":
      return `Click the "${text}" button`;
    case "A":
      return `Click the "${text}" link`;
    case "SELECT":
      return `Select an option from the dropdown`;
    case "TEXTAREA":
      return `Enter text in the "${text || "text"}" field`;
    default:
      return `Click on "${text}"`;
  }
}
async function getCurrentTabId() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return activeTab?.id;
}
async function ensureContentScript(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, { type: "GET_STATE" });
    return;
  } catch {
  }
  try {
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["content/content-styles.css"]
    });
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content/content-script.js"]
    });
  } catch (err) {
    console.warn("[AutoDoc SW] Could not inject content script:", err);
  }
}
