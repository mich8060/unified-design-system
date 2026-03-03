import { LayoutRules } from "../../manifest/layout.manifest";
import type { PolicyRule, PolicyViolation } from "../policy.types";

const SPACING_PROPS = new Set(["gap", "spacing", "padding", "margin", "rowGap", "columnGap"]);

export const enforceSpacingTokenRule: PolicyRule = ({ tree }) => {
  const violations: PolicyViolation[] = [];
  const walk = (node: typeof tree, path: string) => {
    const props = node.props ?? {};
    Object.entries(props).forEach(([prop, value]) => {
      if (!SPACING_PROPS.has(prop) || typeof value !== "string") return;
      if (!value.startsWith("--uds-spacing-")) {
        violations.push({
          severity: "error",
          code: "RULE_SPACING_TOKEN_ONLY",
          message: `Spacing prop "${prop}" must use a --uds-spacing-* token.`,
          path: `${path}.${prop}`,
          component: node.type,
        });
        return;
      }
      if (!LayoutRules.spacingSystem.allowedTokens.includes(value)) {
        violations.push({
          severity: "error",
          code: "RULE_UNKNOWN_SPACING_TOKEN",
          message: `Unknown spacing token "${value}".`,
          path: `${path}.${prop}`,
          component: node.type,
          token: value,
        });
      }
    });
    (node.children ?? []).forEach((child, index) => walk(child, `${path}.children[${index}]`));
  };
  walk(tree, "root");
  return violations;
};
