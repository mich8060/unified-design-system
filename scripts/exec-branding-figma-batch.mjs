#!/usr/bin/env node
/**
 * Build use_figma arguments for one branding batch (reads .js from disk).
 * Usage: node scripts/exec-branding-figma-batch.mjs 0
 *        node scripts/exec-branding-figma-batch.mjs combine
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const batchDir = path.join(root, '.tmp/figma-build/branding-batches')

const step = process.argv[2]
if (!step) {
  console.error('Usage: node scripts/exec-branding-figma-batch.mjs <0-7|combine>')
  process.exit(1)
}

const descriptions = {
  0: 'Branding batch 0 Wireframe (clear existing)',
  1: 'Branding batch 1 Connect',
  2: 'Branding batch 2 CHG',
  3: 'Branding batch 3 Locumsmart',
  4: 'Branding batch 4 Modio',
  5: 'Branding batch 5 MyWeatherby',
  6: 'Branding batch 6 MyCompHealth',
  7: 'Branding batch 7 Design System',
  combine: 'Combine Branding component set',
}

const file =
  step === 'combine' ? 'combine.js' : `batch-${step}.js`
const codePath = path.join(batchDir, file)
if (!fs.existsSync(codePath)) {
  console.error(`Missing ${codePath}`)
  process.exit(1)
}

const code = fs.readFileSync(codePath, 'utf8')
const description = descriptions[step] ?? `Branding batch ${step}`
const payload = {
  fileKey: '3bTua8rojOOC7tYWIEWJl0',
  description,
  skillNames: 'figma-use',
  code,
}

const outPath = path.join(
  root,
  '.tmp/figma-build/mcp-invoke',
  step === 'combine' ? 'combine.json' : `batch-${step}.json`,
)
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(payload))
process.stdout.write(
  JSON.stringify({
    outPath,
    codeLen: code.length,
    description,
    fileKey: payload.fileKey,
  }),
)
