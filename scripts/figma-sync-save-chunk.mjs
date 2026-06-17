#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const [collection, start, end, chunkIndex, srcFile] = process.argv.slice(2)
if (!collection || start == null || end == null || chunkIndex == null || !srcFile) {
  console.error('Usage: node scripts/figma-sync-save-chunk.mjs <Collection> <start> <end> <chunkIndex> <src-json-file>')
  process.exit(1)
}

const dir = `/tmp/chunks/${collection}-${start}-${end}`
fs.mkdirSync(dir, { recursive: true })
const raw = fs.readFileSync(srcFile, 'utf8')
const parsed = JSON.parse(raw)
const out = path.join(dir, `chunk-${chunkIndex}.json`)
fs.writeFileSync(out, JSON.stringify(parsed))
console.log(JSON.stringify({ out, vars: parsed.variables?.length, chunk: parsed.chunk }))
