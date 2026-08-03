import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { baseButtonVariants } from "@/components/ui/button-base"

const buttonSizeToBaseSize = {
  default: "default",
  "2x-sm": "sm",
  xs: "sm",
  sm: "sm",
  lg: "lg",
  icon: "icon",
  "icon-xs": "icon",
  "icon-sm": "icon",
  "icon-lg": "icon",
} as const

const buttonThemeVariants = cva(
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "[a]:hover:bg-uds-button-surface-primary-hover",
        outline:
          "aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-uds-button-surface-secondary-default text-uds-button-text-secondary hover:bg-uds-button-surface-secondary-hover aria-expanded:bg-uds-button-surface-secondary-default aria-expanded:text-uds-button-text-secondary",
        ghost:
          "aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "",
      },
      size: {
        default:
          "h-11 rounded-[4px] gap-[length:var(--uds-gap-8)] px-4 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 [&_svg:not([class*='size-'])]:size-5",
        xs: "h-[32px] rounded-[4px] gap-[length:var(--uds-gap-8)] px-[10px] text-xs leading-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
        "2x-sm":
          "h-6 rounded-[4px] gap-1 px-1.5 text-[10px] leading-[14px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-[36px] rounded-[4px] gap-[length:var(--uds-gap-8)] px-3 text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-[52px] rounded-[4px] gap-[length:var(--uds-gap-8)] px-[18px] text-lg has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-6",
        icon: "size-11 aspect-square rounded-[4px] p-0 text-base [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-6 aspect-square rounded-[4px] p-0 text-[10px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-9 aspect-square rounded-[4px] p-0 text-sm [&_svg:not([class*='size-'])]:size-4",
        "icon-lg":
          "h-[52px] w-[52px] aspect-square rounded-[4px] p-0 text-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonThemeVariants>["variant"]>
type ButtonSize = NonNullable<VariantProps<typeof buttonThemeVariants>["size"]>

function resolveButtonClasses({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return cn(
    baseButtonVariants({
      variant,
      size: buttonSizeToBaseSize[size],
    }),
    buttonThemeVariants({
      variant,
      size,
    }),
    className,
  )
}

function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) {
  return resolveButtonClasses({ variant, size, className })
}

export { buttonSizeToBaseSize, buttonThemeVariants, buttonVariants, resolveButtonClasses }
export type { ButtonSize, ButtonVariant }
