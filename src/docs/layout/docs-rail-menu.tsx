/**
 * Documentation-site rail menu + collapsed-rail flyout.
 * Not published from the package — compose app navigation with `Sidebar`, `AppShell`, etc. in product code.
 */
import * as React from 'react'
import { cn, ListIcon } from '@chghealthcare/unified-design-system'

// --- Flyout ------------------------------------------------------------------

export type RailFlyoutPosition = { top: number; left: number }

const PANEL_MAX_H_RATIO = 0.7
const PANEL_MAX_H_PX = 32 * 16
const EDGE = 8
const GAP = 8

export function getRailFlyoutPositionFromAnchor(element: HTMLElement): RailFlyoutPosition {
  const r = element.getBoundingClientRect()
  const panelMaxH = Math.min(window.innerHeight * PANEL_MAX_H_RATIO, PANEL_MAX_H_PX)
  const top = Math.max(EDGE, Math.min(r.top, window.innerHeight - panelMaxH - EDGE))
  const left = r.right + GAP
  return { top, left }
}

type RailFlyoutProps = {
  open: boolean
  position: RailFlyoutPosition | null
  onClose: () => void
  'aria-label': string
  children: React.ReactNode
  panelClassName?: string
}

function RailFlyout({
  open,
  position,
  onClose,
  'aria-label': ariaLabel,
  children,
  panelClassName,
}: RailFlyoutProps) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  React.useEffect(() => {
    if (!open) return
    const onResize = () => onClose()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, onClose])

  if (!open || !position) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        data-slot="docs-rail-flyout-backdrop"
        className="fixed inset-0 z-[80] cursor-default bg-transparent"
        onClick={onClose}
      />
      <div
        data-slot="docs-rail-flyout-panel"
        role="dialog"
        aria-label={ariaLabel}
        className={cn(
          'fixed z-[81] max-h-[min(70vh,32rem)] w-[280px] overflow-y-auto rounded-[4px] border border-neutral-200 bg-white py-2 shadow-lg dark:border-neutral-800 dark:bg-neutral-950',
          panelClassName,
        )}
        style={{ top: position.top, left: position.left }}
      >
        {children}
      </div>
    </>
  )
}

function RailFlyoutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col px-0">
      <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
          {title}
        </p>
      </div>
      <div className="flex w-full flex-col py-1">{children}</div>
    </div>
  )
}

// --- Rail chrome -------------------------------------------------------------

type RailMenuContextValue = {
  expanded: boolean
  onExpandedChange: (next: boolean) => void
  sidebarId: string
}

const RailMenuContext = React.createContext<RailMenuContextValue | null>(null)

function useRailMenu() {
  const v = React.useContext(RailMenuContext)
  if (!v) {
    throw new Error('Docs rail menu chrome must be used within DocsRailMenu.Root')
  }
  return v
}

type RailMenuRootProps = RailMenuContextValue & {
  children: React.ReactNode
  dataBrand?: string
  className?: string
}

function RailMenuRoot({
  expanded,
  onExpandedChange,
  sidebarId,
  dataBrand,
  className,
  children,
}: RailMenuRootProps) {
  const value = React.useMemo(
    () => ({ expanded, onExpandedChange, sidebarId }),
    [expanded, onExpandedChange, sidebarId],
  )

  return (
    <div
      data-brand={dataBrand}
      data-slot="docs-rail-menu-root"
      className={cn(
        'flex h-full min-h-0 w-full flex-col bg-white dark:bg-neutral-950',
        className,
      )}
    >
      <RailMenuContext.Provider value={value}>{children}</RailMenuContext.Provider>
    </div>
  )
}

type RailMenuHeaderProps = {
  brandExpanded: React.ReactNode
  brandCollapsed: React.ReactNode
  collapseLabel?: string
  expandLabel?: string
}

