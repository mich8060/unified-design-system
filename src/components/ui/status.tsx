import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const STATUS_SIZES = ["default", "compact"] as const
export type StatusSize = (typeof STATUS_SIZES)[number]

const statusVariants = cva(
  "inline-flex items-center rounded-[4px] border font-uds-medium [font-family:var(--font-inter)]",
  {
    variants: {
      variant: {
        neutral:
          "border-[var(--uds-border-primary)] bg-[var(--uds-surface-secondary)] text-[var(--uds-text-primary)]",
        success:
          "border-[var(--uds-color-accent-green-300)] bg-[var(--uds-color-accent-green-100)] text-[var(--uds-color-accent-green-700)]",
        warning:
          "border-[var(--uds-color-accent-amber-300)] bg-[var(--uds-color-accent-amber-100)] text-[var(--uds-color-accent-amber-1000)]",
        error:
          "border-[var(--uds-color-accent-red-300)] bg-[var(--uds-color-accent-red-100)] text-[var(--uds-color-accent-red-700)]",
        info: "border-[var(--uds-color-accent-blue-300)] bg-[var(--uds-color-accent-blue-100)] text-[var(--uds-color-accent-blue-700)]",
      },
      size: {
        default: "gap-2 px-2 py-1 text-uds-14 leading-uds-14",
        compact: "gap-1.5 px-1.5 py-0.5 text-uds-12 leading-uds-12",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
)

const statusDotVariants = cva("rounded-full bg-current opacity-80", {
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

function Status({
  className,
  variant,
  size,
  dot = true,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof statusVariants> & {
    dot?: boolean
  }) {
  return (
    <span
      data-slot="status"
      data-variant={variant}
      data-size={size ?? "default"}
      className={cn(statusVariants({ variant, size }), className)}
      {...props}
    >
      {dot ? <span className={statusDotVariants({ size })} aria-hidden /> : null}
      {children}
    </span>
  )
}

export { Status, statusVariants }
