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

// Heavy components exposed as dedicated subpath entry points so consumers can
// import them in isolation (and so re-export-only barrels like chart/command/
// drawer are preserved as files instead of being elided by Rollup). Keys use the
// natural module path under src/ so preserveModules emits them at
// dist/components/ui/<name>.{js,cjs} alongside the rest of the tree.
const subpathEntryModules = [
  'components/ui/chart',
  'components/ui/command',
  'components/ui/drawer',
  'components/ui/calendar',
  'components/ui/date-input',
  'components/ui/date-range-input',
  'components/ui/micro-calendar',
  'components/ui/resizable',
  'components/ui/sonner',
  'components/ui/input-otp',
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
