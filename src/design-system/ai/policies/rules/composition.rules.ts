import { ComponentRegistry } from "../../manifest/components.manifest";
import { CompositionRules } from "../../manifest/composition.manifest";
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
  const isDisallowedPair = (parent: string, child: string) =>
    CompositionRules.disallowedPairs.some((pair) => pair.parent === parent && pair.child === child);

  const walk = (node: typeof tree, path: string, parentType?: string) => {
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

    if (parentType) {
      const allowedParents = CompositionRules.allowedParentsByChild[node.type];
      if (Array.isArray(allowedParents) && !allowedParents.includes(parentType)) {
        violations.push({
          severity: "error",
          code: "RULE_INVALID_PARENT_COMPOSITION",
          message: `${node.type} must be nested under one of: ${allowedParents.join(", ")}.`,
          path,
          component: node.type,
        });
      }

      if (isDisallowedPair(parentType, node.type)) {
        const pair = CompositionRules.disallowedPairs.find(
          (entry) => entry.parent === parentType && entry.child === node.type
        );
        violations.push({
          severity: "error",
          code: "RULE_DISALLOWED_NESTING",
          message: `${node.type} cannot be nested in ${parentType}.${pair?.reason ? ` ${pair.reason}` : ""}`,
          path,
          component: node.type,
        });
      }
    }

    const allowedChildren = CompositionRules.allowedChildrenByParent[node.type];
    (node.children ?? []).forEach((child, index) => {
      const childPath = `${path}.children[${index}]`;
      if (Array.isArray(allowedChildren) && !allowedChildren.includes(child.type)) {
        violations.push({
          severity: "error",
          code: "RULE_INVALID_COMPOSITION",
          message: `${child.type} is not an allowed child of ${node.type}. Allowed: ${allowedChildren.join(", ")}.`,
          path: childPath,
          component: child.type,
        });
      }
      walk(child, childPath, node.type);
    });
  };
  walk(tree, "root");
  return violations;
};
