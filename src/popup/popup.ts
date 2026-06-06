/**
 * AutoDoc - Popup Script
 * Handles recording toggle, step counter updates, and navigation.
 */

import './popup.css';

// ─────────────────────────────────────────────────────────────────────────────
// DOM References
// ─────────────────────────────────────────────────────────────────────────────

const btnToggle = document.getElementById('btn-toggle-recording') as HTMLButtonElement;
const btnViewDocs = document.getElementById('btn-view-docs') as HTMLButtonElement;
const btnExportPdf = document.getElementById('btn-export-pdf') as HTMLButtonElement;
const stepCountEl = document.getElementById('step-count') as HTMLElement;
const statusText = document.getElementById('status-text') as HTMLElement;
const statusDot = document.getElementById('status-dot') as HTMLElement;
const statusBadge = document.getElementById('status-badge') as HTMLElement;
const stepCounter = document.getElementById('step-counter') as HTMLElement;
const recordIcon = document.getElementById('record-icon') as HTMLElement;
const btnRecordText = document.getElementById('btn-record-text') as HTMLElement;
const sessionInfo = document.getElementById('session-info') as HTMLElement;
const sessionNameDisplay = document.getElementById('session-name-display') as HTMLElement;

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let isRecording = false;
let stepCount = 0;
let activeSessionId: string | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────

async function init() {
  try {
    // Get current state from service worker
    const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
    if (state) {
      updateUI(state.isRecording, state.stepCount, state.sessionId);
    }
  } catch (err) {
    console.warn('[AutoDoc Popup] Failed to get state:', err);
  }

  // If recording, fetch session name
  if (isRecording && activeSessionId) {
    await loadSessionName(activeSessionId);
  }
}

async function loadSessionName(sessionId: string) {
  try {
    const { default: getSession } = await import('../lib/storage');
    void getSession; // type-only import check
  } catch {
    // Fallback: get from storage directly
  }

  const result = await chrome.storage.local.get('autodoc_sessions');
  const sessions = result['autodoc_sessions'] ?? [];
  const session = sessions.find((s: { id: string }) => s.id === sessionId);
  if (session?.name) {
    sessionNameDisplay.textContent = session.name;
    sessionInfo.style.display = 'flex';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Update
// ─────────────────────────────────────────────────────────────────────────────

function updateUI(recording: boolean, count: number, sessionId: string | null) {
  isRecording = recording;
  activeSessionId = sessionId;

  // Animate step count if changed
  if (count !== stepCount) {
    stepCount = count;
    animateStepCount(count);
  }

  if (recording) {
    // Recording state
    btnToggle.classList.add('recording');
    btnRecordText.textContent = 'Stop Recording';
    recordIcon.classList.add('recording');

    statusText.textContent = 'Recording';
    statusDot.className = 'status-dot recording';
    stepCounter.classList.add('recording');

    btnExportPdf.disabled = false;

    if (sessionId) {
      loadSessionName(sessionId).catch(() => {});
    }
  } else {
    // Idle state
    btnToggle.classList.remove('recording');
    btnRecordText.textContent = 'Start Recording';
    recordIcon.classList.remove('recording');

    statusText.textContent = count > 0 ? 'Ready to Export' : 'Idle';
    statusDot.className = 'status-dot idle';
    stepCounter.classList.remove('recording');

    btnExportPdf.disabled = count === 0;
    sessionInfo.style.display = 'none';
  }
}

function animateStepCount(count: number) {
  stepCountEl.textContent = String(count);
  stepCountEl.classList.add('bump');
  setTimeout(() => stepCountEl.classList.remove('bump'), 200);
}

// ─────────────────────────────────────────────────────────────────────────────
// Button Handlers
// ─────────────────────────────────────────────────────────────────────────────

btnToggle.addEventListener('click', async () => {
  btnToggle.disabled = true;

  try {
    if (isRecording) {
      await chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
      updateUI(false, stepCount, activeSessionId);
    } else {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const result = await chrome.runtime.sendMessage({
        type: 'START_RECORDING',
        tabId: activeTab?.id,
      });
      if (result?.ok) {
        updateUI(true, 0, result.sessionId);
      }
    }
  } catch (err) {
    console.error('[AutoDoc Popup] Toggle error:', err);
  } finally {
    btnToggle.disabled = false;
  }
});

btnViewDocs.addEventListener('click', async () => {
  if (!activeSessionId) {
    // Get the most recent session
    const result = await chrome.storage.local.get('autodoc_sessions');
    const sessions: Array<{ id: string; updatedAt: number }> = result['autodoc_sessions'] ?? [];
    if (sessions.length === 0) {
      // Show a brief message
      btnViewDocs.textContent = 'No sessions yet!';
      setTimeout(() => {
        btnViewDocs.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          View Docs
        `;
      }, 2000);
      return;
    }
    // Open the most recent session
    const latest = sessions.sort((a, b) => b.updatedAt - a.updatedAt)[0];
    const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${latest?.id}`);
    await chrome.tabs.create({ url });
  } else {
    const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${activeSessionId}`);
    await chrome.tabs.create({ url });
  }
  window.close();
});

btnExportPdf.addEventListener('click', async () => {
  let sessionId = activeSessionId;

  if (!sessionId) {
    const result = await chrome.storage.local.get('autodoc_sessions');
    const sessions: Array<{ id: string; updatedAt: number }> = result['autodoc_sessions'] ?? [];
    const latest = sessions.sort((a, b) => b.updatedAt - a.updatedAt)[0];
    sessionId = latest?.id ?? null;
  }

  if (!sessionId) return;

  const url = chrome.runtime.getURL(`editor/editor.html?sessionId=${sessionId}&action=export`);
  await chrome.tabs.create({ url });
  window.close();
});

// ─────────────────────────────────────────────────────────────────────────────
// Listen for state updates from the service worker (while popup is open)
// ─────────────────────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'STATE_UPDATE') {
    updateUI(message.isRecording, message.stepCount, message.sessionId);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Bootstrap
// ─────────────────────────────────────────────────────────────────────────────

init().catch(console.error);
