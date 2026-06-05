#!/usr/bin/env node
/**
 * Print one branding batch payload for use_figma (agent passes to CallMcpTool).
 * Usage: node scripts/invoke-branding-figma-batch.mjs batch-0
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const batch = process.argv[2]
if (!batch) {
  console.error('Usage: node scripts/invoke-branding-figma-batch.mjs <batch-name>')
  process.exit(1)
}

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const payloadPath = path.join(
  root,
  '.tmp/figma-build/mcp-payloads',
  `${batch}.json`,
)
if (!fs.existsSync(payloadPath)) {
  console.error(`Missing payload: ${payloadPath}`)
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
process.stdout.write(JSON.stringify(payload))
