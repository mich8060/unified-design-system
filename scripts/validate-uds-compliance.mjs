#!/usr/bin/env node
/**
 * Validates TS/TSX/JS/JSX files against UDS consumer contract rules.
 * Source of truth: ai/uds-contract.json, AGENTS.md
 *
 * Usage:
 *   node scripts/validate-uds-compliance.mjs              # all scoped files
 *   node scripts/validate-uds-compliance.mjs --changed    # git changed files only
 *   node scripts/validate-uds-compliance.mjs path/to/file.tsx
 */

import { execSync } from "node:child_process"
import { readFileSync, existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const CONTRACT_PATH = path.join(ROOT, "ai/uds-contract.json")

const contract = JSON.parse(readFileSync(CONTRACT_PATH, "utf8"))
const ALLOWED_PACKAGE = contract.package.primaryEntry
const STYLE_IMPORT = contract.package.styleImport
const ALLOWED_IMPORTS = new Set(contract.imports?.allowed ?? [ALLOWED_PACKAGE, STYLE_IMPORT])
const FORBIDDEN_PATTERNS = contract.imports.forbiddenPatterns
const ANTI_PATTERNS = contract.antiPatterns ?? []

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css"])
const DEFAULT_SCOPES = [
  "examples/",
  "ai/examples/",
  "ai-generated/",
  ".consumer-perf/",
]

const LEGACY_PACKAGE = "@mich8060/chg-design-system"
const UDS_COMPONENT_IMPORT =
  /\bfrom\s+["'](@chghealthcare\/unified-design-system|@mich8060\/chg-design-system)["']/
const STYLE_IMPORT_RE =
  /import\s+["'](@chghealthcare\/unified-design-system\/styles\.css|@mich8060\/chg-design-system\/styles\.css)["']/

const RADIUS_VIOLATIONS = [
  {
    id: "radius-rounded-2xl",
    re: /\brounded-2xl\b/,
    message: "Use rounded-[length:var(--uds-radius-8)] or rounded-[length:var(--uds-radius-12)] (max 12px for rectangles).",
  },
  {
    id: "radius-rounded-3xl",
    re: /\brounded-3xl\b/,
    message: "Corner radius must not exceed 12px for rectangular surfaces.",
  },
  {
    id: "radius-arbitrary-large",
    re: /\brounded-\[(?:1[3-9]|[2-9]\d)px\]/,
    message: "Arbitrary corner radius exceeds the 12px cap for rectangles.",
  },
]

const STRING_ANTI_PATTERNS = [
  {
    id: "docs-site-data-brand",
    re: /docs-site-data-brand/,
    message: "Do not use docs-site-data-brand in consumer apps. Use Menu brand prop instead.",
  },
  {
    id: "sidebar-in-menu",
    re: /AppShell[\s\S]{0,200}menu=\{[\s\S]{0,200}Sidebar/,
    message: "Do not put Sidebar* in AppShell.menu. Compose the menu slot with Menu.",
  },
  {
    id: "appshell-main-collapse",
    re: /\.appshell--main\s*>\s*:first-child/,
    message: "Do not use CSS that collapses .appshell--main > :first-child to fix layout.",
  },
  {
    id: "deprecated-appshell-props",
    re: /\b(sidebarWidth|showListview|mainClassName)\s*=/,
    message: "sidebarWidth, showListview, and mainClassName are not on the published AppShell API.",
  },
]

/** Prose anti-patterns already enforced by STRING_ANTI_PATTERNS or forbidden imports */
const COVERED_ANTI_PATTERN_RE =
  /docs-site-data-brand|Sidebar\* in AppShell\.menu|\.appshell--main\s*>\s*:first-child|sidebarWidth|showListview|mainClassName|src\/components\/ui|dist\/\*/i

/**
 * Derive machine-checkable rules from contract anti-pattern prose.
 * @param {string} anti
 * @returns {{ id: string, message: string, lineRe: RegExp, test: (content: string) => boolean }[]}
 */
function deriveAntiPatternChecks(anti) {
  /** @type {{ id: string, message: string, lineRe: RegExp, test: (content: string) => boolean }[]} */
  const checks = []

  if (/fixed inset-y-0 rail CSS/i.test(anti)) {
    checks.push({
      id: "anti-sidebar-fixed-rail",
      message: anti,
      lineRe: /\bfixed\s+inset-y-0\b/,
      test: (content) => /\bfixed\s+inset-y-0\b/.test(content),
    })
  }

  if (COVERED_ANTI_PATTERN_RE.test(anti)) return checks

  if (/react-router-dom fills AppShell/i.test(anti)) {
    checks.push({
      id: "anti-router-without-layout-route",
      message: anti,
      lineRe: /\bAppShell\b/,
      test: (content) =>
        /from\s+["']react-router-dom["']/.test(content) &&
        /\bAppShell\b/.test(content) &&
        !/<Route\b|createBrowserRouter|<Outlet\b/.test(content),
    })
  }

  if (/stock shadcn layout patterns/i.test(anti)) {
    checks.push({
      id: "anti-shadcn-ui-import",
      message: anti,
      lineRe: /from\s+["']@\/components\/ui\//,
      test: (content) => /from\s+["']@\/components\/ui\//.test(content),
    })
  }

  if (/parallel component system/i.test(anti)) {
    checks.push({
      id: "anti-parallel-primitive-component",
      message: anti,
      lineRe: /(?:function|const)\s+Custom(?:Button|Badge|Status|Field)\b/,
      test: (content) =>
        /(?:function|const)\s+Custom(?:Button|Badge|Status|Field)\b/.test(content),
    })
  }

  if (/bespoke outer shell/i.test(anti)) {
    checks.push({
      id: "anti-bespoke-aside-shell",
      message: anti,
      lineRe: /<aside\b/,
      test: (content) =>
        /<aside\b[^>]*className=["'][^"']*(?:fixed|inset-y-0|min-h-(?:screen|dvh))/.test(content),
    })
  }

  return checks
}

const CONTRACT_ANTI_PATTERN_CHECKS = ANTI_PATTERNS.flatMap(deriveAntiPatternChecks)

/** @param {string} filePath */
function getConsumerRoot(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/")
  for (const scope of DEFAULT_SCOPES) {
    if (!rel.startsWith(scope)) continue
    const remainder = rel.slice(scope.length)
    const firstSegment = remainder.split("/")[0]
    if (!firstSegment) return path.join(ROOT, scope.replace(/\/$/, ""))
    return path.join(ROOT, scope, firstSegment)
  }
  return path.dirname(filePath)
}

/** @param {string} consumerRoot */
function consumerHasStyleImport(consumerRoot) {
  try {
    const out = execSync(`git ls-files "${path.relative(ROOT, consumerRoot).replace(/\\/g, "/")}"`, {
      cwd: ROOT,
      encoding: "utf8",
    }).trim()
    for (const rel of out.split("\n").filter(Boolean)) {
      const ext = path.extname(rel)
      if (!SOURCE_EXTENSIONS.has(ext) || ext === ".css") continue
      const content = readFileSync(path.join(ROOT, rel), "utf8")
      if (STYLE_IMPORT_RE.test(content)) return true
    }
  } catch {
    // fall through
  }
  return false
}

/** @param {string} filePath */
function isScopedFile(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/")
  if (rel.startsWith("src/components/ui/")) return false
  if (rel.startsWith("src/docs/")) return false
  if (rel.startsWith("scripts/")) return false
  return DEFAULT_SCOPES.some((scope) => rel.startsWith(scope))
}

/** @returns {string[]} */
function getChangedFiles() {
  try {
    const staged = execSync("git diff --name-only --cached", {
      cwd: ROOT,
      encoding: "utf8",
    }).trim()
    const unstaged = execSync("git diff --name-only", {
      cwd: ROOT,
      encoding: "utf8",
    }).trim()
    const untracked = execSync("git ls-files --others --exclude-standard", {
      cwd: ROOT,
      encoding: "utf8",
    }).trim()
    const all = new Set(
      [...staged.split("\n"), ...unstaged.split("\n"), ...untracked.split("\n")]
        .map((f) => f.trim())
        .filter(Boolean),
    )
    return [...all]
      .map((f) => path.resolve(ROOT, f))
      .filter((f) => existsSync(f) && SOURCE_EXTENSIONS.has(path.extname(f)))
  } catch {
    return []
  }
}

/** @returns {string[]} */
function getDefaultFiles() {
  const files = []
  for (const scope of DEFAULT_SCOPES) {
    const abs = path.join(ROOT, scope)
    if (!existsSync(abs)) continue
    try {
      const out = execSync(`git ls-files "${scope.replace(/\/$/, "")}"`, {
        cwd: ROOT,
        encoding: "utf8",
      }).trim()
      for (const rel of out.split("\n").filter(Boolean)) {
        const file = path.resolve(ROOT, rel)
        if (SOURCE_EXTENSIONS.has(path.extname(file))) files.push(file)
      }
    } catch {
      // scope may not exist in git yet
    }
  }
  return files
}

/** @param {string} importPath */
function matchesForbiddenPattern(importPath) {
  for (const pattern of FORBIDDEN_PATTERNS) {
    const glob = pattern.replace(/\*/g, ".*")
    if (new RegExp(`^${glob}$`).test(importPath)) return pattern
  }
  return null
}

/** @param {string} content */
function extractImportPaths(content) {
  const imports = []
  const re = /(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g
  let match
  while ((match = re.exec(content)) !== null) {
    imports.push(match[1])
  }
  return imports
}

/** @typedef {{ file: string, rule: string, line: number, message: string }} Violation */

/** @param {string} filePath @returns {Violation[]} */
function validateFile(filePath) {
  /** @type {Violation[]} */
  const violations = []
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/")
  const content = readFileSync(filePath, "utf8")
  const lines = content.split("\n")

  for (const importPath of extractImportPaths(content)) {
    if (importPath === LEGACY_PACKAGE || importPath.startsWith(`${LEGACY_PACKAGE}/`)) {
      violations.push({
        file: rel,
        rule: "legacy-package",
        line: findLine(lines, importPath),
        message: `Use ${ALLOWED_PACKAGE} instead of ${LEGACY_PACKAGE}.`,
      })
    }

    const forbidden = matchesForbiddenPattern(importPath)
    if (forbidden) {
      violations.push({
        file: rel,
        rule: "forbidden-import",
        line: findLine(lines, importPath),
        message: `Forbidden import pattern "${forbidden}": ${importPath}`,
      })
    }

    if (
      importPath.startsWith("@chghealthcare/unified-design-system/") &&
      !ALLOWED_IMPORTS.has(importPath)
    ) {
      violations.push({
        file: rel,
        rule: "deep-import",
        line: findLine(lines, importPath),
        message: `Import from ${ALLOWED_PACKAGE} (or an allowed optional subpath in ai/uds-contract.json imports.allowed), not ${importPath}.`,
      })
    }
  }

  if (UDS_COMPONENT_IMPORT.test(content)) {
    const consumerRoot = getConsumerRoot(filePath)
    if (!consumerHasStyleImport(consumerRoot)) {
      violations.push({
        file: rel,
        rule: "missing-styles",
        line: 1,
        message: `Import ${STYLE_IMPORT} in the consumer app entry (e.g. main.tsx).`,
      })
    }
  }

  for (const check of RADIUS_VIOLATIONS) {
    for (let i = 0; i < lines.length; i++) {
      if (check.re.test(lines[i])) {
        violations.push({
          file: rel,
          rule: check.id,
          line: i + 1,
          message: check.message,
        })
      }
    }
  }

  for (const check of STRING_ANTI_PATTERNS) {
    if (check.re.test(content)) {
      violations.push({
        file: rel,
        rule: check.id,
        line: findLine(lines, check.re),
        message: check.message,
      })
    }
  }

  for (const check of CONTRACT_ANTI_PATTERN_CHECKS) {
    if (check.test(content)) {
      violations.push({
        file: rel,
        rule: check.id,
        line: findLine(lines, check.lineRe),
        message: check.message,
      })
    }
  }

  return violations
}

/** @param {string[]} lines @param {string|RegExp} needle */
function findLine(lines, needle) {
  for (let i = 0; i < lines.length; i++) {
    if (typeof needle === "string" ? lines[i].includes(needle) : needle.test(lines[i])) {
      return i + 1
    }
  }
  return 1
}

/** @param {Violation[]} violations */
function formatReport(violations) {
  const grouped = new Map()
  for (const v of violations) {
    const key = v.file
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(v)
  }

  const parts = ["UDS compliance violations found:", ""]
  for (const [file, items] of grouped) {
    parts.push(`${file}:`)
    for (const item of items) {
      parts.push(`  L${item.line} [${item.rule}] ${item.message}`)
    }
    parts.push("")
  }
  parts.push("Fix these issues to match ai/uds-contract.json and AGENTS.md.")
  return parts.join("\n")
}

function resolveTargetFiles(argv) {
  if (argv.includes("--changed")) {
    return getChangedFiles().filter(isScopedFile)
  }

  const explicit = argv
    .filter((arg) => !arg.startsWith("-"))
    .map((arg) => path.resolve(process.cwd(), arg))
    .filter((f) => existsSync(f) && SOURCE_EXTENSIONS.has(path.extname(f)))

  if (explicit.length > 0) return explicit

  return getDefaultFiles()
}

function main() {
  const files = resolveTargetFiles(process.argv.slice(2))

  if (files.length === 0) {
    console.log("validate-uds-compliance: no files to check")
    process.exit(0)
  }

  /** @type {Violation[]} */
  const allViolations = []
  for (const file of files) {
    allViolations.push(...validateFile(file))
  }

  if (allViolations.length === 0) {
    console.log(`validate-uds-compliance: OK (${files.length} file(s))`)
    process.exit(0)
  }

  console.error(formatReport(allViolations))
  process.exit(1)
}

main()
