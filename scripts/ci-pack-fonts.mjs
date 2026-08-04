/**
 * Pack smoke check: refuse to ship a tarball without externalized Inter.
 *
 * Requires `npm run build:lib` first (vite + prepare-package.mjs).
 * Fails if:
 * - dist/fonts/Inter-Variable.woff2 is missing
 * - dist/styles.css still contains data:font/woff2;base64
 * - `npm pack --dry-run` listing omits package/dist/fonts/Inter-Variable.woff2
 */
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const distRoot = path.join(root, "dist")
const fontPath = path.join(distRoot, "fonts", "Inter-Variable.woff2")
const INLINE_FONT_RE = /data:font\/woff2;base64,/i

/** @type {string[]} */
const failures = []

if (!fs.existsSync(fontPath)) {
  failures.push(
    "dist/fonts/Inter-Variable.woff2 missing — run full `npm run build:lib` (includes prepare-package)",
  )
} else if (fs.statSync(fontPath).size < 1024) {
  failures.push(
    `dist/fonts/Inter-Variable.woff2 is too small (${fs.statSync(fontPath).size} bytes)`,
  )
}

for (const cssName of ["styles.css", "styles-base.css"]) {
  const cssPath = path.join(distRoot, cssName)
  if (!fs.existsSync(cssPath)) {
    failures.push(`missing dist/${cssName}`)
    continue
  }
  const css = fs.readFileSync(cssPath, "utf8")
  if (INLINE_FONT_RE.test(css)) {
    failures.push(
      `${cssName} still contains data:font/woff2;base64 — prepare-package did not externalize fonts`,
    )
  }
}

let packListing = ""
try {
  const result = spawnSync("npm", ["pack", "--dry-run"], {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      npm_config_cache: "/tmp/uds-tailwind-test-npm-cache",
    },
  })
  packListing = `${result.stdout ?? ""}\n${result.stderr ?? ""}`
  if (result.status !== 0) {
    failures.push(
      `npm pack --dry-run exited ${result.status}: ${result.stderr || result.stdout || "no output"}`,
    )
  }
} catch (err) {
  failures.push(
    `npm pack --dry-run failed: ${err instanceof Error ? err.message : String(err)}`,
  )
}

const fontInPack =
  packListing.includes("dist/fonts/Inter-Variable.woff2") ||
  packListing.includes("package/dist/fonts/Inter-Variable.woff2")

if (packListing && !fontInPack) {
  failures.push(
    "npm pack --dry-run listing does not include dist/fonts/Inter-Variable.woff2 — do not publish this dist",
  )
}

if (failures.length > 0) {
  console.error("")
  console.error("  ci:pack — font pack asserts")
  for (const msg of failures) {
    console.error(`  ✗ ${msg}`)
  }
  console.error("")
  process.exit(1)
}

console.log("")
console.log("  ci:pack — font pack asserts")
console.log("  ✓ dist/fonts/Inter-Variable.woff2 present")
console.log("  ✓ no data:font/woff2;base64 in styles.css / styles-base.css")
console.log("  ✓ npm pack --dry-run lists Inter-Variable.woff2")
console.log("")
