import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')) as { version: string }

const PKG = '@chghealthcare/unified-design-system'

/** Subpath entry points (mirror package.json exports + vite.config.lib.ts). */
const udsSubpathModules = [
  'chart',
  'command',
  'drawer',
  'calendar',
  'date-input',
  'date-range-input',
  'menu',
  'micro-calendar',
  'resizable',
  'sonner',
  'input-otp',
] as const

import type { AliasOptions } from 'vite'

function createDocsUdsAliases(rootDir: string): AliasOptions {
  const aliases: AliasOptions = [
    { find: `${PKG}/styles.css`, replacement: path.resolve(rootDir, './src/styles.css') },
    { find: `${PKG}/styles/base.css`, replacement: path.resolve(rootDir, './src/styles.base.lib.css') },
    ...udsSubpathModules.map((mod) => ({
      find: `${PKG}/${mod}`,
      replacement: path.resolve(rootDir, `./src/components/ui/${mod}.tsx`),
    })),
    { find: PKG, replacement: path.resolve(rootDir, './src/index.ts') },
    { find: 'uds-tailwind-test/styles.css', replacement: path.resolve(rootDir, './src/styles.css') },
    { find: 'uds-tailwind-test', replacement: path.resolve(rootDir, './src/index.ts') },
    { find: '@', replacement: path.resolve(rootDir, './src') },
  ]

  return aliases
}

// This repo's GitHub Pages site is served at the domain root
// (private-repo Pages use a dedicated https://<random>.pages.github.io/ origin
// with no /<repo>/ subpath), so the base is "/". If this ever moves to a public
// project page at https://<org>.github.io/unified-design-system/, change this to
// "/unified-design-system/" for production builds.
export default defineConfig(() => ({
  base: '/',
  define: {
    __DOCS_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: createDocsUdsAliases(__dirname),
  },
  build: {
    outDir: 'docs-dist',
    // Frozen docs version snapshots (e.g. 1.0.5-*.js) are intentionally large async chunks
    // (examples registry + component docs). Loaded on demand via resolve-loaders — not the main bundle.
    chunkSizeWarningLimit: 1200,
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
