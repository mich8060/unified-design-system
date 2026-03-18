import type { ComponentSpec } from "../../specs/spec.types";

export const DescriptionListSpec: ComponentSpec = {
  name: "DescriptionList",
  tier: 2,
  purpose: "Compact key-value metadata layout for detail and summary views.",
  variants: {
    density: { type: "enum", values: ["default", "compact"], default: "default" },
    labelWidth: { type: "enum", values: ["sm", "md", "lg"], default: "md" },
    variant: { type: "enum", values: ["default", "separators"], default: "default" },
    bordered: { type: "boolean", default: true },
    fullWidth: { type: "boolean", default: true },
  },
  states: ["default"],
  tokensUsed: [
    "--uds-surface-primary",
    "--uds-border-primary",
    "--uds-border-width-1",
    "--uds-radius-8",
    "--uds-spacing-8",
    "--uds-spacing-12",
    "--uds-spacing-16",
    "--uds-spacing-80",
    "--uds-text-primary",
    "--uds-text-secondary",
  ],
  accessibility: { role: "list", keyboard: [] }
};
