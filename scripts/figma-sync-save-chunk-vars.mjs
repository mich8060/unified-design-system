#!/usr/bin/env node
/**
 * Save vars-only MCP chunk response and assemble when complete.
 * Usage: node scripts/figma-sync-save-chunk-vars.mjs Colors 66 132 0 /tmp/vars-0.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end, chunkIndex, varsFile] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const chunkDir = `/tmp/chunks/${key}`
fs.mkdirSync(chunkDir, { recursive: true })

const variables = JSON.parse(fs.readFileSync(varsFile, 'utf8'))
const meta = {
  key,
  chunk: Number(chunkIndex),
  collection: { name: collection, modes: collection === 'Brand' ? ['Light', 'Dark'] : collection === 'Responsive' ? ['Desktop', 'Tablet', 'Mobile'] : collection === 'Colors' || collection === 'Layout' || collection === 'Typography' ? ['Value'] : ['Value'] },
  modeEntries: [{ collection, name: collection === 'Brand' ? 'Light' : collection === 'Responsive' ? 'Desktop' : 'Value', modeId: '0:0' }],
  range: [Number(start), Number(end)],
  batchTotal: null,
  variables,
}

// read meta from first chunk file if exists
const existing = fs.readdirSync(chunkDir).filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
if (existing.length) {
  const first = JSON.parse(fs.readFileSync(path.join(chunkDir, existing[0]), 'utf8'))
  meta.collection = first.collection
  meta.modeEntries = first.modeEntries
  meta.range = first.range
  meta.batchTotal = first.batchTotal
}

// if this is chunk 0, we need proper meta from MCP - read sidecar if present
const sidecar = `/tmp/chunks/${key}/meta.json`
if (fs.existsSync(sidecar)) {
  const m = JSON.parse(fs.readFileSync(sidecar, 'utf8'))
  Object.assign(meta, m)
}

const out = path.join(chunkDir, `chunk-${chunkIndex}.json`)
fs.writeFileSync(out, JSON.stringify(meta))
console.log(JSON.stringify({ saved: out, vars: variables.length }))

const expected = Math.ceil((Number(end) - Number(start)) / 15)
const have = fs.readdirSync(chunkDir).filter((f) => f.startsWith('chunk-') && f.endsWith('.json')).length
if (have >= expected) {
  const asm = spawnSync(process.execPath, ['scripts/figma-sync-assemble-batch.mjs', collection, start, end, chunkDir], {
    cwd: root,
    encoding: 'utf8',
  })
  process.stdout.write(asm.stdout)
  process.exit(asm.status ?? 0)
}
