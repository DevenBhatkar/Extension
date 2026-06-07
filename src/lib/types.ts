/**
 * AutoDoc - Shared TypeScript Type Definitions
 * All core data structures used across the extension
 */

// ─────────────────────────────────────────────────────────────────────────────
// Core Step / Session Types
// ─────────────────────────────────────────────────────────────────────────────

/** Represents a single captured interaction step */
export interface Step {
  /** Unique identifier (UUID-like) */
  id: string;
  /** 1-based sequential step number */
  stepNumber: number;
  /** Unix timestamp in milliseconds */
  timestamp: number;
  /** Annotated screenshot (with badge, ring, arrow) as data URL */
  screenshotDataUrl: string;
  /** Original raw screenshot before annotation */
  rawScreenshotDataUrl: string;
  /** Click X position relative to viewport (0–windowWidth) */
  clickX: number;
  /** Click Y position relative to viewport (0–windowHeight) */
  clickY: number;
  /** Click X position as percentage (for responsive re-annotation) */
  clickXPercent: number;
  /** Click Y position as percentage */
  clickYPercent: number;
  /** URL of the page when the step was captured */
  pageUrl: string;
  /** Title of the page when the step was captured */
  pageTitle: string;
  /** User-written description for this step */
  description: string;
  /** HTML tag of the clicked element, e.g. 'BUTTON', 'A', 'INPUT' */
  elementTag?: string;
  /** Inner text or value of the clicked element (trimmed, max 100 chars) */
  elementText?: string;
  /** Whether this is a pure text note (no screenshot) */
  isNote?: boolean;
  /** The note content if isNote is true */
  noteContent?: string;
  /** Viewport width at time of capture */
  viewportWidth?: number;
  /** Viewport height at time of capture */
  viewportHeight?: number;
}

/** Session-level metadata collected before recording starts */
export interface SessionMetadata {
  /** The feature being documented, e.g. "Certificate of Editing" */
  featureName: string;
  /** Deployment stage */
  environmentType: 'Pre Deployment' | 'Post Deployment';
  /** ISO date string (YYYY-MM-DD) when the recording was started */
  recordingDate: string;
}

/** A recording session containing multiple steps */
export interface Session {
  /** Unique session identifier */
  id: string;
  /** User-visible name for this session */
  name: string;
  /** Unix timestamp when session was created */
  createdAt: number;
  /** Unix timestamp when session was last modified */
  updatedAt: number;
  /** Ordered list of steps */
  steps: Step[];
  /** Whether recording is currently active */
  isRecording: boolean;
  /** The tab ID this session is recording on */
  activeTabId?: number;
  /** IDs of all tabs belonging to this recording flow */
  trackedTabIds?: number[];
  /** Metadata collected from the pre-recording setup dialog */
  metadata?: SessionMetadata;
}

// ─────────────────────────────────────────────────────────────────────────────
// Message Types (Content Script ↔ Service Worker)
// ─────────────────────────────────────────────────────────────────────────────

export type MessageType =
  | 'START_RECORDING'
  | 'STOP_RECORDING'
  | 'CAPTURE_STEP'
  | 'STEP_CAPTURED'
  | 'GET_STATE'
  | 'STATE_UPDATE'
  | 'EXPORT_PDF'
  | 'DUPLICATE_CHECK_RESULT'
  | 'ANNOTATE_SCREENSHOT'
  | 'CLEAR_SESSION_DATA';

export interface BaseMessage {
  type: MessageType;
}

export interface StartRecordingMessage extends BaseMessage {
  type: 'START_RECORDING';
  sessionName?: string;
  tabId?: number;
  /** Feature name from the setup dialog */
  featureName?: string;
  /** Environment type from the setup dialog */
  environmentType?: 'Pre Deployment' | 'Post Deployment';
}

export interface StopRecordingMessage extends BaseMessage {
  type: 'STOP_RECORDING';
}

export interface CaptureStepMessage extends BaseMessage {
  type: 'CAPTURE_STEP';
  clickX: number;
  clickY: number;
  clickXPercent: number;
  clickYPercent: number;
  pageUrl: string;
  pageTitle: string;
  elementTag?: string;
  elementText?: string;
  viewportWidth: number;
  viewportHeight: number;
}

export interface StepCapturedMessage extends BaseMessage {
  type: 'STEP_CAPTURED';
  step: Step;
}

export interface GetStateMessage extends BaseMessage {
  type: 'GET_STATE';
}

export interface StateUpdateMessage extends BaseMessage {
  type: 'STATE_UPDATE';
  isRecording: boolean;
  stepCount: number;
  sessionId: string | null;
}

export interface ExportPdfMessage extends BaseMessage {
  type: 'EXPORT_PDF';
  sessionId: string;
}

export interface AnnotateScreenshotMessage extends BaseMessage {
  type: 'ANNOTATE_SCREENSHOT';
  rawDataUrl: string;
  clickX: number;
  clickY: number;
  stepNumber: number;
  viewportWidth: number;
  viewportHeight: number;
}

export interface ClearSessionDataMessage extends BaseMessage {
  type: 'CLEAR_SESSION_DATA';
}

export type ExtensionMessage =
  | StartRecordingMessage
  | StopRecordingMessage
  | CaptureStepMessage
  | StepCapturedMessage
  | GetStateMessage
  | StateUpdateMessage
  | ExportPdfMessage
  | AnnotateScreenshotMessage
  | ClearSessionDataMessage;

// ─────────────────────────────────────────────────────────────────────────────
// Annotation Options
// ─────────────────────────────────────────────────────────────────────────────

export interface AnnotationOptions {
  clickX: number;
  clickY: number;
  stepNumber: number;
  /** Ring color (default: '#7c3aed') */
  ringColor?: string;
  /** Badge background color (default: '#7c3aed') */
  badgeColor?: string;
  /** Badge text color (default: '#ffffff') */
  badgeTextColor?: string;
  /** Ring radius in pixels (default: 32) */
  ringRadius?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Storage Keys
// ─────────────────────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  SESSIONS: 'autodoc_sessions',
  ACTIVE_SESSION_ID: 'autodoc_active_session_id',
  IS_RECORDING: 'autodoc_is_recording',
  ACTIVE_TAB_ID: 'autodoc_active_tab_id',
  SETTINGS: 'autodoc_settings',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────────────────────────────────────

export interface AutoDocSettings {
  /** Show duplicate detection prompt (default: true) */
  detectDuplicates: boolean;
  /** Similarity threshold for duplicate detection 0–1 (default: 0.92) */
  duplicateThreshold: number;
  /** Auto-generate description from element text (default: true) */
  autoDescription: boolean;
  /** Annotation ring color */
  annotationColor: string;
}

export const DEFAULT_SETTINGS: AutoDocSettings = {
  detectDuplicates: true,
  duplicateThreshold: 0.92,
  autoDescription: true,
  annotationColor: '#7c3aed',
};
