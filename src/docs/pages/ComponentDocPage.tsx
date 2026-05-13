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
} from '@chg-ds/unified-design-system'
import {
  DOCS_COMPONENT_PREVIEW_THEME_VARS,
  DocsComponentPreviewBrandToolbar,
  docsPreviewBrandScopeClassName,
  FOUNDATION_DOC_BRAND_PREVIEW_SLUGS,
} from '../components/DocsComponentPreviewBrandToolbar'
import { CodePanel } from '../components/CodePanel'
import { PropsTable } from '../components/PropsTable'
import { readStoredDocsBrand, type DocsBrandId } from '../doc-site-brand'
import {
  docPageHeroBandClassName,
  docPageHeroColumnNarrowClassName,
  docPageHeroShellClassName,
  docPageHorizontalGutterClassName,
} from '../doc-page-hero-classes'
import { useDocsRegistry } from '../registry'

export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>()
  const [previewBrand, setPreviewBrand] = useState<DocsBrandId>(() => readStoredDocsBrand())
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

  return (
    <article className="w-full min-w-0 max-w-none overflow-x-hidden">
      <header className={docPageHeroBandClassName}>
        <div className={docPageHeroShellClassName}>
          <div className={cn('docs-page-hero', docPageHeroColumnNarrowClassName)}>
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

            <div className="mt-8">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{entry.name}</h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/90">{entry.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className={docPageHorizontalGutterClassName}>
        <div className={cn(docPageHeroColumnNarrowClassName, 'space-y-16 py-12')}>
        {showPreviewBrand ? (
          <div className="not-prose border-b border-neutral-200 pb-8 dark:border-neutral-800">
            <DocsComponentPreviewBrandToolbar
              brand={previewBrand}
              onBrandChange={setPreviewBrand}
              selectId={`docs-foundation-preview-brand-${slug}`}
              className="mt-0"
            />
          </div>
        ) : null}
        {showPreviewBrand ? (
          <div
            data-brand={previewBrand}
            className={cn('min-w-0 space-y-16', docsPreviewBrandScopeClassName(previewBrand))}
            style={DOCS_COMPONENT_PREVIEW_THEME_VARS}
          >
            {sections.map((section, index) => (
              <section key={section.id} className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                    Example {index + 1}
                  </p>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{section.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {section.description ??
                      `This reference example shows how the ${entry.name.toLowerCase()} utilities compose in a realistic layout block.`}
                  </p>
                </div>
                <div className="relative z-10 rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/30">
                  {section.preview}
                </div>
                <CodePanel code={section.code} label="Example (JSX + Tailwind utilities)" />
              </section>
            ))}
          </div>
        ) : (
          sections.map((section, index) => (
            <section key={section.id} className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                  Example {index + 1}
                </p>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{section.title}</h2>
                <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {section.description ??
                    `This reference example shows how the ${entry.name.toLowerCase()} utilities compose in a realistic layout block.`}
                </p>
              </div>
              <div className="relative z-10 rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/30">
                {section.preview}
              </div>
              <CodePanel code={section.code} label="Example (JSX + Tailwind utilities)" />
            </section>
          ))
        )}
        </div>

        <section className={cn(docPageHeroColumnNarrowClassName, 'border-t border-neutral-200 pt-12 dark:border-neutral-800')}>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Props</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
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
        </p>
        <div className="mt-6">
          <PropsTable props={entry.props} variant="foundations" />
        </div>
        </section>
      </div>
    </article>
  )
}
