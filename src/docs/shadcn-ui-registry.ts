/** All shadcn/ui modules under @/components/ui (kebab-case slug = file name without .tsx). */
export const SHADCN_UI_SLUGS = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'avatar',
  'badge',
  'breadcrumb',
  'branding',
  'button',
  'button-group',
  'calendar',
  'card',
  'chart',
  'check-list',
  'checkbox',
  'collapsible',
  'combobox',
  'command',
  'context-menu',
  'description-list',
  'dialog',
  'direction',
  'dot-status',
  'drawer',
  'dropdown-menu',
  'date-input',
  'date-range-input',
  'empty',
  'event-card',
  'field',
  'file-upload',
  'file-upload-cards',
  'footer',
  'header',
  'hover-card',
  'input',
  'input-group',
  'input-otp',
  'item',
  'kbd',
  'label',
  'layout',
  'link',
  'medallion',
  'menubar',
  'micro-calendar',
  'native-select',
  'navigation-menu',
  'number-input',
  'pagination',
  'password-input',
  'phone-input',
  'popover',
  'progress',
  'progress-circles',
  'radio-group',
  'resizable',
  'scroll-area',
  'search-input',
  'select',
  'separator',
  'section-header',
  'sheet',
  'sidebar',
  'skeleton',
  'slider',
  'sonner',
  'spinner',
  'statistics',
  'status',
  'steps',
  'switch',
  'table',
  'tabs',
  'text',
  'textarea',
  'time-input',
  'time-step-input',
  'token-input',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip',
  'url-input',
] as const

export type ShadcnUiSlug = (typeof SHADCN_UI_SLUGS)[number]

const ACRONYMS = new Set(['otp', 'api', 'uri', 'url', 'kbd', 'npi'])

export function formatShadcnComponentName(slug: string): string {
  if (slug === 'dot-status') return 'DotStatus'
  if (slug === 'sonner') return 'Toast'
  return slug
    .split('-')
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

export type ShadcnUiEntry = { slug: string; name: string }

export function getAllShadcnUiComponents(): ShadcnUiEntry[] {
  return [...SHADCN_UI_SLUGS]
    .map((slug) => ({
      slug,
      name: formatShadcnComponentName(slug),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
}

export function isShadcnUiSlug(slug: string): slug is ShadcnUiSlug {
  return (SHADCN_UI_SLUGS as readonly string[]).includes(slug)
}

export function getShadcnDocsUrl(slug: string): string {
  return `https://ui.shadcn.com/docs/components/${slug}`
}
