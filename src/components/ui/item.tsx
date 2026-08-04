import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-2", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-full items-center border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      appearance: {
        // nowrap + min-w-0: AppShell listview (320–480px) truncates title/meta beside Status
        // radius 0 + hairline bottom divider (last sibling drops the rule)
        list: "min-w-0 flex-nowrap rounded-none",
        box: "flex-wrap rounded-[length:var(--uds-radius-4)]",
      },
      variant: {
        default:
          "border-transparent bg-[var(--uds-surface-primary)] hover:bg-[var(--uds-surface-secondary)] active:bg-[var(--uds-surface-tertiary)]",
        outline:
          "border-border bg-[var(--uds-surface-primary)] hover:bg-[var(--uds-surface-secondary)] active:bg-[var(--uds-surface-tertiary)]",
        muted:
          "border-transparent bg-[var(--uds-surface-secondary)] hover:bg-[var(--uds-surface-tertiary)] active:bg-[var(--uds-surface-tertiary)]",
      },
      size: {
        default:
          "gap-2.5 px-[length:var(--uds-spacing-12)] py-[length:var(--uds-spacing-8)]",
        sm: "gap-[length:var(--uds-gap-8)] px-[length:var(--uds-spacing-12)] py-[length:var(--uds-spacing-8)]",
        xs: "gap-[length:var(--uds-gap-8)] px-[length:var(--uds-spacing-12)] py-[length:var(--uds-spacing-8)] in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    compoundVariants: [
      {
        appearance: "list",
        variant: ["default", "muted"],
        class:
          "border-x-transparent border-t-transparent border-b-border last:border-b-transparent",
      },
    ],
    defaultVariants: {
      appearance: "box",
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  appearance = "box",
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-appearance={appearance}
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ appearance, variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-0 overflow-hidden [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex min-w-0 max-w-full items-center gap-2 font-sans text-uds-16 font-uds-semibold leading-uds-16 underline-offset-4 group-data-[size=sm]/item:text-uds-14 group-data-[size=sm]/item:leading-uds-14 group-data-[size=xs]/item:text-uds-14 group-data-[size=xs]/item:leading-uds-14 [font-family:var(--font-inter)]",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "min-w-0 line-clamp-2 text-left font-sans text-uds-14 font-uds-regular leading-uds-14 text-uds-text-tertiary group-data-[appearance=list]/item:line-clamp-1 group-data-[size=sm]/item:text-uds-12 group-data-[size=sm]/item:leading-uds-12 group-data-[size=xs]/item:text-uds-12 group-data-[size=xs]/item:leading-uds-12 [font-family:var(--font-inter)] [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
