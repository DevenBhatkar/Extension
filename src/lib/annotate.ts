/**
 * AutoDoc - Canvas-Based Screenshot Annotation Engine
 *
 * Draws step badges, glow rings, and arrows onto captured screenshots
 * using an OffscreenCanvas (no DOM access required).
 */

import type { AnnotationOptions } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Main Annotation Function
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Annotate a raw screenshot data URL with a step badge, glow ring, and arrow.
 * Returns the annotated image as a PNG data URL.
 *
 * This function runs in the content script context where Image and Canvas are available.
 */
export async function annotateScreenshot(
  rawDataUrl: string,
  options: AnnotationOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw the original screenshot
        ctx.drawImage(img, 0, 0);

        const {
          clickX,
          clickY,
          stepNumber,
          ringColor = '#2563eb', // Blue-600
          badgeColor = '#1e293b', // Slate-800
          badgeTextColor = '#ffffff',
          ringRadius = 32,
        } = options;

        // Scale factor (screenshot may be larger than viewport due to device pixel ratio)
        const scaleX = img.naturalWidth / (options.viewportWidth ?? img.naturalWidth);
        const scaleY = img.naturalHeight / (options.viewportHeight ?? img.naturalHeight);

        const scaledX = clickX * scaleX;
        const scaledY = clickY * scaleY;

        // Draw semi-transparent overlay darkening for focus effect
        drawFocusOverlay(ctx, scaledX, scaledY, ringRadius * 2.5, img.naturalWidth, img.naturalHeight);

        // Draw outer glow ring (pulsing effect via multiple rings)
        drawGlowRing(ctx, scaledX, scaledY, ringRadius, ringColor);

        // Draw arrow pointing to click location
        const badgeY = scaledY - ringRadius - 40;
        const clampedBadgeY = Math.max(50, badgeY);
        const arrowTip = { x: scaledX, y: scaledY - ringRadius - 4 };
        const arrowBase = { x: scaledX, y: clampedBadgeY + 20 };

        if (arrowBase.y < arrowTip.y) {
          drawArrow(ctx, arrowBase, arrowTip, ringColor);
        }

        // Draw step number badge
        drawStepBadge(ctx, scaledX, clampedBadgeY, stepNumber, badgeColor, badgeTextColor);

        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error('Failed to load screenshot image'));
    img.src = rawDataUrl;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawing Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Draw a subtle radial vignette to draw attention to the click area.
 */
function drawFocusOverlay(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  width: number,
  height: number
): void {
  // Semi-transparent overlay over the whole canvas
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.fillRect(0, 0, width, height);

  // Clear a circle around the click point to "spotlight" it
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
  gradient.addColorStop(0, 'rgba(0,0,0,0.06)');
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.06)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
}

/**
 * Draw a multi-layer glowing ring at the click location.
 */
function drawGlowRing(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void {
  ctx.save();

  // Soft outer glow (thin and low opacity)
  ctx.beginPath();
  ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(color, 0.15);
  ctx.lineWidth = 6;
  ctx.stroke();

  // Thin crisp outline
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(color, 0.8);
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw an arrow from base point to tip point.
 */
function drawArrow(
  ctx: CanvasRenderingContext2D,
  from: { x: number; y: number },
  to: { x: number; y: number },
  color: string
): void {
  ctx.save();
  ctx.strokeStyle = hexToRgba(color, 0.8);
  ctx.fillStyle = hexToRgba(color, 0.8);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  // Arrow shaft
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();

  // Arrowhead
  const headLen = 12;
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(
    to.x - headLen * Math.cos(angle - Math.PI / 6),
    to.y - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    to.x - headLen * Math.cos(angle + Math.PI / 6),
    to.y - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Draw the step number badge (pill shape with number).
 */
function drawStepBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  stepNumber: number,
  bgColor: string,
  textColor: string
): void {
  ctx.save();

  const label = `STEP ${stepNumber}`;
  const fontSize = 12;
  const padding = { x: 10, y: 6 };
  const cornerRadius = 6;

  ctx.font = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  const textWidth = ctx.measureText(label).width;
  const badgeWidth = textWidth + padding.x * 2;
  const badgeHeight = fontSize + padding.y * 2;

  const bx = x - badgeWidth / 2;
  const by = y - badgeHeight / 2;

  // Very subtle drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  // Badge background (rounded pill)
  roundRect(ctx, bx, by, badgeWidth, badgeHeight, cornerRadius);
  ctx.fillStyle = badgeColor;
  ctx.fill();

  // Subtle border
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Badge text
  ctx.fillStyle = badgeTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.shadowBlur = 0;
  // Adjust vertical alignment slightly for standard sans-serif
  ctx.fillText(label, x, y + 1);

  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Draw a rounded rectangle path.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Convert hex color to rgba string.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Duplicate Detection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compare two raw screenshot data URLs for similarity.
 * Uses a downscaled pixel-sampling approach for performance.
 * Returns a similarity score between 0 (different) and 1 (identical).
 */
export async function compareScreenshots(
  dataUrl1: string,
  dataUrl2: string
): Promise<number> {
  const [pixels1, pixels2] = await Promise.all([
    samplePixels(dataUrl1),
    samplePixels(dataUrl2),
  ]);

  if (pixels1.length !== pixels2.length) return 0;

  let matchCount = 0;
  const totalSamples = pixels1.length;
  const tolerance = 15; // per-channel tolerance

  for (let i = 0; i < pixels1.length; i++) {
    const p1 = pixels1[i]!;
    const p2 = pixels2[i]!;
    if (
      Math.abs(p1.r - p2.r) <= tolerance &&
      Math.abs(p1.g - p2.g) <= tolerance &&
      Math.abs(p1.b - p2.b) <= tolerance
    ) {
      matchCount++;
    }
  }

  return matchCount / totalSamples;
}

interface Pixel {
  r: number;
  g: number;
  b: number;
}

/**
 * Downsample an image to a fixed grid and return pixel values.
 */
async function samplePixels(dataUrl: string): Promise<Pixel[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const sampleSize = 32; // 32x32 grid = 1024 samples
      const canvas = document.createElement('canvas');
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const pixels: Pixel[] = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        pixels.push({
          r: imageData.data[i]!,
          g: imageData.data[i + 1]!,
          b: imageData.data[i + 2]!,
        });
      }
      resolve(pixels);
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = dataUrl;
  });
}
