import { PropAliasRules } from "../../manifest/prop-aliases.manifest";
import type { PolicyRule, PolicyViolation } from "../policy.types";

const getAliasMapForComponent = (componentName: string): Record<string, string> => ({
  ...(PropAliasRules.global ?? {}),
  ...(PropAliasRules.byComponent[componentName] ?? {}),
});

interface ForbiddenPropRule {
  replacement?: string;
  reason: string;
}

const FORBIDDEN_PROPS_BY_COMPONENT: Record<string, Record<string, ForbiddenPropRule>> = {
  Menu: {
    items: { replacement: "navItems", reason: "Menu uses navItems contract, not Ant-style items." },
    selectedKeys: { reason: "Menu selection is route-driven via nav item paths and app state." },
    mode: { replacement: "activeMode", reason: "Menu mode is governed by activeMode light/dark values." },
  },
  Layout: {
    vertical: { replacement: "direction", reason: "Layout direction is governed by row/column direction prop." },
    justify: { replacement: "justifyContent", reason: "Layout alignment uses justifyContent canonical prop." },
    align: { replacement: "alignItems", reason: "Layout alignment uses alignItems canonical prop." },
  },
  Text: {
    type: { replacement: "variant", reason: "Text semantics use UDS typography variant tokens." },
    strong: { replacement: "weight", reason: "Text weight should be controlled by weight prop." },
  },
  Button: {
    type: { replacement: "appearance", reason: "Button style is governed by appearance variants." },
  },
  Badge: {
    status: { replacement: "variant", reason: "Badge uses variant semantic color names, not status." },
    color: { replacement: "variant", reason: "Badge color intent is governed through variant values." },
  },
  Statistics: {
    title: { replacement: "label", reason: "Statistics title maps to label in UDS contract." },
    suffix: { replacement: "helperText", reason: "Use helperText/statusLabel/changeText fields for supporting copy." },
    prefix: { replacement: "helperText", reason: "Use helperText/statusLabel/changeText fields for supporting copy." },
    valueStyle: { reason: "Styling is token-governed; avoid inline styling props." },
  },
};

export const enforceCanonicalPropsRule: PolicyRule = ({ tree }) => {
  const violations: PolicyViolation[] = [];

  const walk = (node: typeof tree, path: string) => {
    const aliasMap = getAliasMapForComponent(node.type);
    const forbiddenMap = FORBIDDEN_PROPS_BY_COMPONENT[node.type] ?? {};
    const props = node.props ?? {};

    for (const propName of Object.keys(props)) {
      const forbiddenRule = forbiddenMap[propName];
      if (forbiddenRule) {
        const replacementHint = forbiddenRule.replacement
          ? ` Use "${forbiddenRule.replacement}" instead.`
          : "";
        violations.push({
          severity: "error",
          code: "RULE_FORBIDDEN_PROP",
          message: `Prop "${propName}" is disallowed on ${node.type}. ${forbiddenRule.reason}${replacementHint}`,
          path: `${path}.props.${propName}`,
          component: node.type,
        });
      }

      const canonical = aliasMap[propName];
      if (!canonical) continue;
      violations.push({
        severity: "error",
        code: "RULE_AMBIGUOUS_PROP_ALIAS",
        message: `Prop "${propName}" is ambiguous for ${node.type}. Use canonical prop "${canonical}".`,
        path: `${path}.props.${propName}`,
        component: node.type,
      });
    }

    (node.children ?? []).forEach((child, index) => walk(child, `${path}.children[${index}]`));
  };

  walk(tree, "root");
  return violations;
};
