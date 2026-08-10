import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import pkg from './package.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]

// Components exposed as dedicated subpath entry points (see
// package.json#exports and docs/component-subpath-exports.md). Rollup elides a module whose entire
// body is `export * from '...'` re-exports (chart/command/drawer/combobox/
// pagination/sidebar) unless it's declared as an explicit entry here; a
// handful of components with real content (calendar/date-input/date-range-input/
// menu/resizable/sonner/input-otp) are listed too as a historical holdover —
// preserveModules already keeps those regardless of whether they're declared.
// Keys use the natural module path under src/ so preserveModules emits them at
// dist/components/ui/<name>.{js,cjs} alongside the rest of the tree.
//
// Kept in sync with src/index.ts by `node scripts/generate-subpath-exports.mjs`
// (only the pure-re-export subset is ever added by that script; it never
// removes an existing entry).
const subpathEntryModules = [
  'components/ui/calendar',
  'components/ui/chart',
  'components/ui/combobox',
  'components/ui/command',
  'components/ui/date-input',
  'components/ui/date-range-input',
  'components/ui/drawer',
  'components/ui/input-otp',
  'components/ui/menu',
  'components/ui/micro-calendar',
  'components/ui/pagination',
  'components/ui/resizable',
  'components/ui/sidebar',
  'components/ui/sonner',
]
const subpathEntries = Object.fromEntries(
  subpathEntryModules.map((mod) => [mod, path.resolve(__dirname, `./src/${mod}.tsx`)]),
)

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    // Never inline assets (fonts) into styles.css — keep them as separate,
    // cacheable files. Inlining base64-bloated the bundle by ~1.8MB.
    assetsInlineLimit: 0,
    lib: {
      entry: {
        index: path.resolve(__dirname, './src/index.ts'),
        styles: path.resolve(__dirname, './src/styles.ts'),
        ...subpathEntries,
      },
      formats: ['es', 'cjs'],
      cssFileName: 'styles',
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return format === 'es' ? 'index.js' : 'index.cjs'
        }
        return format === 'es' ? `${entryName}.js` : `${entryName}.cjs`
      },
    },
    rollupOptions: {
      external: (id) =>
        external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: path.resolve(__dirname, './src'),
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'styles.css') return 'styles.css'
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
