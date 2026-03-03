import { ComponentRegistry } from "../manifest/components.manifest";
import { LayoutRules } from "../manifest/layout.manifest";
import type { UINodeTree, ValidationError, ValidationResult } from "../manifest/types";

const SPACING_PROP_NAMES = ["gap", "spacing", "padding", "margin", "rowGap", "columnGap"];

const createError = (
  code: ValidationError["code"],
  path: string,
  message: string,
  meta?: Record<string, unknown>
): ValidationError => ({ code, path, message, meta });

const isPrimaryButton = (node: UINodeTree): boolean => {
  if (node.type !== "Button") return false;
  const appearance = String(node.props?.appearance ?? "primary");
  return appearance === "primary";
};

const validateSpacingProps = (node: UINodeTree, path: string, errors: ValidationError[]) => {
  const props = node.props ?? {};
  for (const propName of SPACING_PROP_NAMES) {
    const value = props[propName];
    if (typeof value !== "string") continue;
    if (!value.startsWith("--uds-spacing-")) continue;
    if (!LayoutRules.spacingSystem.allowedTokens.includes(value)) {
      errors.push(
        createError(
          "INVALID_SPACING_TOKEN",
          `${path}.${propName}`,
          `Invalid spacing token "${value}" for ${node.type}.`,
          { allowedTokens: LayoutRules.spacingSystem.allowedTokens }
        )
      );
    }
  }
};

const validateComposition = (parent: UINodeTree, child: UINodeTree, path: string, errors: ValidationError[]) => {
  const allowed = LayoutRules.allowedComposition[parent.type];
  if (Array.isArray(allowed) && !allowed.includes(child.type)) {
    errors.push(
      createError(
        "INVALID_COMPOSITION",
        path,
        `${child.type} is not an allowed child of ${parent.type}.`,
        { allowedChildren: allowed }
      )
    );
  }

  const parentMeta = ComponentRegistry[parent.type];
  if (parentMeta?.constraints?.allowedChildren && !parentMeta.constraints.allowedChildren.includes(child.type)) {
    errors.push(
      createError(
        "INVALID_COMPOSITION",
        path,
        `${child.type} is outside component-level constraints for ${parent.type}.`,
        { allowedChildren: parentMeta.constraints.allowedChildren }
      )
    );
  }

  if (parentMeta?.constraints?.disallowedChildren?.includes(child.type)) {
    errors.push(
      createError(
        "DISALLOWED_NESTING",
        path,
        `${child.type} is disallowed inside ${parent.type}.`,
        { disallowedChildren: parentMeta.constraints.disallowedChildren }
      )
    );
  }
};

const validateDisallowedNesting = (parent: UINodeTree, child: UINodeTree, path: string, errors: ValidationError[]) => {
  const isDisallowed = LayoutRules.disallowedNesting.some(
    (rule) => rule.parent === parent.type && rule.child === child.type
  );
  if (!isDisallowed) return;

  errors.push(
    createError(
      "DISALLOWED_NESTING",
      path,
      `${child.type} cannot be nested under ${parent.type}.`
    )
  );
};

const walk = (
  node: UINodeTree,
  path: string,
  sectionPrimaryButtonCount: { count: number },
  errors: ValidationError[]
) => {
  validateSpacingProps(node, path, errors);
  if (isPrimaryButton(node)) {
    sectionPrimaryButtonCount.count += 1;
  }

  const children = node.children ?? [];
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    const childPath = `${path}.children[${i}]`;
    validateComposition(node, child, childPath, errors);
    validateDisallowedNesting(node, child, childPath, errors);
    walk(child, childPath, sectionPrimaryButtonCount, errors);
  }
};

export function validateTree(tree: UINodeTree): ValidationResult {
  const errors: ValidationError[] = [];
  const sectionPrimaryButtonCount = { count: 0 };

  walk(tree, "root", sectionPrimaryButtonCount, errors);

  if (sectionPrimaryButtonCount.count > LayoutRules.actionPlacement.maxPrimaryActionsPerSection) {
    errors.push(
      createError(
        "MAX_PRIMARY_ACTIONS",
        "root",
        `Found ${sectionPrimaryButtonCount.count} primary actions. Maximum allowed is ${LayoutRules.actionPlacement.maxPrimaryActionsPerSection}.`,
        { maxAllowed: LayoutRules.actionPlacement.maxPrimaryActionsPerSection }
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
