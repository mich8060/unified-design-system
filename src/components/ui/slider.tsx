"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

export type SliderSize = "default" | "small"

const SLIDER_TRACK_SIZE_CLASS: Record<SliderSize, string> = {
  default: "data-horizontal:h-2 data-vertical:w-2",
  small: "data-horizontal:h-1.5 data-vertical:w-1.5",
}

const SLIDER_THUMB_SIZE_CLASS: Record<SliderSize, string> = {
  default: "size-4",
  small: "size-3.5",
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  size = "default",
  label,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  size?: SliderSize
  /** Renders a "Title ... Value" row above the track, matching the Figma "Stepped" slider. */
  label?: React.ReactNode
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  const slider = (
    <SliderPrimitive.Root
      data-slot="slider"
      data-size={size}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-uds-surface-quaternary data-horizontal:w-full data-vertical:h-full",
          SLIDER_TRACK_SIZE_CLASS[size]
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "relative block shrink-0 rounded-full border border-uds-border-secondary bg-uds-surface-primary transition-[color,box-shadow] select-none after:absolute after:-inset-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
            SLIDER_THUMB_SIZE_CLASS[size]
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )

  if (label == null) {
    return slider
  }

  return (
    <div data-slot="slider-wrapper" className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-uds-14 font-uds-regular text-[var(--uds-text-secondary)]">
          {label}
        </span>
        <span className="text-uds-14 font-uds-regular tabular-nums text-[var(--uds-text-primary)]">
          {_values.join(" – ")}
        </span>
      </div>
      {slider}
    </div>
  )
}

export { Slider }
