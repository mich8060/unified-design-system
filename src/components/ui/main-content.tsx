import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { useRegisterAppShellFooterHost } from "@/components/ui/app-shell-footer-host"
import { cn } from "@/lib/utils"

const mainContentVariants = cva("box-border w-full min-w-0", {
  variants: {
    containment: {
      /**
       * Edge-to-edge on the AppShell.Main canvas (`--uds-surface-secondary`).
       * Content flows full width of Main with no primary panel.
       */
      edge: "min-h-0 bg-transparent",
      /**
       * Fixed content panel: max `--uds-container-xl` (1280px), surface primary,
       * 1px border-right — sits on the secondary Main canvas.
       * No left/right padding on this outer panel; height follows content (no min-height).
       * Children render in a left-aligned inner column (max `--uds-container-main` / 1000px)
       * with padding from `appearance`. AppShell.Footer portals into this column when present.
       */
      fixed:
        "flex flex-1 flex-col px-0 border-r border-uds-border-primary bg-uds-surface-primary max-w-[length:var(--uds-container-xl)]",
    },
    appearance: {
      /** Standard inset — fixed inner 24px; edge has no built-in padding. */
      default: "",
      /** Roomier inset — fixed inner 48px; edge applies 48px padding on the root. */
      expanded: "",
    },
  },
  compoundVariants: [
    {
      containment: "edge",
      appearance: "expanded",
      class: "p-[length:var(--uds-spacing-48)]",
    },
  ],
  defaultVariants: {
    containment: "edge",
    appearance: "default",
  },
})

const mainContentInnerVariants = cva(
  "box-border flex w-full min-w-0 max-w-[length:var(--uds-container-main)] flex-1 flex-col",
  {
    variants: {
      appearance: {
        default: "p-[length:var(--uds-spacing-24)]",
        expanded: "p-[length:var(--uds-spacing-48)]",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  },
)

type MainContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof mainContentVariants>

/**
 * Content containment inside `AppShell.Main`.
 *
 * - `containment="edge"` (default) — content goes edge to edge on the surface-secondary canvas.
 *   No built-in padding for `appearance="default"` — recommend `p-[length:var(--uds-spacing-24)]`.
 *   `appearance="expanded"` applies **48px** padding on this wrapper.
 * - `containment="fixed"` — primary panel max-width 1280px (`--uds-container-xl`), 1px border-right,
 *   **no left/right padding** on the outer panel; height follows content (no min-height).
 *   Inner column (`data-slot="main-content-inner"`) is max 1000px with padding from `appearance`
 *   (`default` **24px**, `expanded` **48px**).
 * - Put first-level sections under PageHeader in **`MainStack`** (gap 24) — not ad-hoc `space-y-*` / `gap-3`.
 * - Registers a host so **`AppShell.Footer`** portals into this container (end of the content column).
 */
function MainContent({
  className,
  containment = "edge",
  appearance = "default",
  children,
  ...props
}: MainContentProps) {
  const mode = containment ?? "edge"
  const density = appearance ?? "default"
  const isFixed = mode === "fixed"
  const setFooterHost = useRegisterAppShellFooterHost()

  const footerHost = (
    <div
      ref={setFooterHost}
      data-slot="main-content-footer"
      className="w-full min-w-0"
    />
  )

  return (
    <div
      data-slot="main-content"
      data-containment={mode}
      data-appearance={density}
      className={cn(
        mainContentVariants({ containment: mode, appearance: density }),
        className,
      )}
      {...props}
    >
      {isFixed ? (
        <div
          data-slot="main-content-inner"
          className={mainContentInnerVariants({ appearance: density })}
        >
          <div className="flex w-full min-w-0 flex-1 flex-col">{children}</div>
          {footerHost}
        </div>
      ) : (
        <>
          {children}
          {footerHost}
        </>
      )}
    </div>
  )
}

const mainStackVariants = cva("flex w-full min-w-0 flex-col", {
  variants: {
    appearance: {
      /** Standard first-level section gap — 24px. */
      default: "gap-[length:var(--uds-gap-24)]",
      /** Roomier section rhythm — 72px (pairs with expanded PageHeader / MainContent). */
      expanded:
        "gap-[length:calc(var(--uds-spacing-48)+var(--uds-spacing-24))]",
    },
  },
  defaultVariants: {
    appearance: "default",
  },
})

type MainStackProps = React.ComponentProps<"div"> &
  VariantProps<typeof mainStackVariants>

/**
 * First-level section stack inside `MainContent` (below PageHeader).
 * `appearance="default"` → gap **24px**; `appearance="expanded"` → gap **72px**.
 * Prefer these variants over inventing `gap-3` / `space-y-2`.
 */
function MainStack({
  className,
  appearance = "default",
  ...props
}: MainStackProps) {
  const density = appearance ?? "default"
  return (
    <div
      data-slot="main-stack"
      data-appearance={density}
      className={cn(mainStackVariants({ appearance: density }), className)}
      {...props}
    />
  )
}

export {
  MainContent,
  MainStack,
  mainContentVariants,
  mainContentInnerVariants,
  mainStackVariants,
}
export type { MainContentProps, MainStackProps }
