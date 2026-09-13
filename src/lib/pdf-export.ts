/**
 * AutoDoc - PDF Export Module
 *
 * Generates a professional PDF from a recorded session using jsPDF.
 * Layout:
 *   - Cover page with session name and date
 *   - One step per page: step number header, full-width screenshot, description
 *   - Footer with page numbers
 */

import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import type { Session, Step, SessionMetadata } from './types';
import { formatDate } from './storage';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_W = 210;  // A4 width in mm
const PAGE_H = 297;  // A4 height in mm
const MARGIN = 16;   // Page margin in mm
const CONTENT_W = PAGE_W - MARGIN * 2;

// Brand colors
const BRAND_PURPLE = [37, 99, 235] as const;
const BRAND_PURPLE_LIGHT = [147, 197, 253] as const;
const BRAND_NAVY = [20, 33, 61] as const;
const TEXT_DARK = [23, 32, 51] as const;
const TEXT_GREY = [100, 116, 139] as const;
const BG_LIGHT = [246, 248, 252] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Main Export Function
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate and download a PDF for the given session.
 */
export async function exportSessionAsPdf(session: Session): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Page 1: Cover
  drawCoverPage(doc, session);

  // Subsequent pages: one per step
  for (let i = 0; i < session.steps.length; i++) {
    doc.addPage();
    await drawStepPage(doc, session.steps[i]!, i + 1, session.steps.length);
  }

  // Add page numbers to all pages except cover
  addPageNumbers(doc, session.steps.length);

  // Download
  const filename = buildExportFilename(session) + '.pdf';
  doc.save(filename);
}

// ─────────────────────────────────────────────────────────────────────────────
// Cover Page
// ─────────────────────────────────────────────────────────────────────────────

