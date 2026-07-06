import { strict as assert } from "node:assert"
import { snapshotRootNodeId, validateFigmaArtifacts } from "./figma-artifacts-drift.mjs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..")

assert.equal(
  snapshotRootNodeId(
    { Footer: { nodeId: "2229:5569" }, nodes: { Footer: { nodeId: "2229:5569" } } },
    "Footer",
  ),
  "2229:5569",
)

assert.equal(
  snapshotRootNodeId({ nodes: { Card: { nodeId: "1340:4222" } } }, "Card"),
  "1340:4222",
)

const result = validateFigmaArtifacts(root)
if (!result.ok) {
  console.error(result.errors.join("\n"))
  process.exit(1)
}

console.log("figma-artifacts-drift: ok")
