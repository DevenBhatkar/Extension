/**
 * AutoDoc - Documentation Editor Script
 *
 * Handles:
 * - Loading and rendering session steps
 * - Drag-and-drop step reordering (SortableJS)
 * - Step selection, description editing, deletion
 * - Inserting text notes
 * - PDF and HTML export
 * - Auto-export on page load if `action=export` is in URL
 */

import './editor.css';
import Sortable from 'sortablejs';
import {
  getSession,
  saveSession,
  generateId,
  formatDate,
} from '../lib/storage';
import { exportSessionAsPdf, exportSessionAsHtml, downloadAllScreenshots } from '../lib/pdf-export';
import { STORAGE_KEYS } from '../lib/types';
import type { Session, Step } from '../lib/types';

// ─────────────────────────────────────────────────────────────────────────────
// DOM References
// ─────────────────────────────────────────────────────────────────────────────

const sessionNameInput = document.getElementById('session-name-input') as HTMLInputElement;
const totalStepsEl = document.getElementById('total-steps') as HTMLElement;
const stepList = document.getElementById('step-list') as HTMLUListElement;
const emptyState = document.getElementById('empty-state') as HTMLElement;
const welcomePanel = document.getElementById('welcome-panel') as HTMLElement;
const stepDetail = document.getElementById('step-detail') as HTMLElement;

// Step detail elements
const detailBadge = document.getElementById('detail-badge') as HTMLElement;
const detailUrl = document.getElementById('detail-url') as HTMLElement;
const detailTimestamp = document.getElementById('detail-timestamp') as HTMLElement;
const screenshotImg = document.getElementById('screenshot-img') as HTMLImageElement;
const elementInfo = document.getElementById('element-info') as HTMLElement;
const elementTag = document.getElementById('element-tag') as HTMLElement;
const elementText = document.getElementById('element-text') as HTMLElement;
const stepDescription = document.getElementById('step-description') as HTMLTextAreaElement;
const charCount = document.getElementById('char-count') as HTMLElement;
const navIndicator = document.getElementById('nav-indicator') as HTMLElement;
const btnPrev = document.getElementById('btn-prev-step') as HTMLButtonElement;
const btnNext = document.getElementById('btn-next-step') as HTMLButtonElement;

// Toolbar buttons
const btnExportPdf = document.getElementById('btn-export-pdf') as HTMLButtonElement;
const btnExportHtml = document.getElementById('btn-export-html') as HTMLButtonElement;
const btnDownloadScreenshots = document.getElementById('btn-download-screenshots') as HTMLButtonElement;
const btnAddNote = document.getElementById('btn-add-note') as HTMLButtonElement;
const btnRenumber = document.getElementById('btn-renumber') as HTMLButtonElement;
const btnDeleteStep = document.getElementById('btn-delete-step') as HTMLButtonElement;
const btnAutoDesc = document.getElementById('btn-auto-desc') as HTMLButtonElement;
const btnViewFullscreen = document.getElementById('btn-view-fullscreen') as HTMLButtonElement;

// Modal elements
const noteModalOverlay = document.getElementById('note-modal-overlay') as HTMLElement;
const noteContent = document.getElementById('note-content') as HTMLTextAreaElement;
const notePosition = document.getElementById('note-position') as HTMLSelectElement;
const noteCancel = document.getElementById('note-cancel') as HTMLButtonElement;
const noteConfirm = document.getElementById('note-confirm') as HTMLButtonElement;
const noteModalClose = document.getElementById('note-modal-close') as HTMLButtonElement;

// Fullscreen
const fullscreenOverlay = document.getElementById('fullscreen-overlay') as HTMLElement;
const fullscreenImg = document.getElementById('fullscreen-img') as HTMLImageElement;
const fullscreenClose = document.getElementById('fullscreen-close') as HTMLButtonElement;

