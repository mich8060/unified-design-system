"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { CaretUpIcon } from "@phosphor-icons/react/CaretUp"
import { CheckIcon } from "@phosphor-icons/react/Check"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/MagnifyingGlass"
import { Select as SelectPrimitive } from "radix-ui"

import { inputVariants } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SelectSearchSelectionContext = React.createContext<string | undefined>(undefined)

function useSelectSearchSelection() {
  return React.useContext(SelectSearchSelectionContext)
}

type SelectSearchFilterContextValue = {
  searchable: boolean
  query: string
  searchFilter?: (query: string, label: string, itemValue: string) => boolean
}

const SelectSearchFilterContext = React.createContext<SelectSearchFilterContextValue>({
  searchable: false,
  query: "",
  searchFilter: undefined,
})

function defaultSelectSearchFilter(query: string, label: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return label.toLowerCase().includes(q)
}

function getSelectItemSearchLabel(
  children: React.ReactNode,
  textValue?: string,
): string {
  if (textValue?.trim()) return textValue.trim()
  if (typeof children === "string") return children.trim()
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === "string" ? c : "")).join("").trim()
  }
  return ""
}

type SelectItemElement = React.ReactElement<{
  value: string
  textValue?: string
  children?: React.ReactNode
}>

/** Recursively collect {@link SelectItem} elements for searchable result counts and announcements. */
function collectSelectItems(nodes: React.ReactNode): SelectItemElement[] {
  const items: SelectItemElement[] = []
  React.Children.forEach(nodes, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === SelectItem) {
      items.push(child as SelectItemElement)
      return
    }
    if (child.type === SelectGroup || child.type === React.Fragment) {
      items.push(
        ...collectSelectItems((child.props as { children?: React.ReactNode }).children),
      )
      return
    }
    const nested = (child.props as { children?: React.ReactNode }).children
    if (nested != null) {
      items.push(...collectSelectItems(nested))
    }
  })
  return items
}

function countFilteredSelectItems(
  itemElements: SelectItemElement[],
  query: string,
  selected: string | undefined,
  searchFilter?: (query: string, label: string, itemValue: string) => boolean,
): number {
  const q = query.trim()
  if (!q) return itemElements.length
  let n = 0
  for (const el of itemElements) {
    const { value, textValue, children } = el.props
    const label = getSelectItemSearchLabel(children, textValue)
    const visible =
      value === selected ||
      (searchFilter ? searchFilter(q, label, value) : defaultSelectSearchFilter(q, label))
    if (visible) n += 1
  }
  return n
}

function searchFieldStopPropagation(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.nativeEvent.isComposing) return
  if (e.ctrlKey || e.metaKey || e.altKey) return
  const passThrough = new Set([
    "Tab",
    "Escape",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Enter",
  ])
  if (passThrough.has(e.key)) return
  e.stopPropagation()
}

