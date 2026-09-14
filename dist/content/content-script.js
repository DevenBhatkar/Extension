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
          badgeColor = "#1e293b",
          // Slate-800
          badgeTextColor = "#ffffff",
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
        drawStepBadge(ctx, scaledX, clampedBadgeY, stepNumber, badgeColor, badgeTextColor);
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
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = textColor;
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
let isRecording = false;
let isPaused = false;
let isCapturing = false;
let captureKeyHeld = false;
let captureArmed = false;
let captureDeadline = 0;
let armTimer;
let pointerCaptureStarted = false;
function clearCaptureGesture() {
  captureKeyHeld = false;
  captureArmed = false;
  captureDeadline = 0;
  clearTimeout(armTimer);
}
let stepCount = 0;
let host = null;
let status = null;
let captureButton = null;
let pauseButton = null;
let undoButton = null;
let restoreTimer;
let finishReceived = false;
let lastStatus = "";
let lastStatusError = false;
function hasModifiers(event) {
  return event.ctrlKey || event.metaKey || event.shiftKey;
}
document.addEventListener("keydown", (event) => {
  if (hasModifiers(event) || event.code !== "AltLeft" && event.code !== "AltRight") clearCaptureGesture();
  if (!isRecording || isPaused || event.code !== "AltLeft" && event.code !== "AltRight" || event.repeat || event.isComposing || hasModifiers(event) || !event.isTrusted) return;
  captureKeyHeld = true;
  captureArmed = true;
  captureDeadline = performance.now() + 5e3;
  clearTimeout(armTimer);
  armTimer = setTimeout(() => {
    clearCaptureGesture();
    setStatus("Capture shortcut expired. Release Alt and try again.");
  }, 5e3);
  setStatus("Hold Alt and left-click or tap the touchpad once within 5 seconds. Escape cancels.");
}, true);
document.addEventListener("keyup", (event) => {
  if (event.code !== "AltLeft" && event.code !== "AltRight") return;
  clearCaptureGesture();
}, true);
window.addEventListener("blur", clearCaptureGesture);
document.addEventListener("visibilitychange", clearCaptureGesture);
function captureGesture(event) {
  if (!isRecording || isPaused || !captureKeyHeld || !captureArmed || performance.now() >= captureDeadline || !event.isTrusted || event.button !== 0 || !event.altKey || hasModifiers(event)) return false;
  if (event.composedPath().includes(host)) return false;
  const target = event.composedPath().find((node) => node instanceof HTMLElement);
  if (!target) return false;
  if (isCapturing) {
    setStatus("Still saving. Wait for Saved, then click again.");
    return true;
  }
  void requestCapture(event.clientX, event.clientY, target);
  return true;
}
document.addEventListener("pointerdown", (event) => {
  pointerCaptureStarted = event.isPrimary && captureGesture(event);
}, true);
document.addEventListener("click", (event) => {
  if (pointerCaptureStarted) {
    pointerCaptureStarted = false;
    return;
  }
  captureGesture(event);
}, true);
async function requestCapture(x, y, target) {
  if (!isRecording || isPaused || isCapturing) return;
  isCapturing = true;
  finishReceived = false;
  renderControls();
  setStatus("Capturing...");
  const message = {
    type: "CAPTURE_STEP",
    manual: !target,
    clickX: x,
    clickY: y,
    clickXPercent: x / innerWidth,
    clickYPercent: y / innerHeight,
    pageUrl: location.href,
    pageTitle: document.title,
    elementTag: target?.tagName ?? "",
    elementText: (target?.innerText || target?.getAttribute("aria-label") || target?.getAttribute("title") || target?.getAttribute("placeholder") || "").trim().slice(0, 100),
    viewportWidth: innerWidth,
    viewportHeight: innerHeight
  };
  try {
    const result = await chrome.runtime.sendMessage(message);
    if (!finishReceived) finishCapture(result?.ok === true, result?.error);
  } catch {
    if (!finishReceived) finishCapture(false, "Could not reach AutoDoc. Reload the page and try again.");
  }
}
function finishCapture(ok, error) {
  finishReceived = true;
  isCapturing = false;
  restoreOverlay();
  renderControls();
  setStatus(ok ? "Saved" : error || "Capture failed. Please try again.", !ok);
}
function setStatus(text, error = false) {
  lastStatus = text;
  lastStatusError = error;
  if (status) {
    status.textContent = text;
    status.style.color = error ? "#b91c1c" : "#475569";
  }
}
function restoreOverlay() {
  clearTimeout(restoreTimer);
  host?.style.removeProperty("visibility");
}
async function prepareCapture() {
  host?.style.setProperty("visibility", "hidden", "important");
  clearTimeout(restoreTimer);
  restoreTimer = setTimeout(restoreOverlay, 1e4);
  await new Promise((resolve, reject) => {
    const fallback = setTimeout(() => reject(new Error("Could not prepare the screenshot. Try again.")), 900);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      clearTimeout(fallback);
      resolve();
    }));
  });
  return { pageUrl: location.href, pageTitle: document.title, viewportWidth: innerWidth, viewportHeight: innerHeight };
}
function applyState(state) {
  isRecording = state.isRecording;
  isPaused = state.isPaused ?? false;
  stepCount = state.stepCount;
  if (!isRecording || isPaused) clearCaptureGesture();
  renderControls();
}
function renderControls() {
  if (!isRecording) {
    host?.remove();
    host = null;
    status = null;
    return;
  }
  if (!host) {
    document.querySelectorAll("[data-autodoc-overlay]").forEach((node) => node.remove());
    host = document.createElement("div");
    host.setAttribute("data-autodoc-overlay", "true");
    host.style.cssText = "all:initial!important;position:fixed!important;bottom:20px!important;right:20px!important;z-index:2147483647!important;";
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { color-scheme: light; }
        .panel { font:12px/1.5 system-ui,sans-serif; background:white; color:#0f172a; border:1px solid #cbd5e1;
          border-radius:12px; padding:12px; box-shadow:0 4px 20px #0002; width:280px; }
        .row { display:flex; gap:6px; margin:8px 0; }
        button { font:inherit; border:1px solid #cbd5e1; background:#f8fafc; color:#0f172a; border-radius:6px; padding:6px 10px; cursor:pointer; }
        button:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
        button:disabled { opacity:.5; cursor:default; }
        #capture { background:#2563eb; color:white; border-color:#2563eb; }
        #status { overflow-wrap:anywhere; }
      </style>
      <section class="panel" aria-label="AutoDoc recording controls">
        <strong id="count"></strong>
        <div class="row"><button id="capture">Capture</button><button id="pause">Pause</button><button id="undo">Undo last</button></div>
        <div>Hold Alt and left-click or tap the touchpad once within 5 seconds.</div>
        <div id="status" role="status" aria-live="polite"></div>
      </section>`;
    document.documentElement.appendChild(host);
    captureButton = shadow.querySelector("#capture");
    pauseButton = shadow.querySelector("#pause");
    undoButton = shadow.querySelector("#undo");
    status = shadow.querySelector("#status");
    setStatus(lastStatus, lastStatusError);
    captureButton.addEventListener("click", () => {
      void requestCapture(innerWidth / 2, innerHeight / 2);
    });
    pauseButton.addEventListener("click", () => {
      void control(isPaused ? "RESUME_RECORDING" : "PAUSE_RECORDING");
    });
    undoButton.addEventListener("click", () => {
      void control("UNDO_CAPTURE");
    });
  }
  host.shadowRoot.querySelector("#count").textContent = `${isPaused ? "Paused" : "Recording"} - ${stepCount} steps`;
  captureButton.disabled = isPaused || isCapturing;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
  pauseButton.disabled = isCapturing;
  undoButton.disabled = isCapturing || stepCount === 0;
}
async function control(type) {
  pauseButton.disabled = true;
  undoButton.disabled = true;
  try {
    const result = await chrome.runtime.sendMessage({ type });
    if (!result?.ok) throw new Error(result?.error || "Action failed. Please try again.");
    setStatus(type === "UNDO_CAPTURE" ? "Last capture removed" : type === "PAUSE_RECORDING" ? "Recording paused" : "Recording resumed");
  } catch (error) {
    setStatus(String(error), true);
  } finally {
    renderControls();
  }
}
chrome.runtime.onMessage.addListener((message, _sender, respond) => {
  (async () => {
    switch (message.type) {
      case "STATE_UPDATE":
        applyState(message);
        return { ok: true };
      case "GET_STATE":
        return { ok: true };
      case "PREPARE_CAPTURE":
        return prepareCapture();
      case "CAPTURE_FINISHED":
        finishCapture(message.ok, message.error);
        return { ok: true };
      case "ANNOTATE_SCREENSHOT":
        return { annotatedDataUrl: await annotateScreenshot(message.rawDataUrl, message) };
      default:
        return { error: "Unknown message" };
    }
  })().then(respond).catch((error) => respond({ error: String(error) }));
  return true;
});
void chrome.runtime.sendMessage({ type: "GET_STATE" }).then((state) => {
  if (state?.type === "STATE_UPDATE") applyState(state);
}).catch(() => {
});
