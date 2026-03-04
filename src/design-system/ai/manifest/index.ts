export { UDSManifest, UDS_AI_MANIFEST } from "./system.manifest";
export {
  UDSGovernance,
  getVersionLineage,
  AI_MANIFEST_VERSION,
  AI_GOVERNANCE_VERSION,
  AI_POLICY_VERSION,
  AI_CONTRACT_SCHEMA_VERSION,
  AI_COMPONENT_API_SCHEMA_VERSION,
  AI_SCHEMA_VERSION,
  AI_API_SCHEMA_VERSION,
} from "./governance.manifest";
export { ComponentRegistry } from "./components.manifest";
export { PatternRegistry } from "./patterns.manifest";
export { LayoutRules } from "./layout.manifest";
export { CompositionRules } from "./composition.manifest";
export { PropAliasRules, getCanonicalPropName, getAliasEntries } from "./prop-aliases.manifest";
export { TokenIntentMap } from "./tokens.intent.manifest";

export type {
  ComponentManifestItem,
  ComponentRegistryType,
  LayoutManifestRules,
  ManifestGovernance,
  PatternManifestItem,
  PatternRegistryType,
  TokenIntentMapType,
  UDSManifestType,
  UINodeTree,
  ValidationError,
  ValidationResult,
  GovernanceConfig,
  VersionLineage,
} from "./types";
