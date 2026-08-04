"use client"

import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { ListIcon } from "@phosphor-icons/react/List"
import { PlusCircleIcon } from "@phosphor-icons/react/PlusCircle"
import type { VariantProps } from "class-variance-authority"

import { useAppShellChrome } from "@/components/ui/app-shell-chrome"
import { Branding } from "@/components/ui/branding"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { inputVariants } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  applyUdsBrandToDocument,
  persistBrandToStorage,
  resolveMenuBrand,
  udsBrandToBrandingAppearance,
  UDS_DEFAULT_BRAND,
  isUdsBrandId,
  type UdsBrandId,
} from "@/lib/uds-brand"
import { getDefaultNavigation } from "./menu-default-navigation"

export type MenuRailContextValue = {
  expanded: boolean
  setExpanded: (next: boolean) => void
  toggleExpanded: () => void
}

const MenuRailContext = React.createContext<MenuRailContextValue | null>(null)

const MenuBrandContext = React.createContext<UdsBrandId>(UDS_DEFAULT_BRAND)

export type MenuHeaderVariant = "brand" | "title"

export type MenuHeaderIdentity = {
  variant: MenuHeaderVariant
  /** Full product name when `variant` is `"title"`. */
  title?: string
  /** Collapsed-rail label; defaults to the first two characters of `title`. */
  shortTitle?: string
}

const MenuHeaderIdentityContext = React.createContext<MenuHeaderIdentity>({ variant: "brand" })

function resolveMenuHeaderShortTitle(title: string, shortTitle?: string) {
  const trimmedShort = shortTitle?.trim()
  if (trimmedShort) return trimmedShort
  const compact = title.replace(/\s+/g, "").trim()
  if (!compact) return "—"
  return compact.slice(0, 2).toUpperCase()
}

function MenuHeaderTitle({
  title,
  shortTitle,
  symbol = false,
  className,
}: {
  title: string
  shortTitle?: string
  symbol?: boolean
  className?: string
}) {
  const label = symbol ? resolveMenuHeaderShortTitle(title, shortTitle) : title

  return (
    <div
      data-slot="uds-menu-header-title"
      data-symbol={symbol ? "true" : "false"}
      className={cn(
        "flex min-w-0 items-center justify-center font-semibold text-neutral-900 dark:text-neutral-100",
        symbol
          ? "size-9 shrink-0 rounded-[length:var(--uds-radius-8)] bg-neutral-100 text-sm tracking-tight dark:bg-neutral-800"
          : "h-14 w-full max-w-full px-1 text-base leading-none",
        className,
      )}
      title={title}
    >
      <span
        className={cn(
          "min-w-0",
          symbol ? "uppercase" : "block w-full truncate text-center",
        )}
      >
        {label}
      </span>
    </div>
  )
}

/**
 * Read expand/collapse state from {@link Menu.Root}. Must be used under `Menu.Root`.
 */
function useMenuRail(): MenuRailContextValue {
  const ctx = React.useContext(MenuRailContext)
  if (!ctx) {
    throw new Error("useMenuRail must be used within Menu.Root")
  }
  return ctx
}

/**
 * Standalone menu surface for lists of actions or navigation.
 *
 * **Primary API:** `Menu` as a function — pass **`navigationItems`** (see {@link MenuDefaultProps}) plus optional
 * **`workspace`** and **`tail`**. Rail props (`expanded`, `defaultExpanded`, `aria-label`, …) forward to the root `nav`.
 *
 * **Compound API:** **`Menu.Root`** with **`Menu.Header`**, **`Menu.WorkspaceSelect`**, **`Menu.Navigation`**, etc. for full control.
 *
 * Default layout: fixed left rail, **280px** expanded / **56px** collapsed (`useMenuRail` / `expanded` props).
 * Inside **AppShell**, the rail sits under the full-width Header (branding + toggle live there); Menu is nav-only.
 * Navigation: label + icon at the root; nested **leaf** rows omit `icon`, use square corners, a gray left border, and
 * active state per module styles. {@link MenuWorkspaceSelect} is a compact Radix **Select** when expanded; when the rail is
 * collapsed it becomes a ghost **PlusCircle** trigger with a flyout menu to the **right**. **8px** padding on the workspace band.
 * Standalone (no AppShell): optional simplified header row **56px** (`h-14`) with toggle + wordmark (no mark swap).
 *
 * Built in this module only — do not compose from Sidebar, DropdownMenu, NavigationMenu, Menubar, ContextMenu, or other primitives.
 */
