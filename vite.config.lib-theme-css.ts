import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Emits dist/theme.css — UDS tokens + @theme bridges for consumer Tailwind builds.
 * No AppShell/Menu chrome; no full utility scan (consumers generate their own utilities).
 * emptyOutDir:false preserves prior lib / styles-base output.
 */
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
      entry: { theme: path.resolve(__dirname, './src/theme.ts') },
      formats: ['es'],
      cssFileName: 'theme',
      fileName: () => '_theme-dummy.js',
    },
    rollupOptions: {
      output: { preserveModules: false },
    },
  },
})
