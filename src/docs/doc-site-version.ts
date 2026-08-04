/**
 * Docs version helpers. Only the latest frozen snapshot is retained
 * (see docs/docs-version-snapshots.md). There is no sidebar version switcher.
 * `DOCS_SITE_PACKAGE_VERSION` is always the current package.json version.
 */

import { getDocsVersionManifest, shouldShowDocsVersionSelector } from './versions/manifest'
import type { DocsVersionId } from './versions/types'

export type { DocsVersionId } from './versions/types'

export const DOCS_VERSION_STORAGE_KEY = 'docs-site-data-version'

/** Semver for the package this documentation build documents (Vite-injected). */
export const DOCS_SITE_PACKAGE_VERSION: string = __DOCS_VERSION__

export { shouldShowDocsVersionSelector }

export const DOCS_VERSION_OPTIONS: { value: DocsVersionId; label: string }[] = getDocsVersionManifest().versions.map(
  (entry) => ({
    value: entry.id,
    label: entry.label,
  }),
)

/** Latest (and only retained) documentation snapshot. */
export function getDocsSiteDefaultVersion(): DocsVersionId {
  const manifest = getDocsVersionManifest()
  const latest = manifest.versions[0]?.id
  if (latest && manifest.versions.some((entry) => entry.id === latest)) {
    return latest
  }
  return manifest.defaultVersion
}

/** Docs site always opens on the latest retained snapshot. */
export function readStoredDocsVersion(): DocsVersionId {
  return getDocsSiteDefaultVersion()
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
