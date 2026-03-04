export interface ManifestGovernance {
  maxPrimaryActionsPerSection: number;
  spacingUnit: number;
  defaultRadius: string;
}

export interface ComponentSlotMeta {
  required: boolean;
  description?: string;
}

export interface ComponentManifestItem {
  name: string;
  category: string;
  intent: string;
  priority?: string;
  variants: string[];
  sizes?: string[];
  slots?: Record<string, ComponentSlotMeta>;
  usage: {
    preferredContexts: string[];
    maxPerSection?: number;
  };
  constraints?: {
    onlyOnePrimaryPerSection?: boolean;
    allowedChildren?: string[];
    disallowedChildren?: string[];
  };
  accessibility?: {
    role: string;
    keyboardSupport: string[];
  };
  tokenDependencies: string[];
}

export type ComponentRegistryType = Record<string, ComponentManifestItem>;

export interface PatternStructureNode {
  type: string;
  role?: string;
  props?: Record<string, unknown>;
}

export interface PatternManifestItem {
  name: string;
  layout: "vertical" | "horizontal" | "grid";
  requiredComponents: string[];
  structure: PatternStructureNode[];
  spacing: string;
  widthConstraint?: string;
  rules?: Record<string, unknown>;
}

export type PatternRegistryType = Record<string, PatternManifestItem>;

export interface LayoutManifestRules {
  spacingSystem: {
    unit: number;
    allowedTokens: string[];
    defaultToken: string;
  };
  verticalRhythm: {
    sectionGapToken: string;
    contentGapToken: string;
    compactGapToken: string;
  };
  allowedComposition: Record<string, string[]>;
  allowedParents: Record<string, string[]>;
  disallowedNesting: Array<{ parent: string; child: string }>;
  maxWidth: {
    content: string;
    form: string;
    dialog: string;
  };
  actionPlacement: {
    primaryActionPosition: "end";
    secondaryActionPosition: "start" | "end";
    maxPrimaryActionsPerSection: number;
  };
}

export interface TokenIntentMapType {
  surface: Record<string, string>;
  action: Record<string, string>;
  text: Record<string, string>;
  border: Record<string, string>;
  state: Record<string, string>;
}

export interface UDSManifestType {
  version: string;
  tokenVersion: string;
  components: ComponentRegistryType;
  patterns: PatternRegistryType;
  layout: LayoutManifestRules;
  tokens: TokenIntentMapType;
  governance: ManifestGovernance;
}

export interface ValidationError {
  code:
    | "MAX_PRIMARY_ACTIONS"
    | "INVALID_COMPOSITION"
    | "INVALID_SPACING_TOKEN"
    | "DISALLOWED_NESTING";
  path: string;
  message: string;
  meta?: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface UINodeTree {
  type: string;
  props?: Record<string, unknown>;
  children?: UINodeTree[];
}

export interface GovernanceConfig {
  systemVersion: string;
  tokenVersion: string;
  manifestVersion: string;
  governanceVersion: string;
  policyVersion: string;
  enforcement: {
    strictMode: boolean;
    allowAdHocValues: boolean;
    allowInlineStyles: boolean;
    allowUnknownComponents: boolean;
  };
  limits: {
    maxPrimaryActionsPerSection: number;
    maxActionsPerToolbar: number;
    maxNestingDepth: number;
  };
  compliance: {
    accessibilityStandard: string;
    spacingUnit: number;
  };
}

export interface VersionLineage {
  udsVersion: string;
  tokenVersion: string;
  manifestVersion: string;
  governanceVersion: string;
  policyVersion: string;
}
