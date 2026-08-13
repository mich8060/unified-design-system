/**
 * Emits the two CSS partials a consumer's own Tailwind build needs:
 *
 *   - `dist/theme.css`    (`./theme`)    — UDS's `@theme` registrations
 *   - `dist/variants.css` (`./variants`) — UDS's `@custom-variant` declarations
 *
 * The variants partial exists because Tailwind's default `dark:` is
 * `@media (prefers-color-scheme: dark)` while UDS redefines it as class-scoped
 * (`&:where(.dark, .dark *)`). A consumer build that doesn't apply the same
 * definition generates every `dark:` utility with OS-media semantics and, since
 * the consumer sheet loads after `styles.css`, overrides UDS's correct rule — so
 * on any machine whose OS is in dark mode every `dark:` class fires with no
 * `.dark` ancestor present. It cannot live in `theme.css`, because
 * `@import … theme(reference)` accepts `@theme` blocks only.
 *
 * See docs/consumer-tailwind-theme.md for the design rationale and the consumer
 * recipe. The short version: a consumer app that stands up its own Tailwind v4
 * build cannot generate UDS's token utilities (`text-uds-14`,
 * `bg-uds-surface-primary`, `text-uds-text-link-primary-default`, …) from the
 * published `dist/styles.css`, because that file is already compiled — its
 * tokens are plain declarations inside `@layer theme{:root{…}}`, which is not a
 * theme registration. Tailwind needs the raw `@theme` blocks to know those
 * namespaces exist. This partial ships them so a consumer can write:
 *
 *   @import "@chghealthcare/unified-design-system/theme" theme(reference);
 *   @import "tailwindcss/theme.css" theme(reference);
 *   @import "tailwindcss/utilities.css" layer(utilities) source(none);
 *   @source "./";
 *
 * `theme(reference)` emits nothing — it only teaches the local build which
 * namespaces exist, so generated utilities compile to
 * `var(--color-uds-surface-primary, var(--uds-surface-primary))` and pick up
 * their runtime values from the app's already-imported `styles.css`. That means
 * this partial deliberately carries only the `@theme` registrations, never the
 * raw `--uds-*` values.
 *
 * Self-maintaining: the file set is derived from `src/styles/tokens.css`'s
 * `@import` list, so a new `*-theme.css` imported there ships automatically.
 * Two guards make silent drift impossible:
 *
 *   1. Every included file must be `@theme`-only (comments + `@theme` blocks).
 *      `@import … theme(reference)` rejects anything else at the consumer's
 *      build, so shipping a mixed file would break every consumer rather than
 *      just this repo.
 *   2. A mixed-content file (e.g. `uds-tokens.css`, which is `:root` rules) may
 *      not contain a `@theme` block. If one appears there it would be silently
 *      absent from the partial, so this fails the build and asks for it to be
 *      extracted into its own file.
 *
 * Usage:
 *   node scripts/build-theme-partial.mjs          # write dist/theme.css
 *   node scripts/build-theme-partial.mjs --check  # validate sources only, no dist/ write
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const stylesDir = path.join(root, "src/styles")
const tokensEntry = path.join(stylesDir, "tokens.css")
const outFile = path.join(root, "dist/theme.css")
const variantsSource = path.join(stylesDir, "uds-variants.css")
const variantsOutFile = path.join(root, "dist/variants.css")
const checkOnly = process.argv.includes("--check")

/** Strip CSS comments so brace counting and content classification are reliable. */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "")
}

/** Relative `@import "./x.css"` targets, in source order. */
function parseImports(css) {
  const targets = []
  const re = /@import\s+["'](\.[^"']+)["']/g
  let match
  while ((match = re.exec(stripComments(css)))) targets.push(match[1])
  return targets
}

/**
 * Classifies a stylesheet by what it contains once comments are removed.
 * `themeOnly` means every top-level construct is an `@theme` block — the only
 * shape `@import … theme(reference)` accepts.
 */
