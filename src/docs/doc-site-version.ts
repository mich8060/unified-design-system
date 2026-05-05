/**
 * Documentation version selector (sidebar). Values should match installed
 * `@chg-ds/unified-design-system` versions consumers run; extend the list when
 * multiple hosted doc sets exist.
 */

export type DocsVersionId = string

export const DOCS_VERSION_STORAGE_KEY = 'docs-site-data-version'

/** Semver for the package this documentation build documents (Vite-injected). */
export const DOCS_SITE_PACKAGE_VERSION: string = __DOCS_VERSION__

export const DOCS_VERSION_OPTIONS: { value: DocsVersionId; label: string }[] = [
  { value: DOCS_SITE_PACKAGE_VERSION, label: `Documentation - v${DOCS_SITE_PACKAGE_VERSION}` },
]

export function readStoredDocsVersion(): DocsVersionId {
  if (typeof window === 'undefined') return DOCS_SITE_PACKAGE_VERSION
  try {
    const raw = window.localStorage.getItem(DOCS_VERSION_STORAGE_KEY)
    if (raw && DOCS_VERSION_OPTIONS.some((o) => o.value === raw)) return raw
  } catch {
    /* private mode */
  }
  return DOCS_SITE_PACKAGE_VERSION
}

export function persistDocsVersion(id: DocsVersionId) {
  try {
    window.localStorage.setItem(DOCS_VERSION_STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}
