#!/usr/bin/env node
/**
 * Prints doctor portrait upload targets for Figma MCP (Default-size Avatar image nodes).
 * Usage after rebuild:
 *   node scripts/figma-upload-avatar-portraits.mjs --node-map .tmp/figma-avatar-photo-nodes.json
 *
 * node-map JSON shape: { "Amanda-Lee": "123:456", ... }
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const doctorsDir = path.join(root, 'public/avatars/doctors')

const DOCTOR_AVATAR_IDS = [
  'Amanda-Lee',
  'Andrew-Jackson',
  'Brian-White',
  'Christopher-Davis',
  'Daniel-Garcia',
  'David-Kim',
  'Emily-Thompson',
  'James-Wilson',
  'Jennifer-Moore',
  'Jessica-Martinez',
  'Katherine-Hall',
  'Kevin-Anderson',
  'Laura-Harris',
  'Michael-Roberts',
  'Michelle-Brown',
  'Nicole-Lewis',
  'Rachel-Taylor',
  'Robert-Johnson',
  'Sarah-Chen',
  'Stephanie-Miller',
  'Thomas-Clark',
  'William-Young',
]

const mapArg = process.argv.find((a) => a.startsWith('--node-map='))
const mapPath = mapArg
  ? mapArg.split('=')[1]
  : process.argv.includes('--node-map')
    ? process.argv[process.argv.indexOf('--node-map') + 1]
    : null

if (!mapPath || !fs.existsSync(mapPath)) {
  console.error('Provide --node-map path to JSON from Figma (doctor stem → node id).')
  process.exit(1)
}

const nodeMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'))
const uploads = []

for (const doctor of DOCTOR_AVATAR_IDS) {
  const nodeId = nodeMap[doctor]
  const png = path.join(doctorsDir, `${doctor}.png`)
  if (!nodeId) {
    console.warn(`skip ${doctor}: no node id`)
    continue
  }
  if (!fs.existsSync(png)) {
    console.warn(`skip ${doctor}: missing ${png}`)
    continue
  }
  uploads.push({ doctor, nodeId, png })
}

console.log(JSON.stringify({ count: uploads.length, uploads }, null, 2))
