#!/usr/bin/env node
/**
 * Generate b64-chunk use_figma step payloads for brand semantic imports 05-08.
 * Agent: for each printed step, CallMcpTool(plugin-figma-figma, use_figma, skillNames: figma-use, arguments: payload)
 *
 * Usage:
 *   node scripts/run-figma-variable-import-b64.mjs prepare
 *   node scripts/run-figma-variable-import-b64.mjs list 05
 *   node scripts/run-figma-variable-import-b64.mjs print 05 3
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const fileKey = 'LkIyThUA0oVNsDEAyOF7ER'
const batches = ['05', '06', '07', '08']
const CHUNK = 4000
const tmpRoot = '/tmp/figma-b64-chunks'

function payloadPath(id) {
  return path.join('/tmp', `mcp-payload-${id}.json`)
}

function prepareBatch(id) {
  const payload = JSON.parse(fs.readFileSync(payloadPath(id), 'utf8'))
  const wrapper = payload.code
  const key = `w${id}`
  const dir = path.join(tmpRoot, id)
  fs.mkdirSync(dir, { recursive: true })
  const parts = []
  for (let i = 0; i < wrapper.length; i += CHUNK) parts.push(wrapper.slice(i, i + CHUNK))
  const steps = []
  steps.push({
    description: `Clear b64 storage batch ${id}`,
    code: `figma.root.setSharedPluginData('uds','${key}',''); return { cleared: true, key: '${key}' };`,
  })
  parts.forEach((part, idx) => {
    const b64 = Buffer.from(part, 'utf8').toString('base64')
    steps.push({
      description: `B64 chunk ${idx + 1}/${parts.length} batch ${id}`,
      code: `const b=atob('${b64}'); const K='${key}'; const prev=figma.root.getSharedPluginData('uds',K)||''; figma.root.setSharedPluginData('uds',K,prev+b); return { chunk:${idx + 1}, total:${parts.length}, len:(prev+b).length };`,
    })
  })
  steps.push({
    description: `Execute b64 import batch ${id}`,
    code: `const w=figma.root.getSharedPluginData('uds','${key}'); if(!w) throw new Error('missing ${key}'); return await new Function('return (async () => {'+w+'})()')();`,
  })
  steps.forEach((s, i) => {
    const out = {
      fileKey,
      description: s.description,
      skillNames: 'figma-use',
      code: s.code,
    }
    fs.writeFileSync(path.join(dir, `step-${String(i).padStart(2, '0')}.json`), JSON.stringify(out))
  })
  return { id, steps: steps.length, wrapperLen: wrapper.length, dir }
}

function prepareAll() {
  const manifest = batches.map(prepareBatch)
  fs.writeFileSync(path.join(tmpRoot, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(JSON.stringify({ fileKey, batches: manifest }, null, 2))
}

function listBatch(id) {
  const dir = path.join(tmpRoot, id)
  const files = fs.readdirSync(dir).filter((f) => f.startsWith('step-')).sort()
  for (const f of files) {
    const p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    console.log(f, p.description, 'codeLen', p.code.length)
  }
}

function printStep(id, stepNum) {
  const file = path.join(tmpRoot, id, `step-${String(stepNum).padStart(2, '0')}.json`)
  process.stdout.write(fs.readFileSync(file, 'utf8'))
}

const [cmd, arg1, arg2] = process.argv.slice(2)
if (cmd === 'prepare') prepareAll()
else if (cmd === 'list') listBatch(arg1)
else if (cmd === 'print') printStep(arg1, Number(arg2))
else {
  console.error('Usage: prepare | list <id> | print <id> <stepNum>')
  process.exit(1)
}
