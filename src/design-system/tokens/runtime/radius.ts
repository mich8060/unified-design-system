import type { TokenCategory } from "./types.js";

export const radiusTokens = {
  "0": "0px",
  "2": "2px",
  "4": "4px",
  "6": "6px",
  "8": "8px",
  "12": "12px",
  "16": "16px",
  "20": "20px",
  "24": "24px",
  "9999": "9999px",
} as const;

export const radiusCategory: TokenCategory = {
  cssVars: Object.fromEntries(
    Object.entries(radiusTokens).map(([token, value]) => [`--uds-radius-${token}`, value])
  ) as TokenCategory["cssVars"],
};
