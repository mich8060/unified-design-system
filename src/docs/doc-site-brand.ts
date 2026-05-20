import type { BrandingAppearance } from '@/components/ui/branding'
import {
  applyUdsBrandToDocument,
  persistBrandToStorage,
  readBrandFromStorage,
  UDS_BRAND_OPTIONS,
  udsBrandToBrandingAppearance,
  type UdsBrandId,
} from '@/lib/uds-brand'

/** Values that match `[data-brand=…]` selectors in `uds-tokens.css`. */
export type DocsBrandId = UdsBrandId

/** Docs app baseline when no brand is stored. */
export const DOCS_SITE_DEFAULT_BRAND: DocsBrandId = 'chg'

export const DOCS_BRAND_OPTIONS = UDS_BRAND_OPTIONS

export const DOCS_BRAND_STORAGE_KEY = 'docs-site-data-brand'

/** Introduction page only: brand for `WelcomeCardPreview` strips (not global `document`). */
export const INTRO_PREVIEW_BRAND_STORAGE_KEY = 'docs-intro-preview-brand'

/** Site chrome always uses the docs default brand (no menu brand switcher). */
export function readStoredDocsBrand(): DocsBrandId {
  return DOCS_SITE_DEFAULT_BRAND
}

export function persistDocsBrand(id: DocsBrandId) {
  persistBrandToStorage(DOCS_BRAND_STORAGE_KEY, id)
}

export function readStoredIntroPreviewBrand(): DocsBrandId {
  return readBrandFromStorage(INTRO_PREVIEW_BRAND_STORAGE_KEY, DOCS_SITE_DEFAULT_BRAND)
}

export function persistIntroPreviewBrand(id: DocsBrandId) {
  persistBrandToStorage(INTRO_PREVIEW_BRAND_STORAGE_KEY, id)
}

export function applyDocsBrandToDocument(id: DocsBrandId) {
  applyUdsBrandToDocument(id)
}

export function docsBrandToBrandingAppearance(id: DocsBrandId): BrandingAppearance {
  return udsBrandToBrandingAppearance(id)
}
