#!/usr/bin/env node
/**
 * Validates design-language/ knowledge objects against ai/uds-contract.json's
 * front-matter contract: _meta/front-matter-schema.md.
 *
 * Checks:
 *  - front matter present, required fields set, enums valid
 *  - `id` unique across the corpus
 *  - relationship fields (related/depends_on/influences/conflicts_with/alternatives)
 *    resolve to a real id (design-language doc or ai/recipes/*.md recipe)
 *  - markdown links resolve to a file that exists on disk
 *
 * Usage:
 *   node scripts/validate-design-language.mjs
 */

import { readFileSync, existsSync } from "node:fs"
import { readdirSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DESIGN_LANGUAGE_DIR = path.join(ROOT, "design-language")
const RECIPES_DIR = path.join(ROOT, "ai/recipes")

const CATEGORY_ENUM = new Set([
  "philosophy", "physics", "semantics", "grammar", "decision", "relationship",
  "pattern", "ontology", "foundation", "composition", "interaction",
  "accessibility", "anti-pattern", "example", "component", "index",
])
const TYPE_ENUM = new Set(["concept", "rule", "pattern", "principle", "object", "tree", "index"])
const PRIORITY_ENUM = new Set(["critical", "high", "medium", "low"])
const CONFIDENCE_ENUM = new Set([
  "required", "preferred", "recommended", "fallback", "experimental", "deprecated",
])
const DESIGN_INTENT_ENUM = new Set([
  "scanability", "comparison", "editing", "navigation", "discovery", "confirmation",
  "temporary_workspace",
  "interrupt_workflow", "prevent_harm", "obtain_confirmation",
])
const REQUIRED_FIELDS = [
  "id", "category", "type", "priority", "ai_priority", "confidence_default",
  "related", "components", "patterns", "tokens", "depends_on", "influences",
  "conflicts_with", "alternatives",
]
const REF_FIELDS = ["related", "depends_on", "influences", "conflicts_with", "alternatives"]
const LIST_FIELDS = new Set([...REF_FIELDS, "components", "patterns", "tokens", "design_intent"])

function walkMarkdownFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) out.push(...walkMarkdownFiles(full))
    else if (entry.endsWith(".md")) out.push(full)
  }
  return out
}

/** Minimal front-matter parser matching the flat `key: value` / `key:\n  - item` shape used across design-language/. */
function parseFrontMatter(source) {
  if (!source.startsWith("---\n")) return null
  const end = source.indexOf("\n---", 3)
  if (end === -1) return null
  const block = source.slice(4, end)
  const data = {}
  let listKey = null
  for (const line of block.split("\n")) {
    if (/^\s+-\s+/.test(line) && listKey) {
      const raw = line.replace(/^\s+-\s+/, "").trim()
      const item = raw.replace(/^["']|["']$/g, "")
      if (item && item !== "[]") data[listKey].push(item)
      continue
    }
    listKey = null
    const m = line.match(/^([a-z_]+):\s*(.*)$/)
    if (!m) continue
    const [, key, rawValue] = m
    const value = rawValue.trim()
    if (value === "[]" || value === "") {
      data[key] = []
      if (value === "") listKey = key
    } else if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean)
    } else {
      data[key] = value.replace(/^["']|["']$/g, "")
    }
  }
  return data
}

function findLinks(body) {
  const links = []
  const re = /\]\(([^)]+)\)/g
  let m
  while ((m = re.exec(body))) links.push(m[1].split(" ")[0].trim())
  return links
}

