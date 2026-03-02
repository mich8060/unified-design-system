import type { TokenCategory } from "./types.js";

export const shadowTokens = {
  light: {
    "--uds-shadow-5": "rgba(0, 0, 0, 0.05)",
    "--uds-shadow-8": "rgba(0, 0, 0, 0.08)",
    "--uds-shadow-10": "rgba(0, 0, 0, 0.1)",
    "--uds-shadow-12": "rgba(0, 0, 0, 0.12)",
    "--uds-shadow-15": "rgba(0, 0, 0, 0.15)",
    "--uds-shadow-18": "rgba(0, 0, 0, 0.18)",
    "--uds-shadow-25": "rgba(0, 0, 0, 0.25)",
  },
  dark: {
    "--uds-shadow-5": "rgba(249, 250, 252, 0.05)",
    "--uds-shadow-8": "rgba(249, 250, 252, 0.08)",
    "--uds-shadow-10": "rgba(249, 250, 252, 0.1)",
    "--uds-shadow-12": "rgba(249, 250, 252, 0.12)",
    "--uds-shadow-15": "rgba(249, 250, 252, 0.15)",
    "--uds-shadow-18": "rgba(249, 250, 252, 0.18)",
    "--uds-shadow-25": "rgba(249, 250, 252, 0.25)",
  },
} as const;

export const shadowCategory: TokenCategory = {
  cssVars: shadowTokens.light,
  darkCssVars: shadowTokens.dark,
};
