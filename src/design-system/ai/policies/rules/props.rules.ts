import { PropAliasRules } from "../../manifest/prop-aliases.manifest";
import type { PolicyRule, PolicyViolation } from "../policy.types";

const getAliasMapForComponent = (componentName: string): Record<string, string> => ({
  ...(PropAliasRules.global ?? {}),
  ...(PropAliasRules.byComponent[componentName] ?? {}),
});

export const enforceCanonicalPropsRule: PolicyRule = ({ tree }) => {
  const violations: PolicyViolation[] = [];

  const walk = (node: typeof tree, path: string) => {
    const aliasMap = getAliasMapForComponent(node.type);
    const props = node.props ?? {};

    for (const propName of Object.keys(props)) {
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

