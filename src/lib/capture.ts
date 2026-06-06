/**
 * AutoDoc - Capture Utilities
 *
 * Helper functions used by the background service worker for screenshot capture.
 * These are thin wrappers around the Chrome API that make the logic testable.
 */

/**
 * Capture the currently visible portion of the active tab.
 * Must be called from a background script context.
 *
 * @param windowId - Optional window ID; defaults to the current window
 * @returns A PNG data URL of the screenshot
 */
export async function captureVisibleTab(windowId?: number): Promise<string> {
  return chrome.tabs.captureVisibleTab(windowId, {
    format: 'png',
    quality: 100,
  });
}

/**
 * Get basic info about the currently active tab.
 */
export async function getActiveTab(): Promise<chrome.tabs.Tab | null> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0] ?? null;
}
