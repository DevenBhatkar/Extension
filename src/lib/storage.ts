/**
 * AutoDoc - Chrome Storage API Wrapper
 *
 * Uses chrome.storage.local for data persistence during a session.
 * Data is treated as ephemeral — it is automatically cleaned up:
 *   - After any export (PDF, HTML, screenshots)
 *   - On extension startup or install (full wipe)
 *   - 24-hour expiry as a safety net
 *
 * The extension holds `unlimitedStorage` permission so large screenshots
 * don't hit the default 10 MB quota.
 */

import type { Session, AutoDocSettings } from './types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from './types';

// 24 hours in milliseconds
const EXPIRY_MS = 24 * 60 * 60 * 1000;

// ─────────────────────────────────────────────────────────────────────────────
// Session CRUD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Retrieve all saved sessions from storage.
 */
export async function listSessions(): Promise<Session[]> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.SESSIONS);
  return (result[STORAGE_KEYS.SESSIONS] as Session[]) ?? [];
}

/**
 * Get a single session by ID.
 */
export async function getSession(id: string): Promise<Session | null> {
  const sessions = await listSessions();
  return sessions.find((s) => s.id === id) ?? null;
}

/**
 * Save (create or update) a session.
 */
export async function saveSession(session: Session): Promise<void> {
  const sessions = await listSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = { ...session, updatedAt: Date.now() };
  } else {
    sessions.push({ ...session, updatedAt: Date.now() });
  }
  await chrome.storage.local.set({ [STORAGE_KEYS.SESSIONS]: sessions });
}

/**
 * Delete a session by ID.
 */
export async function deleteSession(id: string): Promise<void> {
  const sessions = await listSessions();
  const filtered = sessions.filter((s) => s.id !== id);
  await chrome.storage.local.set({ [STORAGE_KEYS.SESSIONS]: filtered });
}

/**
 * Clear all sessions from storage.
 */
export async function clearAllSessions(): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.SESSIONS]: [] });
}

// ─────────────────────────────────────────────────────────────────────────────
// Active Session State
// ─────────────────────────────────────────────────────────────────────────────

export async function getActiveSessionId(): Promise<string | null> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_SESSION_ID);
  return (result[STORAGE_KEYS.ACTIVE_SESSION_ID] as string) ?? null;
}

export async function setActiveSessionId(id: string | null): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.ACTIVE_SESSION_ID]: id });
}

export async function getIsRecording(): Promise<boolean> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.IS_RECORDING);
  return (result[STORAGE_KEYS.IS_RECORDING] as boolean) ?? false;
}

export async function setIsRecording(value: boolean): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.IS_RECORDING]: value });
}

export async function getActiveTabId(): Promise<number | null> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_TAB_ID);
  return (result[STORAGE_KEYS.ACTIVE_TAB_ID] as number) ?? null;
}

export async function setActiveTabId(tabId: number | null): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.ACTIVE_TAB_ID]: tabId });
}

// ─────────────────────────────────────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<AutoDocSettings> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...((result[STORAGE_KEYS.SETTINGS] as Partial<AutoDocSettings>) ?? {}),
  };
}

export async function saveSettings(settings: Partial<AutoDocSettings>): Promise<void> {
  const current = await getSettings();
  await chrome.storage.local.set({
    [STORAGE_KEYS.SETTINGS]: { ...current, ...settings },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Expiry + Cleanup
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Remove sessions whose createdAt is older than EXPIRY_MS (24 hours).
 * Called on extension startup and install as a safety net.
 */
export async function pruneExpiredSessions(): Promise<void> {
  const now = Date.now();
  const sessions = await listSessions();
  const fresh = sessions.filter((s) => now - s.createdAt < EXPIRY_MS);

  if (fresh.length !== sessions.length) {
    console.log(
      `[AutoDoc Storage] Pruned ${sessions.length - fresh.length} expired session(s).`
    );
    await chrome.storage.local.set({ [STORAGE_KEYS.SESSIONS]: fresh });

    // If the active session was pruned, clear the active pointers
    const activeId = await getActiveSessionId();
    if (activeId && !fresh.find((s) => s.id === activeId)) {
      await setActiveSessionId(null);
      await setIsRecording(false);
      await setActiveTabId(null);
    }
  }
}

/**
 * Wipe every AutoDoc key from storage.
 * Called automatically after PDF export, screenshot download, or HTML export,
 * and also on browser startup / extension install to start fresh.
 */
export async function clearAllData(): Promise<void> {
  await chrome.storage.local.remove([
    STORAGE_KEYS.SESSIONS,
    STORAGE_KEYS.ACTIVE_SESSION_ID,
    STORAGE_KEYS.IS_RECORDING,
    STORAGE_KEYS.ACTIVE_TAB_ID,
    STORAGE_KEYS.SETTINGS,
  ]);
  console.log('[AutoDoc Storage] All session data cleared.');
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a UUID-like unique ID.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Format a timestamp as a human-readable date string.
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generate a default session name based on current date.
 */
export function generateSessionName(): string {
  const now = new Date();
  return `Session ${now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
