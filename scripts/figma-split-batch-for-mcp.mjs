#!/usr/bin/env node
/**
 * Split large batch JS into plugin-data chunks + exec script for Figma MCP.
 *   node scripts/figma-split-batch-for-mcp.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const batchDir = path.join(root, '.tmp/figma-build/branding-batches')
const outDir = path.join(root, '.tmp/figma-build/branding-mcp-chunks')
const CHUNK = 7000

fs.mkdirSync(outDir, { recursive: true })

const jobs = [
  ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    id: `batch-${i}`,
    file: path.join(batchDir, `batch-${i}.js`),
  })),
  { id: 'combine', file: path.join(batchDir, 'combine.js') },
]

const manifest = []

for (const job of jobs) {
  const code = fs.readFileSync(job.file, 'utf8')
  const parts = []
  for (let i = 0; i < code.length; i += CHUNK) {
    parts.push(code.slice(i, i + CHUNK))
  }
  const storeFiles = []
  parts.forEach((part, idx) => {
    const key = `brandingExec/${job.id}/${idx}`
    const storeCode = `figma.root.setSharedPluginData('uds', ${JSON.stringify(key)}, ${JSON.stringify(part)});\nreturn { key: ${JSON.stringify(key)}, len: ${part.length} };`
    const name = `${job.id}-store-${idx}.js`
    fs.writeFileSync(path.join(outDir, name), storeCode)
    storeFiles.push({ name, bytes: storeCode.length, key })
  })
  const keys = parts.map((_, idx) => `brandingExec/${job.id}/${idx}`)
  const execCode =
    keys.length === 1
      ? `return await new Function('return (async () => {' + figma.root.getSharedPluginData('uds', ${JSON.stringify(keys[0])}) + '})()')();`
      : `const parts = ${JSON.stringify(keys)}.map((k) => figma.root.getSharedPluginData('uds', k));\nreturn await new Function('return (async () => {' + parts.join('') + '})()')();`
  const execName = `${job.id}-exec.js`
  fs.writeFileSync(path.join(outDir, execName), execCode)
  manifest.push({
    id: job.id,
    sourceBytes: code.length,
    chunks: storeFiles,
    exec: { name: execName, bytes: execCode.length },
  })
  console.error(`${job.id}: ${parts.length} chunks + exec`)
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
