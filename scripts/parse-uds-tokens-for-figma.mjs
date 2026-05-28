/**
 * Parses src/styles/uds-tokens.css into JSON batches for Figma variable import.
 * Usage: node scripts/parse-uds-tokens-for-figma.mjs > .tmp/figma-tokens.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  compareColorTokenEntries,
  compareCssTokenNames,
  compareTypeTokenEntries,
} from './uds-token-sort.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = fs.readFileSync(path.join(root, 'src/styles/uds-tokens.css'), 'utf8')

function parseBlocks() {
  const blocks = []
  const blockRe = /([^{]+)\{([^}]*)\}/g
  let m
  while ((m = blockRe.exec(css)) !== null) {
    const selectors = m[1].trim()
    const body = m[2]
    const vars = {}
    let vm
    const localRe = /^\s*(--[\w-]+)\s*:\s*([^;]+);/gm
    while ((vm = localRe.exec(body)) !== null) {
      vars[vm[1]] = vm[2].trim()
    }
    if (Object.keys(vars).length) blocks.push({ selectors, vars })
  }
  return blocks
}

function isHex(v) {
  return /^#([0-9a-f]{3,8})$/i.test(v)
}

function isRgba(v) {
  return /^rgba?\(/i.test(v)
}

function isPx(v) {
  return /^-?\d+(\.\d+)?px$/.test(v)
}

function isColorValue(v) {
  return isHex(v) || isRgba(v)
}

function brandModeFromSelectors(selectors) {
  const m = selectors.match(/\.brand-([\w-]+)/)
  if (!m) return null
  if (selectors.includes(',')) {
    const brands = [...selectors.matchAll(/\.brand-([\w-]+)/g)].map((x) => x[1])
    if (brands.length === 1) return brands[0]
    return null
  }
  return m[1]
}

function isLightThemeBlock(selectors) {
  if (/\.theme-dark|\.dark/.test(selectors)) return false
  if (!/:root/.test(selectors)) return false
  if (/\.brand-/.test(selectors)) return false
  return true
}

function isDarkThemeBlock(selectors) {
  return /\.theme-dark|\.dark/.test(selectors) && !/^:root\b/.test(selectors.trim())
}

function mergeInto(target, vars) {
  for (const [k, v] of Object.entries(vars)) {
    target[k] = v
  }
}

function resolveVar(name, ctx, depth = 0) {
  if (depth > 32) return null
  const raw = ctx[name]
  if (raw == null) return null
  const trimmed = raw.trim()
  const ref = trimmed.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*[^)]+)?\s*\)$/)
  if (ref) return resolveVar(ref[1], ctx, depth + 1)
  return trimmed
}

/** Follow var() chain until a --system-color-* token is reached (for Figma aliases). */
function resolveSystemColorRef(name, ctx, depth = 0) {
  if (depth > 32) return null
  if (name.startsWith('--system-color-')) return name
  const raw = ctx[name]
  if (raw == null) return null
  const trimmed = raw.trim()
  const ref = trimmed.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*[^)]+)?\s*\)$/)
  if (ref) return resolveSystemColorRef(ref[1], ctx, depth + 1)
  return null
}

/** Resolve a token value to a pixel number (supports var(), calc(± Npx), and Npx). */
function resolvePx(expr, ctx, depth = 0) {
  if (depth > 32) return null
  const trimmed = String(expr).trim()
  if (isPx(trimmed)) return parseFloat(trimmed)
  const ref = trimmed.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*[^)]+)?\s*\)$/)
  if (ref) {
    const next = resolveVar(ref[1], ctx, depth + 1)
    if (next == null) return null
    return resolvePx(next, ctx, depth + 1)
  }
  const calcMatch = trimmed.match(/^calc\(\s*(.+)\s*\)$/i)
  if (calcMatch) {
    const inner = calcMatch[1].trim()
    const addSub = inner.match(/^(.+?)\s*([+-])\s*(\d+(?:\.\d+)?px)$/i)
    if (addSub) {
      const base = resolvePx(addSub[1].trim(), ctx, depth + 1)
      const delta = parseFloat(addSub[3])
      if (base == null || !Number.isFinite(delta)) return null
      return addSub[2] === '+' ? base + delta : base - delta
    }
  }
  return null
}

