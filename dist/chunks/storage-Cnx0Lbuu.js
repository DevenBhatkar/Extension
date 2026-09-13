const STORAGE_KEYS = {
  SESSIONS: "autodoc_sessions",
  ACTIVE_SESSION_ID: "autodoc_active_session_id",
  IS_RECORDING: "autodoc_is_recording",
  ACTIVE_TAB_ID: "autodoc_active_tab_id",
  SETTINGS: "autodoc_settings"
};
const DEFAULT_SETTINGS = {
  detectDuplicates: true,
  duplicateThreshold: 0.92,
  autoDescription: true,
  annotationColor: "#7c3aed"
};
const EXPIRY_MS = 24 * 60 * 60 * 1e3;
async function listSessions() {
  const result = await chrome.storage.local.get(STORAGE_KEYS.SESSIONS);
  return result[STORAGE_KEYS.SESSIONS] ?? [];
}
async function getSession(id) {
  const sessions = await listSessions();
  return sessions.find((s) => s.id === id) ?? null;
}
async function saveSession(session) {
  const sessions = await listSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = { ...session, updatedAt: Date.now() };
  } else {
    sessions.push({ ...session, updatedAt: Date.now() });
  }
  await chrome.storage.local.set({ [STORAGE_KEYS.SESSIONS]: sessions });
}
async function getActiveSessionId() {
  const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_SESSION_ID);
  return result[STORAGE_KEYS.ACTIVE_SESSION_ID] ?? null;
}
async function setActiveSessionId(id) {
  await chrome.storage.local.set({ [STORAGE_KEYS.ACTIVE_SESSION_ID]: id });
}
async function getIsRecording() {
  const result = await chrome.storage.local.get(STORAGE_KEYS.IS_RECORDING);
  return result[STORAGE_KEYS.IS_RECORDING] ?? false;
}
async function setIsRecording(value) {
  await chrome.storage.local.set({ [STORAGE_KEYS.IS_RECORDING]: value });
}
async function setActiveTabId(tabId) {
  await chrome.storage.local.set({ [STORAGE_KEYS.ACTIVE_TAB_ID]: tabId });
}
async function getSettings() {
  const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...result[STORAGE_KEYS.SETTINGS] ?? {}
  };
}
async function pruneExpiredSessions() {
  const now = Date.now();
  const sessions = await listSessions();
  const fresh = sessions.filter((s) => now - s.createdAt < EXPIRY_MS);
  if (fresh.length !== sessions.length) {
    console.log(
      `[AutoDoc Storage] Pruned ${sessions.length - fresh.length} expired session(s).`
    );
    await chrome.storage.local.set({ [STORAGE_KEYS.SESSIONS]: fresh });
    const activeId = await getActiveSessionId();
    if (activeId && !fresh.find((s) => s.id === activeId)) {
      await setActiveSessionId(null);
      await setIsRecording(false);
      await setActiveTabId(null);
    }
  }
}
async function clearAllData() {
  await chrome.storage.local.remove([
    STORAGE_KEYS.SESSIONS,
    STORAGE_KEYS.ACTIVE_SESSION_ID,
    STORAGE_KEYS.IS_RECORDING,
    STORAGE_KEYS.ACTIVE_TAB_ID,
    STORAGE_KEYS.SETTINGS
  ]);
  console.log("[AutoDoc Storage] All session data cleared.");
}
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function generateSessionName() {
  const now = /* @__PURE__ */ new Date();
  return `Session ${now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}
export {
  STORAGE_KEYS as S,
  getIsRecording as a,
  generateId as b,
  clearAllData as c,
  generateSessionName as d,
  setActiveSessionId as e,
  setIsRecording as f,
  getSession as g,
  setActiveTabId as h,
  getActiveSessionId as i,
  getSettings as j,
  formatDate as k,
  pruneExpiredSessions as p,
  saveSession as s
};
