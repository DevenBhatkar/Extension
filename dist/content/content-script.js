async function annotateScreenshot(rawDataUrl, options) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const {
          clickX,
          clickY,
          stepNumber,
          ringColor = "#2563eb",
          // Blue-600
          badgeColor: badgeColor2 = "#1e293b",
          // Slate-800
          badgeTextColor: badgeTextColor2 = "#ffffff",
          ringRadius = 32
        } = options;
        const scaleX = img.naturalWidth / (options.viewportWidth ?? img.naturalWidth);
        const scaleY = img.naturalHeight / (options.viewportHeight ?? img.naturalHeight);
        const scaledX = clickX * scaleX;
        const scaledY = clickY * scaleY;
        drawFocusOverlay(ctx, scaledX, scaledY, ringRadius * 2.5, img.naturalWidth, img.naturalHeight);
        drawGlowRing(ctx, scaledX, scaledY, ringRadius, ringColor);
        const badgeY = scaledY - ringRadius - 40;
        const clampedBadgeY = Math.max(50, badgeY);
        const arrowTip = { x: scaledX, y: scaledY - ringRadius - 4 };
        const arrowBase = { x: scaledX, y: clampedBadgeY + 20 };
        if (arrowBase.y < arrowTip.y) {
          drawArrow(ctx, arrowBase, arrowTip, ringColor);
        }
        drawStepBadge(ctx, scaledX, clampedBadgeY, stepNumber, badgeColor2, badgeTextColor2);
        resolve(canvas.toDataURL("image/png"));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("Failed to load screenshot image"));
    img.src = rawDataUrl;
  });
}
function drawFocusOverlay(ctx, x, y, radius, width, height) {
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
  gradient.addColorStop(0, "rgba(0,0,0,0.06)");
  gradient.addColorStop(0.6, "rgba(0,0,0,0.06)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}
function drawGlowRing(ctx, x, y, radius, color) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(color, 0.15);
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(color, 0.8);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}
function drawArrow(ctx, from, to, color) {
  ctx.save();
  ctx.strokeStyle = hexToRgba(color, 0.8);
  ctx.fillStyle = hexToRgba(color, 0.8);
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
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
function drawStepBadge(ctx, x, y, stepNumber, bgColor, textColor) {
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
  ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  roundRect(ctx, bx, by, badgeWidth, badgeHeight, cornerRadius);
  ctx.fillStyle = badgeColor;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = badgeTextColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.shadowBlur = 0;
  ctx.fillText(label, x, y + 1);
  ctx.restore();
}
function roundRect(ctx, x, y, width, height, radius) {
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
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
async function compareScreenshots(dataUrl1, dataUrl2) {
  const [pixels1, pixels2] = await Promise.all([
    samplePixels(dataUrl1),
    samplePixels(dataUrl2)
  ]);
  if (pixels1.length !== pixels2.length) return 0;
  let matchCount = 0;
  const totalSamples = pixels1.length;
  const tolerance = 15;
  for (let i = 0; i < pixels1.length; i++) {
    const p1 = pixels1[i];
    const p2 = pixels2[i];
    if (Math.abs(p1.r - p2.r) <= tolerance && Math.abs(p1.g - p2.g) <= tolerance && Math.abs(p1.b - p2.b) <= tolerance) {
      matchCount++;
    }
  }
  return matchCount / totalSamples;
}
async function samplePixels(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const sampleSize = 32;
      const canvas = document.createElement("canvas");
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const pixels = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        pixels.push({
          r: imageData.data[i],
          g: imageData.data[i + 1],
          b: imageData.data[i + 2]
        });
      }
      resolve(pixels);
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = dataUrl;
  });
}
let isRecording = false;
let isCapturing = false;
document.addEventListener(
  "click",
  async (event) => {
    if (!isRecording || isCapturing) return;
    const target = event.target;
    if (target.closest?.("[data-autodoc-overlay]")) return;
    isCapturing = true;
    const clickX = event.clientX;
    const clickY = event.clientY;
    const elementTag = target.tagName ?? "";
    const rawText = (target.innerText || target.value || target.getAttribute("aria-label") || target.getAttribute("title") || target.getAttribute("placeholder") || "").trim().slice(0, 100);
    showClickFlash(clickX, clickY);
    try {
      await chrome.runtime.sendMessage({
        type: "CAPTURE_STEP",
        clickX,
        clickY,
        clickXPercent: clickX / window.innerWidth,
        clickYPercent: clickY / window.innerHeight,
        pageUrl: window.location.href,
        pageTitle: document.title,
        elementTag,
        elementText: rawText,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      });
    } catch (err) {
      console.warn("[AutoDoc] Failed to send CAPTURE_STEP:", err);
    } finally {
      setTimeout(() => {
        isCapturing = false;
      }, 600);
    }
  },
  true
  // Use capture phase so we get clicks before the page's own handlers
);
chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    handleIncomingMessage(message).then(sendResponse).catch((err) => {
      console.error("[AutoDoc Content] Handler error:", err);
      sendResponse({ error: String(err) });
    });
    return true;
  }
);
async function handleIncomingMessage(message) {
  switch (message.type) {
    case "STATE_UPDATE": {
      const m = message;
      isRecording = m.isRecording;
      updateRecordingIndicator(m.isRecording, m.stepCount);
      return { ok: true };
    }
    case "ANNOTATE_SCREENSHOT": {
      const m = message;
      try {
        const annotatedDataUrl = await annotateScreenshot(m.rawDataUrl, {
          clickX: m.clickX,
          clickY: m.clickY,
          stepNumber: m.stepNumber,
          viewportWidth: m.viewportWidth,
          viewportHeight: m.viewportHeight
        });
        return { annotatedDataUrl };
      } catch (err) {
        console.error("[AutoDoc Content] Annotation failed:", err);
        return { annotatedDataUrl: m.rawDataUrl };
      }
    }
    case "DUPLICATE_CHECK_RESULT": {
      const m = message;
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
      return { error: "Unknown message" };
  }
}
(async function init() {
  try {
    const state = await chrome.runtime.sendMessage({ type: "GET_STATE" });
    if (state?.isRecording) {
      isRecording = true;
      updateRecordingIndicator(true, state.stepCount);
    }
  } catch {
  }
})();
function showClickFlash(x, y) {
  const flash = document.createElement("div");
  flash.setAttribute("data-autodoc-overlay", "true");
  flash.style.cssText = `
    position: fixed;
    left: ${x - 24}px;
    top: ${y - 24}px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid rgba(37, 99, 235, 0.8);
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
    animation: autodoc-pulse 0.6s ease-out forwards;
    pointer-events: none;
    z-index: 2147483647;
  `;
  document.body.appendChild(flash);
  const badge = document.createElement("div");
  badge.setAttribute("data-autodoc-overlay", "true");
  badge.style.cssText = `
    position: fixed;
    left: ${x + 20}px;
    top: ${y - 20}px;
    background: #ffffff;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 11px;
    font-family: -apple-system, sans-serif;
    font-weight: 500;
    pointer-events: none;
    z-index: 2147483647;
    opacity: 1;
    transition: opacity 0.4s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  `;
  badge.innerHTML = `<span style="color:#2563eb;font-weight:bold;">✓</span> Captured`;
  document.body.appendChild(badge);
  setTimeout(() => {
    flash.remove();
    badge.style.opacity = "0";
    setTimeout(() => badge.remove(), 400);
  }, 600);
}
let indicator = null;
function updateRecordingIndicator(recording, stepCount) {
  if (recording) {
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.setAttribute("data-autodoc-overlay", "true");
      indicator.id = "autodoc-recording-indicator";
      document.body.appendChild(indicator);
    }
    indicator.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="
          width:6px;height:6px;border-radius:50%;
          background:#ef4444;
          animation:autodoc-blink 1.5s infinite;
          display:inline-block;
        "></span>
        <span>
          ${stepCount} step${stepCount !== 1 ? "s" : ""}
        </span>
      </div>
    `;
  } else {
    indicator?.remove();
    indicator = null;
  }
}
async function showDuplicatePrompt(similarity) {
  return new Promise((resolve) => {
    const dialog = document.createElement("div");
    dialog.setAttribute("data-autodoc-overlay", "true");
    dialog.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      background: #ffffff;
      color: #0f172a;
      border-radius: 8px;
      padding: 16px;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 280px;
    `;
    dialog.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <div style="font-size:16px;">🔍</div>
        <div style="font-weight:600;font-size:14px;color:#0f172a;">Similar Screenshot</div>
      </div>
      <div style="font-size:12px;color:#475569;margin-bottom:16px;line-height:1.4;">
        This step looks ${Math.round(similarity * 100)}% similar to the previous one. Skip the duplicate?
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button id="autodoc-dup-keep" style="
          background:#ffffff;color:#475569;border:1px solid #cbd5e1;
          border-radius:6px;padding:6px 12px;
          font-size:12px;font-weight:500;cursor:pointer;
        ">Keep</button>
        <button id="autodoc-dup-skip" style="
          background:#2563eb;color:white;border:none;
          border-radius:6px;padding:6px 12px;
          font-size:12px;font-weight:500;cursor:pointer;
        ">Skip</button>
      </div>
    `;
    document.body.appendChild(dialog);
    dialog.querySelector("#autodoc-dup-skip").addEventListener("click", () => {
      dialog.remove();
      resolve(true);
    });
    dialog.querySelector("#autodoc-dup-keep").addEventListener("click", () => {
      dialog.remove();
      resolve(false);
    });
    setTimeout(() => {
      if (document.body.contains(dialog)) {
        dialog.remove();
        resolve(false);
      }
    }, 8e3);
  });
}
