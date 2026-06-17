#!/usr/bin/env node
/** Save MCP b64 chunk response: node figma-sync-save-mcp-response.mjs <chunkIndex> <json-string> */
import fs from 'node:fs'
const [idx, ...rest] = process.argv.slice(2)
const json = rest.join(' ') || ''
fs.writeFileSync(`/tmp/mcp-b64-${idx}.json`, json)
console.log(JSON.stringify({ saved: `/tmp/mcp-b64-${idx}.json`, bytes: json.length }))
