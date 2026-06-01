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
    lib: {
      entry: {
        index: path.resolve(__dirname, './src/index.ts'),
        styles: path.resolve(__dirname, './src/styles.ts'),
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