const TYPE_LINE_PRESET_RE = /^--uds-type-(display|heading|body)-(\d+)-line-(tight|regular|loose)$/
const TYPE_FONT_SIZE_RE = /^--uds-type-(display|heading|body)-(\d+)-font-size$/

function isTypographyLineToken(name) {
  return TYPE_LINE_PRESET_RE.test(name) || /^--uds-type-(display|heading|body)-\d+-line-/.test(name)
}

function isTypeFontSizeToken(name) {
  return TYPE_FONT_SIZE_RE.test(name)
}

/** Extract :root custom properties from a max-width @media block in uds-tokens.css. */
function parseMediaRootVars(css, maxWidthPx) {
  const re = new RegExp(
    `@media\\s*\\([^)]*max-width:\\s*${maxWidthPx}px[^)]*\\)\\s*\\{[\\s\\S]*?:root\\s*\\{([\\s\\S]*?)\\}\\s*\\}`,
    'i',
  )
  const m = css.match(re)
  if (!m) return {}
  const vars = {}
  let vm
  const localRe = /^\s*(--[\w-]+)\s*:\s*([^;]+);/gm
  while ((vm = localRe.exec(m[1])) !== null) vars[vm[1]] = vm[2].trim()
  return vars
}

function snugPx(tight, regular) {
  if (tight == null || regular == null) return null
  return Math.round((tight + regular) / 2)
}

function isSemanticName(name) {
  return name.startsWith('--uds-')
}

function shouldSkipSemantic(name, resolved) {
  if (!resolved) return true
  if (name.includes('boxshadow') || name.includes('typography')) return true
  if (/^0\s+\d/.test(resolved)) return true // composite shadow
  return false
}

const blocks = parseBlocks()

const systemColors = {}
const brandByMode = {}
const spacing = {}
const radius = {}
const gap = {}
const lightCtx = {}
const darkCtx = {}

for (const { selectors, vars } of blocks) {
  const brandMode = brandModeFromSelectors(selectors)
  if (brandMode) {
    if (!brandByMode[brandMode]) brandByMode[brandMode] = {}
    for (const [name, value] of Object.entries(vars)) {
      if (name.startsWith('--brand-') && isHex(value)) {
        brandByMode[brandMode][name] = value
      }
    }
    continue
  }

  if (isLightThemeBlock(selectors)) {
    mergeInto(lightCtx, vars)
  } else if (isDarkThemeBlock(selectors)) {
    mergeInto(darkCtx, vars)
  }

  for (const [name, value] of Object.entries(vars)) {
    if (name.startsWith('--system-color-') && isColorValue(value)) {
      systemColors[name] = value
    } else if (name.startsWith('--uds-spacing-') && isPx(value)) {
      spacing[name] = value
    } else if (name.startsWith('--uds-radius-') && (isPx(value) || value === '9999px')) {
      radius[name] = value
    } else if (name.startsWith('--uds-gap-') && isPx(value)) {
      gap[name] = value
    }
  }
}

// Default brand ramp for resolving semantic aliases (Connect / :root default).
if (brandByMode.default) {
  mergeInto(lightCtx, brandByMode.default)
}

// Dark theme overrides sit on top of :root (same cascade as CSS).
const darkResolveCtx = { ...lightCtx, ...darkCtx }

const layoutTokenNames = new Set([
  ...Object.keys(spacing),
  ...Object.keys(radius),
  ...Object.keys(gap),
])

const semanticKeys = new Set(
  [...Object.keys(lightCtx), ...Object.keys(darkCtx)].filter(isSemanticName),
)

/** @type {[string, string | null, string | null, string, string][]} */
const semanticColors = []
/** @type {[string, string][]} */
const semanticFloats = []
/** @type {[string, { tight: number, snug: number, regular: number, loose: number }][]} */
const typographyLineHeights = []
const lineHeightSteps = new Map()

