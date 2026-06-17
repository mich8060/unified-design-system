#!/usr/bin/env node
/**
 * Save MCP use_figma export result JSON to batch file.
 * Usage: node scripts/figma-sync-mcp-save.mjs <path-to-mcp-json>
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mcpFile = path.resolve(process.argv[2])
const payload = JSON.parse(fs.readFileSync(mcpFile, 'utf8'))
const [start, end] = payload.range
const collection = payload.collection.name
const out = path.join(root, `.tmp/figma-export/${collection}-${start}-${end}.json`)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(payload, null, 2))
console.log(JSON.stringify({ ok: true, file: path.relative(root, out), vars: payload.variables?.length ?? 0 }))