// Loading overlay
const exportLoading = document.getElementById('export-loading') as HTMLElement;
const exportLoadingText = document.getElementById('export-loading-text') as HTMLElement;

// Toast
const toastEl = document.getElementById('toast') as HTMLElement;

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let session: Session | null = null;
let selectedStepId: string | null = null;
let targetSessionId: string | null = null; // set in init(), used by module-level listeners
let saveTimer: ReturnType<typeof setTimeout> | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────

async function init() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId');
  const action = params.get('action');

  if (!sessionId) {
    showToast('No session specified. Please start a recording first.');
    return;
  }

  // Store the target session ID so listeners can bootstrap even before the session loads
  targetSessionId = sessionId;

  // Retry session load — the editor can open fractionally before the SW saves the session
  let loaded: Session | null = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    loaded = await getSession(sessionId);
    if (loaded) break;
    // Exponential back-off: 0, 150, 300, 500, 750, 1000ms
    await new Promise((r) => setTimeout(r, [0, 150, 300, 500, 750, 1000][attempt] ?? 1000));
  }

  if (!loaded) {
    showToast('Session not found — waiting for recording to begin...');
    // Don't bail out — the storage listener below will bootstrap the editor
    // the moment the session appears in storage (e.g. when recording starts).
    return;
  }

  session = loaded;
  renderAll();
  initSortable();

  // Auto-select first step
  if (session.steps.length > 0) {
    selectStep(session.steps[0]!.id);
  }

  // Auto-export if requested
  if (action === 'export') {
    setTimeout(() => handleExportPdf(), 500);
  }
}

async function reloadCurrentSession() {
  if (!session) return;

  const previousSelectedStepId = selectedStepId;
  const updated = await getSession(session.id);
  if (!updated) return;

  session = updated;
  renderAll();

  if (previousSelectedStepId && session.steps.some((step) => step.id === previousSelectedStepId)) {
    selectStep(previousSelectedStepId);
    return;
  }

  const firstStep = session.steps[0];
  if (firstStep) {
    selectStep(firstStep.id);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Module-Level Live-Update Listeners
// (Run even if session was null on initial load, so the editor can bootstrap
//  itself the moment the session appears in storage)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Bootstrap or refresh when storage changes.
 * This is the most reliable update path — fires whenever the SW saves a step.
 */
chrome.storage.local.onChanged.addListener((changes) => {
  if (!changes[STORAGE_KEYS.SESSIONS]) return;

  const sessions = changes[STORAGE_KEYS.SESSIONS].newValue as Session[] | undefined;
  if (!sessions) return;

  const id = session?.id ?? targetSessionId;
  if (!id) return;

  const updated = sessions.find((s) => s.id === id);
  if (!updated) return;

  const prevStepCount = session?.steps.length ?? -1;
  const isNewSession = !session; // editor is bootstrapping for the first time

  session = updated;

  if (isNewSession) {
    // First time we get data — do a full init render
    renderAll();
    initSortable();
  } else {
    renderAll();
  }

  // Auto-select first step if we just got steps for the first time
  if (prevStepCount === 0 || prevStepCount === -1) {
    if (session.steps.length > 0) {
      selectStep(session.steps[0]!.id);
    }
  } else if (selectedStepId && session.steps.some((s) => s.id === selectedStepId)) {
    selectStep(selectedStepId);
  }
});

/**
 * Secondary: also listen to STATE_UPDATE messages from the service worker.
 * Works alongside the storage listener as a belt-and-suspenders approach.
 */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'STATE_UPDATE') return;
  const id = session?.id ?? targetSessionId;
  if (!id || msg.sessionId !== id) return;
  // The storage.onChanged listener above already handles the actual reload;
  // this is just a signal that the SW completed a capture.
  // Only reload if storage.onChanged somehow didn't fire.
  if (session) reloadCurrentSession();
});

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────

