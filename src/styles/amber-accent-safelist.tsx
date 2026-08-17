/**
 * Scan-only module for published `dist/styles.css` / `styles-base.css`.
 * Ensures amber accent `@theme` utilities ship without requiring app/component usage.
 * Do not import from the public package barrel.
 *
 * Class names must be full string literals (Tailwind cannot see template interpolations).
 */

/** Class strings Tailwind must emit for the amber accent ramp. */
export const AMBER_ACCENT_SAFELIST = [
  "bg-uds-color-accent-amber-25",
  "bg-uds-color-accent-amber-50",
  "bg-uds-color-accent-amber-100",
  "bg-uds-color-accent-amber-200",
  "bg-uds-color-accent-amber-300",
  "bg-uds-color-accent-amber-400",
  "bg-uds-color-accent-amber-500",
  "bg-uds-color-accent-amber-600",
  "bg-uds-color-accent-amber-700",
  "bg-uds-color-accent-amber-800",
  "bg-uds-color-accent-amber-900",
  "bg-uds-color-accent-amber-1000",
  "text-uds-color-accent-amber-25",
  "text-uds-color-accent-amber-50",
  "text-uds-color-accent-amber-100",
  "text-uds-color-accent-amber-200",
  "text-uds-color-accent-amber-300",
  "text-uds-color-accent-amber-400",
  "text-uds-color-accent-amber-500",
  "text-uds-color-accent-amber-600",
  "text-uds-color-accent-amber-700",
  "text-uds-color-accent-amber-800",
  "text-uds-color-accent-amber-900",
  "text-uds-color-accent-amber-1000",
  "border-uds-color-accent-amber-25",
  "border-uds-color-accent-amber-50",
  "border-uds-color-accent-amber-100",
  "border-uds-color-accent-amber-200",
  "border-uds-color-accent-amber-300",
  "border-uds-color-accent-amber-400",
  "border-uds-color-accent-amber-500",
  "border-uds-color-accent-amber-600",
  "border-uds-color-accent-amber-700",
  "border-uds-color-accent-amber-800",
  "border-uds-color-accent-amber-900",
  "border-uds-color-accent-amber-1000",
] as const

/** Keeps literals reachable for the Tailwind scanner. */
export function amberAccentSafelistClassName(): string {
  return AMBER_ACCENT_SAFELIST.join(" ")
}
