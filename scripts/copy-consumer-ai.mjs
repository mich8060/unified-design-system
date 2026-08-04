#!/usr/bin/env node
/**
 * Copy UDS consumer AI stubs into the current working directory (consumer app).
 *
 * Usage (from consumer app root, after installing the package):
 *   npx uds-copy-ai-rules
 *   npx uds-copy-ai-rules --tool=cursor|claude|agents|copilot|all
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function findPackageRoot() {
  // scripts/ lives in the published package next to ai/
  const fromScripts = path.resolve(__dirname, "..")
  if (fs.existsSync(path.join(fromScripts, "ai/consumer-ai"))) {
    return fromScripts
  }
  // Dev: run from repo via node ./scripts/copy-consumer-ai.mjs
  const fromCwd = process.cwd()
  if (fs.existsSync(path.join(fromCwd, "ai/consumer-ai"))) {
    return fromCwd
  }
  // Installed: node_modules/@chghealthcare/unified-design-system
  const fromNm = path.resolve(
    fromCwd,
    "node_modules/@chghealthcare/unified-design-system",
  )
  if (fs.existsSync(path.join(fromNm, "ai/consumer-ai"))) {
    return fromNm
  }
  return null
}

function parseTool() {
  const arg = process.argv.find((a) => a.startsWith("--tool="))
  if (!arg) return "all"
  return arg.slice("--tool=".length).toLowerCase()
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest))
  fs.copyFileSync(src, dest)
  console.log(`Wrote ${path.relative(process.cwd(), dest) || dest}`)
}

const root = findPackageRoot()
if (!root) {
  console.error(
    "uds-copy-ai-rules: could not find @chghealthcare/unified-design-system/ai/consumer-ai",
  )
  process.exit(1)
}

const consumerAi = path.join(root, "ai/consumer-ai")
const cwd = process.cwd()
const tool = parseTool()

const jobs = {
  cursor: () => {
    copyFile(
      path.join(consumerAi, "cursor/uds.mdc"),
      path.join(cwd, ".cursor/rules/uds.mdc"),
    )
  },
  claude: () => {
    copyFile(
      path.join(consumerAi, "claude/CLAUDE.md"),
      path.join(cwd, "CLAUDE.md"),
    )
  },
  agents: () => {
    copyFile(
      path.join(consumerAi, "generic/AGENTS.md"),
      path.join(cwd, "AGENTS.md"),
    )
  },
  copilot: () => {
    copyFile(
      path.join(consumerAi, "generic/copilot-instructions.md"),
      path.join(cwd, ".github/copilot-instructions.md"),
    )
  },
}

if (tool === "all") {
  for (const fn of Object.values(jobs)) fn()
} else if (jobs[tool]) {
  jobs[tool]()
} else {
  console.error(
    `uds-copy-ai-rules: unknown --tool=${tool} (use cursor|claude|agents|copilot|all)`,
  )
  process.exit(1)
}

console.log(
  "Done. Re-run after upgrading @chghealthcare/unified-design-system so composition rules stay current.",
)
