/**
 * Human-readable labels for Figma variant properties.
 * Code prop values stay lowercase (e.g. `sm`); Figma uses full words (e.g. `Small`).
 * Canonical mapping: ai/figma-component-props.json
 */

/** Figma component property: Appearance (maps to code `variant`). */
export const BUTTON_APPEARANCE_FIGMA_LABEL: Record<string, string> = {
  default: 'Default',
  secondary: 'Secondary',
  outline: 'Outline',
  ghost: 'Ghost',
  destructive: 'Destructive',
  link: 'Link',
}

export const BUTTON_SIZE_FIGMA_LABEL: Record<string, string> = {
  default: 'Default',
  xs: 'Extra Small',
  sm: 'Small',
  lg: 'Large',
  icon: 'Icon',
  'icon-xs': 'Icon Extra Small',
  'icon-sm': 'Icon Small',
  'icon-lg': 'Icon Large',
}

/** Figma Accent property → code `accent` (lowercase). */
export const BADGE_ACCENT_FIGMA_LABEL: Record<string, string> = {
  transparent: 'Transparent',
  neutral: 'Neutral',
  red: 'Red',
  orange: 'Orange',
  yellow: 'Yellow',
  emerald: 'Emerald',
  green: 'Green',
  sky: 'Sky',
  cyan: 'Cyan',
  blue: 'Blue',
  indigo: 'Indigo',
  purple: 'Purple',
  fuchsia: 'Fuchsia',
  magenta: 'Magenta',
  inverse: 'Inverse',
}

export const BADGE_APPEARANCE_FIGMA_LABEL: Record<string, string> = {
  subtle: 'Subtle',
  pastel: 'Pastel',
  outlined: 'Outlined',
  solid: 'Solid',
}

export const ACCORDION_VARIANT_FIGMA_LABEL: Record<string, string> = {
  divided: 'Divided',
  boxed: 'Boxed',
  'boxed-filled': 'Boxed Filled',
}
