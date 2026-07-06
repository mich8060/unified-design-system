/**
 * Cross-check Figma artifact consistency (manifest ↔ snapshots ↔ props).
 * Does not call the Figma API — repo-internal drift only.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs"
import path from "node:path"

const EXPECTED_FILE_KEY = "3bTua8rojOOC7tYWIEWJl0"

/**
 * @param {unknown} snapshot
 * @param {string | undefined} figmaName
 */
export function snapshotRootNodeId(snapshot, figmaName) {
  if (!snapshot || typeof snapshot !== "object") return null
  const s = /** @type {Record<string, unknown>} */ (snapshot)
  if (figmaName && typeof s[figmaName] === "object" && s[figmaName]) {
    const id = /** @type {{ nodeId?: string }} */ (s[figmaName]).nodeId
    if (id) return id
  }
  const nodes = s.nodes
  if (nodes && typeof nodes === "object") {
    if (figmaName && figmaName in nodes) {
      const id = /** @type {{ nodeId?: string }} */ (nodes[figmaName]).nodeId
      if (id) return id
    }
    for (const entry of Object.values(nodes)) {
      if (entry && typeof entry === "object" && "nodeId" in entry) {
        const id = /** @type {{ nodeId?: string }} */ (entry).nodeId
        if (id) return id
      }
    }
  }
  return null
}

/**
 * @param {string} root Repo root
 * @returns {{ ok: boolean; errors: string[]; warnings: string[] }}
 */
export function validateFigmaArtifacts(root) {
  const errors = []
  const warnings = []

  const manifestPath = path.join(root, "ai/figma-component-manifest.json")
  const propsPath = path.join(root, "ai/figma-component-props.json")

  if (!existsSync(manifestPath)) {
    return { ok: false, errors: ["Missing ai/figma-component-manifest.json"], warnings }
  }
  if (!existsSync(propsPath)) {
    return { ok: false, errors: ["Missing ai/figma-component-props.json"], warnings }
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
  const props = JSON.parse(readFileSync(propsPath, "utf8"))
  const statusBySlug = manifest.statusBySlug ?? {}
  const manifestFileKey = manifest.fileKey

  if (manifestFileKey && manifestFileKey !== EXPECTED_FILE_KEY) {
    errors.push(`manifest fileKey ${manifestFileKey} !== ${EXPECTED_FILE_KEY}`)
  }
  if (props.fileKey && props.fileKey !== EXPECTED_FILE_KEY) {
    errors.push(`figma-component-props fileKey ${props.fileKey} !== ${EXPECTED_FILE_KEY}`)
  }

  /** @type {Map<string, { slug: string; figmaName?: string }>} */
  const byNodeId = new Map()

  for (const [slug, entry] of Object.entries(statusBySlug)) {
    const spec = /** @type {Record<string, unknown>} */ (entry)
    const status = spec.status
    if (status !== "in-figma") continue

    const nodeId = spec.nodeId
    const figmaName = typeof spec.figmaName === "string" ? spec.figmaName : undefined
    const figmaSnapshot =
      typeof spec.figmaSnapshot === "string"
        ? spec.figmaSnapshot
        : extractSnapshotFromNote(spec.note)

    if (!nodeId) {
      errors.push(`in-figma slug "${slug}" missing nodeId`)
      continue
    }

    if (byNodeId.has(nodeId)) {
      const other = byNodeId.get(nodeId)
      errors.push(
        `duplicate manifest nodeId ${nodeId} on slugs "${slug}" and "${other?.slug}"`,
      )
    } else {
      byNodeId.set(nodeId, { slug, figmaName })
    }

    if (!figmaSnapshot) continue

    const snapshotPath = path.join(root, figmaSnapshot)
    if (!existsSync(snapshotPath)) {
      errors.push(`slug "${slug}" figmaSnapshot missing file: ${figmaSnapshot}`)
      continue
    }

    const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"))
    if (snapshot.fileKey && snapshot.fileKey !== EXPECTED_FILE_KEY) {
      errors.push(`${figmaSnapshot}: fileKey ${snapshot.fileKey} !== ${EXPECTED_FILE_KEY}`)
    }

    const snapshotNodeId = snapshotRootNodeId(snapshot, figmaName)
    if (!snapshotNodeId) {
      errors.push(`${figmaSnapshot}: could not resolve root nodeId for ${figmaName ?? slug}`)
    } else if (snapshotNodeId !== nodeId) {
      errors.push(
        `${figmaSnapshot}: nodeId ${snapshotNodeId} !== manifest slug "${slug}" nodeId ${nodeId}`,
      )
    }
  }

  const propsComponents = props.components ?? {}
  for (const [name, spec] of Object.entries(propsComponents)) {
    const nodeId = /** @type {{ nodeId?: string }} */ (spec).nodeId
    if (!nodeId) continue

    const manifestHit = byNodeId.get(nodeId)
    if (!manifestHit) {
      warnings.push(
        `figma-component-props "${name}" nodeId ${nodeId} not found in in-figma manifest slugs`,
      )
      continue
    }

    const figmaSnapshot = /** @type {{ figmaSnapshot?: string }} */ (spec).figmaSnapshot
    if (figmaSnapshot) {
      const snapshotPath = path.join(root, figmaSnapshot)
      if (!existsSync(snapshotPath)) {
        errors.push(`props "${name}" figmaSnapshot missing file: ${figmaSnapshot}`)
        continue
      }
      const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"))
      const snapshotNodeId = snapshotRootNodeId(snapshot, name)
      if (snapshotNodeId && snapshotNodeId !== nodeId) {
        errors.push(
          `props "${name}" nodeId ${nodeId} !== snapshot ${figmaSnapshot} nodeId ${snapshotNodeId}`,
        )
      }
    }
  }

  const aiDir = path.join(root, "ai")
  const snapshotFiles = readdirSync(aiDir).filter((f) => f.endsWith(".snapshot.json"))
  /** @type {Set<string>} */
  const referencedSnapshots = new Set()
  for (const entry of Object.values(statusBySlug)) {
    const spec = /** @type {Record<string, unknown>} */ (entry)
    if (typeof spec.figmaSnapshot === "string") referencedSnapshots.add(spec.figmaSnapshot)
    const fromNote = extractSnapshotFromNote(spec.note)
    if (fromNote) referencedSnapshots.add(fromNote)
  }
  for (const spec of Object.values(propsComponents)) {
    const snap = /** @type {{ figmaSnapshot?: string }} */ (spec).figmaSnapshot
    if (snap) referencedSnapshots.add(snap)
  }

  for (const file of snapshotFiles) {
    const rel = `ai/${file}`
    if (!referencedSnapshots.has(rel)) {
      warnings.push(`orphan snapshot (not linked from manifest note/figmaSnapshot or props): ${rel}`)
    }
  }

  return { ok: errors.length === 0, errors, warnings }
}

/** @param {unknown} note */
function extractSnapshotFromNote(note) {
  if (typeof note !== "string") return null
  const m = note.match(/ai\/figma-[a-z0-9-]+\.snapshot\.json/)
  return m ? m[0] : null
}
