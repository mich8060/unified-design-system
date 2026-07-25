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

/**
 * TD-UDS-010 subpath tree-shaking check.
 *
 * The gzip budgets above measure a component's own code size with all of
 * node_modules externalized — that can't tell us whether importing a
 * component via its new `package.json#exports` subpath actually avoids the
 * barrel's heavy deps, since externalizing node_modules hides that either
 * way. This check instead walks *every* barrel component's real built import
 * graph (dist/components/ui/<name>.js and its local `./` hops) and asserts
 * none of the barrel's known avoidable heavy deps appear, unless the
 * component is a documented exception.
 *
 * `radix-ui` and `@base-ui/react` are deliberately excluded from HEAVY_DEPS:
 * they're the shared primitive layer, not a barrel-specific cost — a measured
 * sweep of all 80 barrel components found 49 of them import `radix-ui`
 * directly (accordion, select, dialog, tooltip, dropdown-menu, and most other
 * interactive components). Importing any of those via its own subpath still
 * needs radix regardless of import path, so flagging it here would either
 * produce ~49 exceptions (noise) or falsely imply subpathing avoids something
 * it can't. The real, avoidable win this check protects is everything else:
 * a component's own 79 unrelated siblings, `react-day-picker`, `recharts`,
 * `cmdk`, `vaul`, `sonner`, `react-resizable-panels`, `date-fns`, and the full
 * Phosphor icon set for components that don't render icons.
 */
const HEAVY_DEPS = ["recharts", "cmdk", "vaul", "react-day-picker", "sonner", "react-resizable-panels", "date-fns", "input-otp"]

// Known, deliberate exceptions — see TD-UDS-010 spec's "Current state" /
// "Framing correction": calendar/date-input/date-range-input are genuine
// barrel members that pull react-day-picker, and input-otp's own component
// legitimately depends on the identically-named input-otp package. None of
// this leaks into any *other* component's subpath.
const EXPECTED_HEAVY_DEPS = {
  calendar: ["react-day-picker"],
  "date-input": ["react-day-picker"],
  "date-range-input": ["react-day-picker"],
  "input-otp": ["input-otp"],
}

function barrelComponentNames() {
  const indexSrc = fs.readFileSync(path.join(root, "src/index.ts"), "utf8")
  const names = new Set()
  const re = /export \* from ['"]\.\/components\/ui\/([a-z0-9-]+)['"]/g
  let match
  while ((match = re.exec(indexSrc))) names.add(match[1])
  return [...names].sort()
}

/** Collect every bare (non-relative) import specifier reachable from a built dist file. */
function collectBareImports(entryFile, visited = new Set(), out = new Set()) {
  if (visited.has(entryFile)) return out
  visited.add(entryFile)
  if (!fs.existsSync(entryFile)) return out

  const src = fs.readFileSync(entryFile, "utf8")
  const re = /^import\s[^'"]*from\s+["']([^"']+)["']/gm
  let match
  while ((match = re.exec(src))) {
    const spec = match[1]
    if (spec.startsWith(".")) {
      collectBareImports(path.join(path.dirname(entryFile), spec), visited, out)
    } else {
      out.add(spec)
    }
  }
  return out
}

const subpathFailures = []
const barrelNames = barrelComponentNames()
console.log("  ci:bundle — TD-UDS-010 subpath tree-shaking check (all barrel components)")
console.log("  " + divider)
for (const name of barrelNames) {
  const entryFile = path.join(root, "dist/components/ui", `${name}.js`)
  const bareImports = collectBareImports(entryFile)
  const unexpectedHeavy = HEAVY_DEPS.filter(
    (dep) => bareImports.has(dep) && !(EXPECTED_HEAVY_DEPS[name] ?? []).includes(dep),
  )
  const ok = fs.existsSync(entryFile) && unexpectedHeavy.length === 0
  if (!ok) {
    console.log(
      `  ${status(ok).padEnd(COL.status)}  ${name.padEnd(COL.name)}${
        unexpectedHeavy.length ? `  unexpected heavy dep(s): ${unexpectedHeavy.join(", ")}` : "  entry file missing"
      }`,
    )
    subpathFailures.push(name)
  }
}
if (subpathFailures.length === 0) {
  console.log(`  ✓ pass    all ${barrelNames.length} barrel components clean of unexpected heavy deps`)
}
console.log("  " + divider)
console.log("")

if (failed.length > 0 || subpathFailures.length > 0) {
  if (failed.length > 0) {
    console.error(
      `ci:bundle: ${failed.length} component(s) exceed gzip budget: ${failed.map((r) => r.name).join(", ")}`,
    )
  }
  if (subpathFailures.length > 0) {
    console.error(`ci:bundle: ${subpathFailures.length} subpath(s) failed the tree-shaking check: ${subpathFailures.join(", ")}`)
  }
  process.exit(1)
}

console.log("ci:bundle: all components within gzip budget; all sampled subpaths tree-shake as expected.")
