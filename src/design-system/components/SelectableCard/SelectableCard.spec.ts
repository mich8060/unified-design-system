import type { ComponentSpec } from "../../specs/spec.types";

export const SelectableCardSpec: ComponentSpec = {
  name: "SelectableCard",
  tier: 2,
  purpose: "Selectable surface for list rows and card-like actionable metadata items.",
  variants: {
    selected: { type: "boolean", default: false },
    disabled: { type: "boolean", default: false },
  },
  states: ["default", "hover", "focus", "selected", "disabled"],
  tokensUsed: [
    "--uds-surface-primary",
    "--uds-surface-secondary",
    "--uds-surface-tertiary",
    "--uds-border-width-1",
    "--uds-border-primary",
    "--uds-border-secondary",
    "--uds-radius-8",
    "--uds-spacing-4",
    "--uds-spacing-8",
    "--uds-spacing-12",
    "--uds-spacing-16",
  ],
  accessibility: { role: "button", keyboard: ["Enter", "Space"] }
};
