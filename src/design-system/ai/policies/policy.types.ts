import type { GovernanceConfig, UINodeTree } from "../manifest/types";

export interface PolicyViolation {
  severity: "error" | "warning";
  code: string;
  message: string;
  path: string;
  component?: string;
  token?: string;
}

export interface PolicyRuleContext {
  tree: UINodeTree;
  governanceConfig: GovernanceConfig;
}

export type PolicyRule = (context: PolicyRuleContext) => PolicyViolation[];
