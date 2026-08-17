import { cva } from "class-variance-authority"

export type PaginationVariant = "default" | "line"

export const paginationLinkVariants = cva(
  [
    "inline-flex size-11 shrink-0 items-center justify-center",
    "text-uds-14 font-uds-regular leading-uds-14 [font-family:var(--font-inter)]",
    "transition-colors outline-none select-none",
    "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
        line: "",
      },
      isActive: {
        true: "",
        false:
          "text-foreground hover:bg-muted/80 [data-pagination-style=line]:hover:bg-muted/80",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isActive: true,
        class:
          "bg-foreground text-background hover:bg-foreground hover:text-background dark:bg-foreground dark:text-background",
      },
      {
        variant: "default",
        isActive: false,
        class: "bg-transparent",
      },
      {
        variant: "line",
        isActive: true,
        class:
          "border-0 border-t-2 border-t-foreground text-foreground hover:bg-transparent",
      },
      {
        variant: "line",
        isActive: false,
        class:
          "border-0 border-t-2 border-t-transparent text-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      isActive: false,
    },
  }
)

export const paginationContentClass =
  "m-0 flex list-none flex-wrap items-stretch divide-x divide-border overflow-hidden rounded-none border border-input bg-background p-0 data-[pagination-style=line]:divide-x-0 data-[pagination-style=line]:border-0 data-[pagination-style=line]:border-t data-[pagination-style=line]:border-input"

export const paginationItemClass = "flex items-stretch"

export const paginationEllipsisClass =
  "inline-flex size-11 items-center justify-center text-uds-14 font-uds-regular leading-uds-14 text-muted-foreground [font-family:var(--font-inter)]"

/** Matches pagination link label typography (e.g. jump “of N” suffix). */
export const paginationJumpSuffixClass =
  "text-uds-14 font-uds-regular leading-uds-14 text-foreground [font-family:var(--font-inter)]"
