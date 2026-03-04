import { UDS_TRAINING_EXAMPLES } from "../src/design-system/ai/examples/training.examples.ts";

const ai = await import("../dist/ai/index.js");

let failed = 0;

for (const example of UDS_TRAINING_EXAMPLES) {
  const result = ai.validateAIOutput(example.output, ai.UDSGovernance);
  const codes = new Set(result.violations.map((v) => v.code));

  if (result.status !== example.expected.status) {
    failed += 1;
    console.error(
      `[FAIL] ${example.id}: expected status "${example.expected.status}" but got "${result.status}"`
    );
    continue;
  }

  const expectedCodes = example.expected.violationCodes ?? [];
  const missingCodes = expectedCodes.filter((code) => !codes.has(code));
  if (missingCodes.length > 0) {
    failed += 1;
    console.error(
      `[FAIL] ${example.id}: missing expected violation codes: ${missingCodes.join(", ")}`
    );
    continue;
  }

  if (example.expected.status === "fail") {
    const repeat = ai.validateAIOutput(example.output, ai.UDSGovernance);
    const firstFeedback = result.deterministicFeedback ?? null;
    const secondFeedback = repeat.deterministicFeedback ?? null;
    if (JSON.stringify(firstFeedback) !== JSON.stringify(secondFeedback)) {
      failed += 1;
      console.error(
        `[FAIL] ${example.id}: deterministic feedback changed across repeated validation runs`
      );
    }
  }

  console.log(`[PASS] ${example.id}`);
}

if (failed > 0) {
  console.error(`AI training example validation failed with ${failed} failing case(s).`);
  process.exit(1);
}

console.log(`AI training examples validated (${UDS_TRAINING_EXAMPLES.length} cases).`);
