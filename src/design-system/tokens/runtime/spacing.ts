import type { TokenCategory } from "./types.js";

export const spacingTokens = {
  "0": "0px",
  "2": "2px",
  "4": "4px",
  "6": "6px",
  "8": "8px",
  "10": "10px",
  "12": "12px",
  "14": "14px",
  "16": "16px",
  "18": "18px",
  "24": "24px",
  "32": "32px",
  "36": "36px",
  "40": "40px",
  "48": "48px",
  "64": "64px",
  "80": "80px",
} as const;

export const spacingCategory: TokenCategory = {
  cssVars: Object.fromEntries(
    Object.entries(spacingTokens).map(([token, value]) => [`--uds-spacing-${token}`, value])
  ) as TokenCategory["cssVars"],
};
