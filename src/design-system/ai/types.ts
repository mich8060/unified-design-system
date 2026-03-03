export type ComponentTier = 1 | 2 | 3 | 4;

export interface ComponentPropMeta {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string | number | boolean | null;
  description: string;
}

export interface ComponentMetadata {
  name: string;
  importPath: string;
  tier: ComponentTier;
  purpose: string;
  variants: Record<string, readonly string[]>;
  states: readonly string[];
  props: readonly ComponentPropMeta[];
  tokensUsed: readonly string[];
  composition: readonly string[];
  antiPatterns: readonly string[];
}

export interface FlowPattern {
  id: string;
  title: string;
  goal: string;
  whenToUse: string;
  steps: readonly string[];
  recommendedComponents: readonly string[];
  accessibilityChecks: readonly string[];
}

export interface TokenIntentItem {
  intent: string;
  tokens: readonly string[];
  guidance: string;
}

export interface LayoutRule {
  id: string;
  rule: string;
  rationale: string;
}

export interface AIManifestComponentEntry {
  name: string;
  metadataExport: string;
  metadataImportPath: string;
}

export interface AIManifest {
  schemaVersion: string;
  package: string;
  metadataVersion: string;
  components: readonly AIManifestComponentEntry[];
  patternExport: string;
  tokenIntentExport: string;
  layoutRuleExport: string;
  antiPatternExport: string;
}
