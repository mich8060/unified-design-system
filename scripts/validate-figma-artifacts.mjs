#!/usr/bin/env node
/**
 * Validate Figma artifact consistency (manifest ↔ snapshots ↔ props).
 *
 *   node scripts/validate-figma-artifacts.mjs
 */

import path from "node:path"
import { fileURLToPath } from "node:url"
import { validateFigmaArtifacts } from "./lib/figma-artifacts-drift.mjs"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const { ok, errors, warnings } = validateFigmaArtifacts(root)

for (const w of warnings) console.warn(`validate-figma-artifacts: warning: ${w}`)

if (!ok) {
  console.error("validate-figma-artifacts: FAILED\n")
  for (const e of errors) console.error(`  • ${e}`)
  process.exit(1)
}

console.log(
  `validate-figma-artifacts: OK${warnings.length ? ` (${warnings.length} warning(s))` : ""}`,
)
