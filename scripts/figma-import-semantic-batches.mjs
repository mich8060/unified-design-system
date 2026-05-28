#!/usr/bin/env node
/**
 * Lists semantic Figma import batch files (for use_figma MCP).
 * Regenerate: node scripts/parse-uds-tokens-for-figma.mjs > .tmp/figma-tokens.json
 * then run the for-loop in package.json or manually generate 50-token slices.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, '.tmp/figma-import')

if (!fs.existsSync(dir)) {
  console.error('Missing .tmp/figma-import — regenerate batches first.')
  process.exit(1)
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith('semantic-') && f.endsWith('.js'))
  .sort()
  .map((f) => path.join(dir, f))

for (const file of files) {
  const code = fs.readFileSync(file, 'utf8')
  console.log(JSON.stringify({ file: path.basename(file), bytes: code.length }))
}
