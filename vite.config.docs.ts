import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')) as { version: string }

// GitHub Pages serves project sites from a repo subpath
// (e.g. https://<org>.github.io/unified-design-system/). Set the base only for
// production builds so local `vite dev`/`preview` keep serving from root.
const GITHUB_PAGES_BASE = '/unified-design-system/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? GITHUB_PAGES_BASE : '/',
  define: {
    __DOCS_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@chghealthcare/unified-design-system/styles.css': path.resolve(__dirname, './src/styles.css'),
      'uds-tailwind-test/styles.css': path.resolve(__dirname, './src/styles.css'),
      '@chghealthcare/unified-design-system': path.resolve(__dirname, './src/index.ts'),
      '@': path.resolve(__dirname, './src'),
      'uds-tailwind-test': path.resolve(__dirname, './src/index.ts'),
    },
  },
  build: {
    outDir: 'docs-dist',
    // Frozen docs version snapshots (e.g. 1.0.5-*.js ~950KB) are intentionally large async chunks.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        appShellDemo: path.resolve(__dirname, 'app-shell-demo.html'),
        menuDemo: path.resolve(__dirname, 'menu-demo.html'),
        patternsDashboard: path.resolve(__dirname, 'patterns-dashboard.html'),
      },
    },
  },
}))
