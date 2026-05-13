import { CATALOG_META } from './catalog-meta'
import { getCustomSections } from './sections/custom-sections'
import { useDocsVersionBundle } from './versions/context'
import type { CatalogEntry, DocSection } from './types'

const bySlug = Object.fromEntries(CATALOG_META.map((entry) => [entry.slug, entry])) as Record<string, CatalogEntry>

/** Legacy static registry for non-versioned docs chrome (e.g. DocShell). */
export function getAllComponents(): CatalogEntry[] {
  return [...CATALOG_META].sort((a, b) => a.name.localeCompare(b.name, 'en'))
}

export function getCatalogEntry(slug: string): CatalogEntry | undefined {
  return bySlug[slug]
}

export function resolveSections(entry: CatalogEntry): DocSection[] {
  const custom = getCustomSections(entry.slug)
  if (custom && custom.length > 0) return custom

  const stubCode = `<div className="rounded-[4px] border border-neutral-200 p-6 text-sm text-neutral-600 dark:border-neutral-700">
  {/* ${entry.name}: add JSX preview + UDS-first classes. See ai/uds-contract.json. */}
</div>`

  return [
    {
      id: 'preview',
      title: 'Preview placeholder',
      description:
        'Add a matching example in src/docs/sections/custom-sections.tsx for this utility category.',
      code: stubCode,
      preview: (
        <div className="rounded-[4px] border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">{entry.name}</p>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Use the UDS contract and recipe examples instead of inventing parallel placeholder chrome.
          </p>
        </div>
      ),
    },
  ]
}

export function useDocsRegistry() {
  const bundle = useDocsVersionBundle()
  return {
    getAllComponents: bundle.getAllComponents,
    getCatalogEntry: bundle.getCatalogEntry,
    resolveSections: bundle.resolveSections,
  }
}

export function useGetCatalogEntry(slug: string | undefined): CatalogEntry | undefined {
  const bundle = useDocsVersionBundle()
  return slug ? bundle.getCatalogEntry(slug) : undefined
}

export function useResolveSections(entry: CatalogEntry): DocSection[] {
  const bundle = useDocsVersionBundle()
  return bundle.resolveSections(entry)
}

export function useShadcnDocsRegistry() {
  const bundle = useDocsVersionBundle()
  return {
    getAllShadcnUiComponents: bundle.getAllShadcnUiComponents,
    isShadcnUiSlug: bundle.isShadcnUiSlug,
    getShadcnComponentMeta: bundle.getShadcnComponentMeta,
    getShadcnComponentProps: bundle.getShadcnComponentProps,
    getShadcnExamples: bundle.getShadcnExamples,
    formatShadcnComponentName: bundle.formatShadcnComponentName,
    getShadcnDocsUrl: bundle.getShadcnDocsUrl,
  }
}
