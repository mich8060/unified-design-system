#!/usr/bin/env node
/** Merge store-*.js into chunks under 45KB for fewer MCP calls. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '.tmp/figma-build/branding-plugin-data',
)
const MAX = 9000
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith('store-') && f.endsWith('.js'))
  .sort()

const chunks = []
let current = []
let size = 0

for (const file of files) {
  const code = fs.readFileSync(path.join(dir, file), 'utf8')
  const bytes = code.length
  if (size + bytes > MAX && current.length) {
    chunks.push(current)
    current = []
    size = 0
  }
  current.push({ file, code, bytes })
  size += bytes
}
if (current.length) chunks.push(current)

const payloadDir = path.join(dir, '..', 'mcp-payloads-plugin-combined')
fs.mkdirSync(payloadDir, { recursive: true })
const fileKey = '3bTua8rojOOC7tYWIEWJl0'

chunks.forEach((group, i) => {
  const name = `store-chunk-${i}.js`
  const code = `${group.map((g) => g.code).join('\n')}\nreturn { stored: ${JSON.stringify(group.map((g) => g.file))} };`
  fs.writeFileSync(path.join(dir, name), code)
  fs.writeFileSync(
    path.join(payloadDir, `${name}.json`),
    JSON.stringify({
      fileKey,
      skillNames: 'figma-use',
      description: `Store branding SVGs chunk ${i + 1}/${chunks.length}`,
      code,
    }),
  )
  console.error(`Wrote ${name} (${code.length} bytes, ${group.length} files)`)
})
