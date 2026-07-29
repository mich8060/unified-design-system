import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const separatorLabelPillClass =
  "shrink-0 rounded-full border border-border bg-background px-3 py-1 text-uds-10 font-uds-regular leading-uds-10 text-foreground [font-family:var(--font-inter)]"

type SeparatorLabelAlign = "left" | "center" | "right"

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "default" | "label" | "band"
  /** Shown inside the bordered pill when `variant` is `"label"`. */
  label?: React.ReactNode
  /** Horizontal placement of the label pill. Only applies when `variant` is `"label"`. */
  labelAlign?: SeparatorLabelAlign
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  label,
  labelAlign = "center",
  ...props
}: SeparatorProps) {
  if (variant === "band") {
    const isVertical = orientation === "vertical"
    return (
      <div
        data-slot="separator"
        data-variant="band"
        role={decorative ? undefined : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "shrink-0 border-solid bg-[var(--uds-color-neutrals-100)]",
          isVertical
            ? "h-full w-2 self-stretch [border-inline:solid_var(--uds-border-width-1)_var(--uds-border-secondary)]"
            : "h-2 w-full [border-block:solid_var(--uds-border-width-1)_var(--uds-border-secondary)]",
          className
        )}
        {...(props as React.ComponentProps<"div">)}
      />
    )
  }

  if (variant === "label") {
    const isVertical = orientation === "vertical"
    // "left"/"right" remap to the natural start/end along whichever axis is active (top/bottom when vertical).
    const justifyClass =
      labelAlign === "left" ? "justify-start" : labelAlign === "right" ? "justify-end" : "justify-center"

    return (
      <div
        data-slot="separator"
        data-variant="label"
        data-label-align={labelAlign}
        role={decorative ? undefined : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn("relative", isVertical ? "h-full self-stretch" : "w-full", className)}
        {...(props as React.ComponentProps<"div">)}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bg-border",
            isVertical
              ? "top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
              : "top-1/2 right-0 left-0 h-px -translate-y-1/2"
          )}
          data-slot="separator-label-line"
        />
        <div
          className={cn(
            "relative z-[1] flex items-center",
            isVertical ? "h-full flex-col" : "w-full",
            justifyClass
          )}
        >
          <span className={separatorLabelPillClass} data-slot="separator-label-text">
            {label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant="default"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
export type { SeparatorProps, SeparatorLabelAlign }
