#!/usr/bin/env node
/**
 * Run branding batches via Figma use_figma (Cursor agent: CallMcpTool per step).
 * Prints one JSON line per step: { step, description, codeLen, payloadPath }
 *
 * Agent workflow:
 *   node scripts/run-figma-branding-batches.mjs --prepare
 *   For each payloadPath: CallMcpTool(user-Figma, use_figma, JSON.parse(readFile(payloadPath)))
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const batchDir = path.join(root, '.tmp/figma-build/branding-batches')
const outDir = path.join(root, '.tmp/figma-build/mcp-invoke')

const steps = [
  { id: 0, file: 'batch-0.js', description: 'Branding batch 0 Wireframe (clear existing)' },
  { id: 1, file: 'batch-1.js', description: 'Branding batch 1 Connect' },
  { id: 2, file: 'batch-2.js', description: 'Branding batch 2 CHG' },
  { id: 3, file: 'batch-3.js', description: 'Branding batch 3 Locumsmart' },
  { id: 4, file: 'batch-4.js', description: 'Branding batch 4 Modio' },
  { id: 5, file: 'batch-5.js', description: 'Branding batch 5 MyWeatherby' },
  { id: 6, file: 'batch-6.js', description: 'Branding batch 6 MyCompHealth' },
  { id: 7, file: 'batch-7.js', description: 'Branding batch 7 Design System' },
  { id: 'combine', file: 'combine.js', description: 'Combine Branding component set' },
]

function prepare() {
  fs.mkdirSync(outDir, { recursive: true })
  for (const step of steps) {
    const codePath = path.join(batchDir, step.file)
    const code = fs.readFileSync(codePath, 'utf8')
    const payload = {
      fileKey: '3bTua8rojOOC7tYWIEWJl0',
      description: step.description,
      skillNames: 'figma-use',
      code,
    }
    const outName =
      step.id === 'combine' ? 'combine.json' : `batch-${step.id}.json`
    const outPath = path.join(outDir, outName)
    fs.writeFileSync(outPath, JSON.stringify(payload))
    console.log(
      JSON.stringify({
        step: step.id,
        description: step.description,
        codeLen: code.length,
        payloadPath: outPath,
      }),
    )
  }
}

if (process.argv.includes('--prepare')) {
  prepare()
} else {
  console.error('Usage: node scripts/run-figma-branding-batches.mjs --prepare')
  process.exit(1)
}