function classify(css) {
  const bare = stripComments(css)
  let hasTheme = false
  let index = 0
  let leftover = ""

  while (index < bare.length) {
    const next = bare.indexOf("@theme", index)
    if (next === -1) {
      leftover += bare.slice(index)
      break
    }
    leftover += bare.slice(index, next)

    const open = bare.indexOf("{", next)
    if (open === -1) {
      // `@theme` with no body — treat as leftover so it surfaces as an error.
      leftover += bare.slice(next)
      break
    }
    hasTheme = true

    let depth = 1
    let cursor = open + 1
    while (cursor < bare.length && depth > 0) {
      if (bare[cursor] === "{") depth += 1
      else if (bare[cursor] === "}") depth -= 1
      cursor += 1
    }
    index = cursor
  }

  return { hasTheme, themeOnly: hasTheme && leftover.trim() === "" }
}

/** Tailwind version this partial was generated against, for consumer pinning. */
function resolveTailwindVersion() {
  const pkg = path.join(root, "node_modules/tailwindcss/package.json")
  if (!fs.existsSync(pkg)) return null
  return JSON.parse(fs.readFileSync(pkg, "utf8")).version ?? null
}

const tokensCss = fs.readFileSync(tokensEntry, "utf8")
const imports = parseImports(tokensCss)

if (imports.length === 0) {
  console.error(
    "build-theme-partial: src/styles/tokens.css has no relative @import targets — " +
      "the partial's file set is derived from them, so this is almost certainly a mistake.",
  )
  process.exit(1)
}

/** @type {{ name: string, css: string }[]} */
const included = []
/** @type {string[]} */
const errors = []

for (const target of imports) {
  const file = path.resolve(stylesDir, target)
  if (!fs.existsSync(file)) {
    errors.push(`${target} — imported by tokens.css but missing on disk`)
    continue
  }
  const css = fs.readFileSync(file, "utf8")
  const { hasTheme, themeOnly } = classify(css)

  if (themeOnly) {
    included.push({ name: path.basename(file), css })
    continue
  }

  // Guard 2: a @theme block hiding in a mixed-content file would be silently
  // missing from the partial. Fail loudly and say what to do about it.
  if (hasTheme) {
    errors.push(
      `${target} — contains an @theme block alongside other CSS. Extract that block into ` +
        `its own @theme-only file (see uds-font-theme.css) and @import it from tokens.css, ` +
        `so it ships in dist/theme.css.`,
    )
  }
  // Otherwise it's legitimately mixed (raw :root tokens) — skipped by design.
}

