import type { GovernanceManifest } from "./types";

export const UDSGovernance: GovernanceManifest = {
  systemVersion: "0.2.12",
  tokenVersion: "1.0.0",
  manifestVersion: "1.0.0",
  policyVersion: "1.0.0",
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
