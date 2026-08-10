import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')) as {
  version: string
  exports: Record<string, string | { import?: string }>
}

const PKG = '@chghealthcare/unified-design-system'

import type { Alias, AliasOptions, Plugin } from 'vite'

const DIST_UI_PREFIX = './dist/components/ui/'

/**
 * Docs-site aliases for the package's component subpaths, derived from
 * package.json#exports so the docs site can import exactly what a real
 * consumer can — and can't drift from it.
 *
 * This used to be a hand-maintained list of 11 module names. Everything else
 * fell through to the bare PKG alias below, which prefix-matches: an import of
 * `<PKG>/badge` resolved to `<root>/src/index.ts/badge` and failed. Deriving
 * from `exports` also gets the keys whose subpath differs from their filename
 * right (./dialog -> dialog-uds, ./alert-dialog, ./avatar, ./sheet), which a
 * hand-written `<name> -> <name>.tsx` mapping cannot.
 *
 * @see docs/component-subpath-exports.md
 */
function udsComponentSubpathAliases(rootDir: string): Alias[] {
  const aliases: Alias[] = []
  for (const [key, value] of Object.entries(pkg.exports ?? {})) {
    if (key === '.' || typeof value === 'string') continue
    const target = value.import
    if (!target?.startsWith(DIST_UI_PREFIX)) continue
    const base = target.slice(DIST_UI_PREFIX.length).replace(/\.js$/, '')
    const source = ['.tsx', '.ts']
      .map((ext) => path.resolve(rootDir, `./src/components/ui/${base}${ext}`))
      .find((candidate) => fs.existsSync(candidate))
    if (!source) continue
    aliases.push({ find: `${PKG}${key.slice(1)}`, replacement: source })
  }
  return aliases
}

function createDocsUdsAliases(rootDir: string): AliasOptions {
  const aliases: AliasOptions = [
    { find: `${PKG}/styles.css`, replacement: path.resolve(rootDir, './src/styles.css') },
    { find: `${PKG}/styles/base.css`, replacement: path.resolve(rootDir, './src/styles.base.lib.css') },
    ...udsComponentSubpathAliases(rootDir),
    { find: PKG, replacement: path.resolve(rootDir, './src/index.ts') },
    { find: 'uds-tailwind-test/styles.css', replacement: path.resolve(rootDir, './src/styles.css') },
    { find: 'uds-tailwind-test', replacement: path.resolve(rootDir, './src/index.ts') },
    { find: '@', replacement: path.resolve(rootDir, './src') },
  ]

  return aliases
}

/**
 * Regenerates package.json#exports whenever src/index.ts is saved during a dev
 * session.
 *
 * src/index.ts is in the docs module graph (aliased as PKG above), so adding a
 * component hot-reloads and the server is never restarted — which is exactly
 * when the subpath exports drift, with nothing local to catch it (lint,
 * typecheck and the unit tests all pass while drifted). Regenerating on save
 * means the fix is already in the working tree to commit, instead of surfacing
 * as a red CI check later.
 *
 * Dev-server only: `npm run build:lib` and CI still run `--check` as the hard
 * gate, and nothing in CI ever writes. Never fails the server either — an
 * export line added before its component file exists warns and moves on.
 */
function syncSubpathExportsOnSave(rootDir: string): Plugin {
  const barrelPath = path.resolve(rootDir, './src/index.ts')
  const pkgPath = path.resolve(rootDir, './package.json')
  const generator = path.resolve(rootDir, './scripts/generate-subpath-exports.mjs')

  return {
    name: 'uds-sync-subpath-exports',
    apply: 'serve',
    configureServer(server) {
      server.watcher.on('change', (file) => {
        if (path.resolve(file) !== barrelPath) return
        const before = fs.readFileSync(pkgPath, 'utf8')
        const result = spawnSync(process.execPath, [generator], { encoding: 'utf8' })
        if (result.status !== 0) {
          server.config.logger.warn(
            `[uds] could not sync component subpath exports: ${(result.stderr || '').trim()}`,
          )
          return
        }
        if (fs.readFileSync(pkgPath, 'utf8') !== before) {
          server.config.logger.info(
            '[uds] src/index.ts changed — regenerated component subpath exports in package.json. Commit it with your change.',
          )
        }
      })
    },
  }
}

// Private GitHub Pages hosts at domain root (`https://*.pages.github.io/`).
// Public project Pages use `https://<user>.github.io/<repo>/` — set DOCS_BASE
// (deploy-pages.yml) to `/<repo>/` in that case. Default "/" for local builds.
const docsBaseEnv = process.env.DOCS_BASE?.trim() || "/"
const docsBase = docsBaseEnv.endsWith("/") ? docsBaseEnv : `${docsBaseEnv}/`

export default defineConfig(() => ({
  base: docsBase,
  define: {
    __DOCS_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react(), tailwindcss(), syncSubpathExportsOnSave(__dirname)],
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
