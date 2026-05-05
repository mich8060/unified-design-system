import * as React from "react"

import { cn } from "@/lib/utils"
import { SearchInput } from "@/components/ui/search-input"

export type HeaderProps = React.ComponentProps<"header"> & {
  /** Right-aligned trailing actions (icon buttons, avatar, dropdowns). */
  trailing?: React.ReactNode
  /** Props forwarded to the default SearchInput. Ignored when `children` is provided. */
  searchProps?: React.ComponentProps<typeof SearchInput>
}

/**
 * App-level top bar that sits above the main content area.
 *
 * Renders a search input by default in the leading area.
 * Pass `children` to replace the default search with custom content
 * (breadcrumbs, page title, etc.). `trailing` is pushed to the far right
 * for utility actions.
 */
function Header({ className, children, trailing, searchProps, ...props }: HeaderProps) {
  return (
    <header
      data-slot="uds-header"
      className={cn(
        "flex h-15 shrink-0 flex-wrap items-center gap-3 border-b border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] px-4 md:gap-4",
        className,
      )}
      {...props}
    >
      {children ?? (
        <div className="relative min-w-0 w-[600px] max-w-full shrink-0">
          <SearchInput
            inputSize="sm"
            variant="shortcut"
            placeholder="Search…"
            aria-label="Search"
            {...searchProps}
          />
        </div>
      )}
      {trailing != null && (
        <div className="ml-auto flex items-center gap-1">{trailing}</div>
      )}
    </header>
  )
}

export { Header }
