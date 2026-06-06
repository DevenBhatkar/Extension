/**
 * AutoDoc - Content Script
 *
 * Injected into every web page. Responsibilities:
 * - Listen for user clicks and relay them to the background service worker
 * - Receive annotate/duplicate-check requests from the service worker
 * - Show a visual flash overlay at the click location during capture
 */

import { annotateScreenshot, compareScreenshots } from '../lib/annotate';
import type { ExtensionMessage, StateUpdateMessage } from '../lib/types';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let isRecording = false;
let isCapturing = false; // Prevents double-captures during async processing

// ─────────────────────────────────────────────────────────────────────────────
// Click Listener
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener(
  'click',
  async (event: MouseEvent) => {
    if (!isRecording || isCapturing) return;

    // Ignore clicks on our own overlay elements
    const target = event.target as HTMLElement;
    if (target.closest?.('[data-autodoc-overlay]')) return;

    isCapturing = true;

    const clickX = event.clientX;
    const clickY = event.clientY;

    // Collect element info
    const elementTag = target.tagName ?? '';
    const rawText = (
      target.innerText ||
      (target as HTMLInputElement).value ||
      target.getAttribute('aria-label') ||
      target.getAttribute('title') ||
      target.getAttribute('placeholder') ||
      ''
    ).trim().slice(0, 100);

    // Show flash effect at click point
    showClickFlash(clickX, clickY);

    try {
      await chrome.runtime.sendMessage({
        type: 'CAPTURE_STEP',
        clickX,
        clickY,
        clickXPercent: clickX / window.innerWidth,
        clickYPercent: clickY / window.innerHeight,
        pageUrl: window.location.href,
        pageTitle: document.title,
        elementTag,
        elementText: rawText,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    } catch (err) {
      console.warn('[AutoDoc] Failed to send CAPTURE_STEP:', err);
    } finally {
      // Small delay to prevent capturing multiple clicks in rapid succession
      setTimeout(() => {
        isCapturing = false;
      }, 600);
    }
  },
  true // Use capture phase so we get clicks before the page's own handlers
);

// ─────────────────────────────────────────────────────────────────────────────
// Message Listener (from Service Worker)
// ─────────────────────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage | DuplicateCheckMessage, _sender, sendResponse) => {
    handleIncomingMessage(message)
      .then(sendResponse)
      .catch((err) => {
        console.error('[AutoDoc Content] Handler error:', err);
        sendResponse({ error: String(err) });
      });
    return true;
  }
);

interface DuplicateCheckMessage {
  type: 'DUPLICATE_CHECK_RESULT';
  rawDataUrl: string;
  previousDataUrl: string;
  threshold: number;
}

