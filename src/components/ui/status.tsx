import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  ACCENT_APPEARANCES,
  chromaticAccentDotColor,
  chromaticAccentStyle,
  type AccentAppearance,
} from "@/lib/accent-appearance-styles"

export const STATUS_VARIANTS = [
  "neutral",
  "success",
  "warning",
  "error",
  "info",
] as const
export type StatusVariant = (typeof STATUS_VARIANTS)[number]

/** Same appearance axis as Badge: subtle | pastel | outlined | solid. */
export const STATUS_APPEARANCES = ACCENT_APPEARANCES
export type StatusAppearance = AccentAppearance

/**
 * @deprecated Prefer Badge-aligned `appearance` (`pastel` / `solid` / …).
 * Kept for compat: `pastel` + `appearance="solid"` → soft pastel fill.
 */
export const STATUS_COLORS = ["pastel", "default"] as const
export type StatusColor = (typeof STATUS_COLORS)[number]

export const STATUS_SIZES = ["default", "compact"] as const
export type StatusSize = (typeof STATUS_SIZES)[number]

/** Status meaning → Badge chromatic accent (same ramps / appearances). */
const VARIANT_ACCENT: Record<Exclude<StatusVariant, "neutral">, string> = {
  success: "green",
  warning: "yellow",
  error: "red",
  info: "blue",
}

type StatusColorSet = {
  backgroundColor: string
  borderColor: string
  color: string
  dotColor: string
}

function neutralStatusColors(appearance: AccentAppearance): StatusColorSet {
  switch (appearance) {
    case "subtle":
      return {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: "var(--uds-text-secondary)",
        dotColor: "var(--uds-text-secondary)",
      }
    case "pastel":
      return {
        backgroundColor: "var(--uds-color-neutrals-100)",
        borderColor: "transparent",
        color: "var(--uds-text-primary)",
        dotColor: "var(--uds-text-primary)",
      }
    case "outlined":
      return {
        backgroundColor: "transparent",
        borderColor: "var(--uds-color-neutrals-400)",
        color: "var(--uds-text-secondary)",
        dotColor: "var(--uds-text-secondary)",
      }
    case "solid":
      return {
        backgroundColor: "var(--uds-color-neutrals-200)",
        borderColor: "transparent",
        color: "var(--uds-text-primary)",
        dotColor: "var(--uds-text-primary)",
      }
    default:
      return {
        backgroundColor: "transparent",
        borderColor: "var(--uds-color-neutrals-400)",
        color: "var(--uds-text-secondary)",
        dotColor: "var(--uds-text-secondary)",
      }
  }
}

/**
 * Resolve Badge-aligned appearance. Legacy aliases:
 * - `text-only` → `subtle`
 * - `color="pastel"` with `appearance="solid"` → `pastel`
 */
function resolveAppearance(
  appearance: StatusAppearance | "text-only" | undefined,
  color: StatusColor | undefined,
): AccentAppearance {
  if (appearance === "text-only") return "subtle"
  if (appearance === "solid" && color === "pastel") return "pastel"
  if (
    appearance === "subtle" ||
    appearance === "pastel" ||
    appearance === "outlined" ||
    appearance === "solid"
  ) {
    return appearance
  }
  return "outlined"
}

function statusColors(
  variant: StatusVariant,
  appearance: AccentAppearance,
): StatusColorSet {
  if (variant === "neutral") {
    return neutralStatusColors(appearance)
  }

  const accent = VARIANT_ACCENT[variant]
  const style = chromaticAccentStyle(accent, appearance)
  return {
    backgroundColor: String(style.backgroundColor ?? "transparent"),
    borderColor: String(style.borderColor ?? "transparent"),
    color: String(style.color ?? "var(--uds-text-primary)"),
    dotColor: chromaticAccentDotColor(accent, appearance),
  }
}

const statusVariants = cva(
  "inline-flex w-fit shrink-0 items-center rounded-[4px] border font-uds-medium [font-family:var(--font-inter)]",
  {
    variants: {
      size: {
        default: "gap-2 px-2 py-1 text-uds-14 leading-uds-14",
        compact: "gap-1.5 px-1.5 py-0.5 text-uds-12 leading-uds-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const statusDotVariants = cva("rounded-full", {
  variants: {
    size: {
      default: "size-2",
      compact: "size-1.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface StatusProps extends React.ComponentProps<"span"> {
  variant?: StatusVariant
  /**
   * Same axis as Badge: subtle | pastel | outlined | solid.
   * Preferred default: outlined.
   * Legacy: `text-only` is accepted and maps to `subtle`.
   */
  appearance?: StatusAppearance | "text-only"
  /**
   * @deprecated Use `appearance="pastel"` (soft fill) or `appearance="solid"` (saturated).
   * `color="pastel"` with `appearance="solid"` still resolves to pastel fill.
   */
  color?: StatusColor
  size?: StatusSize
  dot?: boolean
}

function Status({
  className,
  variant = "neutral",
  appearance = "outlined",
  color,
  size,
  dot = true,
  style,
  children,
  ...props
}: StatusProps) {
  const resolved = resolveAppearance(appearance, color)
  const colors = statusColors(variant, resolved)

  return (
    <span
      data-slot="status"
      data-variant={variant}
      data-appearance={resolved}
      data-size={size ?? "default"}
      className={cn(statusVariants({ size }), className)}
      style={{
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        color: colors.color,
        ...style,
      }}
      {...props}
    >
      {dot ? (
        <span
          className={statusDotVariants({ size })}
          style={{ backgroundColor: colors.dotColor }}
          aria-hidden
        />
      ) : null}
      {children}
    </span>
  )
}

export { Status, statusVariants }
