#!/usr/bin/env node
/**
 * Execute branding Figma build steps via MCP stdio (when FIGMA_MCP_COMMAND is set).
 * Fallback: prints step list for manual/agent use_figma calls.
 *
 *   node scripts/run-figma-branding-build.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const batchDir = path.join(root, '.tmp/figma-build/branding-batches')
const fileKey = '3bTua8rojOOC7tYWIEWJl0'

const steps = [
  ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    file: path.join(batchDir, `batch-${i}.js`),
    description: `Branding batch ${i}`,
  })),
  {
    file: path.join(batchDir, 'combine.js'),
    description: 'Combine Branding component set',
  },
]

async function runMcpStep(step) {
  const code = fs.readFileSync(step.file, 'utf8')
  const payload = {
    fileKey,
    skillNames: 'figma-use',
    description: step.description,
    code,
  }
  const input = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: { name: 'use_figma', arguments: payload },
  })

  return new Promise((resolve, reject) => {
    const cmd = process.env.FIGMA_MCP_COMMAND
    if (!cmd) return reject(new Error('FIGMA_MCP_COMMAND not set'))
    const child = spawn(cmd, { shell: true, stdio: ['pipe', 'pipe', 'pipe'] })
    let out = ''
    child.stdout.on('data', (d) => {
      out += d
    })
    child.on('close', (code) => {
      if (code !== 0) reject(new Error(`MCP exited ${code}`))
      else resolve(out)
    })
    child.stdin.write(input)
    child.stdin.end()
  })
}

async function main() {
  for (const step of steps) {
    if (!fs.existsSync(step.file)) {
      console.error(`Missing ${step.file}`)
      process.exit(1)
    }
    console.error(`Running ${path.basename(step.file)} (${fs.statSync(step.file).size} bytes)...`)
    if (!process.env.FIGMA_MCP_COMMAND) {
      console.error('  (skip — set FIGMA_MCP_COMMAND to run automatically)')
      continue
    }
    const out = await runMcpStep(step)
    console.error(out.slice(0, 500))
  }
  if (!process.env.FIGMA_MCP_COMMAND) {
    console.error('\nSet FIGMA_MCP_COMMAND or run use_figma manually on each batch file.')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
