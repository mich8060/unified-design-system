import type { PolicyRule } from "../policy.types";

const isPrimaryButton = (type: string, props: Record<string, unknown> | undefined): boolean =>
  type === "Button" && String(props?.appearance ?? "primary") === "primary";

export const enforcePrimaryActionLimitRule: PolicyRule = ({ tree, governanceConfig }) => {
  let primaryCount = 0;
  const walk = (node: typeof tree) => {
    if (isPrimaryButton(node.type, node.props)) primaryCount += 1;
    (node.children ?? []).forEach(walk);
  };
  walk(tree);

  if (primaryCount <= governanceConfig.limits.maxPrimaryActionsPerSection) return [];
  return [
    {
      severity: "error",
      code: "RULE_MAX_PRIMARY_ACTIONS",
      message: `Expected at most ${governanceConfig.limits.maxPrimaryActionsPerSection} primary action, found ${primaryCount}.`,
      path: "root",
      component: "Button",
    },
  ];
};
