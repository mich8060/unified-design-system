#!/usr/bin/env node
/**
 * Emit use_figma batch payloads for Branding (SVG payload too large for one MCP call).
 *
 *   node scripts/figma-run-branding-batches.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const runtimePath = path.join(root, 'scripts/figma-branding-runtime-slim.js')
const svgDir = path.join(root, 'src/assets/branding/svg')

const BRANDING_SVG_FILES = {
  Wireframe: {
    wordmark: 'wireframe-wordmark.svg',
    mark: 'wireframe-brand-mark.svg',
  },
  Connect: {
    wordmark: 'connect-wordmark.svg',
    mark: 'connect-brand-mark.svg',
  },
  CHG: {
    wordmark: 'unified-design-system-wordmark.svg',
    mark: 'unified-design-system-brand-mark.svg',
  },
  Locumsmart: {
    wordmark: 'locumsmart-wordmark.svg',
    mark: 'locumsmart-brand-mark.svg',
  },
  Modio: { wordmark: 'modio-wordmark.svg', mark: 'modio-brand-mark.svg' },
  CareerMD: {
    wordmark: 'careermd-wordmark.svg',
    mark: 'careermd-brand-mark.svg',
  },
  MyWeatherby: {
    wordmark: 'weatherby-wordmark.svg',
    mark: 'weatherby-brand-mark.svg',
  },
  MyCompHealth: {
    wordmark: 'comphealth-wordmark.svg',
    mark: 'comphealth-brand-mark.svg',
  },
  'Design System': {
    wordmark: 'unified-design-system-wordmark.svg',
    mark: 'unified-design-system-brand-mark.svg',
  },
}

const BATCHES = Object.keys(BRANDING_SVG_FILES).map((appearance) => [appearance])

function loadSvgs(appearances) {
  const out = {}
  for (const appearance of appearances) {
    const files = BRANDING_SVG_FILES[appearance]
    out[appearance] = {
      wordmark: fs.readFileSync(path.join(svgDir, files.wordmark), 'utf8'),
      mark: fs.readFileSync(path.join(svgDir, files.mark), 'utf8'),
    }
  }
  return out
}

const runtime = fs.readFileSync(runtimePath, 'utf8')

function batchCode(batchIndex, appearances, removeExisting) {
  const spec = {
    pageName: 'UDS Components',
    figmaName: 'Branding',
    replaceExisting: removeExisting,
    batchIndex,
    wordmarkFrame: { width: 200, height: 80 },
    markFrame: { width: 64, height: 64 },
    appearances,
  }
  return `
${runtime}

const BRANDING_SVGS = ${JSON.stringify(loadSvgs(appearances))};
const spec = ${JSON.stringify(spec)};
return await buildBrandingBatch(spec);
`.trim()
}

const combineCode = `
${runtime}
return await combineBrandingSet();
`.trim()

const outDir = path.join(root, '.tmp/figma-build/branding-batches')
const payloadDir = path.join(root, '.tmp/figma-build/mcp-payloads')
fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(payloadDir, { recursive: true })

const payloads = []
const fileKey = '3bTua8rojOOC7tYWIEWJl0'
BATCHES.forEach((appearances, i) => {
  const code = batchCode(i, appearances, i === 0)
  const file = `batch-${i}.js`
  fs.writeFileSync(path.join(outDir, file), code)
  const mcpPayload = {
    fileKey,
    skillNames: 'figma-use',
    description: `Branding ${appearances[0]}`,
    code,
  }
  fs.writeFileSync(
    path.join(payloadDir, file.replace('.js', '.json')),
    JSON.stringify(mcpPayload),
  )
  payloads.push({
    file,
    bytes: code.length,
    description: `Branding batch ${i + 1}/${BATCHES.length}`,
    code,
  })
  console.error(`Wrote ${file} (${code.length} bytes)`)
})

const combineOnly = `${runtime}\nreturn await combineBrandingSet();`
fs.writeFileSync(path.join(outDir, 'combine.js'), combineOnly)
fs.writeFileSync(
  path.join(payloadDir, 'combine.json'),
  JSON.stringify({
    fileKey,
    skillNames: 'figma-use',
    description: 'Combine Branding component set',
    code: combineOnly,
  }),
)
payloads.push({
  file: 'combine.js',
  bytes: combineOnly.length,
  description: 'Combine Branding variants into component set',
  code: combineOnly,
})
console.error(`Wrote combine.js (${combineOnly.length} bytes)`)

fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(
    {
      fileKey,
      skillNames: 'figma-use',
      steps: payloads.map((p) => ({
        file: p.file,
        bytes: p.bytes,
        description: p.description,
      })),
    },
    null,
    2,
  ),
)
