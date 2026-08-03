import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { cn } from "@/lib/utils"

/** Keyboard focus ring for docs rail links and disclosure controls. */
export const docsNavFocusVisibleCls =
  "outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--uds-focus-ring-border)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--uds-surface-primary)]"

/** Filled strip when the section has an active child; uses `data-brand` tokens from package CSS. */
export const docsNavParentChildActiveCls =
  "bg-[var(--brand-primary-700)] text-white hover:bg-[var(--brand-primary-700)] hover:text-white dark:bg-[var(--brand-primary-600)] dark:text-white dark:hover:bg-[var(--brand-primary-600)] dark:hover:text-white"

export const docsNavParentOpenBorderCls = "border-b border-neutral-200 dark:border-neutral-800"

/** Pins section headers while scrolling long child lists inside `<nav>`. */
export const docsNavParentStickyCls = "sticky top-0 z-10 bg-white dark:bg-neutral-950"

export function DocsNavDisclosureCaret({ open, inverse }: { open: boolean; inverse?: boolean }) {
  return (
    <CaretDownIcon
      aria-hidden
      className={cn(
        "h-4 w-4 shrink-0 transition-transform",
        open && "rotate-180",
        inverse ? "text-white" : "text-neutral-500 dark:text-neutral-400",
      )}
    />
  )
}

/** Getting Started–style rows inside an expanded section or the docs rail flyout. */
export function docsNavSubLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    docsNavFocusVisibleCls,
    "block w-full rounded-none border-l-2 px-[20px] py-[8px] text-[14px] text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
    isActive
      ? "border-[var(--brand-primary-700)] bg-[var(--brand-primary-50)] text-[var(--brand-primary-900)] hover:bg-[var(--brand-primary-100)] dark:border-[var(--brand-primary-400)] dark:bg-[var(--brand-primary-900)] dark:text-[var(--brand-primary-50)] dark:hover:bg-[var(--brand-primary-800)]"
      : "border-neutral-200 dark:border-neutral-700",
  )
}

/** Foundations / Components–style rows (medium weight when active). */
export function docsNavComponentLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    docsNavFocusVisibleCls,
    "block w-full rounded-none border-l-2 px-[20px] py-[8px] text-[14px] text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
    isActive
      ? "border-[var(--brand-primary-700)] bg-[var(--brand-primary-50)] font-medium text-[var(--brand-primary-900)] hover:bg-[var(--brand-primary-100)] dark:border-[var(--brand-primary-400)] dark:bg-[var(--brand-primary-900)] dark:text-[var(--brand-primary-50)] dark:hover:bg-[var(--brand-primary-800)]"
      : "border-neutral-200 dark:border-neutral-700",
  )
}

const sectionHeaderBaseCls = cn(
  docsNavFocusVisibleCls,
  "flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900",
)

export type DocsNavSectionHeaderProps = {
  open: boolean
  onToggle: () => void
  /** True when any descendant route is active (blue parent bar). */
  childActive: boolean
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  children: React.ReactNode
}

export function DocsNavSectionHeader({
  open,
  onToggle,
  childActive,
  icon: Icon,
  children,
}: DocsNavSectionHeaderProps) {
  return (
    <button type="button" onClick={onToggle} className={cn(docsNavParentStickyCls, sectionHeaderBaseCls, childActive && docsNavParentChildActiveCls, open && docsNavParentOpenBorderCls)}>
      <span className="flex min-w-0 items-center gap-2">
        <Icon
          aria-hidden
          className={cn("h-6 w-6 shrink-0", childActive ? "text-white" : "text-neutral-500 dark:text-neutral-400")}
        />
        <span className="truncate">{children}</span>
      </span>
      <DocsNavDisclosureCaret open={open} inverse={childActive} />
    </button>
  )
}

export function DocsNavSubList({ children }: { children: React.ReactNode }) {
  return <div className="flex min-w-0 w-full flex-col pl-[32px] pr-0">{children}</div>
}

export function DocsNavSectionList({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 min-w-0 flex-1 flex-col pt-[12px] pb-[12px]">{children}</div>
}

export function DocsNavSectionColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>
}

export type DocsNavRailTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  childActive: boolean
  /** True when this section’s flyout is open (collapsed rail). */
  flyoutOpen: boolean
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  children?: React.ReactNode
}

/** Collapsed-rail icon button; pairs with the docs rail flyout + `getRailFlyoutPositionFromAnchor` (see `docs-rail-menu.tsx`). */
export const DocsNavRailTrigger = React.forwardRef<HTMLButtonElement, DocsNavRailTriggerProps>(
  function DocsNavRailTrigger({ className, childActive, flyoutOpen, icon: Icon, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          docsNavFocusVisibleCls,
          "flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900",
          childActive && docsNavParentChildActiveCls,
          flyoutOpen && docsNavParentOpenBorderCls,
          flyoutOpen && !childActive && "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white",
          className,
        )}
        {...props}
      >
        <Icon aria-hidden className={cn("h-6 w-6 shrink-0", childActive && "text-white")} />
      </button>
    )
  },
)