for (const name of Object.keys(lightCtx)) {
  const m = name.match(TYPE_LINE_PRESET_RE)
  if (!m) continue
  const [, variant, size, preset] = m
  const stepKey = `${variant}/${size}`
  const cssBase = `--uds-type-${variant}-${size}`
  if (!lineHeightSteps.has(stepKey)) {
    lineHeightSteps.set(stepKey, { cssBase, tight: null, snug: null, regular: null, loose: null })
  }
  const px = resolvePx(lightCtx[name], lightCtx)
  if (px != null) lineHeightSteps.get(stepKey)[preset] = px
}

for (const [, presets] of lineHeightSteps) {
  const { cssBase, tight, regular, loose } = presets
  if (regular == null) continue
  const snug = snugPx(tight, regular)
  if (tight == null || loose == null || snug == null) continue
  typographyLineHeights.push([
    cssBase,
    { tight, snug, regular, loose },
  ])
}
typographyLineHeights.sort(compareTypeTokenEntries)

for (const name of [...semanticKeys].sort(compareCssTokenNames)) {
  const lightResolved = resolveVar(name, lightCtx)
  const darkResolved = resolveVar(name, darkResolveCtx)
  if (shouldSkipSemantic(name, lightResolved) && shouldSkipSemantic(name, darkResolved)) continue

  if (isColorValue(lightResolved) || isColorValue(darkResolved)) {
    const light = isColorValue(lightResolved) ? lightResolved : darkResolved
    const dark = isColorValue(darkResolved) ? darkResolved : lightResolved
    const lightSystemRef = resolveSystemColorRef(name, lightCtx)
    const darkSystemRef = resolveSystemColorRef(name, darkResolveCtx)
    if (light && dark) {
      semanticColors.push([name, lightSystemRef, darkSystemRef, light, dark])
    }
    continue
  }

  if (layoutTokenNames.has(name)) continue
  if (isTypographyLineToken(name)) continue
  if (isTypeFontSizeToken(name)) continue

  const floatResolved = isPx(lightResolved) ? lightResolved : isPx(darkResolved) ? darkResolved : null
  if (floatResolved) semanticFloats.push([name, floatResolved])
}

const tabletOverrides = parseMediaRootVars(css, 1023)
const mobileOverrides = parseMediaRootVars(css, 639)
const desktopCtx = { ...lightCtx }
const tabletCtx = { ...lightCtx, ...tabletOverrides }
const mobileCtx = { ...tabletCtx, ...mobileOverrides }

/** @type {[string, number, number, number][]} cssName, mobile, tablet, desktop px */
const responsiveType = []
for (const name of Object.keys(lightCtx)) {
  if (!isTypeFontSizeToken(name)) continue
  const desktop = resolvePx(resolveVar(name, desktopCtx), desktopCtx)
  const tablet = resolvePx(resolveVar(name, tabletCtx), tabletCtx)
  const mobile = resolvePx(resolveVar(name, mobileCtx), mobileCtx)
  if (desktop == null || tablet == null || mobile == null) continue
  responsiveType.push([name, mobile, tablet, desktop])
}
responsiveType.sort(compareTypeTokenEntries)

const brandModes = Object.keys(brandByMode).sort()
const allBrandKeys = new Set()
for (const mode of brandModes) {
  const sorted = Object.entries(brandByMode[mode]).sort(compareColorTokenEntries)
  brandByMode[mode] = Object.fromEntries(sorted)
  for (const k of Object.keys(brandByMode[mode])) allBrandKeys.add(k)
}

semanticColors.sort(compareColorTokenEntries)

const out = {
  systemColors: Object.entries(systemColors).sort(compareColorTokenEntries),
  brand: { modes: brandModes, keys: [...allBrandKeys].sort(compareCssTokenNames), byMode: brandByMode },
  spacing: Object.entries(spacing).sort(([a], [b]) => a.localeCompare(b)),
  radius: Object.entries(radius).sort(([a], [b]) => a.localeCompare(b)),
  gap: Object.entries(gap).sort(([a], [b]) => a.localeCompare(b)),
  semanticColors,
  semanticFloats,
  typographyLineHeights,
  responsiveType,
  semanticColorsCount: semanticColors.length,
  semanticFloatsCount: semanticFloats.length,
  typographyLineHeightsCount: typographyLineHeights.length,
  responsiveTypeCount: responsiveType.length,
}

console.log(JSON.stringify(out, null, 2))
