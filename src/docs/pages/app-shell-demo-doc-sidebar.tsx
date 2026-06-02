import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AirplaneIcon,
  Branding,
  BriefcaseIcon,
  CalendarBlankIcon,
  ClockIcon,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DotsThreeVerticalIcon,
  FolderOpenIcon,
  LayoutIcon,
  NotePencilIcon,
  Sidebar,
  SidebarProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@chghealthcare/unified-design-system'
import { DoctorAvatar } from '@/components/ui/doctor-avatar'
import { AccountMenuPanel } from '@/docs/layout/doc-shell-account-menu'
import { SIDEBAR_EXPANDED_PX, SIDEBAR_MINIMIZED_PX } from '@/docs/layout/doc-shell-constants'
import {
  NavDisclosureCaret,
  parentChildActiveCls,
  parentOpenBorderCls,
  parentStickyCls,
  subLinkCls,
} from '@/docs/layout/doc-shell-nav-classes'
import { applyDocsBrandToDocument, docsBrandToBrandingAppearance } from '@/docs/doc-site-brand'
import { DocsRailMenu, getRailFlyoutPositionFromAnchor } from '@/docs/layout/docs-rail-menu'

/** CompHealth primary nav from UDS AI contract `uds.ai.brand-menus` (label + Phosphor icon + Documents children). */
const COMPHEALTH_APPEARANCE = docsBrandToBrandingAppearance('comphealth')

type NavKey =
  | 'dashboard'
  | 'schedule'
  | 'job-board'
  | 'application'
  | 'credentialing'
  | 'financial'
  | 'time-entry'
  | 'travel'

type FlyoutAnchor = { top: number; left: number }

type AppShellDemoDocSidebarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * AppShell primary navigation: `Sidebar` + `DocsRailMenu` rail (header, nav, account) and flyout
 * for Documents when the rail is collapsed.
 */
