/**
 * Single source of truth for UDS component subpath exports.
 * See docs/component-subpath-exports.md for the design rationale.
 *
 * `src/index.ts` is the barrel: every `export * from './components/ui/<name>'`
 * line there is a public component. This script keeps two derived artifacts in
 * sync with that barrel so consumers can deep-import a single component
 * (`@chghealthcare/unified-design-system/select`) instead of always paying for
 * the full barrel's dependency graph:
 *
 *   - `package.json#exports` — a `./<name>` entry for every barrel component.
 *   - `vite.config.lib.ts`'s `subpathEntryModules` — only for components whose
 *     entire file body is `export * from '...'` re-exports. Rollup elides pure
 *     re-export files that aren't declared as an explicit entry (confirmed by
 *     build: `combobox`, `pagination`, `sidebar` disappear from `dist/` unless
 *     listed); components with real content (JSX, hooks, logic) are preserved
 *     by `preserveModules` regardless and don't need to be listed.
 *
 * The merge is purely additive: pre-existing `package.json#exports` keys that
 * aren't derivable from `src/index.ts` at all (styles/font/meta subpaths, and
 * subpath-only components like `chart`/`command`/`drawer`/`sonner`/`resizable`/
 * `micro-calendar`, none of which are re-exported from the barrel) are never
 * touched or removed — this script only adds/refreshes barrel-derived
 * `./<name>` keys. An earlier version tried to enumerate which keys were
 * "safe to keep" instead of just keeping everything by default, and silently
 * deleted five live subpaths as a result; see the plain object-spread merge
 * below and docs/component-subpath-exports.md ("Why the generator's
 * merge is additive") for the story.
 *
 * Usage:
 *   node scripts/generate-subpath-exports.mjs               # write in place
 *   node scripts/generate-subpath-exports.mjs --check        # verify source-of-truth sync only, exit 1 on drift (no dist/ access, safe to run before a build)
 *   node scripts/generate-subpath-exports.mjs --verify-dist   # verify every package.json#exports target actually exists on disk, exit 1 if any are missing (run this AFTER `build:lib`)
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const indexPath = path.join(root, "src/index.ts")
const pkgPath = path.join(root, "package.json")
const vitePath = path.join(root, "vite.config.lib.ts")
const componentsDir = path.join(root, "src/components/ui")

function parseBarrelComponentNames(indexSrc) {
  const names = new Set()
  const re = /export \* from ['"]\.\/components\/ui\/([a-z0-9-]+)['"]/g
  let match
  while ((match = re.exec(indexSrc))) names.add(match[1])
  return [...names].sort()
}

function resolveExtension(name) {
  for (const ext of [".tsx", ".ts"]) {
    if (fs.existsSync(path.join(componentsDir, `${name}${ext}`))) return ext
  }
  throw new Error(`generate-subpath-exports: no .tsx/.ts file found for component "${name}"`)
}

/** True if every non-blank line in the file is a bare `export * from '...'` re-export. */
function isPureReexportBarrel(name, ext) {
  const src = fs.readFileSync(path.join(componentsDir, `${name}${ext}`), "utf8")
  const lines = src
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  return lines.length > 0 && lines.every((line) => /^export \* from ['"]/.test(line))
}

function buildExportsFragment(names) {
  /** @type {Record<string, {types: string, import: string, require: string}>} */
  const fragment = {}
  for (const name of names) {
    fragment[`./${name}`] = {
      types: `./dist/components/ui/${name}.d.ts`,
      import: `./dist/components/ui/${name}.js`,
      require: `./dist/components/ui/${name}.cjs`,
    }
  }
  return fragment
}

/**
 * Merge the generated component fragment into the existing exports map.
 * Purely additive: every pre-existing key is kept as-is (this includes
 * subpath-only entries that were never derivable from src/index.ts in the
 * first place, e.g. `chart`/`command`/`drawer`/`sonner`/`resizable`/
 * `micro-calendar` — none of those are in the barrel, so a generator that
 * only carries forward keys it can positively derive would silently delete
 * them). Barrel-derived keys are added if missing, or refreshed in place to
 * the canonical shape if they already existed. Nothing is ever removed here —
 * if a component is deleted from the barrel, its subpath is left behind for
 * a human to clean up deliberately, rather than risk deleting an unrelated
 * subpath-only entry by mistake.
 *
 * The merged result is sorted alphabetically by key, with the root "."
 * entry pinned first (order carries no semantic weight for Node's exports
 * resolution here since every key is a static string, not a "*" pattern —
 * this is purely so diffs stay minimal and new entries land in a
 * predictable spot instead of wherever the merge happened to place them).
 */
function mergeExports(existingExports, fragment) {
  const merged = { ...existingExports, ...fragment }
  const keys = Object.keys(merged).sort()
  const sorted = {}
  if (merged["."] !== undefined) sorted["."] = merged["."]
  for (const key of keys) {
    if (key === ".") continue
    sorted[key] = merged[key]
  }
  return sorted
}

function buildViteEntryModules(pureReexportNames) {
  return pureReexportNames.map((name) => `components/ui/${name}`)
}

const SUBPATH_ENTRY_MODULES_RE = /(const subpathEntryModules = \[\n)([\s\S]*?)(\n\])/

function renderViteEntryModules(names) {
  return names.map((mod) => `  '${mod}',`).join("\n")
}

function mergeViteEntryModules(viteSrc, pureReexportModules) {
  const match = viteSrc.match(SUBPATH_ENTRY_MODULES_RE)
  if (!match) {
    throw new Error("generate-subpath-exports: could not find subpathEntryModules array in vite.config.lib.ts")
  }
  const existing = match[2]
    .split("\n")
    .map((line) => line.trim().replace(/^'|',?$/g, "").replace(/'$/, ""))
    .filter(Boolean)

  const merged = new Set(existing)
  for (const mod of pureReexportModules) merged.add(mod)

  const sorted = [...merged].sort()
  return viteSrc.replace(SUBPATH_ENTRY_MODULES_RE, `$1${renderViteEntryModules(sorted)}$3`)
}

/**
 * Confirm every package.json#exports target resolves to a real file. Typecheck
 * and pack:check don't cover this on their own: typecheck only exercises
 * subpaths something in the source tree actually imports, and pack:check only
 * lists tarball contents. This is the check that catches a component whose
 * `.cjs`/`.d.ts` silently stops emitting (e.g. a real-content component gets
 * refactored into a pure re-export barrel and starts getting elided, per the
 * shape rule above, without its subpathEntryModules entry being added).
 */
function verifyExportsResolveToRealFiles(pkg) {
  const missing = []
  for (const [key, value] of Object.entries(pkg.exports)) {
    const targets = typeof value === "string" ? [value] : Object.values(value)
    for (const target of targets) {
      if (!fs.existsSync(path.join(root, target))) missing.push(`${key} -> ${target}`)
    }
  }
  return missing
}

function main() {
  const checkOnly = process.argv.includes("--check")
  const verifyDist = process.argv.includes("--verify-dist")

  if (verifyDist) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
    const missing = verifyExportsResolveToRealFiles(pkg)
    if (missing.length > 0) {
      console.error(`generate-subpath-exports --verify-dist: ${missing.length} exports target(s) missing from dist/:`)
      for (const m of missing) console.error(`  ${m}`)
      console.error("Run `npm run build:lib`, or check whether a component's shape changed (see \"Which components need a Vite entry\" in docs/component-subpath-exports.md).")
      process.exit(1)
    }
    console.log(`generate-subpath-exports --verify-dist: all ${Object.keys(pkg.exports).length} exports resolve.`)
    return
  }

  const indexSrc = fs.readFileSync(indexPath, "utf8")
  const names = parseBarrelComponentNames(indexSrc)

  const pureReexportNames = []
  for (const name of names) {
    const ext = resolveExtension(name)
    if (isPureReexportBarrel(name, ext)) pureReexportNames.push(name)
  }

  const fragment = buildExportsFragment(names)

  const pkgRaw = fs.readFileSync(pkgPath, "utf8")
  const pkg = JSON.parse(pkgRaw)
  const nextExports = mergeExports(pkg.exports, fragment)
  const nextPkgRaw = JSON.stringify({ ...pkg, exports: nextExports }, null, 2) + "\n"

  const viteSrc = fs.readFileSync(vitePath, "utf8")
  const nextViteSrc = mergeViteEntryModules(viteSrc, buildViteEntryModules(pureReexportNames))

  const pkgDrifted = nextPkgRaw !== pkgRaw
  const viteDrifted = nextViteSrc !== viteSrc

  if (checkOnly) {
    if (pkgDrifted || viteDrifted) {
      console.error("generate-subpath-exports --check: drift detected.")
      if (pkgDrifted) console.error("  package.json#exports is out of date with src/index.ts.")
      if (viteDrifted) console.error("  vite.config.lib.ts subpathEntryModules is out of date with src/index.ts.")
      console.error("Run `node scripts/generate-subpath-exports.mjs` to regenerate.")
      process.exit(1)
    }
    console.log(`generate-subpath-exports --check: up to date (${names.length} components).`)
    return
  }

  if (pkgDrifted) fs.writeFileSync(pkgPath, nextPkgRaw)
  if (viteDrifted) fs.writeFileSync(vitePath, nextViteSrc)
  console.log(
    `generate-subpath-exports: ${names.length} component subpaths (${pureReexportNames.length} pure re-export barrels declared as explicit Rollup entries).`,
  )
}

main()
