import type { ComponentSpec } from "../../specs/spec.types";

export const ContainerSpec: ComponentSpec = {
  name: "Container",
  tier: 2,
  purpose:
    "Provides a reusable content wrapper with optional filled or transparent surface styles and standardized padding.",
  variants: {
    appearance: {
      type: "enum",
      values: ["default", "transparent"],
      default: "transparent",
    },
    padding: {
      type: "enum",
      values: ["none", "xsmall", "small", "default", "large", "xlarge"],
      default: "large",
    },
    paddingX: {
      type: "enum",
      values: ["none", "xsmall", "small", "default", "large", "xlarge"],
      default: "large",
    },
    paddingY: {
      type: "enum",
      values: ["none", "xsmall", "small", "default", "large", "xlarge"],
      default: "large",
    },
  },
  states: ["default"],
  tokensUsed: [
    "--uds-surface-secondary",
    "--uds-border-width-1",
    "--uds-border-primary",
    "--uds-radius-8",
    "--uds-spacing-0",
    "--uds-spacing-8",
    "--uds-spacing-12",
    "--uds-spacing-16",
    "--uds-spacing-24",
    "--uds-spacing-32",
  ],
  accessibility: { role: "generic", keyboard: [] },
  antiPatterns: [
    "Do not use Container for semantic landmarks where <section>, <article>, or <aside> is required.",
    "Do not hardcode spacing values on top of Container padding variants.",
  ],
};
