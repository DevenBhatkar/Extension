import { p as pruneExpiredSessions, g as getSession, s as saveSession, a as getIsRecording, c as clearAllData, b as generateId, d as generateSessionName, e as setActiveSessionId, f as setIsRecording, h as setActiveTabId, i as getActiveSessionId, j as getSettings } from "../chunks/storage-Cnx0Lbuu.js";
let operations = Promise.resolve();
function serialize(operation) {
  const result = operations.then(operation);
  operations = result.catch(() => {
  });
  return result;
}
async function withTimeout(task, ms) {
  let timer;
  try {
    return await Promise.race([task, new Promise((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error("The page did not respond in time. Please try again.")), ms);
    })]);
  } finally {
    clearTimeout(timer);
  }
}
async function broadcastState() {
  const state = await getState();
  const session = state.sessionId ? await getSession(state.sessionId) : null;
  await Promise.all((session?.trackedTabIds ?? []).map((tabId) => chrome.tabs.sendMessage(tabId, state).catch(() => {
  })));
  await chrome.runtime.sendMessage(state).catch(() => {
  });
}
async function setPaused(isPaused) {
  const id = await getActiveSessionId();
  const session = id ? await getSession(id) : null;
  if (!session?.isRecording) return { ok: false, error: "No active recording." };
  await saveSession({ ...session, isPaused });
  await broadcastState();
  return { ok: true };
}
async function undoCapture() {
  const id = await getActiveSessionId();
  const session = id ? await getSession(id) : null;
  const last = session?.steps.filter((step) => !step.isNote).sort((a, b) => b.timestamp - a.timestamp)[0];
  if (!session || !last) return { ok: false, error: "No capture to undo." };
  let number = 0;
  const steps = session.steps.filter((step) => step.id !== last.id).map((step) => step.isNote ? step : { ...step, stepNumber: ++number });
  await saveSession({ ...session, steps });
  await broadcastState();
  return { ok: true };
}
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    serialize(() => handleMessage(message, sender)).then(sendResponse).catch((err) => {
      console.error("[AutoDoc SW] Message handler error:", err);
      sendResponse({ error: String(err) });
    });
    return true;
  }
);
async function handleMessage(message, sender) {
  switch (message.type) {
    case "UPDATE_STEP_IMAGE": {
      if (sender.tab?.url && !sender.tab.url.startsWith(chrome.runtime.getURL("editor/"))) {
        return { ok: false, error: "Image edits must come from the editor." };
      }
      const session = await getSession(message.sessionId);
      if (!session?.steps.some((step) => step.id === message.stepId)) {
        return { ok: false, error: "This step was removed. Close the image editor and select another step." };
      }
      await saveSession({ ...session, steps: session.steps.map((step) => step.id === message.stepId ? { ...step, screenshotDataUrl: message.screenshotDataUrl, imageEdits: message.imageEdits } : step) });
      return { ok: true };
    }
    case "START_RECORDING":
      return startRecording(message.sessionName, message.tabId ?? sender.tab?.id, message.featureName, message.environmentType);
    case "PAUSE_RECORDING":
      return setPaused(true);
    case "RESUME_RECORDING":
      return setPaused(false);
    case "UNDO_CAPTURE":
      return undoCapture();
    case "STOP_RECORDING":
      return stopRecording();
    case "CAPTURE_STEP":
      return captureStep(message, sender.tab?.id);
    case "GET_STATE":
      return getState(sender.tab?.id);
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
  const targetTabId = tabId ?? await getCurrentTabId();
  if (targetTabId === void 0) throw new Error("Open a web page before starting a recording.");
  const target = await chrome.tabs.get(targetTabId);
  if (!target.url?.match(/^https?:\/\//)) throw new Error("Recording is available on HTTP and HTTPS web pages.");
  if (await getIsRecording()) await stopRecording();
  await clearAllData();
  await chrome.storage.session.remove(BROWSER_SESSION_KEY).catch(() => {
  });
  console.log("[AutoDoc SW] Previous session data cleared — starting fresh.");
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
    ...targetTabId !== void 0 ? { activeTabId: targetTabId } : {},
    trackedTabIds: targetTabId ? [targetTabId] : [],
    ...metadata ? { metadata } : {}
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
  await setIsRecording(false);
  const sessionId = await getActiveSessionId();
  const session = sessionId ? await getSession(sessionId) : null;
  if (session) await saveSession({ ...session, isRecording: false, isPaused: false });
  await broadcastState();
  return { ok: true };
}
async function captureStep(message, tabId) {
  const sessionId = await getActiveSessionId();
  const session = sessionId ? await getSession(sessionId) : null;
  if (!session?.isRecording || session.isPaused || tabId === void 0 || !session.trackedTabIds?.includes(tabId)) {
    return { ok: false, error: "Recording is paused or this tab is not being recorded." };
  }
  const overlayStyle = {
    target: { tabId },
    origin: "USER",
    css: "[data-autodoc-overlay] { display: none !important; }"
  };
  let overlayHidden = false;
  let result = { ok: false };
  try {
    const tab = await chrome.tabs.get(tabId);
    if (!tab.active) throw new Error("Capture cancelled because you switched tabs. Return to the page and capture again.");
    await chrome.scripting.insertCSS(overlayStyle);
    overlayHidden = true;
    const prepared = await withTimeout(chrome.tabs.sendMessage(tabId, { type: "PREPARE_CAPTURE" }), 1e3);
    if (!prepared?.viewportWidth) throw new Error("Could not capture this page. Please try again.");
    if (prepared.pageUrl !== message.pageUrl) throw new Error("The page navigated before capture. Return to the intended screen and capture again.");
    const rawDataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" });
    const after = await chrome.tabs.get(tabId);
    if (!after.active || after.url !== prepared.pageUrl) {
      throw new Error("Page changed during capture. Please try again.");
    }
    const settings = await getSettings();
    const latest = await getSession(session.id);
    if (!latest) throw new Error("Recording session no longer exists.");
    const stepNumber = latest.steps.filter((step2) => !step2.isNote).length + 1;
    const step = {
      id: generateId(),
      stepNumber,
      timestamp: Date.now(),
      screenshotDataUrl: rawDataUrl,
      rawScreenshotDataUrl: rawDataUrl,
      clickX: message.clickX,
      clickY: message.clickY,
      clickXPercent: message.clickXPercent,
      clickYPercent: message.clickYPercent,
      ...prepared,
      description: message.manual ? "View the current page" : settings.autoDescription ? generateAutoDescription(message.elementTag, message.elementText) : "",
      elementTag: message.elementTag ?? "",
      elementText: message.elementText ?? ""
    };
    step.imageEdits = { marks: [], crop: null };
    const current = await getSession(session.id);
    if (!current) throw new Error("Recording session no longer exists.");
    await saveSession({ ...current, steps: [...current.steps, step] });
    result = { ok: true };
    await broadcastState();
  } catch (error) {
    result = { ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    if (overlayHidden) await chrome.scripting.removeCSS(overlayStyle).catch(() => {
    });
    await chrome.tabs.sendMessage(tabId, { type: "CAPTURE_FINISHED", ...result }).catch(() => {
    });
  }
  return result;
}
async function getState(tabId) {
  const isRecording = await getIsRecording();
  const sessionId = await getActiveSessionId();
  let stepCount = 0;
  let isPaused = false;
  let tracked = true;
  if (sessionId) {
    const session = await getSession(sessionId);
    stepCount = session?.steps.length ?? 0;
    isPaused = session?.isPaused ?? false;
    tracked = tabId === void 0 || (session?.trackedTabIds?.includes(tabId) ?? false);
  }
  return {
    type: "STATE_UPDATE",
    isRecording: isRecording && tracked,
    isPaused,
    stepCount,
    sessionId
  };
}
chrome.commands.onCommand.addListener((command) => {
  void serialize(async () => {
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
  }).catch(console.error);
});
chrome.tabs.onCreated.addListener((tab) => {
  void serialize(async () => {
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
  }).catch(console.error);
});
chrome.tabs.onActivated.addListener((activeInfo) => {
  void serialize(async () => {
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
          isPaused: session.isPaused ?? false,
          stepCount: session.steps.length,
          sessionId
        });
      } catch {
      }
    }
  }).catch(console.error);
});
chrome.tabs.onRemoved.addListener((tabId) => {
  void serialize(async () => {
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
  }).catch(console.error);
});
chrome.runtime.onStartup.addListener(async () => {
  await chrome.storage.session.set({ [BROWSER_SESSION_KEY]: true });
  console.log("[AutoDoc SW] Browser started: new-session marker set (data will be cleared on first record).");
});
chrome.runtime.onInstalled.addListener(async () => {
  await pruneExpiredSessions();
  console.log("[AutoDoc SW] Installed/updated: expired sessions pruned.");
});
function generateAutoDescription(elementTag, elementText) {
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
