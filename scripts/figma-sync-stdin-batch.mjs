#!/usr/bin/env node
/** Read MCP JSON from stdin, save batch + generate import. */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [collection, start, end] = process.argv.slice(2)
const payload = JSON.parse(fs.readFileSync(0, 'utf8'))
const mcpFile = `/tmp/mcp-${collection}-${start}-${end}.json`
fs.writeFileSync(mcpFile, JSON.stringify(payload, null, 2))
const result = execSync(
  `node scripts/figma-sync-process-batch.mjs ${collection} ${start} ${end} ${mcpFile}`,
  { cwd: root }
).toString()
console.log(result)
