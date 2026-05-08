import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir:      'dist',
    emptyOutDir: true,
    // Inline small assets to cut HTTP requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Single bundle — app is small enough
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4000,
  },
});
