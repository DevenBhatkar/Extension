import type { ImageEdits, ImageMark, Step } from '../lib/types';

type Point = { x: number; y: number };
type Tool = 'move' | 'arrow' | 'highlight' | 'crop';
const copy = (edits: ImageEdits): ImageEdits => JSON.parse(JSON.stringify(edits));

export function rectangle(a: Point, b: Point): NonNullable<ImageEdits['crop']> {
  return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), width: Math.abs(b.x - a.x), height: Math.abs(b.y - a.y) };
}

export function hitMark(mark: ImageMark, point: Point, tolerance: number): boolean {
  if (mark.kind === 'highlight') {
    const box = rectangle({ x: mark.x, y: mark.y }, { x: mark.endX, y: mark.endY });
    return point.x >= box.x - tolerance && point.x <= box.x + box.width + tolerance &&
      point.y >= box.y - tolerance && point.y <= box.y + box.height + tolerance;
  }
  const dx = mark.endX - mark.x, dy = mark.endY - mark.y;
  const t = Math.max(0, Math.min(1, ((point.x - mark.x) * dx + (point.y - mark.y) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(point.x - mark.x - t * dx, point.y - mark.y - t * dy) <= tolerance;
}

export function drawMark(ctx: CanvasRenderingContext2D, mark: ImageMark): void {
  ctx.save();
  ctx.strokeStyle = '#2563eb';
  ctx.fillStyle = '#2563eb';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  if (mark.kind === 'highlight') {
    const box = rectangle({ x: mark.x, y: mark.y }, { x: mark.endX, y: mark.endY });
    ctx.fillStyle = 'rgba(250, 204, 21, 0.28)';
    ctx.fillRect(box.x, box.y, box.width, box.height);
    ctx.strokeStyle = '#ca8a04';
    ctx.strokeRect(box.x, box.y, box.width, box.height);
  } else {
    const angle = Math.atan2(mark.endY - mark.y, mark.endX - mark.x);
    ctx.beginPath(); ctx.moveTo(mark.x, mark.y); ctx.lineTo(mark.endX, mark.endY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mark.endX, mark.endY);
    ctx.lineTo(mark.endX - 18 * Math.cos(angle - Math.PI / 6), mark.endY - 18 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(mark.endX - 18 * Math.cos(angle + Math.PI / 6), mark.endY - 18 * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

/** Always render from the original bitmap so repeated edits don't degrade it. */
export function renderImage(image: HTMLImageElement, edits: ImageEdits): HTMLCanvasElement {
  const full = document.createElement('canvas');
  full.width = image.naturalWidth; full.height = image.naturalHeight;
  const ctx = full.getContext('2d')!;
  ctx.drawImage(image, 0, 0);
  edits.marks.forEach(mark => drawMark(ctx, mark));
  if (!edits.crop) return full;
  const crop = edits.crop;
  const output = document.createElement('canvas');
  output.width = Math.max(1, Math.round(crop.width)); output.height = Math.max(1, Math.round(crop.height));
  output.getContext('2d')!.drawImage(full, crop.x, crop.y, crop.width, crop.height, 0, 0, output.width, output.height);
  return output;
}

export async function openImageEditor(step: Step, save: (dataUrl: string, edits: ImageEdits) => Promise<void>): Promise<void> {
  if (document.querySelector('#image-editor')) return;
  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Could not load this screenshot.'));
    image.src = step.rawScreenshotDataUrl || step.screenshotDataUrl;
  });
  const width = image.naturalWidth, height = image.naturalHeight;
  let edits: ImageEdits = copy(step.imageEdits ?? { marks: [], crop: null });
  // Replace the flattened automatic annotation with an editable arrow on first edit.
  if (!step.imageEdits && step.elementTag) {
    const x = Math.max(0, Math.min(width, step.clickXPercent * width));
    const y = Math.max(0, Math.min(height, step.clickYPercent * height));
    edits.marks.push({ kind: 'arrow', x: Math.max(0, x - 100), y: Math.max(0, y - 70), endX: x, endY: y });
  }
  let tool: Tool = 'move';
  let selected = -1;
  let drag: { start: Point; before: ImageEdits; index: number; endpoint: 'start' | 'end' | null } | null = null;
  const history: ImageEdits[] = [];
  let saving = false;
  const dialog = document.createElement('dialog');
  dialog.id = 'image-editor';
  dialog.setAttribute('aria-labelledby', 'image-editor-title');
  dialog.innerHTML = `
    <h2 id="image-editor-title">Edit screenshot</h2>
    <div class="image-tools" role="toolbar" aria-label="Image tools">
      <button data-tool="move" aria-pressed="true">Move / resize</button>
      <button data-tool="arrow" aria-pressed="false">Arrow</button>
      <button data-tool="highlight" aria-pressed="false">Highlight</button>
      <button data-tool="crop" aria-pressed="false">Crop</button>
      <button id="image-delete">Delete selected</button>
      <button id="image-undo">Undo edit</button>
      <button id="image-uncrop">Remove crop</button>
      <button id="image-reset">Reset to original</button>
    </div>
    <p id="image-instructions">Drag a mark to move it, or drag its endpoint handles to resize it. Arrow keys nudge a selected mark.</p>
    <div class="image-canvas-wrap"><canvas tabindex="0" aria-label="Screenshot editing canvas"></canvas></div>
    <p id="image-status" role="status" aria-live="polite"></p>
    <div class="image-actions"><button id="image-cancel">Cancel</button><button id="image-save">Save changes</button></div>`;
  document.body.appendChild(dialog);
  const canvas = dialog.querySelector('canvas')!;
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const status = dialog.querySelector<HTMLElement>('#image-status')!;
  const button = (id: string) => dialog.querySelector<HTMLButtonElement>(`#image-${id}`)!;
  const point = (event: PointerEvent): Point => {
    const bounds = canvas.getBoundingClientRect();
    return { x: Math.max(0, Math.min(width, (event.clientX - bounds.left) * width / bounds.width)),
      y: Math.max(0, Math.min(height, (event.clientY - bounds.top) * height / bounds.height)) };
  };
  const remember = () => { history.push(copy(edits)); if (history.length > 50) history.shift(); };
  const draw = () => {
    ctx.clearRect(0, 0, width, height); ctx.drawImage(image, 0, 0);
    edits.marks.forEach(mark => drawMark(ctx, mark));
    if (edits.crop) {
      const c = edits.crop;
      ctx.save(); ctx.fillStyle = '#0007';
      ctx.beginPath(); ctx.rect(0, 0, width, height); ctx.rect(c.x, c.y, c.width, c.height); ctx.fill('evenodd');
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(c.x, c.y, c.width, c.height); ctx.restore();
    }
    const mark = edits.marks[selected];
    if (mark) {
      ctx.save(); ctx.fillStyle = 'white'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
      for (const p of [{ x: mark.x, y: mark.y }, { x: mark.endX, y: mark.endY }]) {
        ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.restore();
    }
    button('delete').disabled = selected < 0 || saving;
    button('undo').disabled = history.length === 0 || saving;
    button('uncrop').disabled = !edits.crop || saving;
  };
  dialog.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach(el => el.addEventListener('click', () => {
    tool = el.dataset.tool as Tool;
    dialog.querySelectorAll('[data-tool]').forEach(other => other.setAttribute('aria-pressed', String(other === el)));
    dialog.querySelector('#image-instructions')!.textContent = tool === 'move'
      ? 'Drag a mark to move it, or drag its endpoint handles to resize it. Arrow keys nudge a selected mark.'
      : `Drag on the screenshot to ${tool === 'crop' ? 'select the area to keep' : `draw an ${tool === 'arrow' ? 'arrow' : 'area highlight'}`}.`;
  }));
  canvas.addEventListener('pointerdown', event => {
    if (saving || event.button !== 0) return;
    event.preventDefault(); canvas.focus(); canvas.setPointerCapture(event.pointerId);
    const p = point(event), before = copy(edits);
    let endpoint: 'start' | 'end' | null = null;
    if (tool === 'move') {
      const tolerance = 12 * width / canvas.getBoundingClientRect().width;
      const current = edits.marks[selected];
      if (current && Math.hypot(p.x - current.x, p.y - current.y) < tolerance) endpoint = 'start';
      else if (current && Math.hypot(p.x - current.endX, p.y - current.endY) < tolerance) endpoint = 'end';
      else {
        selected = -1;
        for (let i = edits.marks.length - 1; i >= 0; i--) {
          if (hitMark(edits.marks[i]!, p, tolerance)) { selected = i; break; }
        }
      }
    } else if (tool !== 'crop') {
      edits.marks.push({ kind: tool, x: p.x, y: p.y, endX: p.x, endY: p.y });
      selected = edits.marks.length - 1;
    } else selected = -1;
    drag = { start: p, before, index: selected, endpoint };
    draw();
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag || saving) return;
    const p = point(event);
    if (tool === 'crop') edits.crop = rectangle(drag.start, p);
    else if (tool !== 'move') {
      const mark = edits.marks[drag.index]!; mark.endX = p.x; mark.endY = p.y;
    } else if (drag.index >= 0) {
      const original = drag.before.marks[drag.index]!, mark = edits.marks[drag.index]!;
      if (drag.endpoint === 'start') { mark.x = p.x; mark.y = p.y; }
      else if (drag.endpoint === 'end') { mark.endX = p.x; mark.endY = p.y; }
      else {
        const dx = Math.max(-Math.min(original.x, original.endX), Math.min(width - Math.max(original.x, original.endX), p.x - drag.start.x));
        const dy = Math.max(-Math.min(original.y, original.endY), Math.min(height - Math.max(original.y, original.endY), p.y - drag.start.y));
        Object.assign(mark, { x: original.x + dx, y: original.y + dy, endX: original.endX + dx, endY: original.endY + dy });
      }
    }
    draw();
  });
  canvas.addEventListener('pointerup', event => {
    if (!drag) return;
    if (tool === 'crop' && (!edits.crop || edits.crop.width < 5 || edits.crop.height < 5)) edits = drag.before;
    if (tool === 'arrow' || tool === 'highlight') {
      const mark = edits.marks[drag.index]!;
      if (Math.hypot(mark.endX - mark.x, mark.endY - mark.y) < 5) { edits = drag.before; selected = -1; }
    }
    if (JSON.stringify(edits) !== JSON.stringify(drag.before)) history.push(drag.before);
    drag = null; canvas.releasePointerCapture(event.pointerId); draw();
  });
  canvas.addEventListener('pointercancel', () => { if (drag) edits = drag.before; drag = null; selected = -1; draw(); });
  button('delete').onclick = () => { if (selected < 0) return; remember(); edits.marks.splice(selected, 1); selected = -1; draw(); };
  button('undo').onclick = () => { const previous = history.pop(); if (previous) edits = previous; selected = -1; draw(); };
  button('uncrop').onclick = () => { remember(); edits.crop = null; draw(); };
  button('reset').onclick = () => { remember(); edits = { marks: [], crop: null }; selected = -1; draw(); };
  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (saving) { event.preventDefault(); return; }
    if (event.key === 'Delete') { event.preventDefault(); button('delete').click(); }
    if (event.target === canvas && event.key.startsWith('Arrow') && selected >= 0) {
      event.preventDefault();
      const mark = edits.marks[selected]!;
      const amount = event.shiftKey ? 10 : 1;
      const dx = event.key === 'ArrowLeft' ? -amount : event.key === 'ArrowRight' ? amount : 0;
      const dy = event.key === 'ArrowUp' ? -amount : event.key === 'ArrowDown' ? amount : 0;
      if (Math.min(mark.x, mark.endX) + dx < 0 || Math.max(mark.x, mark.endX) + dx > width ||
          Math.min(mark.y, mark.endY) + dy < 0 || Math.max(mark.y, mark.endY) + dy > height) return;
      remember(); mark.x += dx; mark.endX += dx; mark.y += dy; mark.endY += dy; draw();
    }
  });
  dialog.addEventListener('cancel', event => { if (saving) event.preventDefault(); });
  dialog.addEventListener('close', () => dialog.remove());
  button('cancel').onclick = () => dialog.close();
  button('save').onclick = async () => {
    saving = true;
    dialog.querySelectorAll('button').forEach(el => { el.disabled = true; });
    status.textContent = 'Saving...';
    try {
      await save(renderImage(image, edits).toDataURL('image/png'), copy(edits));
      dialog.close();
    } catch (error) {
      status.textContent = `Could not save: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      saving = false; dialog.querySelectorAll('button').forEach(el => { el.disabled = false; }); draw();
    }
  };
  dialog.showModal(); draw();
}
