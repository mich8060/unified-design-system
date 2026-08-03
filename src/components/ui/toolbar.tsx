import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

const toolbarVariants = cva(
  [
    // Named columns so Start/Center/End land correctly even when Center is omitted.
    "grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-[length:var(--uds-gap-16)]",
    "rounded-none border-0 border-b border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)]",
    "[&_[data-slot=toolbar-start]]:col-start-1 [&_[data-slot=toolbar-start]]:justify-self-start",
    "[&_[data-slot=toolbar-center]]:col-start-2 [&_[data-slot=toolbar-center]]:justify-self-center",
    "[&_[data-slot=toolbar-end]]:col-start-3 [&_[data-slot=toolbar-end]]:justify-self-end",
  ].join(" "),
  {
    variants: {
      size: {
        /** Aligns with default control height / 44px touch target. */
        default: "min-h-11 px-[length:var(--uds-spacing-12)] py-[length:var(--uds-spacing-8)]",
        /** Taller bar for stacked title + description in the center. */
        lg: "min-h-14 px-[length:var(--uds-spacing-16)] py-[length:var(--uds-spacing-12)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

type ToolbarSize = NonNullable<VariantProps<typeof toolbarVariants>["size"]>

const ToolbarSizeContext = React.createContext<ToolbarSize>("default")

export type ToolbarProps = React.ComponentProps<"div"> &
  VariantProps<typeof toolbarVariants>

function Toolbar({ className, size = "default", ...props }: ToolbarProps) {
  return (
    <ToolbarSizeContext.Provider value={size ?? "default"}>
      <div
        role="toolbar"
        data-slot="toolbar"
        data-size={size ?? "default"}
        className={cn(toolbarVariants({ size }), className)}
        {...props}
      />
    </ToolbarSizeContext.Provider>
  )
}

/** Leading actions (buttons, links, icon controls). */
function ToolbarStart({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-start"
      className={cn(
        "flex min-w-0 items-center gap-[length:var(--uds-gap-8)]",
        className,
      )}
      {...props}
    />
  )
}

/** Center title / metadata column (stays visually centered). */
function ToolbarCenter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-center"
      className={cn(
        "flex min-w-0 max-w-full flex-col items-center justify-center gap-0 text-center",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  const size = React.useContext(ToolbarSizeContext)
  return (
    <Text
      as="div"
      data-slot="toolbar-title"
      variant="body"
      size={size === "lg" ? "16" : "14"}
      weight="semibold"
      lineHeight="tight"
      appearance="primary"
      className={cn("m-0 max-w-full truncate", className)}
      {...props}
    />
  )
}

function ToolbarDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  const size = React.useContext(ToolbarSizeContext)
  return (
    <Text
      as="div"
      data-slot="toolbar-description"
      variant="body"
      size={size === "lg" ? "14" : "12"}
      weight="regular"
      lineHeight="tight"
      appearance="secondary"
      className={cn("m-0 max-w-full truncate", className)}
      {...props}
    />
  )
}

/** Trailing actions (buttons, links, overflow menus). */
function ToolbarEnd({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-end"
      className={cn(
        "flex min-w-0 items-center gap-[length:var(--uds-gap-8)]",
        className,
      )}
      {...props}
    />
  )
}

/** Cluster controls inside Start or End. */
function ToolbarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-group"
      className={cn(
        "flex items-center gap-[length:var(--uds-gap-8)]",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarDivider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="toolbar-divider"
      className={cn(
        "mx-1 h-6 w-px shrink-0 bg-[var(--uds-border-primary)]",
        className,
      )}
      {...props}
    />
  )
}

export {
  Toolbar,
  ToolbarCenter,
  ToolbarDescription,
  ToolbarDivider,
  ToolbarEnd,
  ToolbarGroup,
  ToolbarStart,
  ToolbarTitle,
  toolbarVariants,
}
