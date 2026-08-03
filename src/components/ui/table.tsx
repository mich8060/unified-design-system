import * as React from "react"

import { cn } from "@/lib/utils"

export type TableProps = React.ComponentProps<"table"> & {
  /**
   * Classes for the outer scroll/chrome wrapper (`data-slot="table-container"`).
   * Use with `appearance="plain"` or overrides to remove border / radius / overflow.
   */
  containerClassName?: string
  /**
   * `default` — bordered, rounded container with horizontal overflow.
   * `plain` — no outer border or radius (still `overflow-x-auto` unless overridden via `containerClassName`).
   */
  appearance?: "default" | "plain"
}

function Table({
  className,
  containerClassName,
  appearance = "default",
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      data-appearance={appearance}
      className={cn(
        "relative w-full overflow-x-auto bg-background",
        appearance === "default" &&
          "rounded-[length:var(--uds-radius-4)] border border-border",
        "in-data-[slot=card-content]:rounded-none in-data-[slot=card-content]:border-0",
        containerClassName,
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-uds-surface-quaternary font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

/**
 * Cell padding (usage):
 * - Horizontal: 4px (`--uds-spacing-4`); first cell left / last cell right 16px
 * - Body cells (`TableCell`): top/bottom **8px** (`--uds-spacing-8`)
 * - Header cells (`TableHead`): height **48px** (`--uds-spacing-48`) so the
 *   header row reads as distinct from body rows (CSS table cells ignore min-height).
 * - Trailing action column (button / link / icons): add `className="w-0"` (or
 *   `w-[1%]`) on that `TableHead` / `TableCell` so the column hugs content and
 *   stays at the far end of the row — do not leave actions in a flexible-width cell.
 */
const tableCellHorizontal =
  "px-[length:var(--uds-spacing-4)] first:pl-[length:var(--uds-spacing-16)] last:pr-[length:var(--uds-spacing-16)]"

export type TableHeadProps = React.ComponentProps<"th"> & {
  /** When `true`, allow text to wrap (`whitespace-normal`). Default keeps `whitespace-nowrap`. */
  wrap?: boolean
}

function TableHead({ className, wrap = false, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-[length:var(--uds-spacing-48)] bg-accent text-left align-middle text-foreground",
        wrap ? "whitespace-normal" : "whitespace-nowrap",
        tableCellHorizontal,
        "py-[length:var(--uds-spacing-4)]",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

export type TableCellProps = React.ComponentProps<"td"> & {
  /** When `true`, allow text to wrap (`whitespace-normal`). Default keeps `whitespace-nowrap`. */
  wrap?: boolean
}

function TableCell({ className, wrap = false, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle",
        wrap ? "whitespace-normal" : "whitespace-nowrap",
        tableCellHorizontal,
        "py-[length:var(--uds-spacing-8)]",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "border-t border-border bg-[color-mix(in_oklch,var(--muted),black_7%)] px-2 py-3 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
