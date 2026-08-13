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
const variantsPartial = path.join(root, "dist/variants.css")
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

/**
 * One utility per registered namespace, plus standard-scale classes UDS does not ship.
 *
 * The `TREE_SHAKEN` entries are deliberate. Tailwind tree-shakes `@theme`, so
 * `styles.css` emits only the subset of namespaces UDS's own components used —
 * of 11 declared `--color-uds-surface-*` just 6 survive, and of 16 type sizes
 * just 6. For everything else the primary variable is absent at runtime and the
 * `var(--color-uds-surface-disabled, var(--uds-surface-disabled))` fallback is
 * the *only* thing that makes the utility work. That path covers most of the
 * partial's surface, so it needs direct coverage rather than being exercised
 * only by namespaces that happened to survive tree-shaking.
 */
const UDS_UTILITIES = [
  "bg-uds-surface-primary",
  "border-uds-border-primary",
  "text-uds-text-link-primary-default",
  "text-uds-14",
  "leading-uds-24",
  "font-uds-semibold",
]
const TREE_SHAKEN_UDS_UTILITIES = ["bg-uds-surface-disabled", "text-uds-48"]
const STANDARD_UTILITIES = ["space-y-6", "max-w-6xl", "grid-cols-2"]

/**
 * `dark:` must compile class-scoped, matching UDS's own `@custom-variant dark`.
 *
 * Tailwind's default is `@media (prefers-color-scheme: dark)`. A consumer build
 * that misses the variants partial generates that instead and, because its sheet
 * loads after styles.css, overrides UDS's correctly-scoped rule — so every
 * `dark:` class fires on any machine whose OS is in dark mode, with no `.dark`
 * ancestor present. Caught in keystone's apps/web on the first real build, where
 * it turned RuntimeContextBar's amber text white-on-amber.
 */
const DARK_UTILITIES = ["dark:text-white", "dark:bg-uds-surface-primary"]

const compiler = await compile(
  [
    `@import "${partial.replace(/\\/g, "/")}" theme(reference);`,
    `@import "${variantsPartial.replace(/\\/g, "/")}";`,
    `@import "tailwindcss/theme.css" theme(reference);`,
    `@import "tailwindcss/utilities.css" layer(utilities) source(none);`,
  ].join("\n"),
  { base: root, onDependency() {}, loadStylesheet },
)

const allUtilities = [...UDS_UTILITIES, ...TREE_SHAKEN_UDS_UTILITIES, ...STANDARD_UTILITIES]
const css = compiler.build([...allUtilities, ...DARK_UTILITIES])

/** @type {string[]} */
const failures = []

// 1 — every namespace still generates.
for (const utility of allUtilities) {
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

// 4 — every fallback target the partial names actually exists in the shipped
// stylesheet. For a tree-shaken namespace the fallback is the only thing
// standing between the utility and an invalid declaration the browser drops on
// the floor, which is the same silent no-op this export exists to remove.
const shippedCss = fs.readFileSync(path.join(root, "dist/styles.css"), "utf8")
const fallbackTargets = [
  ...new Set([...fs.readFileSync(partial, "utf8").matchAll(/var\((--uds-[a-z0-9-]+)\)/g)].map((m) => m[1])),
].sort()
const unresolved = fallbackTargets.filter((name) => !shippedCss.includes(`${name}:`))
if (unresolved.length > 0) {
  failures.push(
    `${unresolved.length} fallback target(s) named by the partial are not defined in ` +
      `dist/styles.css, so utilities relying on them emit an invalid declaration: ` +
      unresolved.join(", "),
  )
}

// 5 — the variants partial makes `dark:` class-scoped, not OS-media.
if (/prefers-color-scheme/.test(css)) {
  failures.push(
    "emitted CSS contains @media (prefers-color-scheme) — dark: compiled with OS-media " +
      "semantics, so dist/variants.css is not being applied",
  )
}
for (const utility of DARK_UTILITIES) {
  const selector = `.${utility.replace(":", "\\:")}`
  const index = css.indexOf(selector)
  if (index === -1) {
    failures.push(`${utility} — generated no rule`)
    continue
  }
  const emittedSelector = css.slice(index, css.indexOf("{", index))
  if (!emittedSelector.includes(":where(.dark")) {
    failures.push(
      `${utility} compiled as \`${emittedSelector.trim()}\` — expected a ` +
        `:where(.dark, .dark *) guard from dist/variants.css`,
    )
  }
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
for (const utility of TREE_SHAKEN_UDS_UTILITIES) {
  console.log(`  ✓ ${utility} (tree-shaken from styles.css — fallback-only)`)
}
for (const utility of STANDARD_UTILITIES) console.log(`  ✓ ${utility} (standard scale)`)
for (const utility of DARK_UTILITIES) console.log(`  ✓ ${utility} (class-scoped, not OS-media)`)
console.log("  ✓ no @layer theme / @layer base emitted")
console.log("  ✓ utilities fall back to --uds-* properties")
console.log(`  ✓ all ${fallbackTargets.length} --uds-* fallback targets defined in styles.css`)
console.log("")