if (errors.length > 0) {
  console.error("build-theme-partial: cannot emit a valid @theme-only partial:")
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

if (included.length === 0) {
  console.error(
    "build-theme-partial: no @theme-only files found among tokens.css's imports — " +
      "dist/theme.css would be empty, which silently breaks consumer token utilities.",
  )
  process.exit(1)
}

const tailwindVersion = resolveTailwindVersion()
// Deliberately a plain `/* */`, never `/*! */`. Tailwind's parser discards normal
// comments but keeps bang-comments as AST nodes, and `theme(reference)` rejects
// any node that isn't an `@theme` block — so a `/*!` header here would make the
// partial unusable for every consumer. Guarded below.
const header = `/*
 * @chghealthcare/unified-design-system — Tailwind v4 \`@theme\` partial
 *
 * GENERATED by scripts/build-theme-partial.mjs. Do not edit.
 * Source of truth: src/styles/*-theme.css (via src/styles/tokens.css imports).
 *
 * Built against tailwindcss ${tailwindVersion ?? "unknown"} — pin your app's Tailwind to this
 * minor to avoid namespace skew, and re-verify when you upgrade UDS.
 *
 * Registrations only: this file declares which Tailwind namespaces exist and
 * maps them to \`--uds-*\` custom properties. It does NOT define those custom
 * properties — their runtime values come from \`.../styles.css\`, which your app
 * must still import. Use it as a reference so nothing is emitted twice:
 *
 *   @import "@chghealthcare/unified-design-system/theme" theme(reference);
 *   @import "tailwindcss/theme.css" theme(reference);
 *   @import "tailwindcss/utilities.css" layer(utilities) source(none);
 *   @source "./";
 *
 * Import the resulting sheet AFTER styles.css. See setup.md.
 *
 * Included (in order): ${included.map((f) => f.name).join(", ")}
 */
`

const body = included.map(({ name, css }) => `/* ── ${name} ── */\n${css.trim()}\n`).join("\n")
const output = `${header}\n${body}`

// Guard 1, applied to the emitted artifact rather than only its inputs.
const emitted = classify(output)
if (!emitted.themeOnly) {
  console.error(
    "build-theme-partial: emitted partial is not @theme-only — refusing to write. " +
      "This is a bug in this script's concatenation, not in the sources.",
  )
  process.exit(1)
}
if (/@import/.test(stripComments(output))) {
  console.error(
    "build-theme-partial: emitted partial contains an @import — refusing to write. " +
      "The partial must be self-contained so consumers can reference it directly.",
  )
  process.exit(1)
}
// Tailwind discards plain comments while parsing but retains `/*! */` ones as AST
// nodes, and `theme(reference)` rejects any node that is not an `@theme` block.
// A bang-comment anywhere in the partial therefore breaks every consumer build.
if (output.includes("/*!")) {
  console.error(
    "build-theme-partial: emitted partial contains a `/*!` bang-comment — refusing to write. " +
      "Tailwind keeps those as AST nodes and `theme(reference)` accepts @theme blocks only. " +
      "Use a plain `/* */` comment instead.",
  )
  process.exit(1)
}

// The variants partial ships verbatim. Guard it the same way: it must declare
// only `@custom-variant` rules, so a consumer can import it without pulling in
// UDS styles, and it must actually contain the dark variant — silently shipping
// an empty file would leave every consumer's `dark:` utilities on OS-media
// semantics, which is the failure this export exists to prevent.
if (!fs.existsSync(variantsSource)) {
  console.error(`build-theme-partial: ${path.relative(root, variantsSource)} is missing.`)
  process.exit(1)
}
const variantsCss = fs.readFileSync(variantsSource, "utf8")
const variantsBare = stripComments(variantsCss).trim()
const variantNames = [...variantsBare.matchAll(/@custom-variant\s+([a-zA-Z0-9_-]+)/g)].map((m) => m[1])

if (variantNames.length === 0) {
  console.error(
    "build-theme-partial: uds-variants.css declares no @custom-variant — refusing to write. " +
      "Consumers rely on this file to match UDS's dark-mode semantics.",
  )
  process.exit(1)
}
if (variantsBare.replace(/@custom-variant[^;]+;/g, "").trim() !== "") {
  console.error(
    "build-theme-partial: uds-variants.css contains CSS other than @custom-variant declarations — " +
      "refusing to write. Consumers import it directly, so anything else here leaks into their build.",
  )
  process.exit(1)
}
if (!variantNames.includes("dark")) {
  console.error(
    "build-theme-partial: uds-variants.css no longer declares a `dark` variant. If UDS genuinely " +
      "dropped it, update this check and docs/consumer-tailwind-theme.md together.",
  )
  process.exit(1)
}

console.log("")
console.log("  build-theme-partial")
console.log(`  tailwindcss ${tailwindVersion ?? "unknown"}`)
for (const { name } of included) console.log(`  ✓ ${name}`)
console.log(`  ✓ uds-variants.css (${variantNames.join(", ")})`)

if (checkOnly) {
  console.log("  ✓ sources valid (--check, nothing written)")
  console.log("")
  process.exit(0)
}

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, output)
fs.writeFileSync(variantsOutFile, variantsCss)
console.log(`  → dist/theme.css (${output.length} bytes)`)
console.log(`  → dist/variants.css (${variantsCss.length} bytes)`)
console.log("")
