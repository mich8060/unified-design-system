/**
 * Asserts published dist/styles.css includes AI recipe / COMPOSITION layout
 * utilities so styles.css-only consumers get multi-column layouts.
 *
 * Requires `npm run build:lib` first.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const distCss = path.join(root, "dist", "styles.css")
const examplesDir = path.join(root, "ai", "examples")

if (!fs.existsSync(distCss)) {
  console.error(
    "test:recipe-layout-css: dist/styles.css missing — run `npm run build:lib` first.",
  )
  process.exit(1)
}

const css = fs.readFileSync(distCss, "utf8")

/**
 * Tailwind escapes `:` and `[`/`]`/`,`/`(`/`)`/`.` in class selectors.
 * Match by searching for a distinctive escaped form of the utility name.
 *
 * @param {string} className
 */
function cssContainsUtility(className) {
  // Distinctive substrings that survive Tailwind escaping for arbitrary values
  if (className.includes("240px_minmax")) {
    return css.includes("240px_minmax") || css.includes("240px\\_minmax")
  }
  if (className.includes("445px_minmax")) {
    return css.includes("445px_minmax") || css.includes("445px\\_minmax")
  }
  if (className.includes("minmax(0,1fr)_320px")) {
    return (
      css.includes("minmax\\(0\\,1fr\\)_320px") ||
      css.includes("minmax(0,1fr)_320px") ||
      css.includes("320px")
    )
  }
  if (className.includes("uds-container-prose")) {
    return css.includes("uds-container-prose")
  }
  if (className.includes("max-w-[720px]")) {
    return css.includes("max-w-\\[720px\\]") || css.includes("720px")
  }

  // Standard utilities: lg:grid-cols-2 → .lg\:grid-cols-2
  const escaped = className
    .replace(/:/g, "\\:")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/,/g, "\\,")
    .replace(/\./g, "\\.")
    .replace(/\//g, "\\/")

  return css.includes(`.${escaped}`) || css.includes(escaped)
}

/** @param {string} dir */
function walkTsx(dir) {
  /** @type {string[]} */
  const files = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) files.push(...walkTsx(full))
    else if (/\.(tsx|ts)$/.test(ent.name)) files.push(full)
  }
  return files
}

const LAYOUT_CLASS_RE =
  /\b(?:sm|md|lg):(?:grid-cols-(?:\[[^\]]+\]|\d+)|col-span-\d+|items-start)\b/g

/** @type {Set<string>} */
const fromExamples = new Set()

for (const file of walkTsx(examplesDir)) {
  const src = fs.readFileSync(file, "utf8")
  for (const match of src.matchAll(LAYOUT_CLASS_RE)) {
    fromExamples.add(match[0])
  }
}

const mustHaves = [
  "lg:grid-cols-2",
  "lg:items-start",
  "lg:grid-cols-[240px_minmax(0,1fr)]",
  "lg:grid-cols-3",
  "lg:col-span-2",
]

/** @type {string[]} */
const missing = []

for (const cls of [...fromExamples].sort()) {
  if (!cssContainsUtility(cls)) missing.push(`example: ${cls}`)
}

for (const cls of mustHaves) {
  if (!cssContainsUtility(cls)) missing.push(`must-have: ${cls}`)
}

console.log("")
console.log("  test:recipe-layout-css")
console.log(`  scanned ${fromExamples.size} layout classes from ai/examples`)

if (missing.length > 0) {
  console.error("  ✗ missing utilities in dist/styles.css:")
  for (const m of missing) console.error(`    - ${m}`)
  console.error("")
  process.exit(1)
}

console.log("  ✓ all example layout utilities present in dist/styles.css")
for (const cls of mustHaves) {
  console.log(`  ✓ ${cls}`)
}
console.log("")
