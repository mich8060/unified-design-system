import * as React from "react"

import type { DateRange } from "react-day-picker"

/** Strip to digits only, max `max` characters. */
export function digitsOnly(raw: string, max: number): string {
  return raw.replace(/\D/g, "").slice(0, max)
}

/**
 * Takes any string, keeps up to 8 digits, and inserts `/` as `mm/dd/yyyy` while typing.
 */
export function formatDigitsAsMmDdYyyy(raw: string): string {
  const d = digitsOnly(raw, 8)
  if (d.length === 0) return ""
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

/**
 * Range field: up to 8 digits for the first `mm/dd/yyyy`, then up to 8 for the second.
 * Inserts `separator` automatically after the first 8 digits so typing continues into the end date.
 */
export function formatRangeDigitsAsTyped(raw: string, separator: string): string {
  const d = digitsOnly(raw, 16)
  if (d.length <= 8) return formatDigitsAsMmDdYyyy(d)
  return `${formatDigitsAsMmDdYyyy(d.slice(0, 8))}${separator}${formatDigitsAsMmDdYyyy(d.slice(8))}`
}

/** Block printable non-digits (paste is normalized in `onChange`). */
export function rejectNonNumericDateInputKey(e: React.KeyboardEvent<HTMLElement>): void {
  if (e.nativeEvent.isComposing) return
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (e.key.length === 1 && !/\d/.test(e.key)) {
    e.preventDefault()
  }
}

/** Parse `m/d/yyyy` or `mm/dd/yyyy` in local time. Returns `undefined` if invalid or empty. */
export function tryParseUsDate(value: string): Date | undefined {
  const t = value.trim()
  if (!t) return undefined
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(t)
  if (!m) return undefined
  const month = Number(m[1]) - 1
  const day = Number(m[2])
  const year = Number(m[3])
  if (month < 0 || month > 11 || day < 1 || day > 31) return undefined
  const d = new Date(year, month, day)
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return undefined
  return d
}

/**
 * Parse a range string `start{sep}end` using {@link tryParseUsDate} for each segment.
 * One segment yields `{ from, to: undefined }`.
 */
export function tryParseUsDateRange(value: string, separator: string): DateRange | undefined {
  const t = value.trim()
  if (!t) return undefined
  const parts = t.split(separator).map((p) => p.trim())
  if (parts.length === 1) {
    const from = tryParseUsDate(parts[0]!)
    return from ? { from, to: undefined } : undefined
  }
  const from = tryParseUsDate(parts[0]!)
  const to = tryParseUsDate(parts[1]!)
  if (!from) return undefined
  return { from, to: to ?? undefined }
}

export type FlipPopoverSide = "top" | "bottom"

/**
 * Picks `bottom` vs `top` for an absolutely positioned popover under `anchorRef`
 * so it stays in the viewport when possible.
 */
export function useFlipPopoverSide(
  open: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  options?: { gap?: number; fallbackHeight?: number }
): FlipPopoverSide {
  const gap = options?.gap ?? 8
  const fallbackHeight = options?.fallbackHeight ?? 360
  const [side, setSide] = React.useState<FlipPopoverSide>("bottom")

  const measure = React.useCallback(() => {
    const anchor = anchorRef.current
    const content = contentRef.current
    if (!anchor || !content) return
    const ar = anchor.getBoundingClientRect()
    const rectH = content.getBoundingClientRect().height
    const h = rectH > 8 ? rectH : fallbackHeight
    const spaceBelow = window.innerHeight - ar.bottom - gap
    const spaceAbove = ar.top - gap
    if (spaceBelow >= h) {
      setSide("bottom")
    } else if (spaceAbove >= h) {
      setSide("top")
    } else {
      setSide(spaceBelow >= spaceAbove ? "bottom" : "top")
    }
  }, [anchorRef, contentRef, gap, fallbackHeight])

  React.useLayoutEffect(() => {
    if (!open) return
    measure()
    const id = window.requestAnimationFrame(() => measure())
    const content = contentRef.current
    const ro = content ? new ResizeObserver(() => measure()) : null
    if (content) ro?.observe(content)
    window.addEventListener("scroll", measure, true)
    window.addEventListener("resize", measure)
    return () => {
      window.cancelAnimationFrame(id)
      ro?.disconnect()
      window.removeEventListener("scroll", measure, true)
      window.removeEventListener("resize", measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, measure])

  return side
}
