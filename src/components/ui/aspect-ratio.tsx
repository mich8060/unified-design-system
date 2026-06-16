"use client"

import * as React from "react"
import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type AspectRatioProps = Omit<
  React.ComponentProps<typeof AspectRatioPrimitive.Root>,
  "ratio"
> & {
  ratio: number
  src?: string
  alt?: string
}

function AspectRatio({
  className,
  ratio,
  src,
  alt = "",
  children,
  ...props
}: AspectRatioProps) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      ratio={ratio}
      className={cn(
        "relative overflow-hidden border border-uds-border-primary bg-uds-surface-secondary",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          data-slot="aspect-ratio-image"
          alt={alt}
          src={src}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      ) : (
        children
      )}
    </AspectRatioPrimitive.Root>
  )
}

export { AspectRatio }
