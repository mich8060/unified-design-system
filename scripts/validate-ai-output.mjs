import { getChangedAIFiles, readJson, ensureAIFilesExist, failWith } from "./_ai-utils.mjs";

const REQUIRED_KEYS = [
  "manifestVersion",
  "governanceVersion",
  "policyVersion",
  "tree",
  "audit",
];

const ai = await import("../dist/ai/index.js");

const files = getChangedAIFiles();
ensureAIFilesExist(files);

let hasFailure = false;

for (const filePath of files) {
  const output = readJson(filePath);
  const missingKeys = REQUIRED_KEYS.filter((key) => !(key in output));
  if (missingKeys.length > 0) {
    hasFailure = true;
    console.error(
      `[AI Governance] ${filePath} is missing required keys: ${missingKeys.join(", ")}`
    );
    continue;
  }

  const result = ai.validateAIOutput(output, ai.UDSGovernance);
  if (result.status === "fail") {
    hasFailure = true;
    console.error(`[AI Governance] Validation failed for ${filePath}`);
    console.error(JSON.stringify(result.violations, null, 2));
  }
}

if (hasFailure) {
  failWith("AI output validation failed.");
}

console.info("[AI Governance] validate-ai-output passed.");
