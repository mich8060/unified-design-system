import { colorCategory, colorTokens } from "./color.js";
import { spacingCategory, spacingTokens } from "./spacing.js";
import { radiusCategory, radiusTokens } from "./radius.js";
import { typographyCategory, typographyTokens } from "./typography.js";
import { shadowCategory, shadowTokens } from "./shadow.js";
import { motionCategory, motionTokens } from "./motion.js";
import type { RuntimeTokens } from "./types.js";

export { colorTokens } from "./color.js";
export { spacingTokens } from "./spacing.js";
export { radiusTokens } from "./radius.js";
export { typographyTokens } from "./typography.js";
export { shadowTokens } from "./shadow.js";
export { motionTokens } from "./motion.js";
export { generateRuntimeTokensCss } from "./generateCss.js";
export type { CssVarMap, RuntimeTokens, TokenCategory, TypographyCategory } from "./types.js";

export const runtimeTokens: RuntimeTokens = {
  color: colorCategory,
  spacing: spacingCategory,
  radius: radiusCategory,
  typography: typographyCategory,
  shadow: shadowCategory,
  motion: motionCategory,
};

export const tokensByCategory = {
  color: colorTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  typography: typographyTokens,
  shadow: shadowTokens,
  motion: motionTokens,
} as const;
