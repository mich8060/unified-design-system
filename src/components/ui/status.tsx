import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const STATUS_VARIANTS = [
  "neutral",
  "success",
  "warning",
  "error",
  "info",
] as const
export type StatusVariant = (typeof STATUS_VARIANTS)[number]

export const STATUS_APPEARANCES = ["solid", "outlined", "text-only"] as const
export type StatusAppearance = (typeof STATUS_APPEARANCES)[number]

export const STATUS_COLORS = ["pastel", "default"] as const
export type StatusColor = (typeof STATUS_COLORS)[number]

export const STATUS_SIZES = ["default", "compact"] as const
export type StatusSize = (typeof STATUS_SIZES)[number]

const ACCENT_FAMILY: Record<Exclude<StatusVariant, "neutral">, string> = {
  success: "green",
  warning: "amber",
  error: "red",
  info: "blue",
}

function accentVar(family: string, shade: number) {
  return `var(--uds-color-accent-${family}-${shade})`
}

type StatusColorSet = {
  backgroundColor: string
  borderColor: string
  color: string
  dotColor: string
}

/**
 * Resolves the four color roles (fill, border, text, dot) for a given
 * variant/appearance/color combination. Warning (amber) uses black text in
 * `solid` mode and a step-darker border in `outlined` mode — the amber ramp
 * doesn't have enough contrast at the same steps the other families use.
 */
function statusColors(
  variant: StatusVariant,
  appearance: StatusAppearance,
  color: StatusColor
): StatusColorSet {
  if (variant === "neutral") {
    const pastel = "var(--uds-color-neutrals-300)"
    const deep = "var(--uds-color-neutrals-700)"
    const text = "var(--uds-text-primary)"

    if (appearance === "solid") {
      return color === "pastel"
        ? { backgroundColor: pastel, borderColor: "transparent", color: text, dotColor: text }
        : {
            backgroundColor: deep,
            borderColor: "transparent",
            color: "var(--uds-color-white)",
            dotColor: "var(--uds-color-neutrals-200)",
          }
    }
    if (appearance === "outlined") {
      return {
        backgroundColor: "transparent",
        borderColor: color === "pastel" ? pastel : deep,
        color: text,
        dotColor: text,
      }
    }
    return {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: text,
      dotColor:
        color === "pastel"
          ? "var(--uds-color-neutrals-200)"
          : "var(--uds-color-neutrals-500)",
    }
  }

  const family = ACCENT_FAMILY[variant]
  const darkForeground = variant === "warning"

  if (appearance === "solid") {
    if (color === "pastel") {
      const text = accentVar(family, 900)
      return { backgroundColor: accentVar(family, 300), borderColor: "transparent", color: text, dotColor: text }
    }
    const text = darkForeground ? "var(--uds-color-black)" : "var(--uds-color-white)"
    return {
      backgroundColor: accentVar(family, 600),
      borderColor: "transparent",
      color: text,
      dotColor: accentVar(family, 200),
    }
  }

  if (appearance === "outlined") {
    if (color === "pastel") {
      const text = accentVar(family, 700)
      return { backgroundColor: "transparent", borderColor: accentVar(family, 300), color: text, dotColor: text }
    }
    const text = accentVar(family, 900)
    return {
      backgroundColor: "transparent",
      borderColor: accentVar(family, darkForeground ? 700 : 600),
      color: text,
      dotColor: text,
    }
  }

  // text-only
  return color === "pastel"
    ? {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: accentVar(family, 700),
        dotColor: accentVar(family, 200),
      }
    : {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: accentVar(family, 900),
        dotColor: accentVar(family, 500),
      }
}

const statusVariants = cva(
  "inline-flex items-center rounded-[4px] border font-uds-medium [font-family:var(--font-inter)]",
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
  }
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
  /** Fill (solid), border-only (outlined), or label-only (text-only). */
  appearance?: StatusAppearance
  /** Soft tint ("pastel") or a deeper, more saturated treatment ("default"). */
  color?: StatusColor
  size?: StatusSize
  dot?: boolean
}

function Status({
  className,
  variant = "neutral",
  appearance = "solid",
  color = "pastel",
  size,
  dot = true,
  style,
  children,
  ...props
}: StatusProps) {
  const colors = statusColors(variant, appearance, color)

  return (
    <span
      data-slot="status"
      data-variant={variant}
      data-appearance={appearance}
      data-color={color}
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
