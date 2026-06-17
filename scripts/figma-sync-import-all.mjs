#!/usr/bin/env node
/** Generate import code paths for all saved export batches in order */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exportDir = path.join(root, '.tmp/figma-export')

const PLAN = [
  { collection: 'Colors', total: 263, batchSize: 66 },
  { collection: 'Layout', total: 82, batchSize: 82 },
  { collection: 'Brand', total: 456, batchSize: 40 },
  { collection: 'Typography', total: 16, batchSize: 16 },
  { collection: 'Responsive', total: 38, batchSize: 38 },
]

const batches = []
for (const { collection, total, batchSize } of PLAN) {
  for (let start = 0; start < total; start += batchSize) {
    const end = Math.min(start + batchSize, total)
    const jsonRel = `.tmp/figma-export/${collection}-${start}-${end}.json`
    const jsonPath = path.join(root, jsonRel)
    if (!fs.existsSync(jsonPath)) {
      console.error(`missing: ${jsonRel}`)
      process.exit(1)
    }
    const importCode = execSync(`node scripts/figma-sync-variables-import.mjs ${jsonRel}`, { cwd: root }).toString()
    const importFile = `/tmp/import-${collection}-${start}-${end}.js`
    fs.writeFileSync(importFile, importCode)
    batches.push({ collection, start, end, jsonRel, importFile, importSize: importCode.length })
  }
}
console.log(JSON.stringify(batches, null, 2))
