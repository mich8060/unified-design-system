import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Second-pass build: emits only dist/styles-base.css (tokens + components, no AppShell/Menu chrome).
// emptyOutDir:false preserves the main lib build output from the first pass.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    emptyOutDir: false,
    copyPublicDir: false,
    assetsInlineLimit: 0,
    lib: {
      entry: { 'styles-base': path.resolve(__dirname, './src/styles-base.ts') },
      formats: ['es'],
      cssFileName: 'styles-base',
      fileName: () => '_styles-base-dummy.js',
    },
    rollupOptions: {
      output: { preserveModules: false },
    },
  },
})
