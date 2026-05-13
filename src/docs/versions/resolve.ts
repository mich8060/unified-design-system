import { readStoredDocsVersion } from '../doc-site-version'
import { docsVersionBundleLoaders } from './resolve-loaders.generated'
import { getDocsVersionManifest } from './manifest'
import type { DocsVersionBundle, DocsVersionId } from './types'

const bundleCache = new Map<DocsVersionId, DocsVersionBundle>()

function assertManifestMatchesLoaders() {
  const manifest = getDocsVersionManifest()
  for (const entry of manifest.versions) {
    if (!docsVersionBundleLoaders[entry.id]) {
      throw new Error(`Missing docs version bundle loader for "${entry.id}".`)
    }
  }
}

assertManifestMatchesLoaders()

export function resolveDocsVersionId(id: string | null | undefined): DocsVersionId {
  const manifest = getDocsVersionManifest()
  if (id && manifest.versions.some((entry) => entry.id === id)) return id
  return manifest.defaultVersion
}

export function resolveStoredDocsVersionId(): DocsVersionId {
  return resolveDocsVersionId(readStoredDocsVersion())
}

export async function loadDocsVersionBundle(id: DocsVersionId): Promise<DocsVersionBundle> {
  const resolved = resolveDocsVersionId(id)
  const cached = bundleCache.get(resolved)
  if (cached) return cached

  const loader = docsVersionBundleLoaders[resolved]
  if (!loader) {
    throw new Error(`No docs version bundle registered for "${resolved}".`)
  }

  const module = await loader()
  bundleCache.set(resolved, module.default)
  return module.default
}

export async function prefetchDefaultDocsVersionBundle(): Promise<DocsVersionBundle> {
  return loadDocsVersionBundle(getDocsVersionManifest().defaultVersion)
}

export function validateDocsVersionManifestForTests(): void {
  assertManifestMatchesLoaders()
  const manifest = getDocsVersionManifest()
  if (!manifest.defaultVersion) {
    throw new Error('Docs version manifest is missing defaultVersion.')
  }
  if (!manifest.versions.some((entry) => entry.id === manifest.defaultVersion)) {
    throw new Error('Docs version manifest defaultVersion must exist in versions.')
  }
}