function renderAll() {
  if (!session) return;

  document.title = `${session.name} — AutoDoc`;
  sessionNameInput.value = session.name;
  totalStepsEl.textContent = String(session.steps.length);

  const hasSteps = session.steps.length > 0;
  emptyState.style.display = hasSteps ? 'none' : 'flex';

  // Re-render step list
  stepList.innerHTML = '';
  session.steps.forEach((step) => {
    stepList.appendChild(createStepThumbnail(step));
  });

  // Update note position select
  updateNotePositionSelect();
}

function createStepThumbnail(step: Step): HTMLLIElement {
  const li = document.createElement('li');
  li.className = `step-item${step.isNote ? ' is-note' : ''}${selectedStepId === step.id ? ' active' : ''}`;
  li.dataset['stepId'] = step.id;
  li.setAttribute('role', 'listitem');

  const desc = step.isNote
    ? (step.noteContent ?? '').slice(0, 60)
    : (step.description ?? '').slice(0, 50) || `Step ${step.stepNumber}`;

  li.innerHTML = `
    <div class="step-thumb-header">
      <span class="step-thumb-badge">
        ${step.isNote ? '📝 NOTE' : `STEP ${step.stepNumber}`}
      </span>
      <div class="step-thumb-actions">
        <button class="thumb-icon-btn delete-btn" title="Delete step" data-step-id="${step.id}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    ${step.isNote
      ? `<div class="step-thumb-note-preview">${escapeHtml(desc)}</div>`
      : `<img class="step-thumb-img" src="${step.screenshotDataUrl}" alt="Step ${step.stepNumber}" loading="lazy" />`
    }
    <div class="step-thumb-desc">${escapeHtml(desc)}</div>
  `;

  // Click to select
  li.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.delete-btn')) {
      selectStep(step.id);
    }
  });

  // Delete button inside thumbnail
  li.querySelector('.delete-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    confirmDeleteStep(step.id);
  });

  return li;
}

