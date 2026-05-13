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
  SHADCN_DOC_BRAND_PREVIEW_SLUGS,
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
import { useShadcnDocsRegistry } from '../registry'

export function ShadcnComponentDocPage() {
  const { slug } = useParams<{ slug: string }>()
  const [previewBrand, setPreviewBrand] = useState<DocsBrandId>(() => readStoredDocsBrand())
  const {
    isShadcnUiSlug,
    formatShadcnComponentName,
    getShadcnDocsUrl,
    getShadcnExamples,
    getShadcnComponentMeta,
    getShadcnComponentProps,
  } = useShadcnDocsRegistry()

  if (!slug || !isShadcnUiSlug(slug)) {
    return (
      <div className="p-10">
        <p className="text-neutral-600 dark:text-neutral-400">Component not found.</p>
        <Link to="/docs/components/accordion" className="docs-link mt-2 inline-block text-sm font-medium">
          Browse components
        </Link>
      </div>
    )
  }

  const name = formatShadcnComponentName(slug)
  const importExample =
    slug === 'branding'
      ? `import { Branding } from "@chg-ds/unified-design-system"\nimport "@chg-ds/unified-design-system/styles.css"`
      : `import { /* … */ } from "@chg-ds/unified-design-system"\nimport "@chg-ds/unified-design-system/styles.css"`
  const docsUrl = getShadcnDocsUrl(slug)
  const examples = getShadcnExamples(slug)
  const meta = getShadcnComponentMeta(slug)
  const isBranding = slug === 'branding'
  const isMedallion = slug === 'medallion'
  const isDotStatus = slug === 'dot-status'
  const isText = slug === 'text'
  const showPreviewBrand = Boolean(slug && SHADCN_DOC_BRAND_PREVIEW_SLUGS.has(slug))

  function getSectionDescription(title: string, explicitDescription: string | undefined, index: number) {
    if (explicitDescription) return explicitDescription
    if (examples.length === 1) {
      return `This live demo shows the core ${name} composition and the minimum structure you need to wire it into an application flow.`
    }

    return `Execution ${index + 1} focuses on ${title.toLowerCase()} so you can compare its structure and behavior against the other ${name} patterns on this page.`
  }

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
                    <Link to="/docs/components/accordion">Components</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-8">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{name}</h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/90">{meta.summary}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 [&_code]:rounded-md [&_code]:bg-white/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-white/95 [&_code]:dark:bg-white/20">
                {isBranding ? (
                  <>
                    Design-system branding (wordmarks and marks from Figma). Source:{' '}
                    <code>src/components/ui/{slug}.tsx</code> — vector assets live under <code>public/branding/svg/</code>.
                  </>
                ) : isMedallion ? (
                  <>
                    Custom UDS component: choose <code>tone=&quot;pastel&quot;</code> (default) or{' '}
                    <code>tone=&quot;solid&quot;</code>. Palettes are <code>MEDALLION_PASTEL_PALETTE</code> and{' '}
                    <code>MEDALLION_SOLID_PALETTE</code>; the root sets <code>data-tone</code>. Source:{' '}
                    <code>src/components/ui/{slug}.tsx</code> and <code>medallion-palette.ts</code>.
                  </>
                ) : isDotStatus ? (
                  <>
                    Small circular status indicator using UDS accent tokens, with optional outline ring. Use beside
                    labels, list rows, or tabs for availability and severity cues. Source:{' '}
                    <code>src/components/ui/{slug}.tsx</code>.
                  </>
                ) : (
                  <>
                    This package implementation wraps the underlying primitive with UDS tokens and exports. Source:{' '}
                    <code>src/components/ui/{slug}.tsx</code>.
                  </>
                )}
              </p>
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
              selectId={`docs-component-preview-brand-${slug}`}
              className="mt-0"
            />
          </div>
        ) : null}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Import</h2>
          {isBranding ? (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Import from <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">@chg-ds/unified-design-system</code>
              ; bundled SVG wordmarks and marks live under{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">public/branding/svg/</code> in the package.
            </p>
          ) : null}
          <CodePanel code={importExample} label="Module path" language="typescript" />
        </section>

        {showPreviewBrand ? (
          <div
            data-brand={previewBrand}
            className={cn('min-w-0 space-y-16', docsPreviewBrandScopeClassName(previewBrand))}
            style={DOCS_COMPONENT_PREVIEW_THEME_VARS}
          >
            {examples.map((section, index) => (
              <section key={section.id} className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                    Example {index + 1}
                  </p>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{section.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {getSectionDescription(section.title, section.description, index)}
                  </p>
                </div>
                {section.preview}
                <CodePanel code={section.code} label="Example (JSX)" />
              </section>
            ))}
          </div>
        ) : (
          examples.map((section, index) => (
            <section key={section.id} className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                  Example {index + 1}
                </p>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{section.title}</h2>
                <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {getSectionDescription(section.title, section.description, index)}
                </p>
              </div>
              {section.preview}
              <CodePanel code={section.code} label="Example (JSX)" />
            </section>
          ))
        )}
        </div>

        <section className={cn(docPageHeroColumnNarrowClassName, 'border-t border-neutral-200 pt-12 dark:border-neutral-800')}>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Props</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {isBranding || isMedallion || isDotStatus ? (
            <>
              Primary API surface for this module. The last row notes forwarding to the root{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
                {isDotStatus ? 'span' : 'div'}
              </code>{' '}
              — open{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
                src/components/ui/{slug}.tsx
              </code>{' '}
              for exact typings.
            </>
          ) : isText ? (
            <>
              Typography groups are <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">body</code>,{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">heading</code>, and{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">display</code>. Pair each group with a{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">size</code> step and optional{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">lineHeight</code> preset from the{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">--uds-type-*</code> tokens. See{' '}
              <Link to="/docs/foundations/typography" className="docs-link font-medium underline-offset-2">
                Typography foundations
              </Link>{' '}
              for the underlying scale.
            </>
          ) : (
            <>
              Primary API surface for this module. The last row notes forwarding to the underlying DOM, Radix, or
              third-party types—open{' '}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
                src/components/ui/{slug}.tsx
              </code>{' '}
              for exact typings. Cross-check the{' '}
              <a
                href={docsUrl}
                className="docs-link font-medium underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                official shadcn docs
              </a>{' '}
              for edge cases.
            </>
          )}
        </p>
        <div className="mt-6">
          <PropsTable props={getShadcnComponentProps(slug)} variant="component" />
        </div>
        </section>
      </div>
    </article>
  )
}
