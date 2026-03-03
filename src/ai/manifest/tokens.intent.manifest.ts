export const TokenIntentMap = {
  surface: {
    page: "--uds-color-neutral-0",
    elevated: "--uds-color-neutral-50",
    muted: "--uds-color-neutral-100",
  },
  action: {
    primary: "--uds-color-blue-600",
    primaryHover: "--uds-color-blue-700",
    destructive: "--uds-color-red-600",
  },
  text: {
    heading: "--uds-color-neutral-900",
    body: "--uds-color-neutral-700",
    subtle: "--uds-color-neutral-600",
  },
  border: {
    default: "--uds-color-neutral-200",
    focus: "--uds-color-blue-600",
    error: "--uds-color-red-600",
  },
  state: {
    success: "--uds-color-green-600",
    warning: "--uds-color-amber-600",
    error: "--uds-color-red-600",
    info: "--uds-color-blue-600",
  },
} as const;
