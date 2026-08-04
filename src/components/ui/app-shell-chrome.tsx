"use client"

import * as React from "react"

import type { HeaderIdentityVariant } from "@/components/ui/header"
import { UDS_DEFAULT_BRAND, type UdsBrandId } from "@/lib/uds-brand"

export type AppShellChromeContextValue = {
  /** Menu rail / drawer open-expanded state. */
  menuExpanded: boolean
  setMenuExpanded: (next: boolean) => void
  toggleMenu: () => void
  /** Brand id for Header wordmark and inherited Menu tokens when Menu omits `brand`. */
  brand: UdsBrandId
  /** Update shell brand (e.g. Menu brand switcher). No-ops when AppShell `brand` is controlled. */
  setBrand: (next: UdsBrandId) => void
  headerVariant: HeaderIdentityVariant
  headerTitle?: string
  headerShortTitle?: string
  /** When true, Menu must not render its default brand/toggle header. */
  ownsHeaderChrome: true
}

const AppShellChromeContext = React.createContext<AppShellChromeContextValue | null>(null)

function useAppShellChrome(): AppShellChromeContextValue | null {
  return React.useContext(AppShellChromeContext)
}

const APPSHELL_DESKTOP_MQ = "(min-width: 1024px)"

function getDefaultMenuExpandedForViewport(fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback
  return window.matchMedia(APPSHELL_DESKTOP_MQ).matches ? fallback : false
}

export type UseAppShellMenuExpandedOptions = {
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

function useAppShellMenuExpanded({
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
}: UseAppShellMenuExpandedOptions) {
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    getDefaultMenuExpandedForViewport(defaultExpanded),
  )
  const isControlled = expandedProp !== undefined
  const menuExpanded = isControlled ? expandedProp : uncontrolled

  const setMenuExpanded = React.useCallback(
    (next: boolean) => {
      onExpandedChange?.(next)
      if (!isControlled) {
        setUncontrolled(next)
      }
    },
    [isControlled, onExpandedChange],
  )

  const toggleMenu = React.useCallback(() => {
    setMenuExpanded(!menuExpanded)
  }, [menuExpanded, setMenuExpanded])

  React.useEffect(() => {
    if (isControlled || typeof window === "undefined") return
    const mq = window.matchMedia(APPSHELL_DESKTOP_MQ)
    const onChange = () => {
      if (!mq.matches) {
        setUncontrolled(false)
      } else {
        setUncontrolled(defaultExpanded)
      }
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [defaultExpanded, isControlled])

  return { menuExpanded, setMenuExpanded, toggleMenu }
}

function createAppShellChromeValue(options: {
  menuExpanded: boolean
  setMenuExpanded: (next: boolean) => void
  toggleMenu: () => void
  brand?: UdsBrandId
  setBrand: (next: UdsBrandId) => void
  headerVariant?: HeaderIdentityVariant
  headerTitle?: string
  headerShortTitle?: string
}): AppShellChromeContextValue {
  return {
    menuExpanded: options.menuExpanded,
    setMenuExpanded: options.setMenuExpanded,
    toggleMenu: options.toggleMenu,
    brand: options.brand ?? UDS_DEFAULT_BRAND,
    setBrand: options.setBrand,
    headerVariant: options.headerVariant ?? "brand",
    headerTitle: options.headerTitle,
    headerShortTitle: options.headerShortTitle,
    ownsHeaderChrome: true,
  }
}

export {
  AppShellChromeContext,
  createAppShellChromeValue,
  useAppShellChrome,
  useAppShellMenuExpanded,
  APPSHELL_DESKTOP_MQ,
}
