import * as React from "react"

import { cn } from "@/lib/utils"
import { CaretDoubleLeftIcon } from "@phosphor-icons/react/CaretDoubleLeft"
import { CaretDoubleRightIcon } from "@phosphor-icons/react/CaretDoubleRight"
import { CaretLeftIcon } from "@phosphor-icons/react/CaretLeft"
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight"
import {
  paginationContentClass,
  paginationEllipsisClass,
  paginationItemClass,
  paginationLinkVariants,
  type PaginationVariant,
} from "@/components/ui/pagination-theme"

const PaginationContext = React.createContext<{
  variant: PaginationVariant
}>({ variant: "default" })

function usePaginationContext() {
  return React.useContext(PaginationContext)
}

function Pagination({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"nav"> & { variant?: PaginationVariant }) {
  return (
    <PaginationContext.Provider value={{ variant }}>
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        data-pagination-style={variant}
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationContext.Provider>
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  const { variant } = usePaginationContext()
  return (
    <ul
      data-slot="pagination-content"
      data-pagination-style={variant}
      className={cn(paginationContentClass, className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn(paginationItemClass, className)}
      {...props}
    />
  )
}

type PaginationLinkProps = Omit<React.ComponentProps<"a">, "size"> & {
  isActive?: boolean
}

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  const { variant } = usePaginationContext()
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive ? "" : undefined}
      className={cn(
        paginationLinkVariants({
          variant,
          isActive: Boolean(isActive),
        }),
        className
      )}
      {...props}
    />
  )
}

type PaginationNavLinkProps = PaginationLinkProps & {
  icon: React.ReactNode
  srLabel: string
}

function PaginationNavLink({
  className,
  icon,
  srLabel,
  ...props
}: PaginationNavLinkProps) {
  const { variant } = usePaginationContext()
  return (
    <a
      data-slot="pagination-nav-link"
      className={cn(
        paginationLinkVariants({ variant, isActive: false }),
        className
      )}
      {...props}
    >
      <span className="sr-only">{srLabel}</span>
      {icon}
    </a>
  )
}

type PaginationNavControlProps = Omit<
  React.ComponentProps<typeof PaginationNavLink>,
  "icon" | "srLabel"
>

function PaginationPrevious({ className, ...props }: PaginationNavControlProps) {
  return (
    <PaginationNavLink
      aria-label="Go to previous page"
      srLabel="Previous page"
      icon={<CaretLeftIcon className="size-4 shrink-0" aria-hidden />}
      className={className}
      {...props}
    />
  )
}

function PaginationNext({ className, ...props }: PaginationNavControlProps) {
  return (
    <PaginationNavLink
      aria-label="Go to next page"
      srLabel="Next page"
      icon={<CaretRightIcon className="size-4 shrink-0" aria-hidden />}
      className={className}
      {...props}
    />
  )
}

function PaginationFirst({ className, ...props }: PaginationNavControlProps) {
  return (
    <PaginationNavLink
      aria-label="Go to first page"
      srLabel="First page"
      icon={<CaretDoubleLeftIcon className="size-4 shrink-0" aria-hidden />}
      className={className}
      {...props}
    />
  )
}

function PaginationLast({ className, ...props }: PaginationNavControlProps) {
  return (
    <PaginationNavLink
      aria-label="Go to last page"
      srLabel="Last page"
      icon={<CaretDoubleRightIcon className="size-4 shrink-0" aria-hidden />}
      className={className}
      {...props}
    />
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsisClass, className)}
      {...props}
    >
      …
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
export type { PaginationLinkProps, PaginationVariant }
