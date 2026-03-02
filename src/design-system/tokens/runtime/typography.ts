import type { TypographyCategory } from "./types.js";

const rootTypography = {
  "--uds-font-family": '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  "--uds-font-size-128": "128px",
  "--uds-font-size-96": "96px",
  "--uds-font-size-72": "72px",
  "--uds-font-size-60": "60px",
  "--uds-font-size-48": "48px",
  "--uds-font-size-36": "36px",
  "--uds-font-size-32": "32px",
  "--uds-font-size-28": "28px",
  "--uds-font-size-24": "24px",
  "--uds-font-size-20": "20px",
  "--uds-font-size-16": "16px",
  "--uds-font-size-14": "14px",
  "--uds-font-size-12": "12px",
  "--uds-font-size-10": "10px",
  "--uds-line-128": "136px",
  "--uds-line-96": "104px",
  "--uds-line-72": "80px",
  "--uds-line-60": "68px",
  "--uds-line-48": "56px",
  "--uds-line-36": "44px",
  "--uds-line-32": "40px",
  "--uds-line-28": "36px",
  "--uds-line-24": "32px",
  "--uds-line-20": "28px",
  "--uds-line-16": "24px",
  "--uds-line-14": "20px",
  "--uds-line-12": "16px",
  "--uds-line-10": "14px",
  "--uds-line-heading-20": "var(--uds-line-20)",
  "--uds-font-weight": "400",
  "--uds-font-weight-medium": "500",
  "--uds-font-weight-semibold": "600",
  "--uds-font-weight-bold": "700",
  "--uds-typography-body-md":
    "var(--uds-font-weight) var(--uds-font-size-16) / var(--uds-line-16) var(--uds-font-family)",
  "--uds-typography-body-xs":
    "var(--uds-font-weight) var(--uds-font-size-12) / var(--uds-line-12) var(--uds-font-family)",
  "--uds-typography-label-md":
    "var(--uds-font-weight-semibold) var(--uds-font-size-14) / var(--uds-line-14) var(--uds-font-family)",
} as const;

const tabletTypography = {
  "--uds-font-size-128": "96px",
  "--uds-line-128": "104px",
  "--uds-font-size-96": "72px",
  "--uds-line-96": "80px",
  "--uds-font-size-72": "60px",
  "--uds-line-72": "68px",
  "--uds-font-size-60": "48px",
  "--uds-line-60": "56px",
  "--uds-font-size-48": "40px",
  "--uds-line-48": "48px",
  "--uds-font-size-36": "32px",
  "--uds-line-36": "40px",
  "--uds-font-size-32": "28px",
  "--uds-line-32": "36px",
  "--uds-font-size-28": "24px",
  "--uds-line-28": "32px",
  "--uds-font-size-24": "22px",
  "--uds-line-24": "30px",
  "--uds-font-size-20": "18px",
  "--uds-line-20": "26px",
} as const;

const mobileTypography = {
  "--uds-font-size-128": "72px",
  "--uds-line-128": "80px",
  "--uds-font-size-96": "60px",
  "--uds-line-96": "68px",
  "--uds-font-size-72": "48px",
  "--uds-line-72": "56px",
  "--uds-font-size-60": "40px",
  "--uds-line-60": "48px",
  "--uds-font-size-48": "32px",
  "--uds-line-48": "40px",
  "--uds-font-size-36": "28px",
  "--uds-line-36": "36px",
  "--uds-font-size-32": "24px",
  "--uds-line-32": "32px",
  "--uds-font-size-28": "22px",
  "--uds-line-28": "30px",
  "--uds-font-size-24": "20px",
  "--uds-line-24": "28px",
  "--uds-font-size-20": "18px",
  "--uds-line-20": "26px",
} as const;

export const typographyCategory: TypographyCategory = {
  cssVars: rootTypography,
  media: [
    { query: "(max-width: 1023px)", cssVars: tabletTypography },
    { query: "(max-width: 639px)", cssVars: mobileTypography },
  ],
};

export const typographyTokens = {
  root: rootTypography,
  tablet: tabletTypography,
  mobile: mobileTypography,
} as const;
