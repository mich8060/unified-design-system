import type { TokenCategory } from "./types.js";

export const motionTokens = {
  "--uds-animation-duration-100": "100ms",
  "--uds-animation-duration-200": "200ms",
  "--uds-animation-duration-300": "300ms",
  "--uds-animation-duration-500": "500ms",
  "--uds-animation-ease-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
  "--uds-animation-ease-accelerate": "cubic-bezier(0.4, 0, 1, 1)",
  "--uds-animation-ease-decelerate": "cubic-bezier(0, 0, 0.2, 1)",
  "--uds-animation-ease-emphasized": "cubic-bezier(0.2, 0, 0, 1)",
  "--uds-transition-property-colors": "color, background-color, border-color",
  "--uds-focus-ring-width": "2px",
} as const;

export const motionCategory: TokenCategory = {
  cssVars: motionTokens,
};
