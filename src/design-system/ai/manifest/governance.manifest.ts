import { tokenVersion } from "../../tokens/runtime/index";
import { UDS_RUNTIME_VERSION } from "../../version";
import type { GovernanceConfig, VersionLineage } from "./types";

export const AI_MANIFEST_VERSION = "1.0.0";
export const AI_POLICY_VERSION = "1.0.0";

export const UDSGovernance: GovernanceConfig = {
  systemVersion: UDS_RUNTIME_VERSION,
  tokenVersion,
  manifestVersion: AI_MANIFEST_VERSION,
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

export function getVersionLineage(): VersionLineage {
  return {
    udsVersion: UDSGovernance.systemVersion,
    tokenVersion: UDSGovernance.tokenVersion,
    manifestVersion: UDSGovernance.manifestVersion,
    policyVersion: UDSGovernance.policyVersion,
  };
}
