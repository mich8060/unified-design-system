#!/usr/bin/env node
/**
 * Wrap vars-only JSON into chunk file using metadata from chunk 0.
 * Usage: node scripts/figma-sync-wrap-chunk-vars.mjs Colors 66 132 1 /tmp/vars-1.json
 */
import fs from 'node:fs'
import path from 'node:path'

const [collection, start, end, chunkIndex, varsFile] = process.argv.slice(2)
const key = `${collection}-${start}-${end}`
const chunkDir = `/tmp/chunks/${key}`
const base = JSON.parse(fs.readFileSync(path.join(chunkDir, 'chunk-0.json'), 'utf8'))
const variables = JSON.parse(fs.readFileSync(varsFile, 'utf8'))
const out = {
  key,
  chunk: Number(chunkIndex),
  total: base.total,
  parts: base.parts,
  collection: base.collection,
  modeEntries: base.modeEntries,
  range: base.range,
  batchTotal: base.batchTotal,
  variables,
}
fs.writeFileSync(path.join(chunkDir, `chunk-${chunkIndex}.json`), JSON.stringify(out))
console.log(JSON.stringify({ saved: `chunk-${chunkIndex}.json`, vars: variables.length }))
