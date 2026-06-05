import { Suspense, useCallback, useEffect, useState, type CSSProperties } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Branding,
  DiamondsFourIcon,
  DocsNavRailTrigger,
  DocsNavSectionColumn,
  DocsNavSectionHeader,
  DocsNavSectionList,
  DocsNavSubList,
  docsNavComponentLinkClassName,
  docsNavParentChildActiveCls,
  docsNavParentStickyCls,
  docsNavSubLinkClassName,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DotsThreeVerticalIcon,
  HouseIcon,
  LayoutIcon,
  PresentationChartIcon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SquaresFourIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
} from '@chghealthcare/unified-design-system'
import { DoctorAvatar } from '@/components/ui/doctor-avatar'
import { applyDocsBrandToDocument, docsBrandToBrandingAppearance, readStoredDocsBrand } from '../doc-site-brand'
import {
  DOCS_VERSION_OPTIONS,
  persistDocsVersion,
  readStoredDocsVersion,
  shouldShowDocsVersionSelector,
  type DocsVersionId,
} from '../doc-site-version'
import { getAllComponents } from '../registry'
import { getAllShadcnUiComponents } from '../shadcn-ui-registry'
import { docPageHeroColumnNarrowClassName, docPageHorizontalGutterClassName } from '../doc-page-hero-classes'
import { AccountMenuPanel } from './doc-shell-account-menu'
import { DocsRailMenu, getRailFlyoutPositionFromAnchor } from './docs-rail-menu'
import { SIDEBAR_EXPANDED_PX, SIDEBAR_MINIMIZED_PX } from './doc-shell-constants'

const foundationPages = getAllComponents()
const shadcnPages = getAllShadcnUiComponents()

type RailFlyoutId = 'getting' | 'foundations' | 'components' | 'patterns'

type FlyoutAnchor = { id: RailFlyoutId; top: number; left: number }