function main() {
  const files = walkMarkdownFiles(DESIGN_LANGUAGE_DIR)
  const recipeIds = existsSync(RECIPES_DIR)
    ? readdirSync(RECIPES_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""))
    : []

  /** @type {{file: string, message: string}[]} */
  const errors = []
  const docs = []
  const idToFiles = new Map()

  for (const file of files) {
    const rel = path.relative(DESIGN_LANGUAGE_DIR, file)
    const source = readFileSync(file, "utf8")
    const fm = parseFrontMatter(source)
    if (!fm) {
      errors.push({ file: rel, message: "missing or malformed front matter" })
      continue
    }
    for (const field of REQUIRED_FIELDS) {
      if (!(field in fm)) errors.push({ file: rel, message: `missing required field \`${field}\`` })
    }
    if (fm.category && !CATEGORY_ENUM.has(fm.category))
      errors.push({ file: rel, message: `invalid category \`${fm.category}\`` })
    if (fm.type && !TYPE_ENUM.has(fm.type))
      errors.push({ file: rel, message: `invalid type \`${fm.type}\`` })
    if (fm.priority && !PRIORITY_ENUM.has(fm.priority))
      errors.push({ file: rel, message: `invalid priority \`${fm.priority}\`` })
    if (fm.ai_priority && !PRIORITY_ENUM.has(fm.ai_priority))
      errors.push({ file: rel, message: `invalid ai_priority \`${fm.ai_priority}\`` })
    if (fm.confidence_default && !CONFIDENCE_ENUM.has(fm.confidence_default))
      errors.push({ file: rel, message: `invalid confidence_default \`${fm.confidence_default}\`` })
    for (const field of LIST_FIELDS) {
      if (field in fm && !Array.isArray(fm[field]))
        errors.push({ file: rel, message: `\`${field}\` must be a list` })
    }
    if ("design_intent" in fm) {
      if (!Array.isArray(fm.design_intent))
        errors.push({ file: rel, message: "`design_intent` must be a list" })
      else {
        for (const value of fm.design_intent) {
          if (!DESIGN_INTENT_ENUM.has(value))
            errors.push({ file: rel, message: `invalid design_intent \`${value}\`` })
        }
      }
    }
    if (fm.id) {
      if (!idToFiles.has(fm.id)) idToFiles.set(fm.id, [])
      idToFiles.get(fm.id).push(rel)
    }
    const end = source.indexOf("\n---", 3)
    const body = end === -1 ? "" : source.slice(end + 4)
    docs.push({ rel, dir: path.dirname(file), fm, body })
  }

  for (const [id, relFiles] of idToFiles) {
    if (relFiles.length > 1)
      errors.push({ file: relFiles.join(", "), message: `duplicate id \`${id}\` used in multiple files` })
  }

  const knownIds = new Set([...idToFiles.keys(), ...recipeIds])

  for (const { rel, dir, fm, body } of docs) {
    for (const field of REF_FIELDS) {
      for (const value of fm[field] ?? []) {
        if (!knownIds.has(value))
          errors.push({ file: rel, message: `\`${field}\` references unknown id \`${value}\`` })
      }
    }
    for (const link of findLinks(body)) {
      if (link.startsWith("http") || link.startsWith("#") || link.startsWith("mailto:")) continue
      const target = link.split("#")[0]
      if (!target) continue
      const resolved = path.normalize(path.join(dir, target))
      if (!existsSync(resolved))
        errors.push({ file: rel, message: `broken link \`${link}\` (resolves to missing ${path.relative(ROOT, resolved)})` })
    }
  }

  if (errors.length === 0) {
    console.log(`validate-design-language: OK (${files.length} file(s), ${idToFiles.size} ids)`)
    process.exit(0)
  }

  const grouped = new Map()
  for (const err of errors) {
    if (!grouped.has(err.file)) grouped.set(err.file, [])
    grouped.get(err.file).push(err.message)
  }
  const lines = []
  for (const [file, messages] of grouped) {
    lines.push(`${file}:`)
    for (const message of messages) lines.push(`  - ${message}`)
  }
  console.error(lines.join("\n"))
  console.error(`\nvalidate-design-language: ${errors.length} issue(s) in ${grouped.size} file(s)`)
  process.exit(1)
}

main()
