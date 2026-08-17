/**
 * TD-UDS-002 — assert published dist/styles.css does not flatten InputGroup
 * separator padding into global `.border-t` / `.border-b` utility rules.
 *
 * Requires `npm run build:lib` first.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const distCss = path.join(root, "dist", "styles.css")

if (!fs.existsSync(distCss)) {
  console.error(
    "test:border-utility-css: dist/styles.css missing — run `npm run build:lib` first.",
  )
  process.exit(1)
}

const css = fs.readFileSync(distCss, "utf8")

/**
 * Find rule blocks whose selector is only `.border-t` or `.border-b` (optionally
 * with escapes / whitespace) and whose declarations include padding-top/bottom.
 * Compounds like `.uds-…[class~="border-t"]` are allowed.
 *
 * @param {string} side `t` | `b`
 * @param {string} paddingProp `padding-top` | `padding-bottom`
 */
function hasBareBorderPaddingCollision(side, paddingProp) {
  const utility = `border-${side}`
  // Match selectors that end with .border-t or .border-b as the only class
  // (not preceded by another class / attribute compound on the same simple selector).
  const re = new RegExp(
    `(^|[{},\\s])\\.${utility}\\s*\\{([^}]*)\\}`,
    "g",
  )
  let match
  while ((match = re.exec(css)) !== null) {
    const body = match[2]
    if (body.includes(paddingProp)) {
      return true
    }
  }
  return false
}

const badT = hasBareBorderPaddingCollision("t", "padding-top")
const badB = hasBareBorderPaddingCollision("b", "padding-bottom")

const hasCompoundT =
  css.includes('.uds-input-group-addon--block-end[class~="border-t"]') ||
  css.includes(".uds-input-group-addon--block-end[class~=border-t]")
const hasCompoundB =
  css.includes('.uds-input-group-addon--block-start[class~="border-b"]') ||
  css.includes(".uds-input-group-addon--block-start[class~=border-b]")

if (badT || badB) {
  console.error(
    "test:border-utility-css: FAIL — bare .border-t/.border-b rules still set padding (TD-UDS-002).",
  )
  if (badT) console.error("  found .border-t { … padding-top … }")
  if (badB) console.error("  found .border-b { … padding-bottom … }")
  process.exit(1)
}

if (!hasCompoundT || !hasCompoundB) {
  console.error(
    "test:border-utility-css: FAIL — expected InputGroup compound selectors missing from dist/styles.css.",
  )
  if (!hasCompoundT) {
    console.error('  missing .uds-input-group-addon--block-end[class~="border-t"]')
  }
  if (!hasCompoundB) {
    console.error('  missing .uds-input-group-addon--block-start[class~="border-b"]')
  }
  process.exit(1)
}

console.log(
  "test:border-utility-css: OK — no bare border-t/b padding collision; compounds present.",
)
