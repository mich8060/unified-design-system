export const UDS_GLOBAL_ANTI_PATTERNS: readonly string[] = [
  "Do not hardcode colors, spacing, radii, or typography values; use semantic tokens.",
  "Do not bypass Field when rendering form controls that require labels or validation.",
  "Do not mix multiple primary call-to-action buttons in a single local action cluster.",
  "Do not use Modal for low-priority or passive content.",
  "Do not introduce app-level layout containers that bypass UDS shell composition.",
  "Do not use unbounded Table rendering for large datasets without pagination/virtualization.",
];
