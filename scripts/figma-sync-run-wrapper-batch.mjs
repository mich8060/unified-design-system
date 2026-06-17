#!/usr/bin/env node
/**
 * Print wrapper invocation plan for agent to run via use_figma MCP.
 * Usage: node scripts/figma-sync-run-wrapper-batch.mjs [startId] [endId]
 */
import fs from 'fs'
import path from 'path'

const start = Number(process.argv[2] || 4)
const end = Number(process.argv[3] || 12)
const base = '.tmp/figma-var-import-wrappers'
const plan = []

for (let id = start; id <= end; id++) {
  const dir = path.join(base, String(id).padStart(2, '0'))
  if (!fs.existsSync(dir)) continue
  const stores = fs.readdirSync(dir).filter((f) => f.startsWith('store-')).sort()
  for (const s of stores) plan.push({ importId: id, file: path.join(dir, s), step: s.replace('.json', '') })
  plan.push({ importId: id, file: path.join(dir, 'exec.json'), step: 'exec' })
}

console.log(JSON.stringify({ fileKey: 'LkIyThUA0oVNsDEAyOF7ER', totalSteps: plan.length, plan }, null, 2))
