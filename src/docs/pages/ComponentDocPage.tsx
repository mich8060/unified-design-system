import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  cn,
} from '@chghealthcare/unified-design-system'
import {
  DOCS_COMPONENT_PREVIEW_THEME_VARS,
  DocsComponentPreviewBrandToolbar,
  docsPreviewBrandScopeClassName,
  FOUNDATION_DOC_BRAND_PREVIEW_SLUGS,
} from '../components/DocsComponentPreviewBrandToolbar'
import { CodePanel } from '../components/CodePanel'
import {
  DocsExampleStage,
  DocsPageSection,
  DocsPageShell,
} from '../components/DocsPageShell'
import { PropsTable } from '../components/PropsTable'
import { persistDocsBrand, readStoredDocsPreviewBrand, type DocsBrandId } from '../doc-site-brand'
import { useDocsRegistry } from '../registry'

export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>()
  const [previewBrand, setPreviewBrand] = useState<DocsBrandId>(() => readStoredDocsPreviewBrand())
  const { getCatalogEntry, resolveSections } = useDocsRegistry()
  const entry = slug ? getCatalogEntry(slug) : undefined

  if (!entry) {
    return (
      <div className="p-10">
        <p className="text-neutral-600">Foundations page not found.</p>
        <Link to="/" className="docs-link mt-2 inline-block text-sm font-medium">
          Home
        </Link>
      </div>
    )
  }

  const sections = resolveSections(entry)
  const showPreviewBrand = Boolean(slug && FOUNDATION_DOC_BRAND_PREVIEW_SLUGS.has(slug))

  function setPreviewBrandAndPersist(id: DocsBrandId) {
    setPreviewBrand(id)
    persistDocsBrand(id)
  }

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Tailwind CSS</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/docs/foundations/display">Foundations</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{entry.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  const exampleSections = sections.map((section) => (
    <DocsPageSection
      key={section.id}
      title={section.title}
      description={
        section.description ??
        `This reference example shows how the ${entry.name.toLowerCase()} utilities compose in a realistic layout block.`
      }
    >
      <DocsExampleStage>{section.preview}</DocsExampleStage>
      <CodePanel code={section.code} label="Example (JSX + Tailwind utilities)" />
    </DocsPageSection>
  ))

  return (
    <DocsPageShell
      eyebrow="Foundations"
      title={entry.name}
      description={entry.description}
      breadcrumb={breadcrumb}
    >
      {showPreviewBrand ? (
        <div className="not-prose border-b border-uds-border-primary pb-[length:var(--uds-spacing-24)]">
          <DocsComponentPreviewBrandToolbar
            brand={previewBrand}
            onBrandChange={setPreviewBrandAndPersist}
            selectId={`docs-foundation-preview-brand-${slug}`}
            className="mt-0"
          />
        </div>
      ) : null}

      {showPreviewBrand ? (
        <div
          data-docs-preview-brand
          data-brand={previewBrand}
          className={cn(
            'docs-preview-brand-scope flex min-w-0 flex-col gap-[length:calc(var(--uds-spacing-48)+var(--uds-spacing-24))]',
            docsPreviewBrandScopeClassName(previewBrand),
          )}
          style={DOCS_COMPONENT_PREVIEW_THEME_VARS}
        >
          {exampleSections}
        </div>
      ) : (
        exampleSections
      )}

      <DocsPageSection
        title="Props"
        description={
          <>
            Tailwind class tokens for this topic (class families, effects, and theme defaults). See the{' '}
            <a
              href="https://tailwindcss.com/docs"
              className="docs-link font-medium underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind CSS docs
            </a>{' '}
            for the full matrix.
          </>
        }
      >
        <PropsTable props={entry.props} variant="foundations" />
      </DocsPageSection>
    </DocsPageShell>
  )
}
