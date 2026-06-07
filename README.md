# AutoDoc — Click-to-Documentation Generator

<p align="center">
  <strong>Automatically generate step-by-step documentation while you interact with any website.</strong><br/>
  Capture screenshots, annotate them, edit descriptions, and export a professional PDF — all locally, no account needed.
</p>

---

## Features

| Feature | Description |
|---|---|
| 🎥 **One-click Recording** | Click Start → interact with any page → every click is captured automatically |
| 📸 **Smart Screenshot Capture** | Uses `chrome.tabs.captureVisibleTab` for pixel-perfect captures |
| 🎨 **Canvas Annotation** | Auto-draws step badges, glow rings, and arrows at the exact click location |
| 📋 **Documentation Editor** | Full-page editor with drag-and-drop step reordering (SortableJS) |
| 🔍 **Duplicate Detection** | Detects near-identical screenshots and prompts you to skip |
| 📄 **PDF Export** | Professional A4 PDF with cover page, screenshots, descriptions, and page numbers |
| 🌐 **HTML Export** | Self-contained single-file HTML — no dependencies needed to share |
| 📝 **Text Notes** | Insert text-only note steps between any screenshots |
| ✨ **Auto-description** | Generates step descriptions from the clicked element's text/tag |
| ⌨️ **Keyboard Shortcuts** | `Ctrl+Shift+R` to toggle recording, `Ctrl+Shift+E` to export |
| 📑 **Multi-tab Recording** | Track steps seamlessly across multiple browser tabs in one session |
| 🏷️ **Session Metadata** | Name your sessions via a setup modal for organized file exports |
| 🔒 **100% Local** | No cloud, no account, no data leaves your machine |

---

## Quick Start

### 1. Get the Extension

You can either use the pre-built extension or build it from source:

**Option A: Use Pre-built**
The repository includes a pre-built `dist/` folder, so you can skip the build step entirely.

**Option B: Build from Source**
```bash
cd ChromeEXtension
npm install
npm run build
```

The extension will be built into the `dist/` folder.

### 2. Load in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `dist/` folder from this project

The AutoDoc icon will appear in your Chrome toolbar.

### 3. Start Recording

1. Navigate to any website
2. Click the **AutoDoc** toolbar icon
3. Click **Start Recording**
4. Interact with the page — every click is captured automatically
5. Click **Stop Recording** when done
6. Click **View Documentation** to open the editor

---

## Project Structure

```
ChromeEXtension/
├── manifest.json              # MV3 manifest
├── package.json               # Dependencies & scripts
├── vite.config.ts             # Vite multi-entry build config
├── tsconfig.json              # TypeScript strict config
│
├── src/
│   ├── background/
│   │   └── service-worker.ts  # Recording state, screenshot capture, keyboard shortcuts
│   │
│   ├── content/
│   │   ├── content-script.ts  # Click listener, annotation handler, flash UI
│   │   └── content-styles.css # Recording indicator & pulse animations
│   │
│   ├── popup/
│   │   ├── popup.html         # Extension popup
│   │   ├── popup.ts           # Popup logic
│   │   └── popup.css          # Dark glassmorphism popup styles
│   │
│   ├── editor/
│   │   ├── editor.html        # Full-page documentation editor
│   │   ├── editor.ts          # Editor logic (sortable, export, notes)
│   │   └── editor.css         # Editor styles
│   │
│   └── lib/
│       ├── types.ts           # All TypeScript interfaces
│       ├── storage.ts         # Chrome Storage API wrapper
│       ├── annotate.ts        # Canvas annotation engine
│       ├── capture.ts         # Screenshot capture helpers
│       └── pdf-export.ts      # jsPDF export (PDF + HTML)
│
├── public/
│   ├── manifest.json          # Copied to dist/
│   ├── icons/                 # icon16.png, icon48.png, icon128.png
│   ├── popup/popup.html       # Popup HTML (static)
│   ├── editor/editor.html     # Editor HTML (static)
│   └── content/               # Content CSS (static)
│
└── dist/                      # ← Load this folder in Chrome
```

---

## Architecture

### Message Flow

```
User Click
    │
    ▼
Content Script ──CAPTURE_STEP──▶ Background Service Worker
                                         │
                                         ▼
                               chrome.tabs.captureVisibleTab()
                                         │
                                         ▼ raw PNG data URL
Content Script ◀──ANNOTATE_SCREENSHOT── Background SW
    │
    ▼  (canvas annotation: badge + ring + arrow)
    │
    ▼ annotated PNG data URL
Background SW ──────────────────▶ chrome.storage.local
                                         │
                                         ▼
                               Popup badge count update
```

### Key Design Decisions

- **No React** — Vanilla TypeScript keeps the bundle small and extension startup fast
- **Canvas annotation in content script** — `Image` and `canvas` are available in content scripts (not service workers)
- **Debounced auto-save** — Description edits are saved 800ms after the user stops typing
- **Local-first** — All data lives in `chrome.storage.local`; nothing is ever transmitted

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Shift+R` | Toggle recording (start / stop) |
| `Ctrl+Shift+E` | Export PDF (opens editor with auto-export) |
| `←` / `→` | Navigate steps in the editor |
| `Delete` | Delete selected step |
| `Escape` | Close modal / fullscreen viewer |

---

## Development

```bash
# Watch mode (rebuilds on every file save)
npm run dev

# Production build
npm run build
```

After any change, go to `chrome://extensions` → find AutoDoc → click the **↺ Refresh** icon.

---

## Libraries Used

| Library | Version | Purpose |
|---|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) | ^2.5.1 | PDF generation |
| [SortableJS](https://github.com/SortableJS/Sortable) | ^1.15.2 | Drag-and-drop step reordering |
| [Vite](https://vitejs.dev/) | ^5.1.0 | Build tooling & bundling |
| TypeScript | ^5.3.3 | Type safety |

---

## Competitive Comparison

| Feature | AutoDoc | Scribe | Tango |
|---|---|---|---|
| Privacy (local-only) | ✅ | ❌ (cloud) | ❌ (cloud) |
| Works offline | ✅ | ❌ | ❌ |
| No account required | ✅ | ❌ | ❌ |
| PDF export | ✅ | ✅ | ✅ |
| HTML export | ✅ | ❌ | ❌ |
| Text note steps | ✅ | ❌ | ❌ |
| Duplicate detection | ✅ | ❌ | ❌ |
| Open source | ✅ | ❌ | ❌ |
| Drag-and-drop reorder | ✅ | ✅ | ✅ |
| Auto descriptions | ✅ | ✅ | ✅ |

---

## Suggested Future Improvements

1. **Video recording** — Record a short clip of the interaction alongside screenshots
2. **Blur/redact tool** — Mask sensitive fields (passwords, emails) before export
3. **Team sharing** — Optional encrypted cloud sync for shared documentation
4. **DOCX export** — Export to Microsoft Word format using `docx` library
5. **Step templates** — Pre-built templates for common workflows (login, checkout, etc.)
6. **OCR descriptions** — Auto-describe steps by reading page text near the click point
7. **Zoom annotations** — Magnified inset for small UI elements

---

## License

MIT — free to use, modify, and distribute.