function selectStep(stepId: string) {
  if (!session) return;
  selectedStepId = stepId;

  const step = session.steps.find((s) => s.id === stepId);
  if (!step) return;

  // Update sidebar active state
  document.querySelectorAll('.step-item').forEach((el) => {
    el.classList.toggle('active', (el as HTMLElement).dataset['stepId'] === stepId);
  });

  // Show detail panel
  welcomePanel.style.display = 'none';
  stepDetail.style.display = 'flex';

  // Fill detail view
  detailBadge.textContent = step.isNote ? '📝 NOTE' : `STEP ${step.stepNumber}`;
  detailUrl.textContent = step.pageUrl ?? '';
  detailTimestamp.textContent = formatDate(step.timestamp);

  if (step.isNote) {
    screenshotImg.style.display = 'none';
  } else {
    screenshotImg.style.display = 'block';
    screenshotImg.src = step.screenshotDataUrl;
    screenshotImg.alt = `Step ${step.stepNumber} screenshot`;
  }

  if (step.elementTag) {
    elementInfo.style.display = 'flex';
    elementTag.textContent = step.elementTag;
    elementText.textContent = step.elementText ?? '';
  } else {
    elementInfo.style.display = 'none';
  }

  stepDescription.value = step.isNote
    ? (step.noteContent ?? '')
    : (step.description ?? '');
  updateCharCount();

  // Navigation state
  const idx = session.steps.findIndex((s) => s.id === stepId);
  navIndicator.textContent = `${idx + 1} / ${session.steps.length}`;
  (btnPrev as HTMLButtonElement).disabled = idx === 0;
  (btnNext as HTMLButtonElement).disabled = idx === session.steps.length - 1;

  // Scroll the selected thumbnail into view
  const thumbEl = stepList.querySelector(`[data-step-id="${stepId}"]`);
  thumbEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateCharCount() {
  charCount.textContent = `${stepDescription.value.length} characters`;
}

function updateNotePositionSelect() {
  if (!session) return;
  notePosition.innerHTML = '<option value="-1">At the beginning</option>';
  session.steps.forEach((step, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = step.isNote
      ? `After note at position ${i + 1}`
      : `After Step ${step.stepNumber}`;
    notePosition.appendChild(opt);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Drag and Drop (SortableJS)
// ─────────────────────────────────────────────────────────────────────────────

function initSortable() {
  Sortable.create(stepList, {
    animation: 200,
    ghostClass: 'sortable-ghost',
    dragClass: 'sortable-drag',
    handle: '.step-item',
    onEnd: async (evt) => {
      if (!session) return;
      const oldIdx = evt.oldIndex!;
      const newIdx = evt.newIndex!;
      if (oldIdx === newIdx) return;

      // Reorder the steps array
      const steps = [...session.steps];
      const [moved] = steps.splice(oldIdx, 1);
      if (moved) {
        steps.splice(newIdx, 0, moved);
      }

      // Renumber steps
      const renumbered = renumberSteps(steps);
      session = { ...session, steps: renumbered };
      await persistSession();
      renderAll();

      // Re-select the moved step
      if (moved) selectStep(moved.id);
      showToast('Steps reordered');
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Step CRUD
// ─────────────────────────────────────────────────────────────────────────────

function confirmDeleteStep(stepId: string) {
  if (!session) return;
  const step = session.steps.find((s) => s.id === stepId);
  if (!step) return;

  // Simple confirm dialog (could be enhanced)
  const label = step.isNote ? 'this note' : `Step ${step.stepNumber}`;
  if (!confirm(`Delete ${label}? This cannot be undone.`)) return;

  deleteStep(stepId);
}

async function deleteStep(stepId: string) {
  if (!session) return;

  const wasSelected = selectedStepId === stepId;
  const idx = session.steps.findIndex((s) => s.id === stepId);

  const steps = session.steps.filter((s) => s.id !== stepId);
  const renumbered = renumberSteps(steps);
  session = { ...session, steps: renumbered };
  await persistSession();
  renderAll();

  if (wasSelected) {
    // Select adjacent step
    const newSteps = session.steps;
    if (newSteps.length === 0) {
      welcomePanel.style.display = 'flex';
      stepDetail.style.display = 'none';
      selectedStepId = null;
    } else {
      const nextStep = newSteps[Math.min(idx, newSteps.length - 1)];
      if (nextStep) selectStep(nextStep.id);
    }
  }

  showToast('Step deleted');
}

function renumberSteps(steps: Step[]): Step[] {
  let stepNum = 1;
  return steps.map((step) => {
    if (step.isNote) {
      return { ...step };
    }
    return { ...step, stepNumber: stepNum++ };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Note Insertion
// ─────────────────────────────────────────────────────────────────────────────

function openNoteModal() {
  updateNotePositionSelect();
  noteContent.value = '';
  noteModalOverlay.style.display = 'flex';
  noteContent.focus();
}

function closeNoteModal() {
  noteModalOverlay.style.display = 'none';
}

async function insertNote() {
  if (!session) return;
  const content = noteContent.value.trim();
  if (!content) {
    showToast('Please enter note content');
    return;
  }

  const note: Step = {
    id: generateId(),
    stepNumber: 0,
    timestamp: Date.now(),
    screenshotDataUrl: '',
    rawScreenshotDataUrl: '',
    clickX: 0,
    clickY: 0,
    clickXPercent: 0,
    clickYPercent: 0,
    pageUrl: '',
    pageTitle: '',
    description: '',
    isNote: true,
    noteContent: content,
  };

  const insertAfter = parseInt(notePosition.value, 10);
  const steps = [...session.steps];

  if (insertAfter < 0) {
    steps.unshift(note);
  } else {
    steps.splice(insertAfter + 1, 0, note);
  }

  const renumbered = renumberSteps(steps);
  session = { ...session, steps: renumbered };
  await persistSession();
  closeNoteModal();
  renderAll();
  selectStep(note.id);
  showToast('Note inserted');
}

// ─────────────────────────────────────────────────────────────────────────────
// Save (Debounced)
// ─────────────────────────────────────────────────────────────────────────────

async function persistSession() {
  if (!session) return;
  await saveSession(session);
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await persistSession();
  }, 800);
}

// ─────────────────────────────────────────────────────────────────────────────
// Export Handlers
// ─────────────────────────────────────────────────────────────────────────────

async function handleExportPdf() {
  if (!session || session.steps.length === 0) {
    showToast('No steps to export');
    return;
  }

  exportLoadingText.textContent = 'Generating PDF...';
  exportLoading.style.display = 'flex';
  btnExportPdf.disabled = true;
  try {
    await exportSessionAsPdf(session);
    showToast('PDF exported successfully! 🎉');
  } catch (err) {
    console.error('[AutoDoc Editor] PDF export failed:', err);
    showToast('PDF export failed. Please try again.');
  } finally {
    btnExportPdf.disabled = false;
    exportLoading.style.display = 'none';
  }
}

function handleExportHtml() {
  if (!session || session.steps.length === 0) {
    showToast('No steps to export');
    return;
  }
  exportSessionAsHtml(session);
  showToast('HTML exported successfully! 🌐');
}

async function handleDownloadScreenshots() {
  if (!session || session.steps.filter((s) => !s.isNote).length === 0) {
    showToast('No screenshots to download');
    return;
  }

  exportLoadingText.textContent = 'Downloading screenshots...';
  exportLoading.style.display = 'flex';
  btnDownloadScreenshots.disabled = true;
  try {
    await downloadAllScreenshots(session);
    showToast(`${session.steps.filter((s) => !s.isNote).length} screenshots downloaded! 🖼️`);
  } catch (err) {
    console.error('[AutoDoc Editor] Screenshot download failed:', err);
    showToast('Download failed. Please try again.');
  } finally {
    btnDownloadScreenshots.disabled = false;
    exportLoading.style.display = 'none';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────────────────────────────────────

let toastTimer: ReturnType<typeof setTimeout> | null = null;

function showToast(message: string, duration = 3000) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), duration);
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-description Generator
// ─────────────────────────────────────────────────────────────────────────────

function generateAutoDescription(): string {
  if (!session || !selectedStepId) return '';
  const step = session.steps.find((s) => s.id === selectedStepId);
  if (!step || step.isNote) return '';

  const tag = step.elementTag?.toUpperCase() ?? '';
  const text = step.elementText ?? '';
  const pageTitle = step.pageTitle ?? '';

  if (tag === 'BUTTON' || tag === 'INPUT[TYPE=SUBMIT]') {
    return text ? `Click the "${text}" button` : `Click the button on ${pageTitle}`;
  }
  if (tag === 'A') {
    return text ? `Click the "${text}" link` : `Click the link to navigate`;
  }
  if (tag === 'INPUT' || tag === 'TEXTAREA') {
    return text
      ? `Enter text in the "${text}" field`
      : `Fill in the input field`;
  }
  if (tag === 'SELECT') {
    return `Select an option from the dropdown`;
  }
  if (text) {
    return `Click on "${text}"`;
  }
  return `Interact with the ${tag.toLowerCase()} element on ${pageTitle}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Event Listeners
// ─────────────────────────────────────────────────────────────────────────────

// Session name
sessionNameInput.addEventListener('input', () => {
  if (!session) return;
  session = { ...session, name: sessionNameInput.value };
  document.title = `${session.name} — AutoDoc`;
  scheduleSave();
});

// Description textarea
stepDescription.addEventListener('input', () => {
  if (!session || !selectedStepId) return;
  const step = session.steps.find((s) => s.id === selectedStepId);
  if (!step) return;

  const value = stepDescription.value;
  const updatedStep: Step = step.isNote
    ? { ...step, noteContent: value }
    : { ...step, description: value };

  session = {
    ...session,
    steps: session.steps.map((s) => (s.id === selectedStepId ? updatedStep : s)),
  };
  updateCharCount();
  scheduleSave();

  // Update thumbnail description
  const thumbDesc = stepList.querySelector(`[data-step-id="${selectedStepId}"] .step-thumb-desc`);
  if (thumbDesc) thumbDesc.textContent = value.slice(0, 50);
});

// Auto-generate description
btnAutoDesc.addEventListener('click', () => {
  const desc = generateAutoDescription();
  if (desc) {
    stepDescription.value = desc;
    stepDescription.dispatchEvent(new Event('input'));
    showToast('Description auto-generated ✨');
  }
});

// Navigation
btnPrev.addEventListener('click', () => {
  if (!session || !selectedStepId) return;
  const idx = session.steps.findIndex((s) => s.id === selectedStepId);
  if (idx > 0) selectStep(session.steps[idx - 1]!.id);
});

btnNext.addEventListener('click', () => {
  if (!session || !selectedStepId) return;
  const idx = session.steps.findIndex((s) => s.id === selectedStepId);
  if (idx < session.steps.length - 1) selectStep(session.steps[idx + 1]!.id);
});

// Delete step (from main panel)
btnDeleteStep.addEventListener('click', () => {
  if (selectedStepId) confirmDeleteStep(selectedStepId);
});

// Renumber
btnRenumber.addEventListener('click', async () => {
  if (!session) return;
  session = { ...session, steps: renumberSteps(session.steps) };
  await persistSession();
  renderAll();
  if (selectedStepId) selectStep(selectedStepId);
  showToast('Steps renumbered');
});

// Export buttons
btnExportPdf.addEventListener('click', handleExportPdf);
btnExportHtml.addEventListener('click', handleExportHtml);
btnDownloadScreenshots.addEventListener('click', handleDownloadScreenshots);

// Add note
btnAddNote.addEventListener('click', openNoteModal);
noteCancel.addEventListener('click', closeNoteModal);
noteModalClose.addEventListener('click', closeNoteModal);
noteModalOverlay.addEventListener('click', (e) => {
  if (e.target === noteModalOverlay) closeNoteModal();
});
noteConfirm.addEventListener('click', insertNote);
noteContent.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) insertNote();
});

// Fullscreen
btnViewFullscreen.addEventListener('click', () => {
  if (!session || !selectedStepId) return;
  const step = session.steps.find((s) => s.id === selectedStepId);
  if (!step || !step.screenshotDataUrl) return;
  fullscreenImg.src = step.screenshotDataUrl;
  fullscreenOverlay.style.display = 'flex';
});

fullscreenClose.addEventListener('click', () => {
  fullscreenOverlay.style.display = 'none';
});

fullscreenOverlay.addEventListener('click', (e) => {
  if (e.target === fullscreenOverlay) fullscreenOverlay.style.display = 'none';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (fullscreenOverlay.style.display !== 'none') {
      fullscreenOverlay.style.display = 'none';
    }
    if (noteModalOverlay.style.display !== 'none') {
      closeNoteModal();
    }
  }
  if (e.key === 'ArrowLeft' && !isInputFocused()) {
    btnPrev.click();
  }
  if (e.key === 'ArrowRight' && !isInputFocused()) {
    btnNext.click();
  }
  if (e.key === 'Delete' && !isInputFocused() && selectedStepId) {
    confirmDeleteStep(selectedStepId);
  }
});

function isInputFocused(): boolean {
  const active = document.activeElement;
  return (
    active instanceof HTMLInputElement ||
    active instanceof HTMLTextAreaElement ||
    active instanceof HTMLSelectElement
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─────────────────────────────────────────────────────────────────────────────
// Bootstrap
// ─────────────────────────────────────────────────────────────────────────────

init().catch(console.error);
