/**
 * Documentation version selector (sidebar). Values should match installed
 * `@chg-ds/unified-design-system` versions consumers run; extend the list when
 * multiple hosted doc sets exist.
 */

import { getDocsVersionManifest } from './versions/manifest'
import type { DocsVersionId } from './versions/types'

export type { DocsVersionId } from './versions/types'

export const DOCS_VERSION_STORAGE_KEY = 'docs-site-data-version'

/** Semver for the package this documentation build documents (Vite-injected). */
export const DOCS_SITE_PACKAGE_VERSION: string = __DOCS_VERSION__

export const DOCS_VERSION_OPTIONS: { value: DocsVersionId; label: string }[] = getDocsVersionManifest().versions.map(
  (entry) => ({
    value: entry.id,
    label: entry.label,
  }),
)

export function readStoredDocsVersion(): DocsVersionId {
  const manifest = getDocsVersionManifest()
  if (typeof window === 'undefined') return manifest.defaultVersion
  try {
    const raw = window.localStorage.getItem(DOCS_VERSION_STORAGE_KEY)
    if (raw && manifest.versions.some((entry) => entry.id === raw)) return raw
  } catch {
    /* private mode */
  }
  return manifest.defaultVersion
}

export function persistDocsVersion(id: DocsVersionId) {
  const manifest = getDocsVersionManifest()
  const resolved = manifest.versions.some((entry) => entry.id === id) ? id : manifest.defaultVersion
  try {
    window.localStorage.setItem(DOCS_VERSION_STORAGE_KEY, resolved)
  } catch {
    /* ignore */
  }
}
