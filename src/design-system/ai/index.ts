import { ComponentRegistry } from "./manifest/components.manifest";
import { getVersionLineage, UDSGovernance } from "./manifest/governance.manifest";
import { LayoutRules } from "./manifest/layout.manifest";
import { PatternRegistry } from "./manifest/patterns.manifest";
import { PropAliasRules } from "./manifest/prop-aliases.manifest";
import { UDSAIContract, UDSManifest, UDS_AI_CONTRACT, UDS_AI_MANIFEST } from "./manifest/system.manifest";
import { TokenIntentMap } from "./manifest/tokens.intent.manifest";

export { UDSManifest, UDSAIContract, UDS_AI_CONTRACT, UDS_AI_MANIFEST };
export { ComponentRegistry, PatternRegistry, LayoutRules, PropAliasRules, TokenIntentMap, UDSGovernance, getVersionLineage };
export { runPolicyEngine } from "./policies/policy.engine";
export { createUDSRuntimeHelperSDK } from "./sdk";
export { validateTree } from "./validation/validateTree";
export { validateAIOutput } from "./validation/validateAIOutput";
export { validateSchema } from "./validation/schemaValidation";
export { detectDrift } from "./validation/driftDetection";
export { buildDeterministicFeedback, sortAndDedupeViolations } from "./validation/deterministicFeedback";
export { logAIGeneration } from "./audit/auditLogger";
export { recordUsageMetric, getUsageMetrics, resetUsageMetrics } from "./telemetry/usageMetrics";
export { ValidAuthFormTree, InvalidPrimaryActionTree } from "./examples/trees.example";
export { StrictModeFailureTree, strictModeFailureExample } from "./examples/validation-run.example";
export { UDS_TRAINING_EXAMPLES } from "./examples/training.examples";

// Legacy aliases maintained for compatibility with previous AI metadata naming.
export const AI_COMPONENT_METADATA = ComponentRegistry;
export const BUTTON_METADATA = ComponentRegistry.Button;
export const TABLE_METADATA = ComponentRegistry.Table;
export const FIELD_METADATA = ComponentRegistry.Field;
export const MODAL_METADATA = ComponentRegistry.Modal;
export const UDS_FLOW_PATTERNS = Object.values(PatternRegistry);
export const UDS_TOKEN_INTENTS = Object.entries(TokenIntentMap).map(([intent, tokens]) => ({
  intent,
  tokens: Object.values(tokens),
  guidance: `Use ${intent} intents to map semantic UI choices to valid UDS tokens.`,
}));
export const UDS_LAYOUT_RULES = [
  {
    id: "spacing-system",
    rule: `Allowed spacing tokens: ${LayoutRules.spacingSystem.allowedTokens.join(", ")}`,
    rationale: "Prevents ad-hoc spacing and preserves deterministic rhythm.",
  },
  {
    id: "composition",
    rule: "Use allowed composition mapping per parent component.",
    rationale: "Avoids invalid nesting and improves generated UI consistency.",
  },
];
export const UDS_GLOBAL_ANTI_PATTERNS = LayoutRules.disallowedNesting.map(
  (rule) => `Do not nest ${rule.child} inside ${rule.parent}.`
);

export type {
  ComponentManifestItem as ComponentMetadata,
  ComponentRegistryType,
  LayoutManifestRules,
  PatternManifestItem as FlowPattern,
  PatternRegistryType,
  TokenIntentMapType as TokenIntentItem,
  UDSManifestType as AIManifest,
  UINodeTree,
  ValidationError,
  ValidationResult,
  GovernanceConfig,
  VersionLineage,
} from "./manifest/types";
export type { PolicyViolation } from "./policies/policy.types";
export type { UDSRuntimeHelperSDK, CreateUDSRuntimeHelperSDKOptions, CanonicalizedPropsResult } from "./sdk";
export type { AuditEvent, AuditTransport } from "./audit/audit.types";
export type { AIValidationResult } from "./validation/validateAIOutput";
export type { UsageMetric } from "./telemetry/usageMetrics";
export type { AITrainingExample } from "./examples/training.examples";