export type MenuRootProps = React.ComponentProps<"nav"> & {
  /** Controlled expanded state (280px wide). Omit for uncontrolled mode. */
  expanded?: boolean
  /** Uncontrolled initial state. Ignored when `expanded` is set. */
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

function MenuRoot({
  className,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
  ...props
}: MenuRootProps) {
  const chrome = useAppShellChrome()
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const isPropControlled = expandedProp !== undefined
  const usesChrome = !isPropControlled && chrome != null
  const expanded = isPropControlled
    ? expandedProp
    : usesChrome
      ? chrome.menuExpanded
      : uncontrolledExpanded

  const setExpanded = React.useCallback(
    (next: boolean) => {
      onExpandedChange?.(next)
      if (usesChrome) {
        chrome.setMenuExpanded(next)
      } else if (!isPropControlled) {
        setUncontrolledExpanded(next)
      }
    },
    [chrome, isPropControlled, onExpandedChange, usesChrome],
  )

  const toggleExpanded = React.useCallback(() => {
    setExpanded(!expanded)
  }, [expanded, setExpanded])

  const contextValue = React.useMemo<MenuRailContextValue>(
    () => ({ expanded, setExpanded, toggleExpanded }),
    [expanded, setExpanded, toggleExpanded],
  )

  return (
    <MenuRailContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={400}>
        <nav
          data-slot="uds-menu-root"
          data-expanded={expanded ? "true" : "false"}
          className={cn(
            "font-sans fixed top-0 left-0 z-10 box-border flex h-screen flex-col overflow-hidden border-r border-solid border-neutral-200 bg-white transition-[width] duration-200 ease-out",
            expanded ? "w-[280px]" : "w-[56px]",
            className,
          )}
          {...props}
        />
      </TooltipProvider>
    </MenuRailContext.Provider>
  )
}

export type MenuHeaderProps = React.ComponentProps<"header"> & { className?: string }

function MenuHeader({ className, ...props }: MenuHeaderProps) {
  return (
    <header
      data-slot="uds-menu-header"
      className={cn(
        "flex h-14 shrink-0 items-center justify-center border-b border-solid border-neutral-200",
        className,
      )}
      {...props}
    />
  )
}

export type MenuWorkspaceProps = React.ComponentProps<"div"> & { className?: string }

/** Workspace band: 1px light gray bottom border (matches header). */
function MenuWorkspace({ className, ...props }: MenuWorkspaceProps) {
  return (
    <div
      data-slot="uds-menu-workspace"
      className={cn("shrink-0 border-b border-solid border-neutral-200", className)}
      {...props}
    />
  )
}

export type MenuWorkspaceOption = { value: string; label: string }

export type MenuWorkspaceSelectProps = {
  /**
   * Options in the dropdown (Radix `value` + visible label). When the rail is **collapsed** (56px), the control is a
   * ghost button with **PlusCircle**; the same options open in a flyout menu to the **right** of the rail.
   */
  options: ReadonlyArray<MenuWorkspaceOption>
  /** Controlled selected value (must match an option `value`). */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Called when the user picks a different option. */
  onWorkspaceChange?: (value: string) => void
  /** Forwarded to the Select root (runs after `onWorkspaceChange`). */
  onValueChange?: (value: string) => void
  disabled?: boolean
  /** Select trigger density; defaults to **sm**. */
  inputSize?: VariantProps<typeof inputVariants>["inputSize"]
  /** Shown when no value is selected (uncontrolled without `defaultValue`). */
  placeholder?: string
  /** Outer shell (border + padding). */
  className?: string
  /** Classes for the trigger. */
  selectWrapperClassName?: string
  id?: string
  "aria-label"?: string
}

const navCollapsedTooltipContentProps = {
  side: "right" as const,
  sideOffset: 8,
}

function MenuWorkspaceSelectCollapsed({
  className,
  options,
  value,
  defaultValue,
  onWorkspaceChange,
  onValueChange,
  disabled,
  placeholder = "Select workspace",
  id,
  "aria-label": ariaLabel,
}: MenuWorkspaceSelectProps) {
  const handleValueChange = React.useCallback(
    (next: string) => {
      onWorkspaceChange?.(next)
      onValueChange?.(next)
    },
    [onWorkspaceChange, onValueChange],
  )

  const triggerLabel = ariaLabel ?? "Workspace"
  const effectiveValue = value !== undefined ? value : defaultValue
  const selectedOptionLabel =
    effectiveValue != null ? options.find((o) => o.value === effectiveValue)?.label : undefined
  const workspaceTooltipText =
    selectedOptionLabel != null ? `${triggerLabel} (${selectedOptionLabel})` : triggerLabel

  const radioGroupProps =
    value !== undefined
      ? { value, onValueChange: handleValueChange }
      : defaultValue !== undefined
        ? { defaultValue, onValueChange: handleValueChange }
        : { onValueChange: handleValueChange }

  return (
    <div
      data-slot="uds-menu-workspace"
      data-collapsed-workspace="true"
      className={cn("flex shrink-0 justify-center border-b border-solid border-neutral-200 p-2", className)}
    >
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                id={id}
                variant="ghost"
                size="default"
                disabled={disabled}
                className="size-11 shrink-0 p-0"
                aria-label={triggerLabel}
              >
                <PlusCircleIcon className="size-7 shrink-0" weight="regular" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent {...navCollapsedTooltipContentProps}>{workspaceTooltipText}</TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={8}
          className="w-auto min-w-56 max-w-72"
        >
          <DropdownMenuLabel>{placeholder}</DropdownMenuLabel>
          <DropdownMenuRadioGroup {...radioGroupProps}>
            {options.map((opt) => (
              <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                {opt.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function MenuWorkspaceSelect(props: MenuWorkspaceSelectProps) {
  const { expanded } = useMenuRail()
  const { onWorkspaceChange, onValueChange } = props
  const handleValueChange = React.useCallback(
    (next: string) => {
      onWorkspaceChange?.(next)
      onValueChange?.(next)
    },
    [onWorkspaceChange, onValueChange],
  )

  if (!expanded) {
    return <MenuWorkspaceSelectCollapsed {...props} />
  }

  const {
    className,
    options,
    value,
    defaultValue,
    disabled,
    inputSize = "sm",
    placeholder = "Select workspace",
    selectWrapperClassName,
    id,
    "aria-label": ariaLabel,
  } = props

  return (
    <div
      data-slot="uds-menu-workspace"
      className={cn("shrink-0 border-b border-solid border-neutral-200 p-2", className)}
    >
      <Select value={value} defaultValue={defaultValue} onValueChange={handleValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          inputSize={inputSize}
          aria-label={ariaLabel}
          className={cn("w-full min-w-0", selectWrapperClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/** Phosphor (or any) icon component used in {@link MenuNavigation}. */
export type MenuNavigationIcon = React.ComponentType<{
  className?: string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
  "aria-hidden"?: boolean
}>

export type MenuNavigationItem = {
  /** Stable id for the row; must be unique across the whole `navigationItems` tree. */
  id: string
  label: string
  /**
   * Leading icon for root-level rows and nested **group** rows. Omit for nested **leaf** rows; those use a 1px gray
   * left border; when active, 2px brand border plus `--uds-system-action-quaternary` background (same as hover).
   */
  icon?: MenuNavigationIcon
  /** When non-empty, the row shows an expand control and nested rows below. */
  children?: ReadonlyArray<MenuNavigationItem>
}

function collectNavigationGroupIds(items: ReadonlyArray<MenuNavigationItem>): string[] {
  const out: string[] = []
  for (const item of items) {
    if (item.children?.length) {
      out.push(item.id, ...collectNavigationGroupIds(item.children))
    }
  }
  return out
}

function navigationSubtreeHasActive(item: MenuNavigationItem, activeId?: string): boolean {
  if (!activeId) return false
  if (item.id === activeId) return true
  if (!item.children?.length) return false
  return item.children.some((c) => navigationSubtreeHasActive(c, activeId))
}

/** Path from a root item down to `targetId`, or `null` if the id is not in the tree. */
function findNavPathToId(
  items: ReadonlyArray<MenuNavigationItem>,
  targetId: string,
): MenuNavigationItem[] | null {
  for (const item of items) {
    if (item.id === targetId) {
      return [item]
    }
    if (item.children?.length) {
      const sub = findNavPathToId(item.children, targetId)
      if (sub) return [item, ...sub]
    }
  }
  return null
}

/** Branch ids that must be expanded so a nested `activeId` row is visible. */
function collectAncestorBranchIdsForActiveItem(
  items: ReadonlyArray<MenuNavigationItem>,
  activeId?: string,
): string[] {
  if (!activeId) return []
  const path = findNavPathToId(items, activeId)
  if (!path) return []
  const out: string[] = []
  for (let i = 0; i < path.length - 1; i++) {
    const node = path[i]
    if (node.children?.length) out.push(node.id)
  }
  return out
}

type MenuNavigationItemNodeProps = {
  item: MenuNavigationItem
  /** `0` for top-level rows; nested rows use `depth > 0`. */
  depth: number
  activeId?: string
  onNavigationSelect?: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void
  expandedGroupIds: ReadonlySet<string>
  toggleGroup: (id: string) => void
}

function MenuNavigationItemNode({
  item,
  depth,
  activeId,
  onNavigationSelect,
  expandedGroupIds,
  toggleGroup,
}: MenuNavigationItemNodeProps) {
  const Icon = item.icon
  const branch = Boolean(item.children?.length)
  const expanded = expandedGroupIds.has(item.id)
  /** Parent rows stay visually active when any descendant route is selected. */
  const active = navigationSubtreeHasActive(item, activeId)
  const nestedLeaf = depth > 0 && !branch

  if (!branch) {
    return (
      <li className="m-0 p-0">
        <button
          type="button"
          data-active={active ? "true" : undefined}
          className={cn(
            nestedLeaf ? "menu-nav-row-layout px-2" : "menu-nav-row",
            nestedLeaf && "menu-nav-leaf-height",
            nestedLeaf && (active ? "menu-nav-leaf-border-active" : "menu-nav-leaf-border-inactive"),
            nestedLeaf && active && "menu-nav-leaf-active-bg",
            nestedLeaf
              ? "menu-nav-leaf-inactive"
              : active
                ? "menu-nav-active"
                : "menu-nav-parent-inactive",
          )}
          onClick={(event) => onNavigationSelect?.(item.id, event)}
        >
          {!nestedLeaf && Icon ? (
            <Icon className="size-6 shrink-0" weight="duotone" aria-hidden />
          ) : !nestedLeaf ? (
            <span className="size-6 shrink-0" aria-hidden />
          ) : null}
          <span
            className={cn("min-w-0 flex-1 truncate", nestedLeaf && "menu-nav-leaf-type")}
          >
            {item.label}
          </span>
        </button>
      </li>
    )
  }

  const children = item.children!

  return (
    <li className="m-0 p-0">
      <button
        type="button"
        data-active={active ? "true" : undefined}
        aria-expanded={expanded}
        aria-controls={`uds-menu-nav-group-${item.id}`}
        aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
        className={cn(
          "menu-nav-branch-row",
          "menu-nav-parent-sticky",
          expanded && "border-b border-solid border-neutral-200 dark:border-neutral-600",
          active ? "menu-nav-active" : "menu-nav-parent-inactive",
        )}
        onClick={(event) => {
          event.preventDefault()
          toggleGroup(item.id)
        }}
      >
        <span
          className={cn(
            "menu-nav-row-layout menu-nav-row-root-type menu-nav-row-pad-x",
            "min-w-0 flex-1 rounded-none",
            active ? "bg-transparent hover:bg-transparent" : "bg-transparent",
          )}
        >
          {Icon ? (
            <Icon className="size-6 shrink-0" weight="duotone" aria-hidden />
          ) : (
            <span className="size-6 shrink-0" aria-hidden />
          )}
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
        </span>
        <span
          className={cn(
            "flex w-8 shrink-0 items-center justify-center rounded-none",
            active ? "text-[var(--uds-text-inverse)]" : "text-[var(--uds-text-primary)]",
          )}
          aria-hidden
        >
          <CaretDownIcon
            className={cn(
              "size-4 shrink-0 transition-transform duration-200 ease-out",
              expanded && "rotate-180",
            )}
            weight="bold"
            aria-hidden
          />
        </span>
      </button>
      <div
        id={`uds-menu-nav-group-${item.id}`}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div
          className={cn("min-h-0", !expanded && "pointer-events-none")}
          aria-hidden={!expanded}
        >
          <ul className="m-0 mt-0 list-none border-none p-0 pl-3" role="group">
            {children.map((child) => (
              <MenuNavigationItemNode
                key={child.id}
                item={child}
                depth={depth + 1}
                activeId={activeId}
                onNavigationSelect={onNavigationSelect}
                expandedGroupIds={expandedGroupIds}
                toggleGroup={toggleGroup}
              />
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export type MenuNavigationProps = Omit<React.ComponentProps<"div">, "children"> & {
  /**
   * Data-driven navigation rows. When set, the default list is rendered and `children` is ignored.
   * Build the array in app code (import icon components from `@phosphor-icons/react`).
   * Rows may include `children` for a nested list; click the **parent row** (icon, label, or chevron) to expand or collapse
   * (groups start **collapsed**; ancestor groups open automatically when {@link MenuNavigationProps.activeId} is nested).
   * Parent (branch) header rows are `position: sticky` at the top of this scroll area while their subtree scrolls.
   * With the default {@link Menu} layout and a collapsed rail (`mainOnlyWhenExpanded`), only **root** rows render, as
   * icons; branches open a flyout menu to the right for the parent row and nested routes.
   */
  navigationItems?: ReadonlyArray<MenuNavigationItem>
  /**
   * Highlights the matching row and any **ancestor** branch headers when it points at a nested item. Ancestor groups
   * expand automatically so the active child is visible.
   */
  activeId?: string
  /** Called when a row is activated (button click). */
  onNavigationSelect?: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

type CollapsedNavPick = (id: string, event: unknown) => void

function CollapsedBranchMenuContent({
  nodes,
  onPick,
}: {
  nodes: ReadonlyArray<MenuNavigationItem>
  onPick: CollapsedNavPick
}) {
  return (
    <>
      {nodes.map((node) => {
        const branch = Boolean(node.children?.length)
        if (!branch) {
          return (
            <DropdownMenuItem
              key={node.id}
              onSelect={(event) => {
                onPick(node.id, event)
              }}
            >
              {node.label}
            </DropdownMenuItem>
          )
        }
        return (
          <DropdownMenuSub key={node.id}>
            <DropdownMenuSubTrigger inset>{node.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-48">
              <CollapsedBranchMenuContent nodes={node.children!} onPick={onPick} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )
      })}
    </>
  )
}

function CollapsedRootNavRow({
  item,
  activeId,
  onPick,
  submenuOpen,
  onSubmenuOpenChange,
}: {
  item: MenuNavigationItem
  activeId?: string
  onPick: CollapsedNavPick
  /** Controlled open state for branch flyouts (only one open at a time). */
  submenuOpen?: boolean
  onSubmenuOpenChange?: (open: boolean) => void
}) {
  const Icon = item.icon
  const branch = Boolean(item.children?.length)
  const active = navigationSubtreeHasActive(item, activeId)

  const iconEl = Icon ? (
    <Icon className="size-6 shrink-0" weight="duotone" aria-hidden />
  ) : (
    <span className="size-6 shrink-0 rounded-full bg-neutral-200 dark:bg-neutral-700" aria-hidden />
  )

  if (!branch) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            data-active={active ? "true" : undefined}
            aria-current={active ? "page" : undefined}
            aria-label={item.label}
            className={cn(
              "flex size-11 shrink-0 cursor-pointer items-center justify-center transition-colors",
              "menu-nav-collapsed-radius menu-nav-collapsed-focus-ring",
              active ? "menu-nav-active" : "menu-nav-parent-inactive",
            )}
            onClick={(event) => {
              onPick(item.id, event)
            }}
          >
            {iconEl}
          </button>
        </TooltipTrigger>
        <TooltipContent {...navCollapsedTooltipContentProps}>{item.label}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <DropdownMenu open={submenuOpen} onOpenChange={onSubmenuOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-active={active ? "true" : undefined}
              aria-haspopup="menu"
              aria-label={item.label}
              className={cn(
                "flex size-11 shrink-0 cursor-pointer items-center justify-center transition-colors",
                "menu-nav-collapsed-radius menu-nav-collapsed-focus-ring",
                active ? "menu-nav-active" : "menu-nav-parent-inactive",
              )}
            >
              {iconEl}
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent {...navCollapsedTooltipContentProps}>{item.label}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={8} className="min-w-56">
        <DropdownMenuItem
          onSelect={(event) => {
            onPick(item.id, event)
          }}
        >
          {item.label}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <CollapsedBranchMenuContent nodes={item.children!} onPick={onPick} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MenuNavigationCollapsed({
  className,
  navigationItems,
  activeId,
  onNavigationSelect,
  ...props
}: Omit<MenuNavigationProps, "children"> & { navigationItems: ReadonlyArray<MenuNavigationItem> }) {
  const [openSubmenuId, setOpenSubmenuId] = React.useState<string | null>(null)

  const onPick = React.useCallback<CollapsedNavPick>(
    (id, event) => {
      setOpenSubmenuId(null)
      onNavigationSelect?.(id, event as React.MouseEvent<HTMLButtonElement>)
    },
    [onNavigationSelect],
  )

  return (
    <div
      data-slot="uds-menu-navigation"
      data-collapsed-navigation="true"
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-y-auto p-0",
        className,
      )}
      {...props}
    >
      <ul className="m-0 flex min-h-0 flex-1 list-none flex-col items-center gap-1 overflow-y-auto py-2" role="list">
        {navigationItems.map((item) => (
          <li key={item.id} className="m-0 flex shrink-0 justify-center p-0">
            <CollapsedRootNavRow
              item={item}
              activeId={activeId}
              onPick={onPick}
              submenuOpen={openSubmenuId === item.id}
              onSubmenuOpenChange={(open) => {
                if (open) {
                  setOpenSubmenuId(item.id)
                  return
                }
                // Don't clear when another branch just became open (close race).
                setOpenSubmenuId((current) => (current === item.id ? null : current))
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function MenuNavigation({
  className,
  navigationItems,
  activeId,
  onNavigationSelect,
  children,
  ...props
}: MenuNavigationProps) {
  const dataDriven = navigationItems !== undefined

  /** Stable across parent re-renders when the tree shape is unchanged (structure sync only prunes stale branch ids). */
  const groupStructureKey = navigationItems
    ? collectNavigationGroupIds(navigationItems)
        .slice()
        .sort()
        .join("|")
    : ""

  const [expandedGroupIds, setExpandedGroupIds] = React.useState<Set<string>>(() => new Set())
  /** Null sentinels force an initial sync so active-item ancestors expand on mount. */
  const [prevStructureKey, setPrevStructureKey] = React.useState<string | null>(null)
  const [prevActiveId, setPrevActiveId] = React.useState<string | undefined | null>(null)

  if (
    navigationItems &&
    (prevStructureKey !== groupStructureKey || prevActiveId !== activeId)
  ) {
    const structureChanged = prevStructureKey !== groupStructureKey
    setPrevStructureKey(groupStructureKey)
    setPrevActiveId(activeId)
    setExpandedGroupIds((prev) => {
      const next = new Set(prev)
      let changed = false

      if (structureChanged) {
        const allowed = new Set(collectNavigationGroupIds(navigationItems))
        for (const id of next) {
          if (!allowed.has(id)) {
            next.delete(id)
            changed = true
          }
        }
      }

      const ancestorIds = collectAncestorBranchIdsForActiveItem(navigationItems, activeId)
      for (const id of ancestorIds) {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      }

      return changed ? next : prev
    })
  }

  const toggleGroup = React.useCallback((id: string) => {
    setExpandedGroupIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div
      data-slot="uds-menu-navigation"
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-y-auto p-0",
        className,
      )}
      {...props}
    >
      {dataDriven ? (
        <div className="flex min-h-0 flex-1 flex-col p-0">
          <ul className="m-0 flex list-none flex-col gap-0 p-0" role="list">
            {navigationItems.map((item) => (
              <MenuNavigationItemNode
                key={item.id}
                item={item}
                depth={0}
                activeId={activeId}
                onNavigationSelect={onNavigationSelect}
                expandedGroupIds={expandedGroupIds}
                toggleGroup={toggleGroup}
              />
            ))}
          </ul>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export type MenuUtilitiesProps = React.ComponentProps<"div"> & { className?: string }

function MenuUtilities({ className, ...props }: MenuUtilitiesProps) {
  return (
    <div
      data-slot="uds-menu-utilities"
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

/** Workspace + navigation + tail, optionally only while the rail is expanded (default). */
function MenuMainInlays({
  mainOnlyWhenExpanded,
  workspace,
  navigationItems,
  activeId,
  onNavigationSelect,
  navigationClassName,
  navigationProps,
  tail,
}: {
  mainOnlyWhenExpanded: boolean
  workspace?: MenuWorkspaceSelectProps
  navigationItems: ReadonlyArray<MenuNavigationItem>
  activeId?: string
  onNavigationSelect?: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void
  navigationClassName?: string
  navigationProps?: Omit<React.ComponentProps<"div">, "className" | "children">
  tail?: React.ReactNode
}) {
  const { expanded } = useMenuRail()
  const workspaceNode = workspace != null ? <MenuWorkspaceSelect {...workspace} /> : null

  if (mainOnlyWhenExpanded && !expanded) {
    return (
      <>
        {workspaceNode}
        <MenuNavigationCollapsed
          {...navigationProps}
          className={navigationClassName}
          navigationItems={navigationItems}
          activeId={activeId}
          onNavigationSelect={onNavigationSelect}
        />
        {tail}
      </>
    )
  }

  return (
    <>
      {workspaceNode}
      <MenuNavigation
        {...navigationProps}
        className={navigationClassName}
        navigationItems={navigationItems}
        activeId={activeId}
        onNavigationSelect={onNavigationSelect}
      />
      {tail}
    </>
  )
}

/** Data item for the built-in utilities section at the bottom of the menu. */
export type MenuUtilityItem = {
  id: string
  label: string
  icon: MenuNavigationIcon
  /** External or document links (tel:, mailto:, https:, hash anchors). */
  href?: string
  /** In-app or custom navigation; use instead of `href` for SPA routes. */
  onSelect?: () => void
}

function MenuUtilityControl({
  item,
  className,
  children,
  ...rest
}: {
  item: MenuUtilityItem
  className: string
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'type' | 'onClick' | 'children' | 'className'>) {
  if (item.onSelect) {
    return (
      <button type="button" className={className} onClick={item.onSelect} {...rest}>
        {children}
      </button>
    )
  }

  if (!item.href) {
    if (import.meta.env.DEV) {
      console.warn(`[Menu] utility "${item.id}" has no href or onSelect`)
    }
    return (
      <span className={className} aria-disabled {...rest}>
        {children}
      </span>
    )
  }

  return (
    <a href={item.href} className={className} {...(rest as React.ComponentPropsWithoutRef<'a'>)}>
      {children}
    </a>
  )
}

function menuUtilityLinkClassName(variant: "expanded" | "collapsed", active: boolean) {
  return cn(
    variant === "expanded" ? "menu-utility-link-expanded" : "menu-utility-link-collapsed",
    active &&
      (variant === "expanded" ? "menu-utility-link-expanded-active" : "menu-utility-link-collapsed-active"),
  )
}

function MenuDefaultUtilities({
  items,
  activeId,
}: {
  items: ReadonlyArray<MenuUtilityItem>
  /** When set, highlights the utility row whose `id` matches (same convention as navigation `activeId`). */
  activeId?: string
}) {
  const { expanded } = useMenuRail()

  if (expanded) {
    return (
      <MenuUtilities className="flex flex-col gap-0 py-2">
        {items.map((item) => {
          const Icon = item.icon
          const active = activeId === item.id
          return (
            <MenuUtilityControl
              key={item.id}
              item={item}
              className={menuUtilityLinkClassName("expanded", active)}
              data-active={active ? "true" : undefined}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-5 shrink-0" weight="duotone" aria-hidden />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
            </MenuUtilityControl>
          )
        })}
      </MenuUtilities>
    )
  }

  return (
    <MenuUtilities className="flex shrink-0 flex-col items-center gap-1 py-2">
      {items.map((item) => {
        const Icon = item.icon
        const active = activeId === item.id
        return (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <MenuUtilityControl
                item={item}
                className={menuUtilityLinkClassName("collapsed", active)}
                aria-label={item.label}
                data-active={active ? "true" : undefined}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-6 shrink-0" weight="duotone" aria-hidden />
              </MenuUtilityControl>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>{item.label}</TooltipContent>
          </Tooltip>
        )
      })}
    </MenuUtilities>
  )
}

/** Option for the built-in brand switcher select. */
export type MenuBrandOption = {
  value: string
  label: string
}

function MenuBrandSwitcher({
  options,
  value,
  onValueChange,
}: {
  options: ReadonlyArray<MenuBrandOption>
  value: string
  onValueChange: (value: string) => void
}) {
  const { expanded } = useMenuRail()

  if (!expanded) {
    return (
      <div className="flex shrink-0 flex-col items-center border-b border-solid border-neutral-200 py-2 dark:border-neutral-800">
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Switch brand"
                  className={cn(
                    "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[4px] transition-colors",
                    "text-[var(--uds-text-primary)] hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    "outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    "dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950",
                  )}
                >
                  <PlusCircleIcon size={32} weight="regular" aria-hidden />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>Switch brand</TooltipContent>
          </Tooltip>
          <DropdownMenuContent side="right" align="start" sideOffset={8} className="min-w-48">
            <DropdownMenuLabel>Brand</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
              {options.map((o) => (
                <DropdownMenuRadioItem key={o.value} value={o.value}>
                  {o.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="shrink-0 border-b border-solid border-neutral-200 p-2 dark:border-neutral-800">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger inputSize="sm" className="w-full min-w-0 max-w-full shadow-none">
          <SelectValue placeholder="Select brand" />
        </SelectTrigger>
        <SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export type MenuDefaultHeaderProps = {
  /** When `"title"`, renders `title` text instead of {@link Branding} logos. */
  variant?: MenuHeaderVariant
  /** Product or app name for the header when `variant` is `"title"`. */
  title?: string
  /** Abbreviation in the collapsed rail; defaults to the first two characters of `title`. */
  shortTitle?: string
}

/**
 * Standalone Menu header (toggle + wordmark/title). Prefer AppShell Header chrome in product apps —
 * inside AppShell, callable Menu omits this header.
 * Always shows the toggle (no hover-reveal) and never swaps to a collapsed mark logo.
 */
function MenuDefaultHeader({
  variant: variantProp,
  title: titleProp,
}: MenuDefaultHeaderProps = {}) {
  const { expanded, toggleExpanded } = useMenuRail()
  const brand = React.useContext(MenuBrandContext)
  const brandingAppearance = udsBrandToBrandingAppearance(brand)
  const identity = React.useContext(MenuHeaderIdentityContext)
  const variant = variantProp ?? identity.variant
  const headerTitle = titleProp ?? identity.title
  const useTitleHeader = variant === "title" && Boolean(headerTitle?.trim())

  const listToggleButton = (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-11 shrink-0"
      aria-label={expanded ? "Collapse menu" : "Expand menu"}
      aria-expanded={expanded}
      onClick={toggleExpanded}
    >
      <ListIcon className="size-5 shrink-0" weight="bold" aria-hidden />
    </Button>
  )

  return (
    <MenuHeader>
      {expanded ? (
        <div className="grid h-full w-full grid-cols-[2.75rem_1fr_2.75rem] items-center px-2">
          <div className="flex justify-center">{listToggleButton}</div>
          <div className="flex min-w-0 items-center justify-center overflow-hidden">
            {useTitleHeader ? (
              <MenuHeaderTitle
                title={headerTitle!}
                className="h-14 w-[160px] min-w-[160px] max-w-[160px] shrink-0"
              />
            ) : (
              <Branding
                appearance={brandingAppearance}
                wordmarkAlign="center"
                className="h-14 w-[188px] min-w-[188px] max-w-[188px] shrink-0"
              />
            )}
          </div>
          <div className="w-11 shrink-0" aria-hidden />
        </div>
      ) : (
        <div className="flex h-14 w-full items-center justify-center">{listToggleButton}</div>
      )}
    </MenuHeader>
  )
}

export type MenuDefaultProps = Omit<MenuRootProps, "children"> & {
  /** Data-driven tree passed to {@link MenuNavigation}. Omit to use brand-aware defaults. */
  navigationItems?: ReadonlyArray<MenuNavigationItem>
  /** Highlights the active row `id`. */
  activeId?: string
  /** Row activation handler (same as `Menu.Navigation`). */
  onNavigationSelect?: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @deprecated Prefer `AppShell` `headerVariant` — branding lives in the AppShell Header.
   * Still used for standalone Menu (no AppShell) simplified header identity.
   */
  headerVariant?: MenuHeaderVariant
  /** @deprecated Prefer `AppShell` `headerTitle`. */
  headerTitle?: string
  /** @deprecated Prefer `AppShell` `headerShortTitle` (legacy collapsed abbreviation). */
  headerShortTitle?: string
  /**
   * Brand id for theme tokens (`document.documentElement.dataset.brand`) and standalone header wordmark.
   * Defaults to **`chg`**, or inherits from AppShell `brand` when composed in AppShell and this prop is omitted.
   * When `brandStorageKey` is set, storage wins unless this prop is passed.
   */
  brand?: UdsBrandId
  /**
   * Fallback when `brandStorageKey` has no valid stored value. Defaults to **`chg`** for consumers.
   * Pass `chg` (or use docs helpers) for the internal docs site default.
   */
  defaultBrand?: UdsBrandId
  /**
   * When set, read and persist the active brand under this `localStorage` key (e.g. docs-site switcher).
   * Omit in product apps for a stable CHG default with no storage coupling.
   */
  brandStorageKey?: string
  /**
   * Brand switcher rendered between header and navigation.
   * Pass an array of `{ value, label }` options to show the select. Omit to hide.
   * Ignored when `toolbar` is set.
   */
  brandOptions?: ReadonlyArray<MenuBrandOption>
  /**
   * Custom control band between header and navigation (same slot as the brand switcher).
   * When set, replaces `brandOptions` UI (custom Menu toolbar content).
   */
  toolbar?: React.ReactNode
  /** Renders `Menu.WorkspaceSelect` above navigation when provided. */
  workspace?: MenuWorkspaceSelectProps
  /** Below navigation (e.g. `Menu.Utilities`). Prefer `utilities` for data-driven links. */
  tail?: React.ReactNode
  /**
   * Data-driven utility links rendered below navigation.
   * Pass an array of `{ id, label, href, icon }` items to render. Omit to hide.
   * Rows highlight when their `id` matches {@link MenuDefaultProps.activeId}.
   */
  utilities?: ReadonlyArray<MenuUtilityItem>
  /** `className` forwarded to `Menu.Navigation`. */
  navigationClassName?: string
  /** Extra attributes on the `Menu.Navigation` root (e.g. `aria-label`, `id`). */
  navigationProps?: Omit<React.ComponentProps<"div">, "className" | "children">
  /**
   * When true (default), workspace and navigation still mount when collapsed: workspace uses the compact control, and
   * navigation shows **icon-only** root rows (with a right flyout for nested items). **`tail`** also mounts when collapsed
   * so you can mirror icon-only utilities (compose with `useMenuRail`). Set false to keep the expanded layout (full labels)
   * in the 56px rail.
   */
  mainOnlyWhenExpanded?: boolean
}

function MenuDefault({
  navigationItems,
  activeId,
  onNavigationSelect,
  headerVariant = "brand",
  headerTitle,
  headerShortTitle,
  brand,
  defaultBrand,
  brandStorageKey,
  brandOptions,
  toolbar,
  workspace,
  tail,
  utilities,
  navigationClassName,
  navigationProps,
  mainOnlyWhenExpanded = true,
  ...rootProps
}: MenuDefaultProps) {
  const chrome = useAppShellChrome()
  const resolvedHeaderVariant = chrome?.ownsHeaderChrome
    ? chrome.headerVariant
    : headerVariant
  const resolvedHeaderTitle = chrome?.ownsHeaderChrome ? chrome.headerTitle : headerTitle
  const resolvedHeaderShortTitle = chrome?.ownsHeaderChrome
    ? chrome.headerShortTitle
    : headerShortTitle

  const resolvedDefaultBrand = defaultBrand ?? chrome?.brand ?? UDS_DEFAULT_BRAND
  const [standaloneBrand, setStandaloneBrand] = React.useState<UdsBrandId>(() =>
    resolveMenuBrand({
      brand,
      defaultBrand: resolvedDefaultBrand,
      brandStorageKey,
    }),
  )

  // AppShell chrome brand is source of truth when composed in AppShell and `brand` is omitted.
  const brandCandidate = brand ?? chrome?.brand ?? standaloneBrand
  const brandInOptions =
    !brandOptions?.length || brandOptions.some((option) => option.value === brandCandidate)
  const fallbackBrand = brandOptions?.[0]?.value
  const activeBrand =
    !brandInOptions && fallbackBrand && isUdsBrandId(fallbackBrand)
      ? fallbackBrand
      : brandCandidate

  if (chrome == null && activeBrand !== standaloneBrand) {
    setStandaloneBrand(activeBrand)
  }

  React.useLayoutEffect(() => {
    applyUdsBrandToDocument(activeBrand)
  }, [activeBrand])

  const handleBrandChange = React.useCallback(
    (value: string) => {
      if (!isUdsBrandId(value)) return
      applyUdsBrandToDocument(value)
      if (chrome) {
        chrome.setBrand(value)
      } else {
        setStandaloneBrand(value)
      }
      if (brandStorageKey) persistBrandToStorage(brandStorageKey, value)
    },
    [brandStorageKey, chrome],
  )

  const resolvedNavItems = React.useMemo(
    () => navigationItems ?? getDefaultNavigation(activeBrand),
    [navigationItems, activeBrand],
  )

  const resolvedTail = (
    <>
      {utilities?.length ? <MenuDefaultUtilities items={utilities} activeId={activeId} /> : null}
      {tail}
    </>
  )

  const headerIdentity = React.useMemo<MenuHeaderIdentity>(
    () => ({
      variant: resolvedHeaderVariant,
      title: resolvedHeaderTitle,
      shortTitle: resolvedHeaderShortTitle,
    }),
    [resolvedHeaderVariant, resolvedHeaderTitle, resolvedHeaderShortTitle],
  )

  if (
    import.meta.env.DEV &&
    resolvedHeaderVariant === "title" &&
    !resolvedHeaderTitle?.trim() &&
    !chrome?.ownsHeaderChrome
  ) {
    console.warn(
      '[Menu] headerVariant is "title" but headerTitle is empty; falling back to brand logos.',
    )
  }

  const showMenuHeader = !chrome?.ownsHeaderChrome

  return (
    <MenuBrandContext.Provider value={activeBrand}>
      <MenuHeaderIdentityContext.Provider value={headerIdentity}>
        <MenuRoot {...rootProps}>
          {showMenuHeader ? <MenuDefaultHeader /> : null}
          {toolbar != null ? (
            toolbar
          ) : brandOptions?.length ? (
            <MenuBrandSwitcher
              options={brandOptions}
              value={activeBrand}
              onValueChange={handleBrandChange}
            />
          ) : null}
          <MenuMainInlays
            mainOnlyWhenExpanded={mainOnlyWhenExpanded}
            workspace={workspace}
            navigationItems={resolvedNavItems}
            activeId={activeId}
            onNavigationSelect={onNavigationSelect}
            navigationClassName={navigationClassName}
            navigationProps={navigationProps}
            tail={resolvedTail}
          />
        </MenuRoot>
      </MenuHeaderIdentityContext.Provider>
    </MenuBrandContext.Provider>
  )
}

export type MenuCompound = {
  Root: typeof MenuRoot
  Header: typeof MenuHeader
  Workspace: typeof MenuWorkspace
  WorkspaceSelect: typeof MenuWorkspaceSelect
  Navigation: typeof MenuNavigation
  Utilities: typeof MenuUtilities
}

export type MenuCallable = React.FC<MenuDefaultProps> & MenuCompound

export const Menu = Object.assign(MenuDefault, {
  Root: MenuRoot,
  Header: MenuHeader,
  Workspace: MenuWorkspace,
  WorkspaceSelect: MenuWorkspaceSelect,
  Navigation: MenuNavigation,
  Utilities: MenuUtilities,
}) as MenuCallable

export {
  useMenuRail,
  MenuDefaultHeader,
  MenuDefaultUtilities,
  getDefaultNavigation,
  MenuHeaderTitle,
}
export type { UdsBrandId } from "@/lib/uds-brand"
export {
  UDS_DEFAULT_BRAND,
  UDS_BRAND_OPTIONS,
  applyUdsBrandToDocument,
  udsBrandToBrandingAppearance,
} from "@/lib/uds-brand"
