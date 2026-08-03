/**
 * Scan-only module for published `dist/styles.css`.
 *
 * Tailwind `@source`s this file so COMPOSITION/AGENTS-required layout utilities
 * (and docs-only width classes) always ship for styles.css-only consumers.
 * Do not import from the public package barrel.
 */

/** Class strings Tailwind must emit into styles.css for AI recipe layouts. */
export const RECIPE_LAYOUT_SAFELIST = [
  // Required composition grids
  "grid",
  "grid-cols-1",
  "sm:grid-cols-2",
  "md:grid-cols-2",
  "md:grid-cols-3",
  "md:col-span-2",
  "lg:grid-cols-2",
  "lg:grid-cols-3",
  "lg:grid-cols-4",
  "lg:col-span-2",
  "items-start",
  "lg:items-start",
  // Arbitrary recipe grids
  "lg:grid-cols-[240px_minmax(0,1fr)]",
  "lg:grid-cols-[445px_minmax(0,1fr)]",
  "lg:grid-cols-[minmax(0,1fr)_320px]",
  // Docs / composition max widths
  "max-w-[720px]",
  "max-w-[length:var(--uds-container-prose)]",
  // Token gaps on recipe grids
  "gap-[length:var(--uds-gap-16)]",
  "gap-[length:var(--uds-gap-24)]",
] as const

/** Keeps literals reachable for the Tailwind scanner. */
export function recipeLayoutSafelistClassName(): string {
  return RECIPE_LAYOUT_SAFELIST.join(" ")
}
