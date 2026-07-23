import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"

const alertVariants = cva(
  "group/alert relative flex w-full items-start gap-[length:var(--uds-gap-12)] rounded-[length:var(--uds-radius-8)] border p-4 text-left has-data-[slot=alert-action]:pr-[length:var(--uds-spacing-10)]",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        warning: "",
        success: "",
      },
      style: {
        default: "bg-uds-surface-primary",
        filled:
          "[&_[data-slot=alert-title]]:text-[var(--uds-text-primary)] [&_[data-slot=alert-description]]:text-[var(--uds-text-secondary)]",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        style: "default",
        class:
          "border-uds-border-secondary [&_[data-slot=alert-title]]:text-[var(--uds-text-primary)] [&_[data-slot=alert-description]]:text-[var(--uds-text-secondary)]",
      },
      {
        variant: "destructive",
        style: "default",
        class:
          "border-[var(--uds-button-border-primary-destructive)] [&_[data-slot=alert-title]]:text-[var(--uds-button-border-primary-destructive)] [&_[data-slot=alert-description]]:text-[var(--uds-button-border-primary-destructive)]",
      },
      {
        variant: "warning",
        style: "default",
        class:
          "border-[var(--uds-system-warning-primary)] [&_[data-slot=alert-title]]:text-[var(--uds-system-warning-primary)] [&_[data-slot=alert-description]]:text-[var(--uds-system-warning-primary)]",
      },
      {
        variant: "success",
        style: "default",
        class:
          "border-[var(--uds-system-constructive-primary)] [&_[data-slot=alert-title]]:text-[var(--uds-system-constructive-primary)] [&_[data-slot=alert-description]]:text-[var(--uds-system-constructive-primary)]",
      },
      {
        variant: "default",
        style: "filled",
        class:
          "border-[var(--uds-color-accent-blue-100)] bg-[var(--uds-color-accent-blue-25)]",
      },
      {
        variant: "destructive",
        style: "filled",
        class:
          "border-[var(--uds-color-accent-red-100)] bg-[var(--uds-color-accent-red-25)]",
      },
      {
        variant: "warning",
        style: "filled",
        class:
          "border-[var(--uds-color-accent-orange-200)] bg-[var(--uds-color-accent-orange-25)]",
      },
      {
        variant: "success",
        style: "filled",
        class:
          "border-[var(--uds-color-accent-green-100)] bg-[var(--uds-color-accent-green-25)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      style: "default",
    },
  }
)

function Alert({
  className,
  variant,
  style,
  ...props
}: Omit<React.ComponentProps<"div">, "style"> &
  VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, style }), className)}
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
    <Text
      as="div"
      data-slot="alert-title"
      variant="body"
      size="16"
      weight="semibold"
      lineHeight="regular"
      className={cn("[&_a]:underline [&_a]:underline-offset-3", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Text
      as="div"
      data-slot="alert-description"
      variant="body"
      size="14"
      weight="regular"
      lineHeight="regular"
      className={cn(
        "[&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
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
