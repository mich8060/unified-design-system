import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRightIcon } from "@phosphor-icons/react/ArrowUpRight"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 font-sans text-uds-16 font-uds-medium leading-uds-16 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      appearance: {
        primary:
          "text-uds-text-link-primary-default hover:text-uds-text-link-primary-hover",
        secondary:
          "text-uds-text-link-secondary-default hover:text-uds-text-link-secondary-hover",
      },
    },
    defaultVariants: {
      appearance: "primary",
    },
  }
)

function Link({
  className,
  appearance = "primary",
  external = false,
  showExternalIcon = true,
  children,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    external?: boolean
    showExternalIcon?: boolean
  }) {
  return (
    <a
      data-slot="link"
      data-appearance={appearance}
      className={cn(linkVariants({ appearance, className }))}
      target={external ? "_blank" : props.target}
      rel={external ? "noreferrer noopener" : props.rel}
      {...props}
    >
      {children}
      {external && showExternalIcon ? (
        <ArrowUpRightIcon aria-hidden className="size-4 shrink-0" />
      ) : null}
    </a>
  )
}

export { Link }
