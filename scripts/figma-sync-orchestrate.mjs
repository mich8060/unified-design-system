#!/usr/bin/env node
/**
 * Full batch sync orchestrator - prints MCP steps and assembles slice parts.
 * Usage:
 *   node scripts/figma-sync-orchestrate.mjs plan
 *   node scripts/figma-sync-orchestrate.mjs store-code Colors 132 198
 *   node scripts/figma-sync-orchestrate.mjs slice-parts Colors 66 132
 *   node scripts/figma-sync-orchestrate.mjs assemble-slices Colors 66 132
 *   node scripts/figma-sync-orchestrate.mjs import-code Colors 66 132
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = '3bTua8rojOOC7tYWIEWJl0'
const TARGET = 'LkIyThUA0oVNsDEAyOF7ER'
const PART_LEN = 800

const PLAN = [
  ['Colors', 0, 66],
  ['Colors', 66, 132],
  ['Colors', 132, 198],
  ['Colors', 198, 263],
  ['Layout', 0, 82],
  ['Brand', 0, 40],
  ['Brand', 40, 80],
  ['Brand', 80, 120],
  ['Brand', 120, 160],
  ['Brand', 160, 200],
  ['Brand', 200, 240],
  ['Brand', 240, 280],
  ['Brand', 280, 320],
  ['Brand', 320, 360],
  ['Brand', 360, 400],
  ['Brand', 400, 440],
  ['Brand', 440, 456],
  ['Typography', 0, 16],
  ['Responsive', 0, 38],
]

function run(script, args = []) {
  return spawnSync(process.execPath, [path.join('scripts', script), ...args], {
    cwd: root,
    encoding: 'utf8',
  })
}

const [cmd, ...args] = process.argv.slice(2)

if (cmd === 'plan') {
  console.log(JSON.stringify({ source: SOURCE, target: TARGET, batches: PLAN }, null, 2))
  process.exit(0)
}

if (cmd === 'store-code') {
  const [collection, start, end] = args
  const r = run('figma-sync-store-export.mjs', [collection, start, end])
  process.stdout.write(r.stdout)
  process.exit(r.status ?? 0)
}

if (cmd === 'store-json-slices-code') {
  const [collection, start, end] = args
  const r = run('figma-sync-store-json-slices.mjs', [collection, start, end])
  process.stdout.write(r.stdout)
  process.exit(r.status ?? 0)
}

if (cmd === 'slice-parts') {
  const [collection, start, end] = args
  const key = `${collection}-${start}-${end}`
  const sliceDir = `/tmp/json-slices/${key}`
  const metaFile = path.join(sliceDir, 'meta.json')
  if (!fs.existsSync(metaFile)) {
    console.error('Missing', metaFile, '- save slice meta from MCP first')
    process.exit(1)
  }
  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'))
  const steps = []
  for (let i = 0; i < meta.parts; i++) {
    const sliceLen = meta.sliceLens?.[i] ?? 1500
    for (let off = 0; off < sliceLen; off += PART_LEN) {
      steps.push({ collection, start, end, sliceIndex: i, offset: off, length: PART_LEN })
    }
  }
  console.log(JSON.stringify({ key, fileKey: SOURCE, steps, stepCount: steps.length }, null, 2))
  process.exit(0)
}

if (cmd === 'save-slice-part') {
  const [collection, start, end, sliceIndex, offset, inFile] = args
  const key = `${collection}-${start}-${end}`
  const sliceDir = `/tmp/json-slices/${key}`
  fs.mkdirSync(sliceDir, { recursive: true })
  const parsed = JSON.parse(fs.readFileSync(inFile, 'utf8'))
  const partFile = path.join(sliceDir, `part-${sliceIndex}-${offset}.txt`)
  fs.writeFileSync(partFile, parsed.text)
  console.log(JSON.stringify({ partFile, len: parsed.text.length }))
  process.exit(0)
}

if (cmd === 'assemble-slices') {
  const [collection, start, end] = args
  const key = `${collection}-${start}-${end}`
  const sliceDir = `/tmp/json-slices/${key}`
  const meta = JSON.parse(fs.readFileSync(path.join(sliceDir, 'meta.json'), 'utf8'))
  let json = ''
  for (let i = 0; i < meta.parts; i++) {
    const sliceLen = meta.sliceLens?.[i] ?? 1500
    for (let off = 0; off < sliceLen; off += PART_LEN) {
      const partFile = path.join(sliceDir, `part-${i}-${off}.txt`)
      if (!fs.existsSync(partFile)) {
        console.error('Missing part', partFile)
        process.exit(1)
      }
      json += fs.readFileSync(partFile, 'utf8')
    }
  }
  const payload = JSON.parse(json)
  const r = run('figma-sync-process-batch.mjs', [collection, start, end, '-'])
  // write temp and process
  const mcpFile = `/tmp/mcp-${key}.json`
  fs.writeFileSync(mcpFile, json)
  const proc = run('figma-sync-process-batch.mjs', [collection, start, end, mcpFile])
  console.log(proc.stdout)
  process.exit(proc.status ?? 0)
}

if (cmd === 'import-code') {
  const [collection, start, end] = args
  const importFile = `/tmp/import-${collection}-${start}-${end}.js`
  if (!fs.existsSync(importFile)) {
    console.error('Missing', importFile)
    process.exit(1)
  }
  process.stdout.write(fs.readFileSync(importFile, 'utf8'))
  process.exit(0)
}

if (cmd === 'chunk-retrieve-codes') {
  const [collection, start, end] = args
  const count = Math.ceil((Number(end) - Number(start)) / 15)
  const codes = []
  for (let i = 0; i < count; i++) {
    const r = run('figma-sync-retrieve-chunk.mjs', [collection, start, end, String(i)])
    codes.push({ chunk: i, code: r.stdout })
  }
  console.log(JSON.stringify({ fileKey: SOURCE, count, codes }, null, 2))
  process.exit(0)
}

if (cmd === 'save-chunk') {
  const [collection, start, end, chunkIndex, inFile] = args
  const dir = `/tmp/chunks/${collection}-${start}-${end}`
  fs.mkdirSync(dir, { recursive: true })
  const parsed = JSON.parse(fs.readFileSync(inFile, 'utf8'))
  const out = path.join(dir, `chunk-${chunkIndex}.json`)
  fs.writeFileSync(out, JSON.stringify(parsed))
  const asm = run('figma-sync-assemble-batch.mjs', [collection, start, end, dir])
  console.log(asm.stdout)
  process.exit(asm.status ?? 0)
}

console.error('Unknown command:', cmd)
process.exit(1)
