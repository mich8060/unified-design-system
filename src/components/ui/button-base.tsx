import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const baseButtonVariants = cva(
  "group/button box-border inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border border-transparent bg-clip-padding font-medium outline-none transition-all select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-uds-button-surface-primary-default text-uds-button-text-default hover:bg-uds-button-surface-primary-hover",
        outline:
          "border-border bg-background text-uds-button-text-secondary hover:bg-muted hover:text-uds-button-text-secondary",
        secondary:
          "bg-uds-button-surface-secondary-default text-uds-button-text-secondary hover:bg-uds-button-surface-secondary-hover",
        ghost:
          "text-uds-button-text-secondary hover:bg-muted hover:text-uds-button-text-secondary",
        destructive:
          "bg-uds-button-surface-primary-destructive text-uds-button-text-default hover:bg-[var(--uds-color-accent-red-700)]",
        link: "text-uds-button-text-tertiary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-[length:var(--uds-gap-8)] rounded-md px-4 text-sm",
        sm: "h-9 gap-[length:var(--uds-gap-8)] rounded-md px-3 text-sm",
        lg: "h-11 gap-[length:var(--uds-gap-8)] rounded-md px-6 text-base",
        icon: "size-9 rounded-md p-0 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type BaseButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof baseButtonVariants> & {
    asChild?: boolean
  }

function BaseButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: BaseButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(baseButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { BaseButton, baseButtonVariants }
export type { BaseButtonProps }
