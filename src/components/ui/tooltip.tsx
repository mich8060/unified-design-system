"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  [
    "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-[4px] px-2 py-2 font-uds-medium tracking-[0.5px] has-data-[slot=kbd]:pr-2 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-[length:var(--uds-radius-4)] data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
  ],
  {
    variants: {
      variant: {
        theme: "bg-foreground text-background",
        black: "bg-neutral-950 text-white",
        white:
          "border border-neutral-200 bg-white text-neutral-950 dark:border-neutral-700",
      },
    },
    defaultVariants: {
      variant: "theme",
    },
  },
)

const tooltipArrowVariants = cva(
  "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
  {
    variants: {
      variant: {
        theme: "bg-foreground fill-foreground",
        black: "bg-neutral-950 fill-neutral-950",
        white: "bg-white fill-white",
      },
    },
    defaultVariants: {
      variant: "theme",
    },
  },
)

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  variant,
  sideOffset = 0,
  style,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipContentVariants>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        data-variant={variant ?? "theme"}
        sideOffset={sideOffset}
        style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--uds-font-size-10)', lineHeight: 'var(--uds-line-10)', ...style }}
        className={cn(tooltipContentVariants({ variant }), className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={tooltipArrowVariants({ variant })} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