export function AppShellDemoDocSidebar({ open, onOpenChange }: AppShellDemoDocSidebarProps) {
  const [documentsOpen, setDocumentsOpen] = useState(false)
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')
  const [railFlyout, setRailFlyout] = useState<FlyoutAnchor | null>(null)

  const closeFlyout = useCallback(() => setRailFlyout(null), [])

  const toggleDocumentsFlyout = useCallback((el: HTMLElement) => {
    setRailFlyout((prev) => {
      if (prev) return null
      return getRailFlyoutPositionFromAnchor(el)
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const prev = root.getAttribute('data-brand')
    applyDocsBrandToDocument('comphealth')
    return () => {
      if (prev === null) root.removeAttribute('data-brand')
      else root.setAttribute('data-brand', prev)
    }
  }, [])

  const documentsSectionActive = activeNav === 'credentialing' || activeNav === 'financial'

  const handleSidebarExpandedChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) closeFlyout()
      onOpenChange(nextOpen)
    },
    [closeFlyout, onOpenChange],
  )

  return (
    <div className="flex h-full min-h-0 flex-col">
      <DocsRailMenu.Flyout
        open={Boolean(railFlyout && !open)}
        position={railFlyout && !open ? railFlyout : null}
        onClose={closeFlyout}
        aria-label="Documents"
      >
        <DocsRailMenu.Section title="Documents">
          <button
            type="button"
            className={cn(
              'block w-full text-left',
              subLinkCls({ isActive: activeNav === 'credentialing' }),
            )}
            onClick={() => {
              setActiveNav('credentialing')
              closeFlyout()
            }}
          >
            Credentialing
          </button>
          <button
            type="button"
            className={cn(
              'block w-full text-left',
              subLinkCls({ isActive: activeNav === 'financial' }),
            )}
            onClick={() => {
              setActiveNav('financial')
              closeFlyout()
            }}
          >
            Financial
          </button>
        </DocsRailMenu.Section>
      </DocsRailMenu.Flyout>

      <SidebarProvider
        open={open}
        onOpenChange={handleSidebarExpandedChange}
        className="flex min-h-0 flex-1 flex-col bg-white font-inter text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
        style={
          {
            '--sidebar-width': `${open ? SIDEBAR_EXPANDED_PX : SIDEBAR_MINIMIZED_PX}px`,
            '--sidebar-width-icon': `${SIDEBAR_MINIMIZED_PX}px`,
          } as CSSProperties
        }
      >
        <div className="relative flex h-full min-h-0 w-full flex-col">
          <div
            className={cn(
              'flex h-full min-h-0 flex-1 flex-col',
              !open && 'group/collapsed-rail',
            )}
          >
            <Sidebar
              id="app-shell-demo-sidebar"
              collapsible="none"
              className="z-30 h-full min-h-0 border-r border-neutral-200 [&_[data-sidebar=sidebar]]:bg-white"
            >
              <DocsRailMenu.Root
                expanded={open}
                onExpandedChange={handleSidebarExpandedChange}
                sidebarId="app-shell-demo-sidebar"
              >
                <DocsRailMenu.SidebarHeaderSlot>
                  <DocsRailMenu.Header
                    brandExpanded={
                      <NavLink
                        to="/"
                        title="Home"
                        className="pointer-events-auto inline-flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950"
                      >
                        <Branding
                          appearance={COMPHEALTH_APPEARANCE}
                          wordmarkAlign="center"
                          className="h-14 w-[188px] min-w-[188px] max-w-[188px] shrink-0"
                        />
                      </NavLink>
                    }
                    brandCollapsed={
                      <NavLink
                        to="/"
                        title="Home"
                        className={cn(
                          'pointer-events-auto inline-flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950',
                          'group-hover/collapsed-rail:pointer-events-none',
                        )}
                      >
                        <Branding appearance={COMPHEALTH_APPEARANCE} symbol className="size-9" />
                      </NavLink>
                    }
                  />
                </DocsRailMenu.SidebarHeaderSlot>

                <DocsRailMenu.Nav aria-label="Primary" className="text-sm">
                  {open ? (
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col pt-[12px] pb-[12px]">
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveNav('dashboard')}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            activeNav === 'dashboard' && parentChildActiveCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <LayoutIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'dashboard'
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Dashboard</span>
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveNav('schedule')}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            activeNav === 'schedule' && parentChildActiveCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <CalendarBlankIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'schedule'
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Schedule</span>
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveNav('job-board')}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            activeNav === 'job-board' && parentChildActiveCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <BriefcaseIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'job-board'
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Job Board</span>
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveNav('application')}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            activeNav === 'application' && parentChildActiveCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <NotePencilIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'application'
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Application</span>
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setDocumentsOpen(!documentsOpen)}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            documentsSectionActive && parentChildActiveCls,
                            documentsOpen && parentOpenBorderCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <FolderOpenIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                documentsSectionActive
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Documents</span>
                          </span>
                          <NavDisclosureCaret open={documentsOpen} inverse={documentsSectionActive} />
                        </button>
                        {documentsOpen ? (
                          <div className="flex min-w-0 w-full flex-col pl-[32px] pr-0">
                            <button
                              type="button"
                              className={cn(
                                'block w-full text-left',
                                subLinkCls({ isActive: activeNav === 'credentialing' }),
                              )}
                              onClick={() => setActiveNav('credentialing')}
                            >
                              Credentialing
                            </button>
                            <button
                              type="button"
                              className={cn(
                                'block w-full text-left',
                                subLinkCls({ isActive: activeNav === 'financial' }),
                              )}
                              onClick={() => setActiveNav('financial')}
                            >
                              Financial
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveNav('time-entry')}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            activeNav === 'time-entry' && parentChildActiveCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <ClockIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'time-entry'
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Time Entry</span>
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveNav('travel')}
                          className={cn(
                            parentStickyCls,
                            'flex w-full items-center justify-between gap-2 px-[20px] py-[12px] text-left text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900',
                            activeNav === 'travel' && parentChildActiveCls,
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <AirplaneIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'travel'
                                  ? 'text-white'
                                  : 'text-neutral-500 dark:text-neutral-400',
                              )}
                            />
                            <span className="truncate">Travel</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-0 flex-1 flex-col items-center gap-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Dashboard"
                            aria-current={activeNav === 'dashboard' ? 'page' : undefined}
                            onClick={() => setActiveNav('dashboard')}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              activeNav === 'dashboard' && parentChildActiveCls,
                            )}
                          >
                            <LayoutIcon
                              aria-hidden
                              className={cn('h-6 w-6 shrink-0', activeNav === 'dashboard' && 'text-white')}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Dashboard
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Schedule"
                            aria-current={activeNav === 'schedule' ? 'page' : undefined}
                            onClick={() => setActiveNav('schedule')}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              activeNav === 'schedule' && parentChildActiveCls,
                            )}
                          >
                            <CalendarBlankIcon
                              aria-hidden
                              className={cn('h-6 w-6 shrink-0', activeNav === 'schedule' && 'text-white')}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Schedule
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Job Board"
                            aria-current={activeNav === 'job-board' ? 'page' : undefined}
                            onClick={() => setActiveNav('job-board')}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              activeNav === 'job-board' && parentChildActiveCls,
                            )}
                          >
                            <BriefcaseIcon
                              aria-hidden
                              className={cn('h-6 w-6 shrink-0', activeNav === 'job-board' && 'text-white')}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Job Board
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Application"
                            aria-current={activeNav === 'application' ? 'page' : undefined}
                            onClick={() => setActiveNav('application')}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              activeNav === 'application' && parentChildActiveCls,
                            )}
                          >
                            <NotePencilIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                activeNav === 'application' && 'text-white',
                              )}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Application
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Documents — open section"
                            aria-expanded={!!railFlyout}
                            onClick={(e) => toggleDocumentsFlyout(e.currentTarget)}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              documentsSectionActive && parentChildActiveCls,
                              railFlyout &&
                                !documentsSectionActive &&
                                'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white',
                            )}
                          >
                            <FolderOpenIcon
                              aria-hidden
                              className={cn(
                                'h-6 w-6 shrink-0',
                                documentsSectionActive && 'text-white',
                              )}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Documents
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Time Entry"
                            aria-current={activeNav === 'time-entry' ? 'page' : undefined}
                            onClick={() => setActiveNav('time-entry')}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              activeNav === 'time-entry' && parentChildActiveCls,
                            )}
                          >
                            <ClockIcon
                              aria-hidden
                              className={cn('h-6 w-6 shrink-0', activeNav === 'time-entry' && 'text-white')}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Time Entry
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Travel"
                            aria-current={activeNav === 'travel' ? 'page' : undefined}
                            onClick={() => setActiveNav('travel')}
                            className={cn(
                              'flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900',
                              activeNav === 'travel' && parentChildActiveCls,
                            )}
                          >
                            <AirplaneIcon
                              aria-hidden
                              className={cn('h-6 w-6 shrink-0', activeNav === 'travel' && 'text-white')}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={8}>
                          Travel
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
                          light={!document.documentElement.classList.contains('dark')}
                          onAppearanceChange={() => {}}
                          showAppearance={false}
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
                          light={!document.documentElement.classList.contains('dark')}
                          onAppearanceChange={() => {}}
                          showAppearance={false}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                    )}
              </DocsRailMenu.Footer>
              </DocsRailMenu.Root>
            </Sidebar>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
