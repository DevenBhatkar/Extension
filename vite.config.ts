import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Background service worker
        'background/service-worker': resolve(__dirname, 'src/background/service-worker.ts'),
        // Content script
        'content/content-script': resolve(__dirname, 'src/content/content-script.ts'),
        // Popup entry
        'popup/popup': resolve(__dirname, 'src/popup/popup.ts'),
        // Editor entry
        'editor/editor': resolve(__dirname, 'src/editor/editor.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (name.endsWith('.css')) {
            if (name.includes('content')) return 'content/content-styles.css';
            if (name.includes('popup')) return 'popup/popup.css';
            if (name.includes('editor')) return 'editor/editor.css';
            return 'assets/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    // Target modern Chrome
    target: 'chrome110',
    // Don't inline assets — keep data URLs as-is
    assetsInlineLimit: 0,
    // Keep readable for extension store review
    minify: false,
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@lib': resolve(__dirname, 'src/lib'),
    },
  },
  // Copy everything in public/ to dist/ verbatim
  publicDir: 'public',
});
