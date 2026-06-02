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

await sanitizeViteQueryAssetFilenames()

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
