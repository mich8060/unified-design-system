import { getVersionLineage, UDSGovernance } from "../manifest/governance.manifest";
import type { GovernanceConfig, VersionLineage } from "../manifest/types";
import { runPolicyEngine } from "../policies/policy.engine";
import type { PolicyViolation } from "../policies/policy.types";
import { detectDrift } from "./driftDetection";
import { validateSchema } from "./schemaValidation";

export interface AIValidationResult {
  status: "pass" | "fail";
  violations: PolicyViolation[];
  warnings: PolicyViolation[];
  governanceVersionUsed: string;
  manifestVersionUsed: string;
  timestamp: string;
  versionLineage: VersionLineage;
}

export function validateAIOutput(
  output: unknown,
  governanceConfig: GovernanceConfig = UDSGovernance
): AIValidationResult {
  const schema = validateSchema(output);
  const timestamp = new Date().toISOString();
  const versionLineage = getVersionLineage();

  const violations: PolicyViolation[] = [...schema.violations];
  const warnings: PolicyViolation[] = [];

  if (schema.tree) {
    const policyViolations = runPolicyEngine(schema.tree, governanceConfig);
    const driftViolations = detectDrift(schema.tree);
    for (const violation of [...policyViolations, ...driftViolations]) {
      if (violation.severity === "error") violations.push(violation);
      else warnings.push(violation);
    }
  }

  const strict = governanceConfig.enforcement.strictMode;
  const hasErrors = violations.length > 0;
  const status: "pass" | "fail" = strict ? (hasErrors ? "fail" : "pass") : "pass";

  return {
    status,
    violations,
    warnings,
    governanceVersionUsed: governanceConfig.policyVersion,
    manifestVersionUsed: governanceConfig.manifestVersion,
    timestamp,
    versionLineage,
  };
}
