import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { BreadcrumbSizeContext } from "@/components/ui/breadcrumb"
import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

const pageHeaderVariants = cva(
  "flex w-full min-w-0 flex-1 flex-col gap-[length:var(--uds-gap-24)] border-b border-uds-border-primary",
  {
    variants: {
      layout: {
        inline:
          "bg-transparent pb-[length:var(--uds-spacing-12)] mb-[length:var(--uds-spacing-24)]",
        block: "bg-uds-surface-primary",
      },
      appearance: {
        /** Standard inset — block uses 24px padding. */
        default: "",
        /** Roomier inset — block uses 48px padding. */
        expanded: "",
      },
    },
    compoundVariants: [
      {
        layout: "block",
        appearance: "default",
        class: "p-[length:var(--uds-spacing-24)]",
      },
      {
        layout: "block",
        appearance: "expanded",
        class: "p-[length:var(--uds-spacing-48)]",
      },
    ],
    defaultVariants: {
      layout: "inline",
      appearance: "default",
    },
  },
)

const pageHeaderBodyVariants = cva("flex w-full min-w-0", {
  variants: {
    actionsPlacement: {
      /**
       * Desktop (`lg+`): title stack and actions on one row (actions trailing, vertically centered).
       * Mobile / tablet (`<lg`): actions wrap below the description with ≥16px gap.
       */
      trailing:
        "flex-col items-start gap-[length:var(--uds-gap-16)] lg:flex-row lg:items-center lg:justify-between",
      /** Actions under the description, 24px below the title stack (all breakpoints). */
      below: "flex-col items-start gap-[length:var(--uds-gap-24)]",
    },
  },
  defaultVariants: {
    actionsPlacement: "trailing",
  },
})

type PageHeaderActionsPlacement = NonNullable<
  VariantProps<typeof pageHeaderBodyVariants>["actionsPlacement"]
>

const PageHeaderActionsPlacementContext =
  React.createContext<PageHeaderActionsPlacement>("trailing")

type PageHeaderProps = Omit<React.ComponentProps<"header">, "color"> &
  Omit<VariantProps<typeof pageHeaderVariants>, "appearance"> & {
    /**
     * Density for `layout="block"` padding (`default` = 24px, `expanded` = 48px).
     * @deprecated Passing `inline`/`block` here maps to `layout` (appearance becomes `default`). Prefer `layout="inline" | "block"`.
     */
    appearance?: "default" | "expanded" | "inline" | "block"
    /**
     * Where `PageHeaderActions` sit relative to the title stack.
     * - `trailing` (default) — same row as content on `lg+`; wraps below description with **≥16px** gap on mobile/tablet
     * - `below` — under the description, **24px** below `PageHeaderContent` at all breakpoints
     */
    actionsPlacement?: PageHeaderActionsPlacement
  }

/**
 * Page Header — module for page-level chrome above list/detail content.
 * **Required:** `PageHeaderTitle`.
 * **Optional:** nav, eyebrow, description, actions, layout, appearance, and actionsPlacement.
 * Title stack uses 0px gaps. `PageHeaderActions`: exactly one primary Button (default size);
 * if more than three buttons, DotsThree overflow last on the right with weight="bold". Do **not** put `SearchInput` there.
 *
 * **Layout (`layout`) in AppShell.Main:**
 * 1. `layout="inline"` (default) — inside the padded `MainContent` / page content section;
 *    **≤24px** below the header to following content (`mb` after the bottom border; do not stack parent gap).
 * 2. `layout="block"` — outside that padding, edge-to-edge with Main above `MainContent`;
 *    gap to content via `MainContent` padding.
 *
 * **Appearance (`appearance`):**
 * - `default` — block padding **24px**
 * - `expanded` — block padding **48px**
 *
 * **Actions placement (`actionsPlacement`):**
 * - `trailing` (default) — actions beside the title stack on `lg+`; wrap below description with **≥16px** gap below `lg`
 * - `below` — actions under the description with **24px** gap at all breakpoints
 *
 * **Breadcrumb:** `PageHeaderNav` defaults nested `Breadcrumb` to `size="compact"` (body/12).
 */
