import type { GovernanceManifest } from "./types";

export const AI_MANIFEST_VERSION = "1.0.0";
export const AI_GOVERNANCE_VERSION = "1.0.0";
export const AI_POLICY_VERSION = "1.0.0";
export const AI_CONTRACT_SCHEMA_VERSION = "1.0.0";
export const AI_COMPONENT_API_SCHEMA_VERSION = "1.0.0";
export const AI_SCHEMA_VERSION = AI_CONTRACT_SCHEMA_VERSION;
export const AI_API_SCHEMA_VERSION = AI_COMPONENT_API_SCHEMA_VERSION;

export const UDSGovernance: GovernanceManifest = {
  systemVersion: "0.2.55",
  tokenVersion: "1.0.0",
  manifestVersion: AI_MANIFEST_VERSION,
  governanceVersion: AI_GOVERNANCE_VERSION,
  policyVersion: AI_POLICY_VERSION,
  enforcement: {
    strictMode: true,
    allowAdHocValues: false,
    allowInlineStyles: false,
    allowUnknownComponents: false,
  },
  limits: {
    maxPrimaryActionsPerSection: 1,
    maxActionsPerToolbar: 3,
    maxNestingDepth: 8,
  },
  compliance: {
    accessibilityStandard: "WCAG-2.2-AA",
    spacingUnit: 4,
  },
};
