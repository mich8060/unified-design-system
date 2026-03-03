import { ComponentRegistry } from "../../manifest/components.manifest";
import type { PolicyRule, PolicyViolation } from "../policy.types";

const RAW_HTML_TAGS = new Set([
  "div",
  "span",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "label",
  "ul",
  "li",
  "section",
  "article",
  "header",
  "footer",
  "main",
  "nav",
  "form",
]);

export const enforceCompositionRule: PolicyRule = ({ tree, governanceConfig }) => {
  const violations: PolicyViolation[] = [];
  const walk = (node: typeof tree, path: string) => {
    const isKnown = Boolean(ComponentRegistry[node.type]);
    const isRaw = RAW_HTML_TAGS.has(node.type);

    if (!isKnown && !governanceConfig.enforcement.allowUnknownComponents) {
      violations.push({
        severity: "error",
        code: "RULE_UNKNOWN_COMPONENT",
        message: `Unknown component "${node.type}" is not allowed in governed mode.`,
        path,
        component: node.type,
      });
    }

    if (isRaw && !governanceConfig.enforcement.allowAdHocValues) {
      violations.push({
        severity: "error",
        code: "RULE_RAW_HTML_DISALLOWED",
        message: `Raw HTML tag "${node.type}" is disallowed unless policy allows ad-hoc values.`,
        path,
        component: node.type,
      });
    }

    (node.children ?? []).forEach((child, index) => walk(child, `${path}.children[${index}]`));
  };
  walk(tree, "root");
  return violations;
};
