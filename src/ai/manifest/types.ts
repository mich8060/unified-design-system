export type NodeTree = {
  type: string;
  props?: Record<string, unknown>;
  children?: NodeTree[];
};

export type ComponentManifest = {
  category: string;
  intent: string;
  roles?: string[];
  preferredParent?: string[];
  props?: Record<
    string,
    {
      type: "enum" | "boolean";
      values?: string[];
    }
  >;
  constraints?: Record<string, unknown>;
};

export type ComponentRegistry = Record<string, ComponentManifest>;

export type PatternDefinition = {
  layout: "vertical" | "horizontal" | "grid";
  requiredComponents: string[];
  structure: Array<{
    type: string;
    role?: string;
    props?: Record<string, unknown>;
  }>;
  spacing: string;
  widthConstraint?: string;
};

export type GovernanceManifest = {
  systemVersion: string;
  tokenVersion: string;
  manifestVersion: string;
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
};