export function DocShell() {
  const [gettingOpen, setGettingOpen] = useState(false)
  const [foundationsOpen, setFoundationsOpen] = useState(false)
  const [componentsOpen, setComponentsOpen] = useState(false)
  const [patternsOpen, setPatternsOpen] = useState(false)
  const [light, setLight] = useState(true)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [railFlyout, setRailFlyout] = useState<FlyoutAnchor | null>(null)
  const [docsVersion, setDocsVersion] = useState<DocsVersionId>(() => readStoredDocsVersion())

  const closeFlyout = useCallback(() => setRailFlyout(null), [])

  const toggleRailFlyout = useCallback((id: RailFlyoutId, el: HTMLElement) => {
    setRailFlyout((prev) => {
      if (prev?.id === id) return null
      return { id, ...getRailFlyoutPositionFromAnchor(el) }
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !light)
  }, [light])

  /** Site chrome follows the stored site brand (CHG by default). */
  useEffect(() => {
    applyDocsBrandToDocument(readStoredDocsBrand())
  }, [])

  useEffect(() => {
    persistDocsVersion(docsVersion)
  }, [docsVersion])

  const { pathname } = useLocation()
  const gettingChildActive = pathname.startsWith('/docs/getting-started/')
  const foundationChildActive = pathname.startsWith('/docs/foundations/')
  const componentChildActive = pathname.startsWith('/docs/components/')
  const patternsChildActive = pathname.startsWith('/docs/patterns/')

  useEffect(() => {
    queueMicrotask(() => {
      if (gettingChildActive) setGettingOpen(true)
      if (foundationChildActive) setFoundationsOpen(true)
      if (componentChildActive) setComponentsOpen(true)
      if (patternsChildActive) setPatternsOpen(true)
    })
  }, [gettingChildActive, foundationChildActive, componentChildActive, patternsChildActive])

  const handleSidebarExpandedChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) closeFlyout()
    setSidebarExpanded(nextOpen)
  }, [closeFlyout])

  return (
    <SidebarProvider
      open={sidebarExpanded}
      onOpenChange={handleSidebarExpandedChange}
      className="min-h-screen bg-white font-inter text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
      style={
        {
          '--sidebar-width': `${SIDEBAR_EXPANDED_PX}px`,
          '--sidebar-width-icon': `${SIDEBAR_MINIMIZED_PX}px`,
        } as CSSProperties
      }
    >
      <div className="relative flex min-h-screen w-full flex-col">
        <DocsRailMenu.Flyout
          open={Boolean(railFlyout && !sidebarExpanded)}
          position={
            railFlyout && !sidebarExpanded
              ? { top: railFlyout.top, left: railFlyout.left }
              : null
          }
          onClose={closeFlyout}
          aria-label={
            railFlyout?.id === 'getting'
              ? 'Getting Started'
              : railFlyout?.id === 'foundations'
                ? 'Foundations'
                : railFlyout?.id === 'components'
                  ? 'Components'
                  : railFlyout?.id === 'patterns'
                    ? 'Patterns'
                    : 'Section menu'
          }
        >
          {railFlyout?.id === 'getting' ? (
            <DocsRailMenu.Section title="Getting Started">
              <NavLink
                to="/docs/getting-started/install"
                className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                onClick={closeFlyout}
              >
                Install
              </NavLink>
              <NavLink
                to="/docs/getting-started/usage"
                className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                onClick={closeFlyout}
              >
                Usage
              </NavLink>
              <NavLink
                to="/docs/getting-started/app-shell"
                className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                onClick={closeFlyout}
              >
                AppShell demo
              </NavLink>
              <NavLink
                to="/docs/getting-started/doc-shell"
                className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                onClick={closeFlyout}
              >
                DocShell layout
              </NavLink>
              <NavLink
                to="/docs/getting-started/menu"
                className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                onClick={closeFlyout}
              >
                Menu
              </NavLink>
            </DocsRailMenu.Section>
          ) : null}
          {railFlyout?.id === 'foundations' ? (
            <DocsRailMenu.Section title="Foundations">
              {foundationPages.map((c) => (
                <NavLink
                  key={c.slug}
                  to={`/docs/foundations/${c.slug}`}
                  className={({ isActive }) => docsNavComponentLinkClassName({ isActive })}
                  onClick={closeFlyout}
                >
                  {c.name}
                </NavLink>
              ))}
            </DocsRailMenu.Section>
          ) : null}
          {railFlyout?.id === 'components' ? (
            <DocsRailMenu.Section title="Components">
              {shadcnPages.map((c) => (
                <NavLink
                  key={c.slug}
                  to={`/docs/components/${c.slug}`}
                  className={({ isActive }) => docsNavComponentLinkClassName({ isActive })}
                  onClick={closeFlyout}
                >
                  {c.name}
                </NavLink>
              ))}
            </DocsRailMenu.Section>
          ) : null}
          {railFlyout?.id === 'patterns' ? (
            <DocsRailMenu.Section title="Patterns">
              <NavLink
                to="/docs/patterns/dashboard"
                className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                onClick={closeFlyout}
              >
                Dashboard
              </NavLink>
            </DocsRailMenu.Section>
          ) : null}
        </DocsRailMenu.Flyout>
        <div className="flex min-h-0 min-h-screen w-full flex-1">
          <div
            className={cn(
              'contents',
              !sidebarExpanded && 'group/collapsed-rail',
            )}
          >
            <Sidebar
              id="docs-sidebar"
              collapsible="icon"
              className="z-30 border-neutral-200 dark:border-neutral-800 [&_[data-sidebar=sidebar]]:bg-white dark:[&_[data-sidebar=sidebar]]:bg-neutral-950"
            >
              <DocsRailMenu.Root
                expanded={sidebarExpanded}
                onExpandedChange={handleSidebarExpandedChange}
                sidebarId="docs-sidebar"
              >
                <DocsRailMenu.SidebarHeaderSlot>
                  <DocsRailMenu.Header
                    brandExpanded={
                      <NavLink
                        to="/docs/introduction"
                        title="Home"
                        className="pointer-events-auto inline-flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950"
                      >
                        <Branding
                          appearance={docsBrandToBrandingAppearance(readStoredDocsBrand())}
                          wordmarkAlign="center"
                          className="h-14 w-[188px] min-w-[188px] max-w-[188px] shrink-0"
                        />
                      </NavLink>
                    }
                    brandCollapsed={
                      <NavLink
                        to="/docs/introduction"
                        title="Home"
                        className={cn(
                          'pointer-events-auto inline-flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950',
                          'group-hover/collapsed-rail:pointer-events-none',
                        )}
                      >
                        <Branding
                          appearance={docsBrandToBrandingAppearance(readStoredDocsBrand())}
                          symbol
                          className="size-9"
                        />
                      </NavLink>
                    }
                  />
                </DocsRailMenu.SidebarHeaderSlot>

                {shouldShowDocsVersionSelector() ? (
                  <DocsRailMenu.Toolbar>
                    <div className="flex w-full min-w-0 flex-col gap-1 px-1">
                      <label htmlFor="docs-site-version-select" className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                        Docs version
                      </label>
                      <Select value={docsVersion} onValueChange={(v) => setDocsVersion(v as DocsVersionId)}>
                        <SelectTrigger
                          id="docs-site-version-select"
                          inputSize="sm"
                          className="w-full min-w-0 max-w-full shadow-none"
                        >
                          <SelectValue placeholder="Documentation version" />
                        </SelectTrigger>
                        <SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">
                          {DOCS_VERSION_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </DocsRailMenu.Toolbar>
                ) : null}

                <DocsRailMenu.Nav aria-label="Documentation">
          {sidebarExpanded ? (
            <DocsNavSectionList>
              <DocsNavSectionColumn>
                <NavLink
                  to="/docs/introduction"
                  className={({ isActive }) =>
                    cn(
                      docsNavParentStickyCls,
                      'flex w-full items-center gap-2 px-[20px] py-[12px] text-left text-base font-medium no-underline',
                      isActive
                        ? docsNavParentChildActiveCls
                        : 'text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-900',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <HouseIcon
                        aria-hidden
                        weight="duotone"
                        size={32}
                        className={cn('shrink-0', isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400')}
                      />
                      <span className="truncate">Introduction</span>
                    </>
                  )}
                </NavLink>
              </DocsNavSectionColumn>

              <DocsNavSectionColumn>
                <DocsNavSectionHeader
                  open={gettingOpen}
                  onToggle={() => setGettingOpen(!gettingOpen)}
                  childActive={gettingChildActive}
                  icon={LayoutIcon}
                >
                  Getting Started
                </DocsNavSectionHeader>
                {gettingOpen ? (
                  <DocsNavSubList>
                    <NavLink
                      to="/docs/getting-started/install"
                      className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                    >
                      Install
                    </NavLink>
                    <NavLink
                      to="/docs/getting-started/usage"
                      className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                    >
                      Usage
                    </NavLink>
                    <NavLink
                      to="/docs/getting-started/app-shell"
                      className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                    >
                      AppShell demo
                    </NavLink>
                    <NavLink
                      to="/docs/getting-started/doc-shell"
                      className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                    >
                      DocShell layout
                    </NavLink>
                    <NavLink
                      to="/docs/getting-started/menu"
                      className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                    >
                      Menu
                    </NavLink>
                  </DocsNavSubList>
                ) : null}
              </DocsNavSectionColumn>

              <DocsNavSectionColumn>
                <DocsNavSectionHeader
                  open={foundationsOpen}
                  onToggle={() => setFoundationsOpen(!foundationsOpen)}
                  childActive={foundationChildActive}
                  icon={SquaresFourIcon}
                >
                  Foundations
                </DocsNavSectionHeader>
                {foundationsOpen ? (
                  <DocsNavSubList>
                    {foundationPages.map((c) => (
                      <NavLink
                        key={c.slug}
                        to={`/docs/foundations/${c.slug}`}
                        className={({ isActive }) => docsNavComponentLinkClassName({ isActive })}
                      >
                        {c.name}
                      </NavLink>
                    ))}
                  </DocsNavSubList>
                ) : null}
              </DocsNavSectionColumn>

              <DocsNavSectionColumn>
                <DocsNavSectionHeader
                  open={componentsOpen}
                  onToggle={() => setComponentsOpen(!componentsOpen)}
                  childActive={componentChildActive}
                  icon={DiamondsFourIcon}
                >
                  Components
                </DocsNavSectionHeader>
                {componentsOpen ? (
                  <DocsNavSubList>
                    {shadcnPages.map((c) => (
                      <NavLink
                        key={c.slug}
                        to={`/docs/components/${c.slug}`}
                        className={({ isActive }) => docsNavComponentLinkClassName({ isActive })}
                      >
                        {c.name}
                      </NavLink>
                    ))}
                  </DocsNavSubList>
                ) : null}
              </DocsNavSectionColumn>

              <DocsNavSectionColumn>
                <DocsNavSectionHeader
                  open={patternsOpen}
                  onToggle={() => setPatternsOpen(!patternsOpen)}
                  childActive={patternsChildActive}
                  icon={PresentationChartIcon}
                >
                  Patterns
                </DocsNavSectionHeader>
                {patternsOpen ? (
                  <DocsNavSubList>
                    <NavLink
                      to="/docs/patterns/dashboard"
                      className={({ isActive }) => docsNavSubLinkClassName({ isActive })}
                    >
                      Dashboard
                    </NavLink>
                  </DocsNavSubList>
                ) : null}
              </DocsNavSectionColumn>
            </DocsNavSectionList>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/docs/introduction"
                    aria-label="Introduction"
                    className={({ isActive }) =>
                      cn(
                        'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 no-underline hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                        isActive && docsNavParentChildActiveCls,
                      )
                    }
                  >
                    <HouseIcon aria-hidden className="shrink-0" size={32} weight="duotone" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Introduction
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DocsNavRailTrigger
                    aria-label="Getting Started — open section"
                    aria-expanded={railFlyout?.id === 'getting'}
                    onClick={(e) => toggleRailFlyout('getting', e.currentTarget)}
                    childActive={gettingChildActive}
                    flyoutOpen={railFlyout?.id === 'getting'}
                    icon={LayoutIcon}
                  />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Getting Started
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DocsNavRailTrigger
                    aria-label="Foundations — open section"
                    aria-expanded={railFlyout?.id === 'foundations'}
                    onClick={(e) => toggleRailFlyout('foundations', e.currentTarget)}
                    childActive={foundationChildActive}
                    flyoutOpen={railFlyout?.id === 'foundations'}
                    icon={SquaresFourIcon}
                  />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Foundations
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DocsNavRailTrigger
                    aria-label="Components — open section"
                    aria-expanded={railFlyout?.id === 'components'}
                    onClick={(e) => toggleRailFlyout('components', e.currentTarget)}
                    childActive={componentChildActive}
                    flyoutOpen={railFlyout?.id === 'components'}
                    icon={DiamondsFourIcon}
                  />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Components
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DocsNavRailTrigger
                    aria-label="Patterns — open section"
                    aria-expanded={railFlyout?.id === 'patterns'}
                    onClick={(e) => toggleRailFlyout('patterns', e.currentTarget)}
                    childActive={patternsChildActive}
                    flyoutOpen={railFlyout?.id === 'patterns'}
                    icon={PresentationChartIcon}
                  />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Patterns
                </TooltipContent>
              </Tooltip>
            </div>
          )}
                </DocsRailMenu.Nav>

                <DocsRailMenu.Footer>
                  {(expanded) =>
                    expanded ? (
                      <div className="shrink-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className={cn(
                                'flex w-full items-center gap-2 rounded-md px-4 py-[12px] text-left outline-none',
                                'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                                'focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600',
                              )}
                              aria-label="Account menu"
                            >
                              <DoctorAvatar
                                className="shrink-0"
                                size="xs"
                                doctor="emily"
                                fallback="EB"
                                aria-hidden
                              />
                              <span className="min-w-0 flex-1 truncate text-[14px] font-normal text-neutral-700 dark:text-neutral-300">
                                Emily Brown
                              </span>
                              <DotsThreeVerticalIcon
                                className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400"
                                weight="bold"
                                aria-hidden
                              />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="top"
                            align="start"
                            alignOffset={SIDEBAR_EXPANDED_PX - 24 - 16}
                            className="min-w-[220px]"
                          >
                            <AccountMenuPanel
                              light={light}
                              onAppearanceChange={(mode) => setLight(mode === 'light')}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <div className="shrink-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className={cn(
                                'flex w-full items-center justify-center rounded-md px-1 py-[12px] outline-none',
                                'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                                'focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600',
                              )}
                              aria-label="Account menu"
                              title="Emily Brown"
                            >
                              <DoctorAvatar
                                className="shrink-0"
                                size="xs"
                                doctor="emily"
                                fallback="EB"
                                aria-hidden
                              />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="top"
                            align="start"
                            alignOffset={SIDEBAR_MINIMIZED_PX - 24 - 4}
                            className="min-w-[220px]"
                          >
                            <AccountMenuPanel
                              light={light}
                              onAppearanceChange={(mode) => setLight(mode === 'light')}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  }
                </DocsRailMenu.Footer>
              </DocsRailMenu.Root>
            </Sidebar>
          </div>

          <SidebarInset className="min-h-screen min-w-0 overflow-x-auto bg-white dark:bg-neutral-950">
            <header className="flex h-14 shrink-0 items-center gap-2 border-b border-neutral-200 px-4 md:hidden dark:border-neutral-800">
              <SidebarTrigger />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Menu
              </span>
            </header>
            <Suspense fallback={<DocsContentFallback />}>
              <Outlet />
            </Suspense>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

function DocsContentFallback() {
  return (
    <div
      className={cn(docPageHorizontalGutterClassName, 'py-10')}
      aria-busy
      aria-label="Loading page"
    >
      <div className={cn(docPageHeroColumnNarrowClassName, 'space-y-4')}>
      <div className="h-8 w-48 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 max-w-xl animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 max-w-lg animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  )
}
