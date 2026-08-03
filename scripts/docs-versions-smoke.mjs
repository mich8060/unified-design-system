import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const outFile = path.join(root, '.tmp', 'docs-versions-smoke.mjs')
const entryFile = path.join(root, 'src/docs/versions/smoke-runner.ts')

fs.mkdirSync(path.dirname(outFile), { recursive: true })

await esbuild.build({
  entryPoints: [entryFile],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: outFile,
  jsx: 'automatic',
  jsxImportSource: 'react',
  define: {
    __DOCS_VERSION__: '"1.2.0"',
  },
  logLevel: 'warning',
})

const run = spawnSync(process.execPath, [outFile], { cwd: root, stdio: 'inherit' })
if (run.status !== 0) {
  process.exit(run.status ?? 1)
}

console.log('test:docs-versions ok')
