import { getVersionLineage, UDSGovernance } from "../manifest/governance.manifest";
import type { GovernanceConfig, VersionLineage } from "../manifest/types";
import { runPolicyEngine } from "../policies/policy.engine";
import type { PolicyViolation } from "../policies/policy.types";
import { detectDrift } from "./driftDetection";
import { buildDeterministicFeedback, sortAndDedupeViolations } from "./deterministicFeedback";
import { validateSchema } from "./schemaValidation";

export interface AIValidationResult {
  status: "pass" | "fail";
  violations: PolicyViolation[];
  warnings: PolicyViolation[];
  deterministicFeedback?: {
    fingerprint: string;
    summary: string;
    items: Array<{
      id: string;
      code: string;
      path: string;
      message: string;
      fix: string;
      severity: "error" | "warning";
    }>;
  };
  governanceVersionUsed: string;
  manifestVersionUsed: string;
  policyVersionUsed: string;
  timestamp: string;
  versionLineage: VersionLineage;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

function collectVersionViolations(
  output: unknown,
  governanceConfig: GovernanceConfig
): PolicyViolation[] {
  const payload = isRecord(output) ? output : null;
  if (!payload) return [];

  const checks: Array<{ key: "manifestVersion" | "governanceVersion" | "policyVersion"; expected: string }> = [
    { key: "manifestVersion", expected: governanceConfig.manifestVersion },
    { key: "governanceVersion", expected: governanceConfig.governanceVersion },
    { key: "policyVersion", expected: governanceConfig.policyVersion },
  ];

  const violations: PolicyViolation[] = [];
  for (const check of checks) {
    const reported = readString(payload[check.key]);
    if (!reported) continue;
    if (reported === check.expected) continue;
    violations.push({
      severity: "error",
      code: `RULE_VERSION_MISMATCH_${check.key.toUpperCase()}`,
      message: `${check.key} "${reported}" does not match expected "${check.expected}".`,
      path: check.key,
    });
  }
  return violations;
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
  violations.push(...collectVersionViolations(output, governanceConfig));

  if (schema.tree) {
    const policyViolations = runPolicyEngine(schema.tree, governanceConfig);
    const driftViolations = detectDrift(schema.tree);
    for (const violation of [...policyViolations, ...driftViolations]) {
      if (violation.severity === "error") violations.push(violation);
      else warnings.push(violation);
    }
  }

  const normalizedViolations = sortAndDedupeViolations(violations);
  const normalizedWarnings = sortAndDedupeViolations(warnings);
  const strict = governanceConfig.enforcement.strictMode;
  const hasErrors = normalizedViolations.length > 0;
  const status: "pass" | "fail" = strict ? (hasErrors ? "fail" : "pass") : "pass";
  const deterministicFeedback = hasErrors ? buildDeterministicFeedback(normalizedViolations) : undefined;

  return {
    status,
    violations: normalizedViolations,
    warnings: normalizedWarnings,
    deterministicFeedback,
    governanceVersionUsed: governanceConfig.governanceVersion,
    manifestVersionUsed: governanceConfig.manifestVersion,
    policyVersionUsed: governanceConfig.policyVersion,
    timestamp,
    versionLineage,
  };
}
