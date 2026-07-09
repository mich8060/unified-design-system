#!/usr/bin/env node
/**
 * Execute one use_figma payload via Cursor MCP (CallMcpTool equivalent).
 * Reads exact code from payload JSON — never truncates.
 *
 * Usage: node scripts/figma-mcp-exec-payload.mjs .tmp/figma-build/payload-b1217-chunk1.json
 *
 * Requires FIGMA_MCP_COMMAND env (stdio MCP client command).
 */
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'

const payloadPath = process.argv[2]
if (!payloadPath) {
  console.error('Usage: node scripts/figma-mcp-exec-payload.mjs <payload.json>')
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
const cmd = process.env.FIGMA_MCP_COMMAND
if (!cmd) {
  console.error('FIGMA_MCP_COMMAND not set — agent must CallMcpTool manually')
  console.log(JSON.stringify(payload))
  process.exit(2)
}

const input = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: { name: 'use_figma', arguments: payload },
})

const child = spawnSync(cmd, { shell: true, input, encoding: 'utf8' })
if (child.status !== 0) {
  console.error(child.stderr || child.stdout)
  process.exit(child.status ?? 1)
}
process.stdout.write(child.stdout)
