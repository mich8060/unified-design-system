#!/usr/bin/env node
/**
 * Prints use_figma import instructions for each batch in .tmp/figma-import/.
 * Run batches via Figma MCP use_figma (sequential), e.g.:
 *   node scripts/figma-run-semantic-import.mjs --list
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, '.tmp/figma-import')
const listOnly = process.argv.includes('--list')

const batches = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith('semantic-') && f.endsWith('.js'))
  .sort()

if (listOnly) {
  for (const f of batches) {
    const bytes = fs.statSync(path.join(dir, f)).size
    console.log(`${f}\t${bytes}`)
  }
  process.exit(0)
}

console.log(`Found ${batches.length} batches. Import via Figma MCP use_figma (sequential).`)
for (const f of batches) {
  console.log(`  .tmp/figma-import/${f}`)
}
