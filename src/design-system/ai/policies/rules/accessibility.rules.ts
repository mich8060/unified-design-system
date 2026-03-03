import type { PolicyRule, PolicyViolation } from "../policy.types";

export const enforceAccessibilityRule: PolicyRule = ({ tree, governanceConfig }) => {
  const violations: PolicyViolation[] = [];
  const walk = (node: typeof tree, path: string, depth: number) => {
    if (depth > governanceConfig.limits.maxNestingDepth) {
      violations.push({
        severity: "error",
        code: "RULE_MAX_NESTING_DEPTH",
        message: `Maximum nesting depth ${governanceConfig.limits.maxNestingDepth} exceeded.`,
        path,
        component: node.type,
      });
    }

    const hasInlineStyles = node.props?.style != null || node.props?.inlineStyle != null;
    if (hasInlineStyles && !governanceConfig.enforcement.allowInlineStyles) {
      violations.push({
        severity: "error",
        code: "RULE_INLINE_STYLE_DISALLOWED",
        message: "Inline style values are disallowed by governance policy.",
        path,
        component: node.type,
      });
    }

    (node.children ?? []).forEach((child, index) => walk(child, `${path}.children[${index}]`, depth + 1));
  };
  walk(tree, "root", 0);
  return violations;
};
