"use client"

import * as React from "react"
import { ListIcon } from "@phosphor-icons/react/List"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/MagnifyingGlass"

import { Branding } from "@/components/ui/branding"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/ui/search-input"
import { cn } from "@/lib/utils"
import {
  udsBrandToBrandingAppearance,
  UDS_DEFAULT_BRAND,
  type UdsBrandId,
} from "@/lib/uds-brand"

export type HeaderIdentityVariant = "brand" | "title"

export type HeaderProps = React.ComponentProps<"header"> & {
  /**
   * Right-aligned trailing actions (icon buttons, avatar, dropdowns).
   * Do not place an additional SearchInput here — use the leading search / `searchProps`.
   */
  trailing?: React.ReactNode
  /** Props forwarded to the default SearchInput. Ignored when `children` is provided or `hideSearch` is true. */
  searchProps?: React.ComponentProps<typeof SearchInput>
  /**
   * When `true`, omit the default SearchInput. Ignored when `children` is provided
   * (custom leading content replaces search).
   */
  hideSearch?: boolean
  /**
   * When `true`, show the menu collapse/expand control before branding.
   * Wired by AppShell; always visible (does not hide when the rail is collapsed).
   */
  showMenuToggle?: boolean
  /** Controlled menu expanded state for the toggle `aria-expanded`. */
  menuExpanded?: boolean
  /** Called when the menu toggle is activated. */
  onMenuToggle?: () => void
  /**
   * Header identity: **`brand`** (default) shows {@link Branding} wordmark; **`title`** shows plain text.
   * Wordmark stays visible when the menu is collapsed (no mark swap).
   */
  headerVariant?: HeaderIdentityVariant
  /** Product / brand id for wordmark artwork. Defaults to **`chg`**. */
  brand?: UdsBrandId
  /** Product or application name when `headerVariant` is `"title"`. */
  headerTitle?: string
  /**
   * Custom content between brand/toggle and search (rare). Does not replace brand/toggle.
   * Prefer `children` only when replacing search.
   */
  brandSlot?: React.ReactNode
}

/**
 * App-level top bar. In AppShell it spans the full viewport above the menu rail.
 *
 * Default composition: optional menu toggle + brand/title + SearchInput + trailing.
 * Below `lg`, search collapses to an icon that expands the same field inline.
 * `children` replaces the default SearchInput (not brand/toggle).
 */
function Header({
  className,
  children,
  trailing,
  searchProps,
  hideSearch = false,
  showMenuToggle = false,
  menuExpanded = true,
  onMenuToggle,
  headerVariant = "brand",
  brand = UDS_DEFAULT_BRAND,
  headerTitle,
  brandSlot,
  ...props
}: HeaderProps) {
  const headerRef = React.useRef<HTMLElement>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
  const searchSuppressed = hideSearch && children === undefined
  const useTitleHeader = headerVariant === "title" && Boolean(headerTitle?.trim())
  const brandingAppearance = udsBrandToBrandingAppearance(brand)
  const searchFieldId = searchProps?.id

  React.useEffect(() => {
    if (!mobileSearchOpen) return
    const root = headerRef.current
    const input =
      (searchFieldId ? document.getElementById(searchFieldId) : null) ??
      root?.querySelector<HTMLInputElement>('input[type="search"]')
    input?.focus()
  }, [mobileSearchOpen, searchFieldId])

  const menuToggle =
    showMenuToggle && onMenuToggle ? (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-11 shrink-0"
        aria-label={menuExpanded ? "Collapse menu" : "Expand menu"}
        aria-expanded={menuExpanded}
        onClick={onMenuToggle}
      >
        <ListIcon className="size-5 shrink-0" weight="bold" aria-hidden />
      </Button>
    ) : null

  const brandNode =
    brandSlot != null ? (
      brandSlot
    ) : useTitleHeader ? (
      <div
        data-slot="uds-header-title"
        className="flex h-14 w-[214px] shrink-0 items-center overflow-hidden px-1"
        title={headerTitle}
      >
        <span className="truncate text-base font-semibold leading-none text-neutral-900 dark:text-neutral-100">
          {headerTitle}
        </span>
      </div>
    ) : (
      <div
        data-slot="uds-header-brand"
        className="flex h-14 w-[214px] shrink-0 items-center overflow-hidden"
      >
        <Branding
          appearance={brandingAppearance}
          wordmarkAlign="start"
          className="h-14 w-full min-w-0"
        />
      </div>
    )

  const resolvedSearchProps = {
    inputSize: "sm" as const,
    variant: "shortcut" as const,
    placeholder: "Search…",
    "aria-label": "Search",
    ...searchProps,
  }

  const searchField = !searchSuppressed && children === undefined && (
    <div
      role="search"
      className={cn(
        "relative min-w-0 max-w-[600px] -ml-[20px]",
        mobileSearchOpen ? "flex flex-1" : "hidden flex-1 lg:flex",
      )}
    >
      <SearchInput
        {...resolvedSearchProps}
        onBlur={(event) => {
          resolvedSearchProps.onBlur?.(event)
          // Delay so icon/button clicks inside can run first.
          window.setTimeout(() => {
            if (typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches) {
              setMobileSearchOpen(false)
            }
          }, 0)
        }}
      />
    </div>
  )

  const customLeading = children !== undefined ? children : null

  const mobileSearchTrigger =
    !searchSuppressed && children === undefined && !mobileSearchOpen ? (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-11 shrink-0 lg:hidden"
        aria-label="Open search"
        onClick={() => setMobileSearchOpen(true)}
      >
        <MagnifyingGlassIcon className="size-5 shrink-0" weight="bold" aria-hidden />
      </Button>
    ) : null

  return (
    <header
      ref={headerRef}
      data-slot="uds-header"
      data-menu-expanded={showMenuToggle ? (menuExpanded ? "true" : "false") : undefined}
      data-mobile-search={mobileSearchOpen ? "true" : undefined}
      className={cn(
        "flex h-14 shrink-0 flex-nowrap items-center gap-2 border-b border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] px-[length:var(--uds-spacing-6)] md:gap-3 lg:gap-4",
        className,
      )}
      {...props}
    >
      {menuToggle}
      {!mobileSearchOpen ? brandNode : null}
      {customLeading}
      {searchField}
      {(mobileSearchTrigger != null || trailing != null) && (
        <div className="ml-auto flex shrink-0 items-center gap-0">
          {mobileSearchTrigger}
          {trailing}
        </div>
      )}
    </header>
  )
}

export { Header }
