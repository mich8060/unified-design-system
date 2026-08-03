import * as React from "react"
import { Suspense, lazy } from "react"
import { createPortal } from "react-dom"

const RouterOutlet = lazy(() => import("react-router-dom").then((m) => ({ default: m.Outlet })))

import {
  AppShellChromeContext,
  createAppShellChromeValue,
  useAppShellMenuExpanded,
} from "@/components/ui/app-shell-chrome"
import { AppShellFooterHostContext } from "@/components/ui/app-shell-footer-host"
import { Header, type HeaderIdentityVariant, type HeaderProps } from "@/components/ui/header"
import { cn } from "@/lib/utils"
import { UDS_DEFAULT_BRAND, type UdsBrandId } from "@/lib/uds-brand"

/** Default id for the main landmark / skip-link target. */
export const APPSHELL_MAIN_ID = "uds-appshell-main"
/** Default id for the Header search field / skip-to-search target. */
export const APPSHELL_SEARCH_ID = "uds-appshell-search"

/** Allowed AppShell listview width band (px). Default token is the minimum. */
export const APPSHELL_LISTVIEW_WIDTH_MIN = 320
export const APPSHELL_LISTVIEW_WIDTH_MAX = 480

function clampListviewWidth(width: number): number {
  return Math.min(
    APPSHELL_LISTVIEW_WIDTH_MAX,
    Math.max(APPSHELL_LISTVIEW_WIDTH_MIN, Math.round(width)),
  )
}

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
   * Branding and the menu toggle live in the full-width Header above the rail — not in Menu.
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
  /**
   * When `true`, omit the Header SearchInput. Use with `headerLeading` when you need
   * custom content instead of search (does not remove brand/toggle chrome).
   * Also suppresses the skip-to-search link (there is no search target).
   */
  hideSearch?: boolean
  /**
   * Custom Header content that replaces the default SearchInput. Same as
   * passing `children` to standalone `Header`. Implies search is not shown.
   * Does not replace brand/toggle chrome.
   */
  headerLeading?: React.ReactNode
  /**
   * Brand id for Header wordmark and inherited Menu tokens when Menu omits `brand`.
   * Defaults to **`chg`**.
   */
  brand?: UdsBrandId
  /**
   * Header identity: **`brand`** (default) shows Branding wordmark; **`title`** shows plain text.
   * See `ai/guides/menu-header-identity.md`.
   */
  headerVariant?: HeaderIdentityVariant
  /** Product or application name when `headerVariant` is `"title"`. */
  headerTitle?: string
  /** Optional short title (legacy Menu collapsed abbreviation; unused in Header wordmark mode). */
  headerShortTitle?: string
  /** Controlled menu expanded / drawer-open state. */
  menuExpanded?: boolean
  /** Uncontrolled initial menu expanded state (desktop). Below `lg`, defaults to closed. */
  defaultMenuExpanded?: boolean
  onMenuExpandedChange?: (expanded: boolean) => void
  /** Optional secondary pane (e.g. record list, search results). Animates open/closed. */
  listview?: React.ReactNode
  /**
   * Listview column width in px. Allowed band **320–480** (clamped). Default **320**
   * via `--appshell-listview-width`. Choose wider when row content needs more room
   * (e.g. longer titles, Card entities); keep 320 for dense Item queues.
   */
  listviewWidth?: number
  /**
   * Renders in document flow (not `position: fixed` / `absolute`) with 48px space above.
   * When a `MainContent` is on the page, the footer portals **into** that container;
   * otherwise it is the last child of `.appshell--main`.
   */
  footer?: React.ReactNode
  /**
   * When `true` (default), renders a skip link that moves keyboard focus to the main
   * content landmark (`#uds-appshell-main` by default).
   */
  showSkipToContent?: boolean
  /** Accessible label for the skip-to-content link. */
  skipToContentLabel?: string
  /**
   * When `true` (default), renders a skip link that moves keyboard focus to the Header
   * search field (`#uds-appshell-search` by default) so users can bypass the menu rail.
   * Forced off when `hideSearch` is true or `headerLeading` replaces search.
   */
  showSkipToSearch?: boolean
  /** Accessible label for the skip-to-search link. */
  skipToSearchLabel?: string
  /**
   * Id of the main landmark (also used as the skip-to-content `href` hash).
   * Default: `uds-appshell-main`.
   */
  mainContentId?: string
  /**
   * Id applied to the Header `SearchInput` (also used as the skip-to-search `href` hash).
   * Default: `uds-appshell-search`. Overridden if `headerSearchProps.id` is set.
   */
  searchContentId?: string
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
  style,
  children,
  menu,
  sidebar,
  enableRouterOutlet = true,
  headerRight,
  headerSearchProps,
  hideSearch = false,
  headerLeading,
  brand: brandProp,
  headerVariant = "brand",
  headerTitle,
  headerShortTitle,
  menuExpanded: menuExpandedProp,
  defaultMenuExpanded = true,
  onMenuExpandedChange,
  listview,
  listviewWidth,
  footer,
  showSkipToContent = true,
  skipToContentLabel = "Skip to content",
  showSkipToSearch = true,
  skipToSearchLabel = "Skip to search",
  mainContentId = APPSHELL_MAIN_ID,
  searchContentId = APPSHELL_SEARCH_ID,
  ...props
}: AppShellProps) {
  const parsedRegions = parseAppShellRegions(children)
  const resolvedMenu = parsedRegions.menu ?? menu ?? sidebar
  const resolvedHeaderRight = parsedRegions.headerRight ?? headerRight
  const resolvedListview = parsedRegions.listview ?? listview
  const resolvedFooter = parsedRegions.footer ?? footer
  const resolvedMain = parsedRegions.main ?? parsedRegions.looseChildren
  const showListview = resolvedListview != null
  const resolvedSearchId = headerSearchProps?.id ?? searchContentId
  const searchSuppressed = hideSearch || headerLeading != null
  const effectiveShowSkipToSearch = showSkipToSearch && !searchSuppressed
  const showSkipNav = showSkipToContent || effectiveShowSkipToSearch
  const resolvedListviewWidth =
    typeof listviewWidth === "number" && !Number.isNaN(listviewWidth)
      ? clampListviewWidth(listviewWidth)
      : undefined
  const [footerHost, setFooterHost] = React.useState<HTMLElement | null>(null)
  const footerHostApi = React.useMemo(
    () => ({ host: footerHost, setHost: setFooterHost }),
    [footerHost],
  )

  const { menuExpanded, setMenuExpanded, toggleMenu } = useAppShellMenuExpanded({
    expanded: menuExpandedProp,
    defaultExpanded: defaultMenuExpanded,
    onExpandedChange: onMenuExpandedChange,
  })

  const isBrandControlled = brandProp !== undefined
  const [uncontrolledBrand, setUncontrolledBrand] =
    React.useState<UdsBrandId>(UDS_DEFAULT_BRAND)
  const brand = isBrandControlled ? brandProp : uncontrolledBrand
  const setBrand = React.useCallback(
    (next: UdsBrandId) => {
      if (!isBrandControlled) {
        setUncontrolledBrand(next)
      }
    },
    [isBrandControlled],
  )

  const chromeValue = React.useMemo(
    () =>
      createAppShellChromeValue({
        menuExpanded,
        setMenuExpanded,
        toggleMenu,
        brand,
        setBrand,
        headerVariant,
        headerTitle,
        headerShortTitle,
      }),
    [
      menuExpanded,
      setMenuExpanded,
      toggleMenu,
      brand,
      setBrand,
      headerVariant,
      headerTitle,
      headerShortTitle,
    ],
  )

  React.useEffect(() => {
    if (!menuExpanded) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuExpanded(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuExpanded, setMenuExpanded])

  const footerNode = resolvedFooter ? (
    <div
      className="appshell--footer"
      data-slot="appshell-footer"
      data-in-main-content={footerHost ? "true" : undefined}
    >
      {resolvedFooter}
    </div>
  ) : null

  const resolvedHeaderSearchProps = {
    ...headerSearchProps,
    id: resolvedSearchId,
  }

  return (
    <AppShellFooterHostContext.Provider value={footerHostApi}>
      <AppShellChromeContext.Provider value={chromeValue}>
        <div
          data-slot="appshell"
          data-menu-expanded={menuExpanded ? "true" : "false"}
          className={cn("appshell", className)}
          style={
            resolvedListviewWidth != null
              ? {
                  ...style,
                  ["--appshell-listview-width" as string]: `${resolvedListviewWidth}px`,
                }
              : style
          }
          {...props}
        >
          {showSkipNav ? (
            <nav className="appshell-skip-nav" aria-label="Skip links" data-slot="appshell-skip-nav">
              {showSkipToContent ? (
                <a
                  href={`#${mainContentId}`}
                  className="appshell-skip-link"
                  data-slot="appshell-skip-link"
                >
                  {skipToContentLabel}
                </a>
              ) : null}
              {effectiveShowSkipToSearch ? (
                <a
                  href={`#${resolvedSearchId}`}
                  className="appshell-skip-link"
                  data-slot="appshell-skip-to-search"
                >
                  {skipToSearchLabel}
                </a>
              ) : null}
            </nav>
          ) : null}
          <div className="appshell--chrome" data-slot="appshell-chrome">
            <Header
              showMenuToggle={resolvedMenu != null}
              menuExpanded={menuExpanded}
              onMenuToggle={toggleMenu}
              brand={brand}
              headerVariant={headerVariant}
              headerTitle={headerTitle}
              trailing={resolvedHeaderRight}
              searchProps={searchSuppressed ? undefined : resolvedHeaderSearchProps}
              hideSearch={searchSuppressed}
              {...(headerLeading != null ? { children: headerLeading } : {})}
            />
          </div>
          <div className="appshell--workspace" data-slot="appshell-workspace">
            {resolvedMenu ? <div className="appshell--menu">{resolvedMenu}</div> : null}
            {resolvedMenu ? (
              <button
                type="button"
                className="appshell--scrim"
                aria-label="Close menu"
                tabIndex={-1}
                onClick={() => setMenuExpanded(false)}
              />
            ) : null}
            <div className="appshell--body">
              <div className="appshell--content">
                <div
                  className={cn("appshell--listview", showListview && "appshell--listview-open")}
                  aria-hidden={!showListview}
                >
                  {resolvedListview}
                </div>
                <div className="appshell--main-column">
                  <main
                    id={mainContentId}
                    className="appshell--main"
                    tabIndex={-1}
                    data-slot="appshell-main"
                  >
                    {enableRouterOutlet ? (
                      <Suspense fallback={<AppShellFallback />}>
                        <RouterOutlet />
                      </Suspense>
                    ) : null}
                    {resolvedMain}
                    {footerNode
                      ? footerHost
                        ? createPortal(footerNode, footerHost)
                        : footerNode
                      : null}
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppShellChromeContext.Provider>
    </AppShellFooterHostContext.Provider>
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
export type { HeaderIdentityVariant, UdsBrandId }
