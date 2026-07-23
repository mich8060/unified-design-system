import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/** Accent hues aligned with the UDS badge matrix (label-only / every-color). */
export const BADGE_ACCENTS = [
  "transparent",
  "neutral",
  "red",
  "orange",
  "yellow",
  "emerald",
  "green",
  "sky",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "fuchsia",
  "magenta",
  "inverse",
] as const

export type BadgeAccent = (typeof BADGE_ACCENTS)[number]

export type BadgeAppearance = "subtle" | "pastel" | "outlined" | "solid"

export const BADGE_SHAPES = ["pill", "rect"] as const
export type BadgeShape = (typeof BADGE_SHAPES)[number]

/** Shared layout; `size` controls height, type scale, padding, and nested SVG scale. */
const badgeLayoutVariants = cva(
  "group/badge not-prose list-none inline-flex w-fit shrink-0 items-center justify-center overflow-hidden border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      shape: {
        pill: "rounded-4xl",
        rect: "rounded-[2px]",
      },
      size: {
        default:
          "min-h-6 gap-1 px-2 py-1 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg]:size-3!",
        /* Keep `text-xs` + `font-medium` here (same stack as default) so labels never pick up list/marker or missing `text-uds-*` utilities from parent apps. */
        sm: "h-5 min-h-5 gap-1 px-1.5 py-0 text-xs leading-none has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&_svg]:h-2.5 [&_svg]:w-2.5",
      },
    },
    defaultVariants: {
      shape: "pill",
      size: "default",
    },
  },
)

const badgeColorVariants = cva("", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
      secondary:
        "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
      destructive:
        "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
      outline:
        "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
      ghost:
        "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const CHROMATIC_ACCENTS = [
  "red",
  "orange",
  "yellow",
  "emerald",
  "green",
  "sky",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "fuchsia",
  "magenta",
] as const satisfies readonly BadgeAccent[]

function isChromaticAccent(
  a: BadgeAccent,
): a is (typeof CHROMATIC_ACCENTS)[number] {
  return (CHROMATIC_ACCENTS as readonly string[]).includes(a)
}

/**
 * Solid-appearance background shade per accent. Matches the official Figma Badge
 * component, where each hue was individually tuned to clear WCAG AA (4.5:1) against
 * its paired text color — a flat step (e.g. always 500) fails contrast for most hues.
 */
const SOLID_BG_SHADE: Record<(typeof CHROMATIC_ACCENTS)[number], number> = {
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

/** Chromatic accents use inline styles so Tailwind does not need literal class names for every hue (dynamic classes are tree-shaken). */
function chromaticAccentStyle(
  accent: (typeof CHROMATIC_ACCENTS)[number],
  appearance: BadgeAppearance,
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
      return {
        backgroundColor: v(SOLID_BG_SHADE[accent]),
        borderColor: "transparent",
        color: darkFg ? "var(--uds-color-black)" : "var(--uds-color-white)",
      }
    }
    default:
      return {}
  }
}

function semanticAccentClassName(
  accent: BadgeAccent,
  appearance: BadgeAppearance,
): string {
  if (accent === "neutral") {
    switch (appearance) {
      case "subtle":
        return "border-transparent bg-transparent text-[var(--uds-text-secondary)]"
      case "pastel":
        return "border-transparent bg-[var(--uds-color-neutrals-100)] text-[var(--uds-text-primary)] dark:bg-[var(--uds-surface-tertiary)] dark:text-[var(--uds-text-primary)]"
      case "outlined":
        return "border-[var(--uds-color-neutrals-400)] bg-transparent text-[var(--uds-text-secondary)]"
      case "solid":
        return "border-transparent bg-[var(--uds-color-neutrals-200)] text-[var(--uds-text-primary)] dark:bg-[var(--uds-surface-secondary)] dark:text-[var(--uds-text-primary)]"
      default:
        return ""
    }
  }

  if (accent === "transparent") {
    switch (appearance) {
      case "subtle":
        return "border-transparent bg-transparent text-[var(--uds-text-secondary)]"
      case "pastel":
        return "border-transparent bg-[var(--uds-color-neutrals-50)] text-[var(--uds-text-primary)] dark:bg-[var(--uds-surface-tertiary)] dark:text-[var(--uds-text-primary)]"
      case "outlined":
        return "border-[var(--uds-border-primary)] bg-transparent text-[var(--uds-text-secondary)]"
      case "solid":
        return "border-[var(--uds-border-primary)] bg-[var(--uds-color-white)] text-[var(--uds-text-primary)] dark:border-[var(--uds-border-primary)] dark:bg-[var(--uds-surface-secondary)] dark:text-[var(--uds-text-primary)]"
      default:
        return ""
    }
  }

  if (accent === "inverse") {
    switch (appearance) {
      case "subtle":
        return "border-transparent bg-transparent text-[var(--uds-text-primary)]"
      case "pastel":
        return "border-transparent bg-[var(--uds-color-neutrals-100)] text-[var(--uds-text-primary)] dark:bg-[var(--uds-surface-tertiary)] dark:text-[var(--uds-text-primary)]"
      case "outlined":
        return "border-[var(--uds-color-neutrals-700)] bg-transparent text-[var(--uds-text-primary)]"
      case "solid":
        return "border-transparent bg-[var(--uds-color-black)] text-[var(--uds-color-white)] dark:bg-[var(--uds-color-white)] dark:text-[var(--uds-color-black)]"
      default:
        return ""
    }
  }

  return ""
}

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeColorVariants> &
  VariantProps<typeof badgeLayoutVariants> & {
    asChild?: boolean
    accent?: BadgeAccent
    appearance?: BadgeAppearance
    /** Extra leading/trailing icon; ignored when `asChild` is true (compose manually). */
    icon?: React.ReactNode
    iconPlacement?: "inline-start" | "inline-end"
  }

function Badge({
  className,
  style,
  variant = "default",
  accent,
  appearance = "solid",
  shape = "pill",
  size = "default",
  icon,
  iconPlacement = "inline-start",
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  const chromaticStyle =
    accent != null && isChromaticAccent(accent)
      ? chromaticAccentStyle(accent, appearance)
      : undefined

  const layoutClass = badgeLayoutVariants({ shape, size })

  const colorClass =
    accent != null
      ? isChromaticAccent(accent)
        ? undefined
        : semanticAccentClassName(accent, appearance)
      : badgeColorVariants({ variant })

  const content =
    !asChild && icon != null ? (
      <>
        <span className="inline-flex shrink-0 items-center" data-icon={iconPlacement}>
          {icon}
        </span>
        {children}
      </>
    ) : (
      children
    )

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-shape={shape}
      data-size={size}
      {...(accent != null
        ? {
            "data-accent": accent,
            "data-appearance": appearance,
          }
        : {})}
      className={cn(layoutClass, colorClass, className)}
      style={
        chromaticStyle != null ? { ...chromaticStyle, ...style } : style
      }
      {...props}
    >
      {content}
    </Comp>
  )
}

export { Badge, badgeColorVariants, badgeLayoutVariants }
