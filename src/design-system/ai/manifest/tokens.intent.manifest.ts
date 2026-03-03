import type { TokenIntentMapType } from "./types";

export const TokenIntentMap: TokenIntentMapType = {
  surface: {
    page: "--uds-color-neutral-0",
    elevated: "--uds-color-neutral-50",
    subdued: "--uds-color-neutral-100",
    overlay: "--uds-elevation-overlay",
  },
  action: {
    primaryBg: "--uds-color-blue-600",
    primaryHoverBg: "--uds-color-blue-700",
    primaryText: "--uds-color-neutral-0",
    destructiveBg: "--uds-color-red-600",
    disabledBg: "--uds-color-neutral-200",
  },
  text: {
    heading: "--uds-color-neutral-900",
    body: "--uds-color-neutral-700",
    subtle: "--uds-color-neutral-600",
    inverted: "--uds-color-neutral-0",
    link: "--uds-color-blue-600",
  },
  border: {
    default: "--uds-color-neutral-200",
    strong: "--uds-color-neutral-400",
    focus: "--uds-color-blue-600",
    error: "--uds-color-red-600",
  },
  state: {
    success: "--uds-color-green-600",
    warning: "--uds-color-amber-600",
    error: "--uds-color-red-600",
    info: "--uds-color-blue-600",
  },
};
