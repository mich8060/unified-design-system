#!/usr/bin/env node
/**
 * Save MCP JSON response to /tmp/mcp-<Collection>-<start>-<end>.json
 * Usage: echo '<json>' | node scripts/figma-sync-save-mcp.mjs Colors 66 132
 */
import fs from 'node:fs'

const [collection, start, end] = process.argv.slice(2)
if (!collection || start == null || end == null) {
  console.error('Usage: node scripts/figma-sync-save-mcp.mjs <Collection> <start> <end> [input-file]')
  process.exit(1)
}

const inputFile = process.argv[5]
const raw = inputFile ? fs.readFileSync(inputFile, 'utf8') : fs.readFileSync(0, 'utf8')

function unwrap(parsed) {
  if (parsed?.payload?.variables) return parsed.payload
  if (parsed?.variables && parsed?.collection) return parsed
  if (parsed?.result?.payload?.variables) return parsed.result.payload
  if (parsed?.result?.variables) return parsed.result
  if (typeof parsed?.content?.[0]?.text === 'string') {
    const inner = JSON.parse(parsed.content[0].text)
    return unwrap(inner)
  }
  return parsed
}

const parsed = JSON.parse(raw)
const payload = unwrap(parsed)
const out = `/tmp/mcp-${collection}-${start}-${end}.json`
fs.writeFileSync(out, JSON.stringify(payload))
console.log(JSON.stringify({ out, variables: payload.variables?.length, range: payload.range }))
