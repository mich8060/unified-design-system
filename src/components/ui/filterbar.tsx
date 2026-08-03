import * as React from "react"

import { Button } from "@/components/ui/button"
import { XIcon } from "@/components/ui/uds-icons"
import { cn } from "@/lib/utils"

/**
 * Filterbar — module pattern for list/table toolbars:
 * search + filter controls on the left, page actions on the right, optional applied facets below.
 *
 * Adjacent discrete actions use ≥12px gap (`--uds-gap-12`).
 * Buttons next to SearchInput (`FilterbarFilters`): icon-only, default/`icon` size, left-aligned immediately after the field.
 * `FilterbarActions`: one primary default-size Button; DotsThree overflow last on the right with weight="bold" when more than three buttons.
 */
function Filterbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filterbar"
      className={cn(
        "flex w-full flex-col gap-[length:var(--uds-gap-12)]",
        className,
      )}
      {...props}
    />
  )
}

/** Top row: search cluster + trailing actions. */
function FilterbarToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filterbar-toolbar"
      className={cn(
        "flex w-full flex-wrap items-start justify-between gap-[length:var(--uds-spacing-10)]",
        className,
      )}
      {...props}
    />
  )
}

/**
 * Left cluster: SearchInput + icon-only filter controls immediately after the field.
 * Search field defaults to 500px; children stay left-aligned (`justify-start`).
 */
function FilterbarSearch({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filterbar-search"
      className={cn(
        "flex min-w-0 flex-1 flex-wrap items-center justify-start gap-[length:var(--uds-gap-12)]",
        "[&_[data-slot=input-group]]:w-[500px] [&_[data-slot=input-group]]:max-w-full [&_[data-slot=input-group]]:shrink-0",
        className,
      )}
      {...props}
    />
  )
}

/**
 * Controls immediately to the right of SearchInput — icon-only Buttons at default/`icon` size
 * (height aligned with the search field). Require `aria-label` on each control.
 */
function FilterbarFilters({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filterbar-filters"
      className={cn(
        "flex shrink-0 items-center justify-start gap-[length:var(--uds-gap-12)]",
        className,
      )}
      {...props}
    />
  )
}

/**
 * Trailing actions slot — flex row with ≥12px gap.
 * Recommended: exactly one primary Button (default size); if more than three buttons,
 * overflow extras behind a DotsThree icon (last on the right, weight="bold") + action menu.
 * See design-language/semantics/toolbar-action-slots.md.
 */
function FilterbarActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filterbar-actions"
      className={cn(
        "flex shrink-0 flex-wrap items-center gap-[length:var(--uds-gap-12)]",
        className,
      )}
      {...props}
    />
  )
}

/**
 * Open facets slot — pass any applied-filter content (prefer soft `Button variant="secondary"` chips).
 * Layout only: flex wrap with ≥12px gap.
 */
function FilterbarFacets({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filterbar-facets"
      className={cn(
        "flex w-full flex-wrap items-center gap-[length:var(--uds-gap-12)]",
        className,
      )}
      {...props}
    />
  )
}

/** Optional convenience: dismissible soft (`secondary`) facet Button. */
function FilterbarFacet({
  className,
  children,
  onRemove,
  removeLabel = "Remove filter",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size" | "children"> & {
  children: React.ReactNode
  onRemove?: React.MouseEventHandler<HTMLButtonElement>
  removeLabel?: string
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      data-slot="filterbar-facet"
      aria-label={typeof children === "string" ? `${removeLabel}: ${children}` : removeLabel}
      className={cn(className)}
      onClick={onRemove}
      {...props}
    >
      {children}
      <XIcon data-icon="inline-end" weight="bold" aria-hidden className="size-4" />
    </Button>
  )
}

export {
  Filterbar,
  FilterbarActions,
  FilterbarFacet,
  FilterbarFacets,
  FilterbarFilters,
  FilterbarSearch,
  FilterbarToolbar,
}
