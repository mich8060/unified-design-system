import { UDSGovernance } from "../manifest/governance.manifest";
import type { GovernanceConfig, UINodeTree } from "../manifest/types";
import type { PolicyViolation } from "./policy.types";
import { enforceCompositionRule } from "./rules/composition.rules";
import { enforcePrimaryActionLimitRule } from "./rules/action.rules";
import { enforceSpacingTokenRule } from "./rules/spacing.rules";
import { enforceAccessibilityRule } from "./rules/accessibility.rules";

const POLICY_RULES = [
  enforceCompositionRule,
  enforcePrimaryActionLimitRule,
  enforceSpacingTokenRule,
  enforceAccessibilityRule,
] as const;

export function runPolicyEngine(
  tree: UINodeTree,
  governanceConfig: GovernanceConfig = UDSGovernance
): PolicyViolation[] {
  return POLICY_RULES.flatMap((rule) => rule({ tree, governanceConfig }));
}