function RailMenuHeader({
  brandExpanded,
  brandCollapsed,
  collapseLabel = 'Minimize navigation',
  expandLabel = 'Expand navigation',
}: RailMenuHeaderProps) {
  const { expanded, onExpandedChange, sidebarId } = useRailMenu()

  return (
    <div
      data-slot="docs-rail-menu-header"
      className="relative h-14 shrink-0 border-b border-neutral-200 dark:border-neutral-800"
    >
      <button
        type="button"
        aria-label={collapseLabel}
        aria-controls={sidebarId}
        aria-expanded={expanded}
        className={cn(
          'absolute left-3 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-neutral-500 transition-opacity duration-200 ease-out hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100',
          expanded ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => onExpandedChange(false)}
      >
        <ListIcon aria-hidden className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label={expandLabel}
        aria-controls={sidebarId}
        aria-expanded={expanded}
        className={cn(
          'peer absolute left-1/2 top-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md text-neutral-500 transition-opacity duration-200 ease-out',
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100',
          expanded
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-none opacity-0 group-hover/collapsed-rail:pointer-events-auto group-hover/collapsed-rail:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100',
        )}
        onClick={() => onExpandedChange(true)}
      >
        <ListIcon aria-hidden className="h-5 w-5" />
      </button>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out',
            expanded ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden={!expanded}
        >
          {/* Fixed clip box so wordmark does not shrink with the rail width animation (avoids object-contain scaling). */}
          <div className="pointer-events-auto flex h-14 w-[188px] shrink-0 items-center justify-center overflow-hidden">
            {brandExpanded}
          </div>
        </div>
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out',
            expanded ? 'opacity-0' : 'opacity-100 group-hover/collapsed-rail:opacity-0 peer-focus-visible:opacity-0',
          )}
          aria-hidden={expanded}
        >
          <div className="pointer-events-auto flex size-9 shrink-0 items-center justify-center overflow-hidden">
            {brandCollapsed}
          </div>
        </div>
      </div>
    </div>
  )
}

type RailMenuToolbarProps = { children: React.ReactNode; className?: string }

function RailMenuToolbar({ children, className }: RailMenuToolbarProps) {
  const { expanded } = useRailMenu()
  if (!expanded) return null
  return (
    <div
      data-slot="docs-rail-menu-toolbar"
      className={cn('shrink-0 border-b border-neutral-200 px-2 py-2 dark:border-neutral-800', className)}
    >
      {children}
    </div>
  )
}

type RailMenuNavProps = { 'aria-label': string; children: React.ReactNode; className?: string }

function RailMenuNav({ 'aria-label': ariaLabel, children, className }: RailMenuNavProps) {
  return (
    <div
      data-slot="docs-rail-menu-nav"
      className={cn('flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden text-sm', className)}
    >
      <nav
        className="flex min-h-0 flex-1 basis-0 flex-col overflow-y-auto overscroll-contain"
        aria-label={ariaLabel}
      >
        {children}
      </nav>
    </div>
  )
}

type RailMenuFooterProps = { children: (expanded: boolean) => React.ReactNode }

function RailMenuFooter({ children }: RailMenuFooterProps) {
  const { expanded } = useRailMenu()
  const body = children(expanded)

  return (
    <div
      data-slot="docs-rail-menu-footer"
      className="mt-auto shrink-0 border-t border-neutral-200 dark:border-neutral-800"
    >
      {body}
    </div>
  )
}

function RailMenuHeaderSlot({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <header data-slot="docs-rail-menu-header-slot" className={cn('shrink-0', className)}>
      {children}
    </header>
  )
}

export const DocsRailMenu = {
  Root: RailMenuRoot,
  HeaderSlot: RailMenuHeaderSlot,
  SidebarHeaderSlot: RailMenuHeaderSlot,
  Header: RailMenuHeader,
  Toolbar: RailMenuToolbar,
  Nav: RailMenuNav,
  Footer: RailMenuFooter,
  Flyout: RailFlyout,
  Section: RailFlyoutSection,
}