function Select({
  value,
  defaultValue,
  onValueChange,
  ...rest
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const resolved = value !== undefined ? value : internalValue

  const handleValueChange = React.useCallback(
    (next: string) => {
      onValueChange?.(next)
      if (value === undefined) {
        setInternalValue(next)
      }
    },
    [onValueChange, value],
  )

  return (
    <SelectSearchSelectionContext.Provider value={resolved}>
      <SelectPrimitive.Root
        data-slot="select"
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...rest}
      />
    </SelectSearchSelectionContext.Provider>
  )
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  inputSize,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof inputVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-input-size={inputSize ?? "default"}
      className={cn(
        inputVariants({ inputSize }),
        "flex w-full min-w-0 cursor-default items-center justify-between gap-1.5 whitespace-nowrap select-none data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDownIcon className="pointer-events-none size-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> & {
  /**
   * When true, shows a search field at the top of the dropdown and filters {@link SelectItem} rows
   * by label (`textValue` or string `children`). Not the default.
   */
  searchable?: boolean
  /** Placeholder for the search field when `searchable` is true. */
  searchPlaceholder?: string
  /**
   * When `searchable`, focuses the search field after open (runs after Radix positions the menu).
   * @default true
   */
  searchAutoFocus?: boolean
  /**
   * When `searchable`, custom match predicate. Return true to keep the item visible.
   * Default: case-insensitive substring on the item label.
   */
  searchFilter?: (query: string, label: string, itemValue: string) => boolean
  /**
   * When `searchable`, accessible name for the filter field (do not rely on `placeholder` alone).
   * @default "Filter options"
   */
  searchAriaLabel?: string
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent(
  {
    className,
    children,
    position = "item-aligned",
    align = "center",
    searchable = false,
    searchPlaceholder = "Search…",
    searchAriaLabel = "Filter options",
    searchAutoFocus = true,
    searchFilter,
    onCloseAutoFocus,
    id: contentId,
    ...props
  },
  ref,
) {
  const [query, setQuery] = React.useState("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const listboxId = React.useId()
  const searchFieldId = React.useId()
  const selectedValue = useSelectSearchSelection()

  const itemElements = React.useMemo(() => collectSelectItems(children), [children])

  const matchingCount = React.useMemo(
    () =>
      searchable
        ? countFilteredSelectItems(itemElements, query, selectedValue, searchFilter)
        : itemElements.length,
    [searchable, itemElements, query, selectedValue, searchFilter],
  )

  const filterLiveMessage = React.useMemo(() => {
    if (!searchable || !query.trim()) return ""
    if (matchingCount === 0) return "No matching options."
    if (matchingCount === 1) return "1 matching option."
    return `${matchingCount} matching options.`
  }, [searchable, query, matchingCount])

  const filterCtx = React.useMemo<SelectSearchFilterContextValue>(
    () => ({
      searchable,
      query,
      searchFilter,
    }),
    [searchable, query, searchFilter],
  )

  React.useLayoutEffect(() => {
    if (!searchable || !searchAutoFocus) return
    const id = window.setTimeout(() => {
      searchInputRef.current?.focus({ preventScroll: true })
    }, 0)
    return () => window.clearTimeout(id)
  }, [searchable, searchAutoFocus])

  const handleCloseAutoFocus = React.useCallback(
    (event: Event) => {
      setQuery("")
      onCloseAutoFocus?.(event as never)
    },
    [onCloseAutoFocus],
  )

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        id={contentId ?? (searchable ? listboxId : undefined)}
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        data-searchable={searchable ? "" : undefined}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto bg-popover px-0 py-1 text-uds-14 font-uds-regular leading-uds-14 [font-family:var(--font-inter)] [color:var(--popover-foreground)] shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
          "rounded-[length:var(--uds-radius-8)]"
        )}
        position={position}
        align={align}
        onCloseAutoFocus={handleCloseAutoFocus}
        {...props}
      >
        <SelectScrollUpButton />
        {searchable ? (
          <div className="sticky top-0 z-20 border-b border-border bg-popover px-2 py-2">
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {filterLiveMessage}
            </div>
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={searchInputRef}
                id={searchFieldId}
                type="search"
                role="searchbox"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-label={searchAriaLabel}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={searchFieldStopPropagation}
                placeholder={searchPlaceholder}
                className={cn(
                  inputVariants({ inputSize: "sm" }),
                  "pl-8 shadow-none ring-0 focus-visible:ring-2",
                )}
              />
            </div>
          </div>
        ) : null}
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
            position === "popper" && ""
          )}
        >
          <SelectSearchFilterContext.Provider value={filterCtx}>
            {children}
          </SelectSearchFilterContext.Provider>
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = "SelectContent"

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-3 py-1.5 text-uds-14 font-uds-semibold leading-uds-14 [font-family:var(--font-inter)] [color:var(--muted-foreground)]",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  value,
  textValue,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const selected = useSelectSearchSelection()
  const filterCtx = React.useContext(SelectSearchFilterContext)

  const label = React.useMemo(
    () => getSelectItemSearchLabel(children, textValue),
    [children, textValue],
  )

  const visible = React.useMemo(() => {
    if (!filterCtx.searchable) return true
    const q = filterCtx.query
    if (!q.trim()) return true
    if (value === selected) return true
    if (filterCtx.searchFilter) {
      return filterCtx.searchFilter(q, label, value)
    }
    return defaultSelectSearchFilter(q, label)
  }, [filterCtx, label, value, selected])

  if (!visible) {
    return null
  }

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-none py-1.5 pl-3 pr-8 text-uds-14 font-uds-regular leading-uds-14 outline-hidden select-none data-[highlighted]:data-[state=unchecked]:bg-[var(--uds-system-action-quaternary)] data-[highlighted]:data-[state=unchecked]:text-[var(--uds-text-primary)] data-[state=checked]:bg-[var(--uds-color-accent-blue-700)] data-[state=checked]:text-[var(--uds-text-inverse)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      value={value}
      textValue={textValue}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      aria-label="Show more options above"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 text-uds-14 [font-family:var(--font-inter)] [color:var(--muted-foreground)] [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <CaretUpIcon aria-hidden />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      aria-label="Show more options below"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 text-uds-14 [font-family:var(--font-inter)] [color:var(--muted-foreground)] [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <CaretDownIcon aria-hidden />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
