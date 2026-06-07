import { _ as __vitePreload } from "../chunks/preload-helper-BkSzTOHT.js";
const btnToggle = document.getElementById("btn-toggle-recording");
const btnViewDocs = document.getElementById("btn-view-docs");
const btnExportPdf = document.getElementById("btn-export-pdf");
const stepCountEl = document.getElementById("step-count");
const statusText = document.getElementById("status-text");
const statusDot = document.getElementById("status-dot");
document.getElementById("status-badge");
const stepCounter = document.getElementById("step-counter");
const recordIcon = document.getElementById("record-icon");
const btnRecordText = document.getElementById("btn-record-text");
const sessionInfo = document.getElementById("session-info");
const sessionNameDisplay = document.getElementById("session-name-display");
const setupModalOverlay = document.getElementById("setup-modal-overlay");
const featureNameInput = document.getElementById("feature-name-input");
const featureNameError = document.getElementById("feature-name-error");
const envTypeError = document.getElementById("env-type-error");
const radioGroup = setupModalOverlay.querySelector(".radio-group");
const setupCancel = document.getElementById("setup-cancel");
const setupConfirm = document.getElementById("setup-confirm");
let isRecording = false;
let stepCount = 0;
let activeSessionId = null;
async function init() {
  try {
    const state = await chrome.runtime.sendMessage({ type: "GET_STATE" });
    if (state) {
      updateUI(state.isRecording, state.stepCount, state.sessionId);
    }
  } catch (err) {
    console.warn("[AutoDoc Popup] Failed to get state:", err);
  }
  if (isRecording && activeSessionId) {
    await loadSessionName(activeSessionId);
  }
}
async function loadSessionName(sessionId) {
  try {
    const { default: getSession } = await __vitePreload(async () => {
      const { default: getSession2 } = await import("../chunks/storage-LAwyUxjd.js").then((n) => n.m);
      return { default: getSession2 };
    }, true ? [] : void 0);
  } catch {
  }
  const result = await chrome.storage.local.get("autodoc_sessions");
  const sessions = result["autodoc_sessions"] ?? [];
  const session = sessions.find((s) => s.id === sessionId);
  if (session?.name) {
    sessionNameDisplay.textContent = session.name;
    sessionInfo.style.display = "flex";
  }
}
function updateUI(recording, count, sessionId) {
  isRecording = recording;
  activeSessionId = sessionId;
  if (count !== stepCount) {
    stepCount = count;
    animateStepCount(count);
  }
  if (recording) {
    btnToggle.classList.add("recording");
    btnRecordText.textContent = "Stop Recording";
    recordIcon.classList.add("recording");
    statusText.textContent = "Recording";
    statusDot.className = "status-dot recording";
    stepCounter.classList.add("recording");
    btnExportPdf.disabled = false;
    if (sessionId) {
      loadSessionName(sessionId).catch(() => {
      });
    }
  } else {
    btnToggle.classList.remove("recording");
    btnRecordText.textContent = "Start Recording";
    recordIcon.classList.remove("recording");
    statusText.textContent = count > 0 ? "Ready to Export" : "Idle";
    statusDot.className = "status-dot idle";
    stepCounter.classList.remove("recording");
    btnExportPdf.disabled = count === 0;
    sessionInfo.style.display = "none";
  }
}
function animateStepCount(count) {
  stepCountEl.textContent = String(count);
  stepCountEl.classList.add("bump");
  setTimeout(() => stepCountEl.classList.remove("bump"), 200);
}
btnToggle.addEventListener("click", async () => {
  if (isRecording) {
    btnToggle.disabled = true;
    try {
      await chrome.runtime.sendMessage({ type: "STOP_RECORDING" });
      updateUI(false, stepCount, activeSessionId);
    } catch (err) {
      console.error("[AutoDoc Popup] Stop error:", err);
    } finally {
      btnToggle.disabled = false;
    }
  } else {
    openSetupModal();
  }
});
function openSetupModal() {
  featureNameInput.value = "";
  document.querySelectorAll('input[name="env-type"]').forEach((r) => r.checked = false);
  clearValidationErrors();
  setupModalOverlay.classList.add("visible");
  featureNameInput.focus();
}
function closeSetupModal() {
  setupModalOverlay.classList.remove("visible");
  clearValidationErrors();
}
function clearValidationErrors() {
  featureNameInput.classList.remove("error");
  featureNameError.classList.remove("visible");
  envTypeError.classList.remove("visible");
  radioGroup.classList.remove("error");
}
function getSelectedEnvType() {
  const selected = document.querySelector('input[name="env-type"]:checked');
  return selected?.value ?? null;
}
async function handleSetupConfirm() {
  clearValidationErrors();
  let valid = true;
  const featureName = featureNameInput.value.trim();
  if (!featureName) {
    featureNameInput.classList.add("error");
    featureNameError.classList.add("visible");
    valid = false;
  }
  const envType = getSelectedEnvType();
  if (!envType) {
    envTypeError.classList.add("visible");
    radioGroup.classList.add("error");
    valid = false;
  }
  if (!valid) return;
  setupConfirm.disabled = true;
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const result = await chrome.runtime.sendMessage({
      type: "START_RECORDING",
      tabId: activeTab?.id,
      featureName,
      environmentType: envType
    });
    if (result?.ok) {
      closeSetupModal();
      updateUI(true, 0, result.sessionId);
    }
  } catch (err) {
    console.error("[AutoDoc Popup] Start error:", err);
  } finally {
    setupConfirm.disabled = false;
  }
}
setupCancel.addEventListener("click", closeSetupModal);
setupConfirm.addEventListener("click", handleSetupConfirm);
setupModalOverlay.addEventListener("click", (e) => {
  if (e.target === setupModalOverlay) closeSetupModal();
});
featureNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSetupConfirm();
});
btnViewDocs.addEventListener("click", async () => {
  if (!activeSessionId) {
    const result = await chrome.storage.local.get("autodoc_sessions");
    const sessions = result["autodoc_sessions"] ?? [];
    if (sessions.length === 0) {
      btnViewDocs.textContent = "No sessions yet!";
      setTimeout(() => {
        btnViewDocs.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          View Docs
        `;
      }, 2e3);
      return;
    }
    const latest = sessions.sort((a, b) => b.updatedAt - a.updatedAt)[0];
    const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${latest?.id}`);
    await chrome.tabs.create({ url });
  } else {
    const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${activeSessionId}`);
    await chrome.tabs.create({ url });
  }
  window.close();
});
btnExportPdf.addEventListener("click", async () => {
  let sessionId = activeSessionId;
  if (!sessionId) {
    const result = await chrome.storage.local.get("autodoc_sessions");
    const sessions = result["autodoc_sessions"] ?? [];
    const latest = sessions.sort((a, b) => b.updatedAt - a.updatedAt)[0];
    sessionId = latest?.id ?? null;
  }
  if (!sessionId) return;
  const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${sessionId}&action=export`);
  await chrome.tabs.create({ url });
  window.close();
});
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "STATE_UPDATE") {
    updateUI(message.isRecording, message.stepCount, message.sessionId);
  }
});
init().catch(console.error);
