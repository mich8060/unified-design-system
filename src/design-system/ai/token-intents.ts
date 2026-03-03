import type { TokenIntentItem } from "./types";

export const UDS_TOKEN_INTENTS: readonly TokenIntentItem[] = [
  {
    intent: "surface/background",
    tokens: ["--uds-color-neutral-0", "--uds-color-neutral-50", "--uds-color-neutral-100"],
    guidance: "Choose the lowest-contrast surface that preserves clear layering.",
  },
  {
    intent: "text hierarchy",
    tokens: ["--uds-color-neutral-900", "--uds-color-neutral-700", "--uds-color-neutral-600"],
    guidance: "Use stronger contrast for headings and lower contrast for supporting copy.",
  },
  {
    intent: "interactive emphasis",
    tokens: ["--uds-color-blue-600", "--uds-color-blue-700", "--uds-color-blue-50"],
    guidance: "Reserve strong blue tokens for primary interactive affordances.",
  },
  {
    intent: "error and warning",
    tokens: ["--uds-color-red-600", "--uds-color-amber-600"],
    guidance: "Use semantic status colors only for status and validation semantics.",
  },
  {
    intent: "layout spacing rhythm",
    tokens: ["--uds-spacing-8", "--uds-spacing-12", "--uds-spacing-16", "--uds-spacing-24", "--uds-spacing-32"],
    guidance: "Prefer a 4/8-based rhythm; avoid ad-hoc spacing values.",
  },
];
