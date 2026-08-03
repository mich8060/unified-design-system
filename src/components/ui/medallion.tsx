import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  MEDALLION_COLORS,
  MEDALLION_PALETTE,
  MEDALLION_PASTEL_PALETTE,
  MEDALLION_SOLID_PALETTE,
  MEDALLION_TONES,
  type MedallionColor,
  type MedallionTone,
} from '@/components/ui/medallion-palette'

export type { MedallionColor, MedallionTone }
export {
  MEDALLION_COLORS,
  MEDALLION_PALETTE,
  MEDALLION_PASTEL_PALETTE,
  MEDALLION_SOLID_PALETTE,
  MEDALLION_TONES,
}

export type MedallionSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl'

export type MedallionShape = 'circle' | 'square' | 'rounded'

const SIZE_CLASS: Record<MedallionSize, string> = {
  xs: 'h-6 w-6 min-h-6 min-w-6',
  sm: 'h-8 w-8 min-h-8 min-w-8',
  default: 'h-10 w-10 min-h-10 min-w-10',
  lg: 'h-12 w-12 min-h-12 min-w-12',
  xl: 'h-16 w-16 min-h-16 min-w-16',
}

const ICON_PX: Record<MedallionSize, string> = {
  xs: '12px',
  sm: '14px',
  default: '18px',
  lg: '22px',
  xl: '28px',
}

export type MedallionProps = {
  /** UDS accent / neutral token key for surface + icon colors */
  color: MedallionColor
  /**
   * `pastel` — tinted surfaces + deeper icons (default; inverts in dark).
   * `solid` — `500` ramp fill + white icon (same in dark).
   */
  tone?: MedallionTone
  /** Centered icon (e.g. Phosphor `<FileTextIcon weight="bold" />`) */
  icon: React.ReactNode
  /** Defaults to `lg` (48px). Prefer large; use smaller sizes only for dense/composed chrome. */
  size?: MedallionSize
  shape?: MedallionShape
  className?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>

export function Medallion({
  color,
  tone = 'pastel',
  icon,
  size = 'lg',
  shape = 'circle',
  className,
  style,
  ...props
}: MedallionProps) {
  const tokens =
    tone === 'solid' ? MEDALLION_SOLID_PALETTE[color] : MEDALLION_PASTEL_PALETTE[color]
  const solid = tone === 'solid'

  return (
    <div
      data-slot="medallion"
      data-tone={tone}
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-inter [&_svg]:size-[var(--medallion-icon)]',
        'bg-[var(--m-bg)] text-[var(--m-fg)] dark:bg-[var(--m-bg-dark)] dark:text-[var(--m-fg-dark)]',
        SIZE_CLASS[size],
        shape === 'circle' && 'rounded-full',
        shape === 'square' && 'rounded-none',
        shape === 'rounded' && 'rounded-[12px]',
        className,
      )}
      style={
        {
          '--medallion-icon': ICON_PX[size],
          '--m-bg': tokens.bg,
          '--m-fg': tokens.fg,
          /* Pastel: invert in dark. Solid: keep 500 + white in both themes. */
          '--m-bg-dark': solid ? tokens.bg : tokens.fg,
          '--m-fg-dark': solid ? tokens.fg : tokens.bg,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {icon}
    </div>
  )
}