function drawCoverPage(doc: jsPDF, session: Session): void {
  // Background gradient effect (using filled rects)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  // Top accent bar
  doc.setFillColor(...BRAND_NAVY);
  doc.rect(0, 0, PAGE_W, 104, 'F');
  doc.setFillColor(...BRAND_PURPLE);
  doc.rect(0, 0, 7, 104, 'F');

  // Decorative circle (top-right)
  doc.setFillColor(34, 52, 88);
  doc.circle(PAGE_W + 5, -8, 48, 'F');

  // Decorative circle (bottom-left)
  doc.setFillColor(239, 246, 255);
  doc.circle(-10, PAGE_H + 12, 38, 'F');

  // Logo icon area
  const iconX = MARGIN;
  const iconY = 18;
  doc.setFillColor(...BRAND_PURPLE);
  roundedRectPDF(doc, iconX, iconY, 18, 18, 4);
  doc.setFillColor(255, 255, 255);
  doc.circle(iconX + 9, iconY + 9, 3.8, 'F'); // Camera lens

  // App title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('AUTODOC  /  WORKFLOW CAPTURE', iconX + 24, iconY + 11);

  // Document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_PURPLE_LIGHT);
  doc.text('PROCESS DOCUMENTATION', MARGIN, 58);

  // Divider line
  doc.setDrawColor(68, 87, 122);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, 96, PAGE_W - MARGIN, 96);

  // Session name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(27);
  doc.setTextColor(255, 255, 255);
  const sessionLabel = wrapText(doc, session.name, CONTENT_W - 8, 27);
  doc.text(sessionLabel, MARGIN, 74);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_GREY);
  doc.text('DOCUMENT OVERVIEW', MARGIN, 118);

  // ── Metadata block (if available) ──────────────────────
  let metaY = 126;
  if (session.metadata) {
    const m = session.metadata;
    metaY = 126;

    doc.setFillColor(255, 255, 255);
    roundedRectPDF(doc, MARGIN, metaY, CONTENT_W, 38, 4);
    doc.setDrawColor(218, 225, 235);
    doc.setLineWidth(0.3);
    roundedRectStrokePDF(doc, MARGIN, metaY, CONTENT_W, 38, 4);

    // Left accent bar
    doc.setFillColor(...BRAND_PURPLE_LIGHT);
    doc.rect(MARGIN, metaY, 2, 38, 'F');

    const labelX = MARGIN + 8;
    const valX = MARGIN + 48;
    let rowY = metaY + 11;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text('Feature:', labelX, rowY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(m.featureName, valX, rowY);

    rowY += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text('Environment:', labelX, rowY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(m.environmentType, valX, rowY);

    rowY += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text('Generated On:', labelX, rowY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(m.recordingDate, valX, rowY);

    metaY += 48;
  }

  // Stats box
  const statsY = metaY + 2;
  doc.setFillColor(255, 255, 255);
  roundedRectPDF(doc, MARGIN, statsY, CONTENT_W, 36, 4);
  doc.setDrawColor(218, 225, 235);
  doc.setLineWidth(0.3);
  roundedRectStrokePDF(doc, MARGIN, statsY, CONTENT_W, 36, 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...BRAND_PURPLE);
  doc.text(String(session.steps.length), PAGE_W / 2 - 20, statsY + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_GREY);
  doc.text('Steps', PAGE_W / 2 - 20, statsY + 26, { align: 'center' });

  // Divider in stats
  doc.setDrawColor(218, 225, 235);
  doc.line(PAGE_W / 2, statsY + 5, PAGE_W / 2, statsY + 31);

  const dateStr = formatDate(session.createdAt);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_DARK);
  const shortDate = new Date(session.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  doc.text(shortDate, PAGE_W / 2 + 20, statsY + 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_GREY);
  doc.text('Created', PAGE_W / 2 + 20, statsY + 26, { align: 'center' });

  // Generation date footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_GREY);
  doc.text(`Generated: ${dateStr}`, PAGE_W / 2, PAGE_H - 20, { align: 'center' });

  // Bottom accent bar
  doc.setFillColor(...BRAND_PURPLE);
  doc.rect(0, PAGE_H - 4, PAGE_W, 4, 'F');
}

// ─────────────────────────────────────────────────────────────────────────────
// Step Page
// ─────────────────────────────────────────────────────────────────────────────

async function drawStepPage(
  doc: jsPDF,
  step: Step,
  pageIndex: number,
  totalSteps: number
): Promise<void> {
  // Background
  doc.setFillColor(...BG_LIGHT);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  // Running header
  doc.setFillColor(...BRAND_NAVY);
  doc.rect(0, 0, PAGE_W, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('AUTODOC', MARGIN, 9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(174, 191, 218);
  doc.text(`PROCESS  /  ${pageIndex} OF ${totalSteps}`, PAGE_W - MARGIN, 9, { align: 'right' });

  let y = 24;

  // Step header row
  // Step badge
  const badgeW = 28;
  const badgeH = 9;
  doc.setFillColor(...BRAND_NAVY);
  roundedRectPDF(doc, MARGIN, y, badgeW, badgeH, 2);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`STEP ${step.stepNumber}`, MARGIN + badgeW / 2, y + 5.8, { align: 'center' });

  // Step title (auto or element info)
  const stepTitle = step.description || step.elementText
    ? (step.description?.split('\n')[0] ?? `Click on ${step.elementTag ?? 'element'}`)
    : `Step ${step.stepNumber}`;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...TEXT_DARK);
  const displayTitle = stepTitle.length > 72 ? `${stepTitle.slice(0, 69)}...` : stepTitle;
  doc.text(displayTitle, MARGIN + badgeW + 5, y + 6.5);

  y += badgeH + 5;

  // URL bar (subtle)
  if (step.pageUrl) {
    doc.setFillColor(235, 240, 247);
    roundedRectPDF(doc, MARGIN, y, CONTENT_W, 7, 2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXT_GREY);
    const shortUrl = step.pageUrl.length > 80 ? step.pageUrl.slice(0, 77) + '...' : step.pageUrl;
    doc.text(shortUrl, MARGIN + 3, y + 4.5);
    y += 10;
  }

  // Screenshot image
  const screenshotDataUrl = step.screenshotDataUrl || step.rawScreenshotDataUrl;
  if (screenshotDataUrl) {
    try {
      const imgInfo = await getImageDimensions(screenshotDataUrl);
      const maxImgH = 158; // Max height for screenshot in mm
      const aspectRatio = imgInfo.width / imgInfo.height;
      const imgW = CONTENT_W;
      const imgH = Math.min(imgW / aspectRatio, maxImgH);

      // Image border/shadow effect
      doc.setFillColor(205, 214, 226);
      roundedRectPDF(doc, MARGIN + 1.5, y + 1.5, CONTENT_W, imgH, 2); // Shadow

      doc.addImage(
        screenshotDataUrl,
        'PNG',
        MARGIN,
        y,
        CONTENT_W,
        imgH,
        undefined,
        'FAST'
      );

      // Image border
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.4);
      doc.rect(MARGIN, y, CONTENT_W, imgH);

      y += imgH + 6;
    } catch (err) {
      console.warn('[AutoDoc PDF] Failed to add image for step', step.stepNumber, err);
      y += 4;
    }
  }

  // Description section
  if (step.description || step.isNote) {
    // Description header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text(step.isNote ? 'NOTE' : 'INSTRUCTIONS', MARGIN, y + 3);
    y += 6;

    // Description box
    const descText = step.isNote
      ? (step.noteContent ?? '')
      : (step.description ?? '');

    if (descText) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...TEXT_DARK);

      const lines = doc.splitTextToSize(descText, CONTENT_W - 8);
      const textH = lines.length * 5 + 6;

      doc.setFillColor(255, 255, 255);
      roundedRectPDF(doc, MARGIN, y, CONTENT_W, textH, 2);
      doc.setDrawColor(218, 225, 235);
      doc.setLineWidth(0.3);
      roundedRectStrokePDF(doc, MARGIN, y, CONTENT_W, textH, 3);

      // Left accent bar
      doc.setFillColor(...BRAND_PURPLE);
      doc.rect(MARGIN, y, 2, textH, 'F');

      doc.text(lines, MARGIN + 5, y + 5);
      y += textH + 5;
    }
  }

  // Metadata footer (timestamp)
  const timestamp = new Date(step.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_GREY);
  doc.text(
    `Captured ${timestamp}  |  Step ${pageIndex} of ${totalSteps}`,
    PAGE_W - MARGIN,
    PAGE_H - 10,
    { align: 'right' }
  );

  // Bottom accent bar
  doc.setFillColor(...BRAND_NAVY);
  doc.rect(0, PAGE_H - 3, PAGE_W, 3, 'F');
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Numbers
// ─────────────────────────────────────────────────────────────────────────────

