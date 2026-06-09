"use client"

import * as React from "react"
import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/** Figma Ratio variant presets (240px-wide reference frames). */
const ASPECT_RATIO_PRESETS = {
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "3:2": 3 / 2,
  "21:9": 21 / 9,
} as const

type AspectRatioPreset = keyof typeof ASPECT_RATIO_PRESETS

/** Default docs/demo placeholder — swap `src` for product imagery. */
const ASPECT_RATIO_PLACEHOLDER_SRC = "/showcase/aspect-ratio-placeholder.png"

function AspectRatio({
  className,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      className={cn(
        "relative overflow-hidden rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-uds-surface-secondary",
        className
      )}
      {...props}
    />
  )
}

function AspectRatioImage({
  className,
  alt = "",
  src = ASPECT_RATIO_PLACEHOLDER_SRC,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="aspect-ratio-image"
      alt={alt}
      src={src}
      className={cn(
        "pointer-events-none absolute inset-0 size-full max-w-none object-cover",
        className
      )}
      {...props}
    />
  )
}

export {
  AspectRatio,
  AspectRatioImage,
  ASPECT_RATIO_PLACEHOLDER_SRC,
  ASPECT_RATIO_PRESETS,
  type AspectRatioPreset,
}
