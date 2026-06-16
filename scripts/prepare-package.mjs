import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const distRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '../dist')

/** @param {string} dir */
async function walkAllFiles(dir) {
  /** @type {string[]} */
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await walkAllFiles(entryPath)))
      continue
    }
    out.push(entryPath)
  }
  return out
}

/** @param {string} fromFile @param {string} targetFile */
function normalizeRelative(fromFile, targetFile) {
  let relativePath = path.relative(path.dirname(fromFile), targetFile)
  if (!relativePath.startsWith('.')) relativePath = `./${relativePath}`
  return relativePath.replace(/\\/g, '/')
}

/** Vite emits `*.svg?url.js`; `?` breaks consumer bundlers (query string). */
async function sanitizeViteQueryAssetFilenames() {
  const allFiles = await walkAllFiles(distRoot)
  const renames = []

  for (const filePath of allFiles) {
    const base = path.basename(filePath)
    if (!base.includes('?')) continue
    const safeBase = base.replace(/\?url\./g, '.url.')
    const safePath = path.join(path.dirname(filePath), safeBase)
    await fs.rename(filePath, safePath)
    renames.push({ from: base, to: safeBase })
  }

  if (renames.length === 0) return

  const rewriteExts = new Set(['.js', '.cjs', '.d.ts', '.map'])
  for (const filePath of await walkAllFiles(distRoot)) {
    if (!rewriteExts.has(path.extname(filePath))) continue
    let raw = await fs.readFile(filePath, 'utf8')
    let next = raw
    for (const { from, to } of renames) {
      next = next.split(from).join(to)
    }
    if (next !== raw) await fs.writeFile(filePath, next)
  }
}

/**
 * Tailwind/lightningcss inlines @font-face `url()` as base64 data URIs in
 * styles.css, regardless of Vite's `assetsInlineLimit`. That bloated the
 * shipped CSS by the full (base64-inflated) font payload. Decode each inlined
 * font back to a real file under dist/fonts/ and rewrite the url() to a
 * relative reference so the CSS stays small and fonts cache separately.
 *
 * Order of data URIs in the bundle matches @font-face order in src/fonts.css.
 */
const FONT_NAMES_IN_ORDER = ['Inter-Variable.woff2']

async function externalizeInlinedFonts() {
  const cssPath = path.join(distRoot, 'styles.css')
  let css
  try {
    css = await fs.readFile(cssPath, 'utf8')
  } catch {
    return
  }

  const fontsDir = path.join(distRoot, 'fonts')
  let index = 0
  const dataUriPattern = /url\((?:"|')?data:font\/woff2;base64,([A-Za-z0-9+/=]+)(?:"|')?\)/g
  const writes = []

  const next = css.replace(dataUriPattern, (_match, base64) => {
    const name = FONT_NAMES_IN_ORDER[index] ?? `uds-font-${index + 1}.woff2`
    index += 1
    writes.push({ name, base64 })
    return `url("./fonts/${name}")`
  })

  if (writes.length === 0) return

  await fs.mkdir(fontsDir, { recursive: true })
  for (const { name, base64 } of writes) {
    await fs.writeFile(path.join(fontsDir, name), Buffer.from(base64, 'base64'))
  }
  await fs.writeFile(cssPath, next)
}

await sanitizeViteQueryAssetFilenames()
await externalizeInlinedFonts()

// Remove the dummy JS stub emitted by the base-CSS-only vite build.
for (const stub of ['_styles-base-dummy.js', '_styles-base-dummy.cjs']) {
  const stubPath = path.join(distRoot, stub)
  await fs.unlink(stubPath).catch(() => {})
}

const declarationFiles = (await walkAllFiles(distRoot)).filter(
  (f) => f.endsWith('.d.ts') || f.endsWith('.d.ts.map'),
)

for (const file of declarationFiles) {
  const raw = await fs.readFile(file, 'utf8')
  const rewritten = raw.replace(
    /from\s+['"]@\/([^'"]+)['"]/g,
    (_, target) => `from '${normalizeRelative(file, path.join(distRoot, target))}'`,
  )
  await fs.writeFile(file, rewritten)
}
