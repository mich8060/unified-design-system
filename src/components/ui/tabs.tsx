"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex w-full gap-2",
        "data-[orientation=horizontal]:flex-col",
        "data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-start",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  cn(
    "group/tabs-list inline-flex text-[var(--uds-text-secondary)]",
    "group-data-[orientation=horizontal]/tabs:items-center",
    /* Vertical: hug longest label; stretch triggers to that width for a shared track */
    "group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:w-max group-data-[orientation=vertical]/tabs:min-w-[200px] group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch group-data-[orientation=vertical]/tabs:justify-start",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "justify-center rounded-[length:var(--uds-radius-6)] border border-[var(--uds-border-secondary)] bg-[var(--uds-surface-secondary)] p-[3px]",
          "group-data-[orientation=vertical]/tabs:justify-start",
        ),
        line: cn(
          "gap-1 overflow-visible rounded-none border-0 bg-transparent",
          /* Horizontal: underline track along the bottom */
          "group-data-[orientation=horizontal]/tabs:items-end group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=horizontal]/tabs:border-[var(--uds-border-primary)]",
          /* Vertical: same track rotated — right edge */
          "group-data-[orientation=vertical]/tabs:border-r group-data-[orientation=vertical]/tabs:border-[var(--uds-border-primary)]",
        ),
      },
      fill: {
        /**
         * Horizontal only: equal-width triggers spanning the list.
         * Vertical has no full-width / fill mode — list always hugs the longest label.
         */
        true: "group-data-[orientation=horizontal]/tabs:w-full [&_[data-slot=tabs-trigger]]:min-w-0 group-data-[orientation=horizontal]/tabs:[&_[data-slot=tabs-trigger]]:flex-1",
        /** Condensed triggers; horizontal list still spans full width (underline band). */
        false: "group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=horizontal]/tabs:justify-start",
      },
    },
    defaultVariants: {
      /** Underline (`line`) is preferred; use `default` for the pill/segmented strip. */
      variant: "line",
      /** Condensed triggers by default; list stays `w-full` when horizontal. Use `fill={true}` for equal-width triggers (horizontal only). */
      fill: false,
    },
  }
)

function TabsList({
  className,
  variant = "line",
  fill = false,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-fill={fill ? "true" : "false"}
      className={cn(tabsListVariants({ variant, fill }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  style,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--uds-font-size-14)', lineHeight: 'var(--uds-line-14)', ...style }}
      className={cn(
        "relative inline-flex max-w-full shrink-0 items-center justify-center gap-1.5 border border-transparent text-left font-sans font-uds-regular whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        "text-[var(--uds-text-secondary)] hover:text-[var(--uds-text-primary)] data-[state=active]:font-uds-semibold",
        /* Pill / segmented (`default`) — same chrome in both orientations */
        "group-data-[variant=default]/tabs-list:min-h-10 group-data-[variant=default]/tabs-list:rounded-[length:var(--uds-radius-4)] group-data-[variant=default]/tabs-list:px-6 group-data-[variant=default]/tabs-list:py-0",
        "group-data-[variant=default]/tabs-list:data-[state=active]:border-transparent group-data-[variant=default]/tabs-list:data-[state=active]:bg-[var(--uds-surface-brand-quaternary)] group-data-[variant=default]/tabs-list:data-[state=active]:text-[var(--uds-text-inverse)] group-data-[variant=default]/tabs-list:data-[state=active]:[&_svg]:text-[var(--uds-text-inverse)]",
        /* Underline (`line`) — shared type/padding/active color */
        "group-data-[variant=line]/tabs-list:flex-col group-data-[variant=line]/tabs-list:items-stretch group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:px-6 group-data-[variant=line]/tabs-list:py-3 group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:text-[var(--uds-text-brand-quaternary)]",
        "group-data-[orientation=horizontal]/tabs:group-data-[variant=line]/tabs-list:w-fit",
        /* Vertical line: 8px top/bottom (4px less than horizontal py-3). */
        "group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:py-2",
        /* Active indicator overlaps the 1px list track (bottom / right) — 2px brand bar */
        "group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:z-[1] group-data-[variant=line]/tabs-list:after:bg-[var(--uds-text-brand-quaternary)] group-data-[variant=line]/tabs-list:after:opacity-0 group-data-[variant=line]/tabs-list:after:transition-opacity group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        "group-data-[orientation=horizontal]/tabs:group-data-[variant=line]/tabs-list:after:inset-x-0 group-data-[orientation=horizontal]/tabs:group-data-[variant=line]/tabs-list:after:-bottom-0.5 group-data-[orientation=horizontal]/tabs:group-data-[variant=line]/tabs-list:after:h-0.5",
        "group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:after:inset-y-0 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:after:-right-0.5 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:after:w-0.5",
        /* Vertical: left-align label; stretch to longest sibling (list is w-max) */
        "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
