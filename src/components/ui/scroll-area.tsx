import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

export type ScrollBarAppearance = "minimal" | "bold"

function ScrollArea({
  className,
  children,
  scrollbarAppearance = "minimal",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** `bold` shows a visible surface-secondary trough behind the thumb; `minimal` (default) keeps the track transparent. */
  scrollbarAppearance?: ScrollBarAppearance
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar appearance={scrollbarAppearance} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  appearance = "minimal",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  appearance?: ScrollBarAppearance
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      data-appearance={appearance}
      orientation={orientation}
      className={cn(
        "flex touch-none p-[3.5px] transition-colors select-none data-horizontal:h-3 data-horizontal:flex-col data-vertical:h-full data-vertical:w-3",
        appearance === "bold" && "bg-uds-surface-secondary",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-[var(--uds-color-neutrals-400)]"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
