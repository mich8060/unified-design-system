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
      className={cn(
        "group/tabs flex w-full gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center text-[var(--uds-text-secondary)] group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:items-start group-data-vertical/tabs:justify-start",
  {
    variants: {
      variant: {
        default:
          "justify-center rounded-[length:var(--uds-radius-6)] border border-[var(--uds-border-secondary)] bg-[var(--uds-surface-secondary)] p-[3px]",
        line: "items-end gap-1 rounded-none border-0 border-b border-[var(--uds-border-primary)] bg-transparent",
      },
      fill: {
        true: "w-full [&_[data-slot=tabs-trigger]]:min-w-0 [&_[data-slot=tabs-trigger]]:flex-1",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      fill: false,
    },
  }
)

function TabsList({
  className,
  variant = "default",
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
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex max-w-full shrink-0 items-center justify-center gap-1.5 border border-transparent font-sans font-uds-regular whitespace-nowrap transition-all [font-family:var(--font-inter)] [font-size:var(--uds-font-size-14)] [line-height:var(--uds-line-14)] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        "text-[var(--uds-text-secondary)] hover:text-[var(--uds-text-primary)] data-[state=active]:font-uds-semibold",
        "group-data-[variant=default]/tabs-list:min-h-10 group-data-[variant=default]/tabs-list:rounded-[length:var(--uds-radius-4)] group-data-[variant=default]/tabs-list:px-6 group-data-[variant=default]/tabs-list:py-0",
        "group-data-[variant=default]/tabs-list:data-[state=active]:border-transparent group-data-[variant=default]/tabs-list:data-[state=active]:bg-[var(--uds-surface-brand-quaternary)] group-data-[variant=default]/tabs-list:data-[state=active]:text-[var(--uds-text-inverse)] group-data-[variant=default]/tabs-list:data-[state=active]:[&_svg]:text-[var(--uds-text-inverse)]",
        "group-data-[variant=line]/tabs-list:w-fit group-data-[variant=line]/tabs-list:flex-col group-data-[variant=line]/tabs-list:items-stretch group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:px-6 group-data-[variant=line]/tabs-list:py-3 group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:text-[var(--uds-text-brand-quaternary)]",
        "group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:h-0.5 group-data-[variant=line]/tabs-list:after:bg-[var(--uds-text-brand-quaternary)] group-data-[variant=line]/tabs-list:after:opacity-0 group-data-[variant=line]/tabs-list:after:transition-opacity group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:after:inset-x-0 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:after:bottom-0 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:inset-y-0 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:-right-1 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        "group-data-vertical/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
