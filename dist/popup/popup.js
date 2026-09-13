const btnToggle = document.getElementById("btn-toggle-recording");
const btnViewDocs = document.getElementById("btn-view-docs");
const btnExportPdf = document.getElementById("btn-export-pdf");
const stepCountEl = document.getElementById("step-count");
const statusText = document.getElementById("status-text");
const statusDot = document.getElementById("status-dot");
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
const btnPause = document.createElement("button");
btnPause.className = "btn btn-secondary";
btnPause.textContent = "Pause";
const btnUndo = document.createElement("button");
btnUndo.className = "btn btn-secondary";
btnUndo.textContent = "Undo last capture";
const controls = document.createElement("div");
controls.style.cssText = "display:flex;gap:8px;margin:10px 0";
controls.append(btnPause, btnUndo);
btnToggle.after(controls);
let isPaused = false;
let isRecording = false;
let stepCount = 0;
let activeSessionId = null;
async function init() {
  try {
    const state = await chrome.runtime.sendMessage({ type: "GET_STATE" });
    if (state?.type === "STATE_UPDATE") {
      updateUI(state.isRecording, state.stepCount, state.sessionId, state.isPaused);
    }
  } catch (err) {
    console.warn("[AutoDoc Popup] Failed to get state:", err);
  }
  if (isRecording && activeSessionId) {
    await loadSessionName(activeSessionId);
  }
}
async function loadSessionName(sessionId) {
  const result = await chrome.storage.local.get("autodoc_sessions");
  const sessions = result["autodoc_sessions"] ?? [];
  const session = sessions.find((s) => s.id === sessionId);
  if (session?.name) {
    sessionNameDisplay.textContent = session.name;
    sessionInfo.style.display = "flex";
  }
}
function updateUI(recording, count, sessionId, paused = false) {
  isPaused = paused;
  btnPause.style.display = recording ? "" : "none";
  btnPause.textContent = paused ? "Resume" : "Pause";
  btnUndo.disabled = count === 0;
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
    statusText.textContent = paused ? "Paused" : "Recording";
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
      const result = await chrome.runtime.sendMessage({ type: "STOP_RECORDING" });
      if (!result?.ok) throw new Error(result?.error || "Could not stop recording.");
      updateUI(false, stepCount, activeSessionId);
    } catch (err) {
      console.error("[AutoDoc Popup] Stop error:", err);
      statusText.textContent = String(err);
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
    } else {
      throw new Error(result?.error || "Could not start recording.");
    }
  } catch (err) {
    console.error("[AutoDoc Popup] Start error:", err);
    featureNameError.textContent = String(err);
    featureNameError.classList.add("visible");
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
    updateUI(message.isRecording, message.stepCount, message.sessionId, message.isPaused);
  }
});
init().catch(console.error);
async function recordingControl(type) {
  btnPause.disabled = true;
  btnUndo.disabled = true;
  try {
    const result = await chrome.runtime.sendMessage({ type });
    if (!result?.ok) throw new Error(result?.error || "Action failed");
    const state = await chrome.runtime.sendMessage({ type: "GET_STATE" });
    updateUI(state.isRecording, state.stepCount, state.sessionId, state.isPaused);
  } catch (error) {
    statusText.textContent = String(error);
  } finally {
    btnPause.disabled = false;
    btnUndo.disabled = stepCount === 0;
  }
}
btnPause.addEventListener("click", () => {
  void recordingControl(isPaused ? "RESUME_RECORDING" : "PAUSE_RECORDING");
});
btnUndo.addEventListener("click", () => {
  void recordingControl("UNDO_CAPTURE");
});
