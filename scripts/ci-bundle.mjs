/**
 * Bundles `.audit/entry-button.mjs` (single `Button` import from `dist/index.js`) and enforces a byte budget.
 * Requires `npm run build:lib` first. The lib build uses preserveModules so esbuild can tree-shake
 * to the Button subgraph instead of pulling the whole library barrel.
 */
import * as esbuild from "esbuild"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const auditDir = path.join(root, ".audit")
const entry = path.join(auditDir, "entry-button.mjs")
const outFile = path.join(auditDir, ".ci-bundle-output.mjs")
const budgetPath = path.join(auditDir, "bundle-budget.json")

const distIndex = path.join(root, "dist", "index.js")
if (!fs.existsSync(distIndex)) {
  console.error("ci:bundle: dist/index.js missing — run `npm run build:lib` first.")
  process.exit(1)
}

await esbuild.build({
  entryPoints: [entry],
  absWorkingDir: root,
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: outFile,
  logLevel: "warning",
})

const size = fs.statSync(outFile).size
const defaultMax = 1_500_000
const maxBytes = fs.existsSync(budgetPath)
  ? JSON.parse(fs.readFileSync(budgetPath, "utf8")).maxBundleBytes ?? defaultMax
  : defaultMax

try {
  if (size > maxBytes) {
    console.error(`ci:bundle: output is ${size} bytes (budget ${maxBytes}).`)
    process.exit(1)
  }
  console.log(`ci:bundle ok — ${size} bytes (budget ${maxBytes}).`)
} finally {
  fs.unlinkSync(outFile)
}
