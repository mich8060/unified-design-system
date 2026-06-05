#!/usr/bin/env node
/**
 * Sequential use_figma runner for Branding batches (requires Cursor MCP session).
 * Reads payloads from .tmp/figma-build/mcp-invoke/*.json and prints each step for CallMcpTool.
 *
 * Usage: node scripts/run-branding-figma-mcp-sequential.mjs
 * Agent: for each printed step, CallMcpTool(user-Figma, use_figma, skillNames: figma-use, arguments: payload)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const invokeDir = path.join(root, '.tmp/figma-build/mcp-invoke')
const order = [
  'batch-0.json',
  'batch-1.json',
  'batch-2.json',
  'batch-3.json',
  'batch-4.json',
  'batch-5.json',
  'batch-6.json',
  'batch-7.json',
  'combine.json',
]

const results = []
for (const file of order) {
  const payloadPath = path.join(invokeDir, file)
  if (!fs.existsSync(payloadPath)) {
    console.error(`Missing ${payloadPath}`)
    process.exit(1)
  }
  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
  results.push({
    step: file.replace('.json', ''),
    description: payload.description,
    codeBytes: payload.code.length,
    payloadPath,
  })
}

console.log(JSON.stringify({ fileKey: '3bTua8rojOOC7tYWIEWJl0', steps: results }, null, 2))
