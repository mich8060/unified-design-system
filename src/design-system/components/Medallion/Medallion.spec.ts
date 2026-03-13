import type { ComponentSpec } from "../../specs/spec.types";

export const MedallionSpec: ComponentSpec = {
  name: "Medallion",
  tier: 2,
  purpose: "Displays an icon inside a colorized shape for compact visual context.",
  variants: {
    shape: {
      type: "enum",
      values: ["circle", "square", "roundedSquare", "diamond"],
      default: "circle",
    },
    size: {
      type: "enum",
      values: ["small", "default", "large", "xl"],
      default: "default",
    },
    color: {
      type: "enum",
      values: [
        "transparent",
        "neutral",
        "red",
        "orange",
        "yellow",
        "emerald",
        "green",
        "sky",
        "cyan",
        "blue",
        "indigo",
        "purple",
        "fuchsia",
        "magenta",
        "inverse",
      ],
      default: "neutral",
    },
  },
  states: ["default"],
  tokensUsed: [
    "--uds-color-accent-*-100",
    "--uds-color-accent-*-700",
    "--uds-surface-secondary",
    "--uds-border-primary",
  ],
  accessibility: { role: "img", keyboard: [] },
};
