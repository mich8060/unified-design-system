import { tokenVersion } from "../../tokens/runtime/index";
import { UDS_RUNTIME_VERSION } from "../../version";
import { ComponentRegistry } from "./components.manifest";
import { UDSGovernance } from "./governance.manifest";
import { LayoutRules } from "./layout.manifest";
import { PatternRegistry } from "./patterns.manifest";
import { TokenIntentMap } from "./tokens.intent.manifest";
import type { UDSManifestType } from "./types";

export const UDSManifest: UDSManifestType = {
  version: UDS_RUNTIME_VERSION,
  tokenVersion,
  components: ComponentRegistry,
  patterns: PatternRegistry,
  layout: LayoutRules,
  tokens: TokenIntentMap,
  governance: {
    maxPrimaryActionsPerSection: UDSGovernance.limits.maxPrimaryActionsPerSection,
    spacingUnit: UDSGovernance.compliance.spacingUnit,
    defaultRadius: "--uds-radius-8",
  },
};

// Canonical AI contract names.
export const UDSAIContract = UDSManifest;
export const UDS_AI_CONTRACT = UDSAIContract;

// Backward-compatible alias for existing AI consumers.
export const UDS_AI_MANIFEST = UDSManifest;
