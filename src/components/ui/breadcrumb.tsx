import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { DotsThreeIcon } from "@phosphor-icons/react/DotsThree"
import { cn } from "@/lib/utils"

type BreadcrumbSize = "default" | "compact"

const BreadcrumbSizeContext = React.createContext<BreadcrumbSize | undefined>(
  undefined,
)

/** Prefer compact breadcrumbs under `PageHeaderNav` (page chrome). */
function useBreadcrumbSize(size?: BreadcrumbSize): BreadcrumbSize {
  const fromContext = React.useContext(BreadcrumbSizeContext)
  return size ?? fromContext ?? "default"
}

const breadcrumbVariants = cva(
  "font-sans font-uds-regular text-[var(--uds-text-secondary)]",
  {
    variants: {
      size: {
        /** Body/14 — default trail. */
        default:
          "text-uds-14 leading-uds-14 [&_[data-slot=breadcrumb-separator]>svg]:size-3.5 [&_[data-slot=breadcrumb-ellipsis]]:size-5 [&_[data-slot=breadcrumb-ellipsis]>svg]:size-4",
        /** Body/12 — one step smaller; use in PageHeader. */
        compact:
          "text-uds-12 leading-uds-12 [&_[data-slot=breadcrumb-separator]>svg]:size-3 [&_[data-slot=breadcrumb-ellipsis]]:size-4 [&_[data-slot=breadcrumb-ellipsis]>svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

type BreadcrumbProps = React.ComponentProps<"nav"> &
  VariantProps<typeof breadcrumbVariants>

function Breadcrumb({ className, size, ...props }: BreadcrumbProps) {
  const resolvedSize = useBreadcrumbSize(size ?? undefined)

  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      data-size={resolvedSize}
      className={cn(breadcrumbVariants({ size: resolvedSize }), className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "inline-flex items-center gap-1 font-uds-semibold text-[var(--uds-text-tertiary)] no-underline transition-colors hover:text-[var(--uds-text-link-secondary-hover)] [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn(
        "inline-flex items-center gap-1 font-uds-semibold text-[var(--uds-text-primary)] [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("text-[var(--uds-icon-tertiary)] [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? "/"}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <DotsThreeIcon />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbSizeContext,
  breadcrumbVariants,
}
export type { BreadcrumbProps, BreadcrumbSize }
