#!/usr/bin/env node
/**
 * Read a use_figma step JSON and print MCP arguments for agent CallMcpTool.
 * Usage: node scripts/invoke-figma-step-from-json.mjs /path/to/step.json
 */
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/invoke-figma-step-from-json.mjs <step.json>')
  process.exit(1)
}
const j = JSON.parse(fs.readFileSync(file, 'utf8'))
process.stdout.write(JSON.stringify({
  fileKey: j.fileKey,
  description: j.description,
  skillNames: j.skillNames,
  code: j.code,
}))