async function handleIncomingMessage(
  message: ExtensionMessage | DuplicateCheckMessage
): Promise<unknown> {
  switch (message.type) {
    case 'STATE_UPDATE': {
      const m = message as StateUpdateMessage;
      isRecording = m.isRecording;
      updateRecordingIndicator(m.isRecording, m.stepCount);
      return { ok: true };
    }

    case 'ANNOTATE_SCREENSHOT': {
      const m = message as {
        type: 'ANNOTATE_SCREENSHOT';
        rawDataUrl: string;
        clickX: number;
        clickY: number;
        stepNumber: number;
        viewportWidth: number;
        viewportHeight: number;
      };
      try {
        const annotatedDataUrl = await annotateScreenshot(m.rawDataUrl, {
          clickX: m.clickX,
          clickY: m.clickY,
          stepNumber: m.stepNumber,
          viewportWidth: m.viewportWidth,
          viewportHeight: m.viewportHeight,
        });
        return { annotatedDataUrl };
      } catch (err) {
        console.error('[AutoDoc Content] Annotation failed:', err);
        return { annotatedDataUrl: m.rawDataUrl }; // Fallback to raw
      }
    }

    case 'DUPLICATE_CHECK_RESULT': {
      const m = message as DuplicateCheckMessage;
      try {
        const similarity = await compareScreenshots(m.rawDataUrl, m.previousDataUrl);
        const isDuplicate = similarity >= m.threshold;

        if (isDuplicate) {
          const skip = await showDuplicatePrompt(similarity);
          return { isDuplicate: skip };
        }
        return { isDuplicate: false };
      } catch {
        return { isDuplicate: false };
      }
    }

    default:
      return { error: 'Unknown message' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Init: Sync recording state on page load
// ─────────────────────────────────────────────────────────────────────────────

(async function init() {
  try {
    const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
    if (state?.isRecording) {
      isRecording = true;
      updateRecordingIndicator(true, state.stepCount);
    }
  } catch {
    // Extension context may not be available on first load
  }
})();

// ─────────────────────────────────────────────────────────────────────────────
// UI Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Show an animated flash ring at the click location.
 */
function showClickFlash(x: number, y: number): void {
  const flash = document.createElement('div');
  flash.setAttribute('data-autodoc-overlay', 'true');
  flash.style.cssText = `
    position: fixed;
    left: ${x - 24}px;
    top: ${y - 24}px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid #7c3aed;
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.6);
    animation: autodoc-pulse 0.6s ease-out forwards;
    pointer-events: none;
    z-index: 2147483647;
  `;
  document.body.appendChild(flash);

  // Also show a small camera icon badge
  const badge = document.createElement('div');
  badge.setAttribute('data-autodoc-overlay', 'true');
  badge.style.cssText = `
    position: fixed;
    left: ${x + 18}px;
    top: ${y - 36}px;
    background: #7c3aed;
    color: white;
    border-radius: 6px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: -apple-system, sans-serif;
    font-weight: bold;
    pointer-events: none;
    z-index: 2147483647;
    opacity: 1;
    transition: opacity 0.4s ease;
  `;
  badge.textContent = '📸';
  document.body.appendChild(badge);

  setTimeout(() => {
    flash.remove();
    badge.style.opacity = '0';
    setTimeout(() => badge.remove(), 400);
  }, 600);
}

/**
 * Show/hide the recording status indicator in the corner of the page.
 */
let indicator: HTMLElement | null = null;

function updateRecordingIndicator(recording: boolean, stepCount: number): void {
  if (recording) {
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.setAttribute('data-autodoc-overlay', 'true');
      indicator.id = 'autodoc-recording-indicator';
      document.body.appendChild(indicator);
    }
    indicator.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="
          width:8px;height:8px;border-radius:50%;
          background:#ef4444;
          animation:autodoc-blink 1s infinite;
          display:inline-block;
        "></span>
        <span style="font-size:11px;font-weight:600;letter-spacing:0.5px;">
          REC · ${stepCount} step${stepCount !== 1 ? 's' : ''}
        </span>
      </div>
    `;
  } else {
    indicator?.remove();
    indicator = null;
  }
}

/**
 * Show a duplicate detection prompt and return whether to skip.
 */
async function showDuplicatePrompt(similarity: number): Promise<boolean> {
  return new Promise((resolve) => {
    const dialog = document.createElement('div');
    dialog.setAttribute('data-autodoc-overlay', 'true');
    dialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1e1b4b;
      color: white;
      border-radius: 16px;
      padding: 24px 28px;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      border: 1px solid rgba(124,58,237,0.4);
      max-width: 360px;
      text-align: center;
    `;
    dialog.innerHTML = `
      <div style="font-size:24px;margin-bottom:8px;">🔍</div>
      <div style="font-weight:700;font-size:15px;margin-bottom:6px;">Similar Screenshot Detected</div>
      <div style="font-size:12px;color:#a5b4fc;margin-bottom:20px;">
        This step looks ${Math.round(similarity * 100)}% similar to the previous one. 
        Skip the duplicate?
      </div>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button id="autodoc-dup-skip" style="
          background:#7c3aed;color:white;border:none;
          border-radius:8px;padding:8px 20px;
          font-size:13px;font-weight:600;cursor:pointer;
        ">Skip</button>
        <button id="autodoc-dup-keep" style="
          background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.2);
          border-radius:8px;padding:8px 20px;
          font-size:13px;font-weight:600;cursor:pointer;
        ">Keep Step</button>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector('#autodoc-dup-skip')!.addEventListener('click', () => {
      dialog.remove();
      resolve(true); // Skip
    });
    dialog.querySelector('#autodoc-dup-keep')!.addEventListener('click', () => {
      dialog.remove();
      resolve(false); // Keep
    });

    // Auto-dismiss after 8 seconds (default: keep)
    setTimeout(() => {
      if (document.body.contains(dialog)) {
        dialog.remove();
        resolve(false);
      }
    }, 8000);
  });
}
