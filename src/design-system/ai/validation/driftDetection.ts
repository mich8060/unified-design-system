import { ComponentRegistry } from "../manifest/components.manifest";
import { LayoutRules } from "../manifest/layout.manifest";
import { TokenIntentMap } from "../manifest/tokens.intent.manifest";
import type { UINodeTree } from "../manifest/types";
import type { PolicyViolation } from "../policies/policy.types";

const COLOR_LITERAL_REGEX = /#(?:[a-fA-F0-9]{3,8})\b|rgb\(|rgba\(|hsl\(|hsla\(/;

const knownTokenSet = new Set<string>([
  ...LayoutRules.spacingSystem.allowedTokens,
  ...Object.values(TokenIntentMap.surface),
  ...Object.values(TokenIntentMap.action),
  ...Object.values(TokenIntentMap.text),
  ...Object.values(TokenIntentMap.border),
  ...Object.values(TokenIntentMap.state),
  "--uds-radius-8",
  "--uds-elevation-overlay",
]);

const pushViolation = (
  list: PolicyViolation[],
  code: string,
  message: string,
  path: string,
  component?: string,
  token?: string
) => {
  list.push({ severity: "warning", code, message, path, component, token });
};

export function detectDrift(tree: UINodeTree): PolicyViolation[] {
  const violations: PolicyViolation[] = [];
  const walk = (node: UINodeTree, path: string, parent?: UINodeTree) => {
    if (!ComponentRegistry[node.type]) {
      pushViolation(
        violations,
        "DRIFT_UNKNOWN_COMPONENT",
        `Component "${node.type}" is not in ComponentRegistry.`,
        path,
        node.type
      );
    }

    if (parent) {
      const disallowed = LayoutRules.disallowedNesting.some(
        (rule) => rule.parent === parent.type && rule.child === node.type
      );
      if (disallowed) {
        pushViolation(
          violations,
          "DRIFT_DISALLOWED_NESTING",
          `${node.type} nested inside ${parent.type} violates layout rules.`,
          path,
          node.type
        );
      }
    }

    const props = node.props ?? {};
    Object.entries(props).forEach(([key, value]) => {
      if (key.toLowerCase().startsWith("margin")) {
        pushViolation(
          violations,
          "DRIFT_MARGIN_USAGE",
          "Margin usage detected. Prefer governed spacing composition tokens.",
          `${path}.${key}`,
          node.type
        );
      }

      if (key === "style" || key === "inlineStyle") {
        pushViolation(
          violations,
          "DRIFT_INLINE_STYLE",
          "Inline CSS detected. Use tokenized props or class-based styling.",
          `${path}.${key}`,
          node.type
        );
      }

      if (typeof value === "string") {
        if (value.startsWith("--uds-") && !knownTokenSet.has(value)) {
          pushViolation(
            violations,
            "DRIFT_UNKNOWN_TOKEN",
            `Unknown UDS token "${value}".`,
            `${path}.${key}`,
            node.type,
            value
          );
        }
        if (COLOR_LITERAL_REGEX.test(value)) {
          pushViolation(
            violations,
            "DRIFT_HARDCODED_COLOR",
            "Hardcoded color literal detected. Use semantic UDS token values.",
            `${path}.${key}`,
            node.type
          );
        }
      }
    });

    (node.children ?? []).forEach((child, index) =>
      walk(child, `${path}.children[${index}]`, node)
    );
  };

  walk(tree, "root");
  return violations;
}
