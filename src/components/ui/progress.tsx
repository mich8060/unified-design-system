"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import { InfoIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ProgressLabelPlacement =
  | "none"
  | "left"
  | "right"
  | "below-left"
  | "below-right"
  | "hover-bar"
  | "tooltip"

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  /**
   * Where the percentage readout appears, matching the Figma "Label" variants:
   * `left`/`right` sit beside the bar, `below-left`/`below-right` sit under it,
   * `hover-bar` shows a draggable-looking handle with a tooltip on hover, and
   * `tooltip` shows a fixed info icon with a tooltip on hover.
   */
  labelPlacement?: ProgressLabelPlacement
  /** Overrides the default `{value}%` label text. */
  formatLabel?: (value: number) => React.ReactNode
}

function formatPercentLabel(value: number) {
  return `${value}%`
}

function ProgressBar({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-2 w-full items-center overflow-hidden rounded-full bg-uds-surface-quaternary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 rounded-full bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

function Progress({
  className,
  value,
  labelPlacement = "none",
  formatLabel = formatPercentLabel,
  ...props
}: ProgressProps) {
  const pct = value ?? 0
  const label = formatLabel(pct)

  if (labelPlacement === "left" || labelPlacement === "right") {
    return (
      <div
        data-slot="progress-wrapper"
        data-label-placement={labelPlacement}
        className="flex w-full items-center gap-2"
      >
        {labelPlacement === "left" ? (
          <span className="text-uds-12 font-uds-regular text-[var(--uds-text-primary)]">{label}</span>
        ) : null}
        <ProgressBar value={value} className={className} {...props} />
        {labelPlacement === "right" ? (
          <span className="text-uds-12 font-uds-regular text-[var(--uds-text-primary)]">{label}</span>
        ) : null}
      </div>
    )
  }

  if (labelPlacement === "below-left" || labelPlacement === "below-right") {
    return (
      <div data-slot="progress-wrapper" data-label-placement={labelPlacement} className="flex w-full flex-col gap-1">
        <ProgressBar value={value} className={className} {...props} />
        <span
          className={cn(
            "text-uds-12 font-uds-regular text-[var(--uds-text-primary)]",
            labelPlacement === "below-right" && "text-right"
          )}
        >
          {label}
        </span>
      </div>
    )
  }

  if (labelPlacement === "hover-bar") {
    return (
      <TooltipProvider>
        <div data-slot="progress-wrapper" data-label-placement="hover-bar" className="relative w-full pt-3">
          <ProgressBar value={value} className={className} {...props} />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${label} complete`}
                data-slot="progress-handle"
                className="absolute top-3 size-3 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-[var(--uds-color-primary-700)] bg-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                style={{ left: `${pct}%` }}
              />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  }

  if (labelPlacement === "tooltip") {
    return (
      <TooltipProvider>
        <div data-slot="progress-wrapper" data-label-placement="tooltip" className="flex w-full items-center gap-2">
          <ProgressBar value={value} className={cn("flex-1", className)} {...props} />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${label} complete`}
                data-slot="progress-info-trigger"
                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--uds-icon-primary)] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <InfoIcon aria-hidden className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{label} complete</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  }

  return <ProgressBar value={value} className={className} {...props} />
}

export { Progress }
