/**
 * Per-component gzip bundle budget check.
 *
 * Bundles each entry in .audit/bundle-budget.json with esbuild, gzips the
 * output, and compares against the per-component gzip budget. Prints a table
 * and exits 1 if any component exceeds its budget.
 *
 * Requires `npm run build:lib` first.
 */
import * as esbuild from "esbuild"
import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const auditDir = path.join(root, ".audit")
const budgetPath = path.join(auditDir, "bundle-budget.json")

const distIndex = path.join(root, "dist", "index.js")
if (!fs.existsSync(distIndex)) {
  console.error("ci:bundle: dist/index.js missing — run `npm run build:lib` first.")
  process.exit(1)
}

/** @param {number} n */
function fmtBytes(n) {
  if (n < 1024) return `${n} B`
  return `${(n / 1024).toFixed(1)} KB`
}

/** @param {boolean} ok */
function status(ok) {
  return ok ? "✓ pass" : "✗ FAIL"
}

const budget = JSON.parse(fs.readFileSync(budgetPath, "utf8"))
const components = Object.entries(budget.components)

/** @type {{ name: string; raw: number; gzip: number; budget: number; ok: boolean }[]} */
const results = []

for (const [name, spec] of components) {
  const entryPath = path.join(root, spec.entry)
  if (!fs.existsSync(entryPath)) {
    console.error(`ci:bundle: entry missing for "${name}": ${spec.entry}`)
    process.exit(1)
  }

  const outFile = path.join(auditDir, `.ci-bundle-${name}.mjs`)
  try {
    await esbuild.build({
      entryPoints: [entryPath],
      absWorkingDir: root,
      bundle: true,
      platform: "node",
      format: "esm",
      outfile: outFile,
      logLevel: "warning",
      // Treat all node_modules as external — we only measure our own component code.
      plugins: [
        {
          name: "external-node-modules",
          setup(build) {
            build.onResolve({ filter: /^[^./]/ }, (args) => ({ path: args.path, external: true }))
          },
        },
      ],
    })

    const raw = fs.readFileSync(outFile)
    const gzipped = zlib.gzipSync(raw)
    const ok = gzipped.byteLength <= spec.gzipBytes
    results.push({ name, raw: raw.byteLength, gzip: gzipped.byteLength, budget: spec.gzipBytes, ok })
  } finally {
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile)
  }
}

// Print table
const COL = { name: 12, raw: 9, gzip: 9, budget: 9, status: 8 }
const header = [
  "component".padEnd(COL.name),
  "raw".padStart(COL.raw),
  "gzip".padStart(COL.gzip),
  "budget".padStart(COL.budget),
  "status".padStart(COL.status),
].join("  ")
const divider = "-".repeat(header.length)

console.log("")
console.log("  ci:bundle — per-component gzip budget report")
console.log("  " + divider)
console.log("  " + header)
console.log("  " + divider)
for (const r of results) {
  const row = [
    r.name.padEnd(COL.name),
    fmtBytes(r.raw).padStart(COL.raw),
    fmtBytes(r.gzip).padStart(COL.gzip),
    fmtBytes(r.budget).padStart(COL.budget),
    status(r.ok).padStart(COL.status),
  ].join("  ")
  console.log("  " + row)
}
console.log("  " + divider)
console.log("")

const failed = results.filter((r) => !r.ok)
if (failed.length > 0) {
  console.error(
    `ci:bundle: ${failed.length} component(s) exceed gzip budget: ${failed.map((r) => r.name).join(", ")}`,
  )
  process.exit(1)
}

console.log("ci:bundle: all components within gzip budget.")
