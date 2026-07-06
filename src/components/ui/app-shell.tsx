import * as React from "react"
import { Suspense, lazy } from "react"

const RouterOutlet = lazy(() => import('react-router-dom').then(m => ({ default: m.Outlet })))

import { Header, type HeaderProps } from "@/components/ui/header"
import { cn } from "@/lib/utils"

function AppShellFallback() {
  return (
    <div
      className="mx-auto max-w-4xl space-y-4 px-8 py-10 lg:max-w-5xl"
      aria-busy
      aria-label="Loading page"
    >
      <div className="h-8 w-48 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 max-w-xl animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 max-w-lg animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  )
}

export type AppShellProps = React.ComponentProps<"div"> & {
  /**
   * Content rendered in the fixed sidebar rail (`.appshell--menu`).
   * **Canonical:** configure the package `<Menu />` here — AppShell CSS offsets the body from
   * `[data-slot="uds-menu-root"]`. Do not place `Sidebar*` in this slot unless you add your own layout CSS.
   */
  menu?: React.ReactNode
  /**
   * @deprecated Use `menu`. Older docs used `sidebar`; it is not a separate slot.
   */
  sidebar?: React.ReactNode
  /**
   * When `true` (default), renders a React Router `<Outlet />` inside `.appshell--main` **before**
   * `AppShell.Main` / other children. Requires `react-router-dom` and a parent `<Router>` that wraps
   * this shell. Set to `false` for static pages (no consumer router).
   */
  enableRouterOutlet?: boolean
  /** Right-aligned custom actions rendered inside the standardized AppShell header. */
  headerRight?: React.ReactNode
  /** Props forwarded to the standardized AppShell header's built-in SearchInput. */
  headerSearchProps?: HeaderProps["searchProps"]
  /** Optional secondary pane (e.g. record list, search results). Animates open/closed. */
  listview?: React.ReactNode
  /** Renders at the end of the main region (scrolls with page content; not fixed). */
  footer?: React.ReactNode
}

type AppShellRegionProps = { children?: React.ReactNode }

function AppShellMenuRegion({ children }: AppShellRegionProps) {
  return <>{children}</>
}

function AppShellHeaderRegion({ children }: AppShellRegionProps) {
  return <>{children}</>
}

function AppShellListviewRegion({ children }: AppShellRegionProps) {
  return <>{children}</>
}

function AppShellMainRegion({ children }: AppShellRegionProps) {
  return <>{children}</>
}

function AppShellFooterRegion({ children }: AppShellRegionProps) {
  return <>{children}</>
}

type ParsedAppShellRegions = {
  menu?: React.ReactNode
  headerRight?: React.ReactNode
  listview?: React.ReactNode
  main?: React.ReactNode
  footer?: React.ReactNode
  looseChildren: React.ReactNode[]
}

function parseAppShellRegions(children: React.ReactNode): ParsedAppShellRegions {
  const parsed: ParsedAppShellRegions = { looseChildren: [] }

  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) {
      parsed.looseChildren.push(child)
      continue
    }
    const regionChild = child as React.ReactElement<AppShellRegionProps>
    if (child.type === AppShellMenuRegion) {
      parsed.menu = regionChild.props.children
      continue
    }
    if (child.type === AppShellHeaderRegion) {
      parsed.headerRight = regionChild.props.children
      continue
    }
    if (child.type === AppShellListviewRegion) {
      parsed.listview = regionChild.props.children
      continue
    }
    if (child.type === AppShellMainRegion) {
      parsed.main = regionChild.props.children
      continue
    }
    if (child.type === AppShellFooterRegion) {
      parsed.footer = regionChild.props.children
      continue
    }
    parsed.looseChildren.push(child)
  }

  return parsed
}

function AppShellRoot({
  className,
  children,
  menu,
  sidebar,
  enableRouterOutlet = true,
  headerRight,
  headerSearchProps,
  listview,
  footer,
  ...props
}: AppShellProps) {
  const parsedRegions = parseAppShellRegions(children)
  const resolvedMenu = parsedRegions.menu ?? menu ?? sidebar
  const resolvedHeaderRight = parsedRegions.headerRight ?? headerRight
  const resolvedListview = parsedRegions.listview ?? listview
  const resolvedFooter = parsedRegions.footer ?? footer
  const resolvedMain = parsedRegions.main ?? parsedRegions.looseChildren
  const showListview = resolvedListview != null

  return (
    <div
      data-slot="appshell"
      className={cn("appshell", className)}
      {...props}
    >
      {resolvedMenu && <div className="appshell--menu">{resolvedMenu}</div>}
      <div className="appshell--body">
        <div className="appshell--header">
          <Header trailing={resolvedHeaderRight} searchProps={headerSearchProps} />
        </div>
        <div className="appshell--content">
          <div
            className={cn("appshell--listview", showListview && "appshell--listview-open")}
            aria-hidden={!showListview}
          >
            {resolvedListview}
          </div>
          <div className="appshell--main-column">
            <div className="appshell--main">
              {enableRouterOutlet ? (
                <Suspense fallback={<AppShellFallback />}>
                  <RouterOutlet />
                </Suspense>
              ) : null}
              {resolvedMain}
              {resolvedFooter ? <div className="appshell--footer">{resolvedFooter}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AppShell = Object.assign(AppShellRoot, {
  Menu: AppShellMenuRegion,
  Header: AppShellHeaderRegion,
  Listview: AppShellListviewRegion,
  Main: AppShellMainRegion,
  Footer: AppShellFooterRegion,
})

export { AppShell }
