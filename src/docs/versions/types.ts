import type { ComponentType } from 'react'
import type { MenuNavigationItem } from '@chg-ds/unified-design-system'
import type { ShadcnComponentMeta } from '../shadcn-component-meta'
import type { ShadcnExampleSection } from '../shadcn-examples/types'
import type { ShadcnUiEntry, ShadcnUiSlug } from '../shadcn-ui-registry'
import type { CatalogEntry, DocSection, PropDefinition } from '../types'

export type DocsVersionId = string

export type DocsVersionManifestEntry = {
  id: DocsVersionId
  label: string
}

export type DocsVersionNavigation = {
  items: MenuNavigationItem[]
  navIdToRoute: Record<string, string>
  routeToNavId: Record<string, string>
}

export type DocsVersionBundle = {
  id: DocsVersionId
  catalog: CatalogEntry[]
  shadcnSlugs: readonly ShadcnUiSlug[]
  navigation: DocsVersionNavigation
  getAllComponents: () => CatalogEntry[]
  getCatalogEntry: (slug: string) => CatalogEntry | undefined
  resolveSections: (entry: CatalogEntry) => DocSection[]
  getCustomSections: (slug: string) => DocSection[] | undefined
  getAllShadcnUiComponents: () => ShadcnUiEntry[]
  isShadcnUiSlug: (slug: string) => slug is ShadcnUiSlug
  getShadcnComponentMeta: (slug: ShadcnUiSlug) => ShadcnComponentMeta
  getShadcnComponentProps: (slug: ShadcnUiSlug) => PropDefinition[]
  getShadcnExamples: (slug: ShadcnUiSlug) => ShadcnExampleSection[]
  formatShadcnComponentName: (slug: string) => string
  getShadcnDocsUrl: (slug: string) => string
  welcomeMenuIcon?: ComponentType<{ className?: string }>
}