function addPageNumbers(doc: jsPDF, stepCount: number): void {
  const totalPages = stepCount + 1; // +1 for cover
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text(`Page ${i} of ${totalPages}`, MARGIN, PAGE_H - 10);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML Export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Export session as a self-contained HTML file (no external dependencies).
 */
export function exportSessionAsHtml(session: Session): void {
  const stepsHtml = session.steps
    .map(
      (step) => `
    <div class="step">
      <div class="step-header">
        <span class="step-badge">STEP ${step.stepNumber}</span>
        <span class="step-title">${escapeHtml(step.description?.split('\n')[0] ?? `Step ${step.stepNumber}`)}</span>
      </div>
      ${step.pageUrl ? `<div class="step-url">🔗 ${escapeHtml(step.pageUrl)}</div>` : ''}
      <img class="step-screenshot" src="${step.screenshotDataUrl}" alt="Step ${step.stepNumber} screenshot" />
      ${step.description ? `<div class="step-description">${escapeHtml(step.description)}</div>` : ''}
      <div class="step-meta">Captured at ${new Date(step.timestamp).toLocaleString()}</div>
    </div>
  `
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(session.name)} — AutoDoc</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f7ff; color: #0f0a28; }
  .cover { background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%); color: white; padding: 60px 40px; text-align: center; }
  .cover-title { font-size: 36px; font-weight: 800; margin-bottom: 12px; }
  .cover-subtitle { font-size: 20px; opacity: 0.8; margin-bottom: 8px; }
  .cover-meta { font-size: 13px; opacity: 0.6; margin-top: 20px; }
  .cover-metadata { display: inline-flex; flex-direction: column; gap: 6px; margin-top: 16px; background: rgba(255,255,255,0.1); border-radius: 10px; padding: 14px 24px; text-align: left; font-size: 13px; }
  .cover-metadata-row { display: flex; gap: 8px; }
  .cover-metadata-label { opacity: 0.6; font-weight: 600; min-width: 110px; }
  .cover-metadata-value { font-weight: 500; }
  .steps { max-width: 900px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 40px; }
  .step { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.1); }
  .step-header { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid #f0eeff; }
  .step-badge { background: #7c3aed; color: white; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
  .step-title { font-size: 15px; font-weight: 600; color: #1e1b4b; }
  .step-url { padding: 6px 20px; font-size: 11px; color: #6b7280; background: #f8f7ff; word-break: break-all; }
  .step-screenshot { width: 100%; display: block; }
  .step-description { padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #374151; border-left: 3px solid #7c3aed; margin: 12px 20px; border-radius: 0 8px 8px 0; background: #f9f7ff; white-space: pre-wrap; }
  .step-meta { padding: 8px 20px 16px; font-size: 11px; color: #9ca3af; }
  footer { text-align: center; padding: 24px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
</style>
</head>
<body>
<div class="cover">
  <div class="cover-title">Process Documentation</div>
  <div class="cover-subtitle">${escapeHtml(session.name)}</div>
  <div class="cover-meta">${session.steps.length} steps · Generated ${formatDate(session.createdAt)}</div>
  ${session.metadata ? `<div class="cover-metadata">
    <div class="cover-metadata-row"><span class="cover-metadata-label">Feature Name:</span><span class="cover-metadata-value">${escapeHtml(session.metadata.featureName)}</span></div>
    <div class="cover-metadata-row"><span class="cover-metadata-label">Environment:</span><span class="cover-metadata-value">${escapeHtml(session.metadata.environmentType)}</span></div>
    <div class="cover-metadata-row"><span class="cover-metadata-label">Generated On:</span><span class="cover-metadata-value">${escapeHtml(session.metadata.recordingDate)}</span></div>
  </div>` : ''}
</div>
<div class="steps">
${stepsHtml}
</div>
<footer>Generated by AutoDoc &mdash; Click-to-Documentation Generator</footer>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = buildExportFilename(session) + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ─────────────────────────────────────────────────────────────────────────────
// Download All Screenshots (ZIP)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Package every screenshot in the session into a single ZIP file and
 * download it as "Report-Screenshots.zip".
 *
 * - Iterates ALL steps in the session in order — never depends on the
 *   currently selected/previewed step in the editor.
 * - Notes (isNote === true) are skipped since they have no screenshot.
 * - Files are named Step-001.png, Step-002.png, … (zero-padded to 3 digits).
 * - Uses the annotated screenshot (screenshotDataUrl) when available;
 *   falls back to the raw capture (rawScreenshotDataUrl).
 */
export async function downloadAllScreenshots(session: Session): Promise<void> {
  // Collect every step that has a screenshot, in their natural order
  const screenshotSteps = session.steps.filter(
    (s) => !s.isNote && (s.screenshotDataUrl || s.rawScreenshotDataUrl)
  );

  if (screenshotSteps.length === 0) {
    throw new Error('No screenshots to download.');
  }

  const zip = new JSZip();

  // Helper: convert a base64 data URL to a Uint8Array
  function dataUrlToUint8Array(dataUrl: string): Uint8Array {
    const base64 = dataUrl.split(',')[1];
    if (!base64) throw new Error('Invalid data URL');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  // Add each screenshot to the ZIP in step order
  const namePrefix = session.metadata ? buildMetadataPrefix(session.metadata) : null;
  for (const step of screenshotSteps) {
    const dataUrl = (step.screenshotDataUrl || step.rawScreenshotDataUrl) as string;
    const paddedNumber = String(step.stepNumber).padStart(3, '0');
    const filename = namePrefix
      ? `${namePrefix}_Step-${paddedNumber}.png`
      : `Step-${paddedNumber}.png`;
    zip.file(filename, dataUrlToUint8Array(dataUrl));
  }

  // Generate the ZIP blob and trigger a single download
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = buildExportFilename(session) + '.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9\-_\s]/gi, '').trim().replace(/\s+/g, '-') || 'autodoc-export';
}

/**
 * Build a file-name-safe prefix from session metadata.
 * e.g. "Certificate of Editing" + "Pre Deployment" → "Certificate-of-Editing_Pre-Deployment"
 */
function buildMetadataPrefix(metadata: SessionMetadata): string {
  const feature = metadata.featureName.trim().replace(/\s+/g, '-');
  const env = metadata.environmentType.replace(/\s+/g, '-');
  return sanitizeFilename(`${feature}_${env}`);
}

/**
 * Build the full export filename (without extension).
 * Uses metadata when available, otherwise falls back to session name.
 * e.g. "Certificate-of-Editing_Pre-Deployment_2026-06-07"
 */
function buildExportFilename(session: Session): string {
  if (session.metadata) {
    return `${buildMetadataPrefix(session.metadata)}_${session.metadata.recordingDate}`;
  }
  return sanitizeFilename(session.name);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapText(doc: jsPDF, text: string, maxWidth: number, fontSize: number): string {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  return (lines as string[]).slice(0, 2).join('\n');
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/** Draw a filled rounded rectangle in jsPDF */
function roundedRectPDF(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  doc.roundedRect(x, y, w, h, r, r, 'F');
}

/** Draw a stroked rounded rectangle in jsPDF */
function roundedRectStrokePDF(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  doc.roundedRect(x, y, w, h, r, r, 'S');
}
