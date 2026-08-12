/**
 * Compiles `dist/theme.css` the way a consumer app does and asserts the
 * properties consumers actually depend on. See docs/consumer-tailwind-theme.md.
 *
 * Requires `node scripts/build-theme-partial.mjs` first (run by `build:lib`).
 *
 * Three properties, each of which has a real failure mode:
 *
 *   1. UDS token utilities generate. If the partial stops registering a
 *      namespace, a consumer's local Tailwind build silently emits nothing for
 *      `text-uds-14` / `bg-uds-surface-primary` — the exact silent no-op that
 *      makes an unknown utility so expensive to debug in a consumer app.
 *   2. Nothing but utilities is emitted. `theme(reference)` must not emit
 *      `@layer theme` or preflight. If it did, a consumer sheet imported after
 *      styles.css would merge into the same cascade layer and win on source
 *      order — silently replacing UDS's `--font-sans` (Inter) with Tailwind's
 *      system stack app-wide.
 *   3. Generated utilities fall back to the raw `--uds-*` property. That is what
 *      makes the runtime values come from the app's `styles.css` instead of a
 *      hand-copied duplicate of the token scale.
 *
 * Standard-scale utilities are checked too: covering classes UDS's own
 * stylesheet does not emit is the other half of why a consumer stands up a local
 * build at all.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { compile } from "tailwindcss"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const partial = path.join(root, "dist/theme.css")
const tailwindRoot = path.join(root, "node_modules/tailwindcss")

if (!fs.existsSync(partial)) {
  console.error(
    "test:theme-partial: dist/theme.css missing — run `node scripts/build-theme-partial.mjs` first.",
  )
  process.exit(1)
}

/** Resolves `tailwindcss/*` subpaths plus the local partial, like a bundler would. */
function loadStylesheet(id, base) {
  const file =
    id === "tailwindcss"
      ? path.join(tailwindRoot, "index.css")
      : id.startsWith("tailwindcss/")
        ? path.join(tailwindRoot, id.slice("tailwindcss/".length))
        : path.resolve(base, id)
  return { path: file, base: path.dirname(file), content: fs.readFileSync(file, "utf8") }
}

/** One utility per registered namespace, plus standard-scale classes UDS does not ship. */
const UDS_UTILITIES = [
  "bg-uds-surface-primary",
  "border-uds-border-primary",
  "text-uds-text-link-primary-default",
  "text-uds-14",
  "leading-uds-24",
  "font-uds-semibold",
]
const STANDARD_UTILITIES = ["space-y-6", "max-w-6xl", "grid-cols-2"]

const compiler = await compile(
  [
    `@import "${partial.replace(/\\/g, "/")}" theme(reference);`,
    `@import "tailwindcss/theme.css" theme(reference);`,
    `@import "tailwindcss/utilities.css" layer(utilities) source(none);`,
  ].join("\n"),
  { base: root, onDependency() {}, loadStylesheet },
)

const css = compiler.build([...UDS_UTILITIES, ...STANDARD_UTILITIES])

/** @type {string[]} */
const failures = []

// 1 — every namespace still generates.
for (const utility of [...UDS_UTILITIES, ...STANDARD_UTILITIES]) {
  // `space-y-*` compiles to a `:where(.space-y-6 > …)` selector, not a bare class.
  if (!css.includes(`.${utility}`)) failures.push(`${utility} — generated no rule`)
}

// 2 — reference-only: no theme registration, no preflight.
const emittedLayers = [...new Set(css.match(/@layer\s+([a-z]+)/g) ?? [])].map((l) =>
  l.replace(/@layer\s+/, ""),
)
for (const forbidden of ["theme", "base"]) {
  if (emittedLayers.includes(forbidden)) {
    failures.push(
      `emitted @layer ${forbidden} — theme(reference) must emit neither; a consumer sheet ` +
        `imported after styles.css would merge into that layer and win on source order`,
    )
  }
}

// 3 — utilities defer to the raw --uds-* property for their runtime value.
if (!/var\(--color-uds-surface-primary,\s*var\(--uds-surface-primary\)\)/.test(css)) {
  failures.push(
    "bg-uds-surface-primary does not fall back to var(--uds-surface-primary) — " +
      "runtime values would no longer come from styles.css",
  )
}

console.log("")
console.log("  test:theme-partial")
console.log(`  emitted layers: ${emittedLayers.join(", ") || "(none)"}`)

if (failures.length > 0) {
  console.error("  ✗ dist/theme.css did not behave as a consumer reference:")
  for (const failure of failures) console.error(`    - ${failure}`)
  console.error("")
  process.exit(1)
}

for (const utility of UDS_UTILITIES) console.log(`  ✓ ${utility}`)
for (const utility of STANDARD_UTILITIES) console.log(`  ✓ ${utility} (standard scale)`)
console.log("  ✓ no @layer theme / @layer base emitted")
console.log("  ✓ utilities fall back to --uds-* properties")
console.log("")
