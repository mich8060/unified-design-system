import {
  getChangedAIFiles,
  readJson,
  ensureAIFilesExist,
  failWith,
} from "./_ai-utils.mjs";

const ai = await import("../dist/ai/index.js");

const BLOCKING_DRIFT_CODES = new Set([
  "DRIFT_UNKNOWN_COMPONENT",
  "DRIFT_UNKNOWN_TOKEN",
  "DRIFT_INLINE_STYLE",
  "DRIFT_MARGIN_USAGE",
  "DRIFT_HARDCODED_COLOR",
  "DRIFT_DISALLOWED_NESTING",
]);

const files = getChangedAIFiles();
ensureAIFilesExist(files);

const violations = [];

for (const filePath of files) {
  const output = readJson(filePath);
  const tree = output.tree;
  if (!tree) continue;

  const driftReport = ai.detectDrift(tree);
  const blocking = driftReport.filter((item) => BLOCKING_DRIFT_CODES.has(item.code));
  if (blocking.length > 0) {
    violations.push({ filePath, blocking });
  }
}

if (violations.length > 0) {
  failWith("Drift enforcement failed.", violations);
}

console.info("[AI Governance] enforce-ai-usage passed.");
