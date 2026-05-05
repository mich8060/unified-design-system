import type { CSSProperties } from 'react'

import {
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@chg-ds/unified-design-system'
import { DOCS_BRAND_OPTIONS, type DocsBrandId } from '../doc-site-brand'

/** Scoped shadcn-style CSS variables so previews read UDS tokens after `data-brand` switches ramp. */
export const DOCS_COMPONENT_PREVIEW_THEME_VARS = {
  '--background': 'var(--uds-surface-primary)',
  '--foreground': 'var(--uds-text-primary)',
  '--card': 'var(--uds-surface-primary)',
  '--card-foreground': 'var(--uds-text-primary)',
  '--popover': 'var(--uds-surface-primary)',
  '--popover-foreground': 'var(--uds-text-primary)',
  '--primary': 'var(--uds-color-primary-700)',
  '--primary-foreground': 'var(--uds-text-inverse)',
  '--secondary': 'var(--uds-surface-secondary)',
  '--secondary-foreground': 'var(--uds-text-primary)',
  '--muted': 'var(--uds-surface-secondary)',
  '--muted-foreground': 'var(--uds-text-secondary)',
  '--accent': 'var(--uds-surface-tertiary)',
  '--accent-foreground': 'var(--uds-text-primary)',
  '--border': 'var(--uds-border-primary)',
  '--input': 'var(--uds-border-primary)',
  '--ring': 'var(--uds-focus-ring-border)',
} as CSSProperties

/** shadcn UI doc routes whose live examples respect `[data-brand]` ramps. */
export const SHADCN_DOC_BRAND_PREVIEW_SLUGS = new Set<string>([
  'avatar',
  'button',
  'button-group',
  'chart',
  'checkbox',
  'radio-group',
])

/** Foundations catalog slugs whose examples use brand ramps. */
export const FOUNDATION_DOC_BRAND_PREVIEW_SLUGS = new Set<string>(['colors'])

type DocsComponentPreviewBrandToolbarProps = {
  brand: DocsBrandId
  onBrandChange: (id: DocsBrandId) => void
  /** Unique id for the trigger (a11y). */
  selectId: string
  /** Merged onto the outer bar (default spacing is for placement directly under the page title). */
  className?: string
}

/**
 * Controls `data-brand` on a scoped wrapper — does not change site chrome (`document.documentElement`).
 */
export function DocsComponentPreviewBrandToolbar({
  brand,
  onBrandChange,
  selectId,
  className,
}: DocsComponentPreviewBrandToolbarProps) {
  return (
    <div
      className={cn(
        'mt-4 flex flex-col gap-3 rounded-[length:var(--uds-radius-8)] border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-950 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">Preview brand</span>
        <span className="hidden sm:inline"> — </span>
        <span className="block text-xs text-neutral-500 sm:inline sm:text-sm dark:text-neutral-500">
          Examples below use this product palette (`[data-brand]`); doc chrome stays default.
        </span>
      </p>
      <div className="flex w-full shrink-0 flex-col gap-1 sm:w-auto sm:min-w-[12rem]">
        <Select value={brand} onValueChange={(v) => onBrandChange(v as DocsBrandId)}>
          <SelectTrigger id={selectId} inputSize="sm" className="w-full shadow-none">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent position="popper" align="end" className="min-w-[var(--radix-select-trigger-width)]">
            {DOCS_BRAND_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function docsPreviewBrandScopeClassName(brand: DocsBrandId): string {
  return brand === 'default' ? 'brand-default' : `brand-${brand}`
}
