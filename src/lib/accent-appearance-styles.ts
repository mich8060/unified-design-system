import type * as React from "react"

/** Shared Badge / Status appearance axis (fill intensity). */
export const ACCENT_APPEARANCES = [
  "subtle",
  "pastel",
  "outlined",
  "solid",
] as const

export type AccentAppearance = (typeof ACCENT_APPEARANCES)[number]

/**
 * Solid-appearance background shade per accent. Matches the official Figma Badge
 * component, where each hue was individually tuned to clear WCAG AA (4.5:1) against
 * its paired text color — a flat step (e.g. always 500) fails contrast for most hues.
 */
const SOLID_BG_SHADE: Record<string, number> = {
  red: 700,
  orange: 300,
  yellow: 500,
  emerald: 700,
  green: 600,
  sky: 700,
  cyan: 700,
  blue: 700,
  indigo: 700,
  purple: 700,
  fuchsia: 700,
  magenta: 700,
}

/**
 * Chromatic accent fill/border/text for Badge and Status.
 * Steps match the Badge matrix (label-only / every-color).
 */
export function chromaticAccentStyle(
  accent: string,
  appearance: AccentAppearance,
): React.CSSProperties {
  const v = (step: number) => `var(--uds-color-accent-${accent}-${step})`
  switch (appearance) {
    case "subtle":
      return {
        color: v(600),
        backgroundColor: "transparent",
        borderColor: "transparent",
      }
    case "pastel":
      return {
        color: v(800),
        backgroundColor: v(100),
        borderColor: "transparent",
      }
    case "outlined":
      return {
        color: v(1000),
        backgroundColor: "transparent",
        borderColor: v(500),
      }
    case "solid": {
      const darkFg = accent === "yellow" || accent === "orange"
      const bgStep = SOLID_BG_SHADE[accent] ?? 500
      return {
        backgroundColor: v(bgStep),
        borderColor: "transparent",
        color: darkFg ? "var(--uds-color-black)" : "var(--uds-color-white)",
      }
    }
    default:
      return {}
  }
}

/** Dot / secondary mark color paired with {@link chromaticAccentStyle}. */
export function chromaticAccentDotColor(
  accent: string,
  appearance: AccentAppearance,
): string {
  const v = (step: number) => `var(--uds-color-accent-${accent}-${step})`
  switch (appearance) {
    case "solid":
      return accent === "yellow" || accent === "orange"
        ? "var(--uds-color-black)"
        : v(200)
    case "pastel":
      return v(800)
    case "outlined":
    case "subtle":
      return v(600)
    default:
      return v(600)
  }
}
