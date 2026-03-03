import { ComponentRegistry } from "./components.manifest";
import { LayoutRules } from "./layout.manifest";
import { PatternRegistry } from "./patterns.manifest";
import { TokenIntentMap } from "./tokens.intent.manifest";
import { UDSGovernance } from "./governance.manifest";

export const UDSManifest = {
  version: UDSGovernance.systemVersion,
  tokenVersion: UDSGovernance.tokenVersion,
  components: ComponentRegistry,
  patterns: PatternRegistry,
  layout: LayoutRules,
  tokens: TokenIntentMap,
  governance: {
    maxPrimaryActionsPerSection: UDSGovernance.limits.maxPrimaryActionsPerSection,
    spacingUnit: UDSGovernance.compliance.spacingUnit,
    defaultRadius: "--uds-radius-8",
  },
} as const;
