#!/usr/bin/env node
/** Print use_figma arguments JSON from a step file (for agent CallMcpTool). */
import fs from 'node:fs'

const stepPath = process.argv[2]
if (!stepPath) {
  console.error('Usage: node scripts/figma-mcp-read-step.mjs <invoke.json>')
  process.exit(1)
}
const step = JSON.parse(fs.readFileSync(stepPath, 'utf8'))
process.stdout.write(JSON.stringify(step))
