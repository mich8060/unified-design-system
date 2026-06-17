#!/usr/bin/env node
/**
 * Compose export JSON from decoded chunk var files and generate import.
 * Usage: node scripts/figma-sync-compose-chunks.mjs Colors 66 132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const chunkDir = `/tmp/b64-chunks/${key}`
const metaFile = path.join(chunkDir, 'meta.json')

if (!fs.existsSync(metaFile)) {
  console.error('Missing meta.json in', chunkDir)
  process.exit(1)
}

const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'))
const chunkFiles = fs.readdirSync(chunkDir).filter((f) => f.startsWith('chunk-') && f.endsWith('.json')).sort((a, b) => {
  return Number(a.match(/chunk-(\d+)/)[1]) - Number(b.match(/chunk-(\d+)/)[1])
})
const variables = chunkFiles.flatMap((f) => JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8')))

const payload = {
  collection: meta.collection,
  modeEntries: meta.modeEntries,
  range: meta.range,
  total: meta.total,
  variables,
}

const mcpFile = `/tmp/mcp-${key}.json`
fs.writeFileSync(mcpFile, JSON.stringify(payload))
const proc = spawnSync(process.execPath, ['scripts/figma-sync-process-batch.mjs', collection, start, end, mcpFile], {
  cwd: root,
  encoding: 'utf8',
})
console.log(proc.stdout)
if (proc.status !== 0) {
  console.error(proc.stderr)
  process.exit(proc.status ?? 1)
}
