import type { ComponentSpec } from "../../specs/spec.types";

export const ProvidersCardSpec: ComponentSpec = {
  name: "ProvidersCard",
  tier: 3,
  purpose: "Displays provider identity, status, metadata, tags, and quick actions in a compact card.",
  variants: {
    statusVariant: {
      type: "enum",
      values: ["green", "orange", "red", "blue", "neutral"],
      default: "green",
    },
  },
  states: ["default"],
  tokensUsed: [
    "--uds-spacing-16",
    "--uds-spacing-12",
    "--uds-border-width-1",
    "--uds-border-primary",
    "--uds-radius-8",
    "--uds-surface-primary",
  ],
  accessibility: {
    role: "group",
    keyboard: ["Tab", "Enter", "Space"],
  },
  antiPatterns: [
    "Do not use ProvidersCard for tabular datasets where rows and sorting are required.",
    "Do not replace action buttons with non-interactive text when actions are expected.",
  ],
};
