#!/usr/bin/env node
/**
 * Generate small use_figma wrapper JSON files for large import scripts.
 * Splits source into sharedPluginData chunks, then exec wrapper joins + runs.
 *
 * Usage: node scripts/figma-sync-chunk-import-wrappers.mjs <importId> <src.js> [chunkSize]
 * Example: node scripts/figma-sync-chunk-import-wrappers.mjs 04 /tmp/figma-import-04-brand-ld.js
 */
import fs from 'fs'
import path from 'path'

const [importId, src, chunkSizeArg] = process.argv.slice(2)
if (!importId || !src) {
  console.error('Usage: node scripts/figma-sync-chunk-import-wrappers.mjs <importId> <src.js> [chunkSize]')
  process.exit(1)
}

const FILE_KEY = 'LkIyThUA0oVNsDEAyOF7ER'
const NS = 'uds'
const CHUNK = Number(chunkSizeArg) || 7000
const code = fs.readFileSync(src, 'utf8')
const keyBase = `varImport/${importId}`
const parts = []
for (let i = 0; i < code.length; i += CHUNK) parts.push(code.slice(i, i + CHUNK))

const outDir = path.join('.tmp', 'figma-var-import-wrappers', importId)
fs.mkdirSync(outDir, { recursive: true })

const payloads = []

parts.forEach((part, i) => {
  const key = `${keyBase}/${i}`
  const storeCode = `figma.root.setSharedPluginData(${JSON.stringify(NS)}, ${JSON.stringify(key)}, ${JSON.stringify(part)});\nreturn { stored: ${i}, key: ${JSON.stringify(key)}, len: ${part.length} };`
  const payload = {
    fileKey: FILE_KEY,
    code: storeCode,
    description: `Store variable import ${importId} chunk ${i + 1}/${parts.length}`,
    skillNames: 'figma-use',
  }
  const file = path.join(outDir, `store-${i}.json`)
  fs.writeFileSync(file, JSON.stringify(payload))
  payloads.push({ step: `store-${i}`, file, bytes: storeCode.length })
})

const keyList = parts.map((_, i) => `${keyBase}/${i}`)
const execInner = `const parts = ${JSON.stringify(keyList)}.map((k) => figma.root.getSharedPluginData(${JSON.stringify(NS)}, k));\nif (parts.some((p) => !p)) return { error: 'missing chunk', parts: parts.map((p, i) => ({ i, ok: !!p, len: p ? p.length : 0 })) };\nconst code = parts.join('');\nreturn await new Function('return (async () => {' + code + '})()')();`
const execCode = execInner
const execPayload = {
  fileKey: FILE_KEY,
  code: execCode,
  description: `Execute variable import ${importId} (${parts.length} chunks, ${code.length} bytes source)`,
  skillNames: 'figma-use',
}
const execFile = path.join(outDir, 'exec.json')
fs.writeFileSync(execFile, JSON.stringify(execPayload))
payloads.push({ step: 'exec', file: execFile, bytes: execCode.length })

console.log(JSON.stringify({ importId, src, sourceBytes: code.length, chunks: parts.length, outDir, payloads }, null, 2))
