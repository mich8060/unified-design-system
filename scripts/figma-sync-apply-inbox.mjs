#!/usr/bin/env node
/**
 * Save .tmp/mcp-inbox.json to batch export path and generate import code.
 * Write MCP JSON to .tmp/mcp-inbox.json first, then:
 *   node scripts/figma-sync-apply-inbox.mjs Colors 66 132
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const inbox = path.join(root, '.tmp/mcp-inbox.json')
if (!fs.existsSync(inbox)) {
  console.error('Missing .tmp/mcp-inbox.json — paste MCP export JSON there first')
  process.exit(1)
}
const payload = JSON.parse(fs.readFileSync(inbox, 'utf8'))
const outJson = path.join(root, `.tmp/figma-export/${collection}-${start}-${end}.json`)
fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(payload, null, 2))
const importCode = execSync(`node scripts/figma-sync-variables-import.mjs ${path.relative(root, outJson)}`, { cwd: root }).toString()
const importFile = `/tmp/import-${collection}-${start}-${end}.js`
fs.writeFileSync(importFile, importCode)
console.log(JSON.stringify({
  saved: path.relative(root, outJson),
  vars: payload.variables?.length,
  first: payload.variables?.[0]?.[0],
  importFile,
  importSize: importCode.length,
}))