function PageHeader({
  className,
  layout,
  appearance = "default",
  actionsPlacement = "trailing",
  ...props
}: PageHeaderProps) {
  const legacyLayout =
    appearance === "inline" || appearance === "block" ? appearance : undefined
  const resolvedLayout = layout ?? legacyLayout ?? "inline"
  const resolvedAppearance =
    appearance === "inline" || appearance === "block"
      ? "default"
      : (appearance ?? "default")
  const resolvedActionsPlacement = actionsPlacement ?? "trailing"

  return (
    <PageHeaderActionsPlacementContext.Provider value={resolvedActionsPlacement}>
      <header
        data-slot="page-header"
        data-layout={resolvedLayout}
        data-appearance={resolvedAppearance}
        data-actions-placement={resolvedActionsPlacement}
        className={cn(
          pageHeaderVariants({
            layout: resolvedLayout,
            appearance: resolvedAppearance,
          }),
          className,
        )}
        {...props}
      />
    </PageHeaderActionsPlacementContext.Provider>
  )
}

/** Optional back control + breadcrumb row. Breadcrumbs here default to `size="compact"`. */
function PageHeaderNav({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <BreadcrumbSizeContext.Provider value="compact">
      <div
        data-slot="page-header-nav"
        className={cn(
          "flex items-center gap-[length:var(--uds-gap-16)]",
          className,
        )}
        {...props}
      />
    </BreadcrumbSizeContext.Provider>
  )
}

/** Title stack + optional actions — responsive row (`trailing`) or always stacked (`below`). */
function PageHeaderBody({ className, ...props }: React.ComponentProps<"div">) {
  const actionsPlacement = React.useContext(PageHeaderActionsPlacementContext)

  return (
    <div
      data-slot="page-header-body"
      data-actions-placement={actionsPlacement}
      className={cn(
        pageHeaderBodyVariants({ actionsPlacement }),
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0", className)}
      {...props}
    />
  )
}

/** Optional overline above the title. */
function PageHeaderEyebrow({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      data-slot="page-header-eyebrow"
      variant="body"
      size="12"
      weight="regular"
      appearance="tertiary"
      className={cn("m-0 w-full", className)}
      {...props}
    />
  )
}

/** Required page title (heading/28/semibold, h1) — largest headline on the page. */
function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      as="h1"
      data-slot="page-header-title"
      variant="heading"
      size="28"
      weight="semibold"
      appearance="primary"
      className={cn("m-0 w-full", className)}
      {...props}
    />
  )
}

/** Optional supporting copy below the title (0px gap). Max width 720px. */
function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      data-slot="page-header-description"
      variant="body"
      size="14"
      weight="regular"
      appearance="tertiary"
      className={cn("m-0 w-full max-w-[720px]", className)}
      {...props}
    />
  )
}

/**
 * Trailing actions slot — flex row with ≥12px gap.
 * Recommended: exactly one primary Button (default size); if more than three buttons,
 * overflow extras behind a DotsThree icon (last on the right, weight="bold") + action menu.
 * See design-language/semantics/toolbar-action-slots.md.
 * With `actionsPlacement="trailing"`, wraps under the description below `lg` (≥16px gap).
 * With `actionsPlacement="below"`, sits under the description with 24px gap at all breakpoints.
 */
function PageHeaderActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn(
        "flex shrink-0 flex-wrap items-center gap-[length:var(--uds-gap-12)]",
        className,
      )}
      {...props}
    />
  )
}

export {
  PageHeader,
  PageHeaderActions,
  PageHeaderBody,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderNav,
  PageHeaderTitle,
  pageHeaderBodyVariants,
  pageHeaderVariants,
}
export type { PageHeaderActionsPlacement, PageHeaderProps }
