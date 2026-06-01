import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative flex w-full items-start gap-[length:var(--uds-gap-12)] rounded-[length:var(--uds-radius-8)] border p-4 text-left has-data-[slot=alert-action]:pr-[length:var(--uds-spacing-10)]",
  {
    variants: {
      variant: {
        default:
          "border-uds-border-secondary bg-uds-surface-primary [&_[data-slot=alert-title]]:text-[var(--uds-text-primary)] [&_[data-slot=alert-description]]:text-[var(--uds-text-secondary)]",
        destructive:
          "border-[var(--uds-button-border-primary-destructive)] bg-uds-surface-primary [&_[data-slot=alert-title]]:text-[var(--uds-button-border-primary-destructive)] [&_[data-slot=alert-description]]:text-[var(--uds-button-border-primary-destructive)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex min-w-0 flex-1 flex-col items-start gap-0", className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-sans text-uds-16 font-uds-medium leading-uds-16 [font-family:var(--font-inter)] [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "font-sans text-uds-14 font-uds-regular leading-uds-14 [font-family:var(--font-inter)] [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-4 right-4", className)}
      {...props}
    />
  )
}

export { Alert, AlertContent, AlertTitle, AlertDescription, AlertAction }
