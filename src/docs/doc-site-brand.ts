import type { BrandingAppearance } from '@chg-ds/unified-design-system'

/** Values that match `[data-brand=…]` selectors in `uds-tokens.css`. */

export type DocsBrandId =
  | 'default'
  | 'comphealth'
  | 'weatherby'
  | 'connect'
  | 'locumsmart'
  | 'wireframe'
  | 'modio'
  | 'gms'
  | 'chg'

export const DOCS_BRAND_OPTIONS: { value: DocsBrandId; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'comphealth', label: 'CompHealth' },
  { value: 'weatherby', label: 'Weatherby' },
  { value: 'connect', label: 'Connect' },
  { value: 'locumsmart', label: 'Locumsmart' },
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'modio', label: 'Modio' },
  { value: 'gms', label: 'GMS' },
  { value: 'chg', label: 'CHG' },
]

export const DOCS_BRAND_STORAGE_KEY = 'docs-site-data-brand'

/** Introduction page only: brand for `WelcomeCardPreview` strips (not global `document`). */
export const INTRO_PREVIEW_BRAND_STORAGE_KEY = 'docs-intro-preview-brand'

export function readStoredDocsBrand(): DocsBrandId {
  if (typeof window === 'undefined') return 'default'
  try {
    const raw = window.localStorage.getItem(DOCS_BRAND_STORAGE_KEY)
    if (raw && DOCS_BRAND_OPTIONS.some((o) => o.value === raw)) return raw as DocsBrandId
  } catch {
    // private mode / denied
  }
  return 'default'
}

export function persistDocsBrand(id: DocsBrandId) {
  try {
    window.localStorage.setItem(DOCS_BRAND_STORAGE_KEY, id)
  } catch {
    // ignore
  }
}

export function readStoredIntroPreviewBrand(): DocsBrandId {
  if (typeof window === 'undefined') return 'default'
  try {
    const raw = window.localStorage.getItem(INTRO_PREVIEW_BRAND_STORAGE_KEY)
    if (raw && DOCS_BRAND_OPTIONS.some((o) => o.value === raw)) return raw as DocsBrandId
  } catch {
    // private mode / denied
  }
  return 'default'
}

export function persistIntroPreviewBrand(id: DocsBrandId) {
  try {
    window.localStorage.setItem(INTRO_PREVIEW_BRAND_STORAGE_KEY, id)
  } catch {
    // ignore
  }
}

export function applyDocsBrandToDocument(id: DocsBrandId) {
  document.documentElement.dataset.brand = id
}

/** Maps CSS token brand to the nearest `Branding` SVG row (GMS uses the unified mark; CHG uses Wireframe SVGs via `appearance="CHG"`). */
export function docsBrandToBrandingAppearance(id: DocsBrandId): BrandingAppearance {
  const map = {
    default: 'Design System',
    comphealth: 'MyCompHealth',
    weatherby: 'MyWeatherby',
    connect: 'Connect',
    locumsmart: 'Locumsmart',
    wireframe: 'Wireframe',
    modio: 'Modio',
    gms: 'Design System',
    chg: 'CHG',
  } as const satisfies Record<DocsBrandId, BrandingAppearance>
  return map[id]
}
