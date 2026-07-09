#!/usr/bin/env node
/**
 * Run use_figma via Figma MCP HTTP (requires Cursor Figma auth / session).
 * Usage: node scripts/figma-mcp-http-run.mjs .tmp/figma-build/_mcp-invoke-b611-6.json
 */
import fs from 'node:fs'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const payloadPath = process.argv[2]
if (!payloadPath) {
  console.error('Usage: node scripts/figma-mcp-http-run.mjs <payload.json>')
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
const url = process.env.FIGMA_MCP_URL || 'https://mcp.figma.com/mcp'

const client = new Client({ name: 'uds-figma-runner', version: '1.0.0' })
const transport = new StreamableHTTPClientTransport(new URL(url))

try {
  await client.connect(transport)
  const result = await client.callTool({ name: 'use_figma', arguments: payload })
  console.log(JSON.stringify(result, null, 2))
} catch (e) {
  console.error('MCP error:', e.message || e)
  process.exit(1)
} finally {
  await transport.close()
}
