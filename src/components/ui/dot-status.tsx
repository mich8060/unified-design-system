'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Hue presets for status / availability dots (UDS accent scale + neutral + inverse).
 * `celery` maps to the emerald accent (yellow-green) — Spectrum-style naming.
 */
export const DOT_STATUS_VARIANTS = [
  'red',
  'blue',
  'inverse',
  'orange',
  'sky',
  'indigo',
  'rose',
  'neutral',
  'celery',
  'lime',
  'yellow',
  'green',
  'cyan',
  'purple',
  'fuchsia',
] as const

export type DotStatusVariant = (typeof DOT_STATUS_VARIANTS)[number]

export const DOT_STATUS_SIZES = ['small', 'medium', 'large'] as const
export type DotStatusSize = (typeof DOT_STATUS_SIZES)[number]

function fillForVariant(variant: DotStatusVariant): string | undefined {
  switch (variant) {
    case 'neutral':
      return 'var(--uds-color-neutrals-500)'
    case 'inverse':
      return undefined
    case 'celery':
      return 'var(--uds-color-accent-emerald-500)'
    default:
      return `var(--uds-color-accent-${variant}-500)`
  }
}

const dotStyles = cva('inline-block shrink-0 rounded-full', {
  variants: {
    size: {
      small: 'size-2',
      medium: 'size-2.5',
      large: 'size-3',
    },
    outline: {
      true: 'box-border border-2 border-[var(--uds-border-primary)]',
      false: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    outline: false,
  },
})

export type DotStatusProps = Omit<React.ComponentProps<'span'>, 'children'> &
  VariantProps<typeof dotStyles> & {
    /** Fill color (UDS accent or semantic). */
    variant?: DotStatusVariant
  }

export function DotStatus({
  className,
  variant = 'green',
  size,
  outline = false,
  style,
  ...props
}: DotStatusProps) {
  const fill = fillForVariant(variant)
  const inverseClass =
    variant === 'inverse'
      ? 'bg-[var(--uds-color-black)] dark:bg-[var(--uds-color-white)]'
      : ''

  return (
    <span
      data-slot="dot-status"
      role="presentation"
      aria-hidden
      className={cn(dotStyles({ size, outline }), inverseClass, className)}
      style={{
        ...(fill ? { backgroundColor: fill } : {}),
        ...style,
      }}
      {...props}
    />
  )
}
