import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Text,
  cn,
} from '@chghealthcare/unified-design-system'
import {
  DOCS_COMPONENT_PREVIEW_THEME_VARS,
  DocsComponentPreviewBrandToolbar,
  docsPreviewBrandScopeClassName,
  SHADCN_DOC_BRAND_PREVIEW_SLUGS,
} from '../components/DocsComponentPreviewBrandToolbar'
import { CodePanel } from '../components/CodePanel'
import {
  DocsExampleStage,
  DocsPageSection,
  DocsPageShell,
} from '../components/DocsPageShell'
import { PropsTable } from '../components/PropsTable'
import { persistDocsBrand, readStoredDocsPreviewBrand, type DocsBrandId } from '../doc-site-brand'
import { useShadcnDocsRegistry } from '../registry'

export function ShadcnComponentDocPage() {
  const { slug } = useParams<{ slug: string }>()
  const { pathname } = useLocation()
  const [previewBrand, setPreviewBrand] = useState<DocsBrandId>(() => readStoredDocsPreviewBrand())
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
      ? `import { Branding } from "@chghealthcare/unified-design-system"\nimport "@chghealthcare/unified-design-system/styles.css"`
      : `import { /* … */ } from "@chghealthcare/unified-design-system"\nimport "@chghealthcare/unified-design-system/styles.css"`
  const docsUrl = getShadcnDocsUrl(slug)
  const examples = getShadcnExamples(slug)
  const meta = getShadcnComponentMeta(slug)
  const isBranding = slug === 'branding'
  const isMedallion = slug === 'medallion'
  const isDotStatus = slug === 'dot-status'
  const isText = slug === 'text'
  const showPreviewBrand = Boolean(slug && SHADCN_DOC_BRAND_PREVIEW_SLUGS.has(slug))
  const isSectionsRoute = pathname.includes('/docs/sections/')
  const catalogLabel = isSectionsRoute ? 'Sections' : 'Components'
  const catalogHref = isSectionsRoute ? '/docs/sections/menu' : '/docs/components/accordion'

  function setPreviewBrandAndPersist(id: DocsBrandId) {
    setPreviewBrand(id)
    persistDocsBrand(id)
  }

  function getSectionDescription(title: string, explicitDescription: string | undefined, index: number) {
    if (explicitDescription) return explicitDescription
    if (examples.length === 1) {
      return `This live demo shows the core ${name} composition and the minimum structure you need to wire it into an application flow.`
    }

    return `Execution ${index + 1} focuses on ${title.toLowerCase()} so you can compare its structure and behavior against the other ${name} patterns on this page.`
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
            <Link to={catalogHref}>{catalogLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  const sourceNote = (() => {
    if (isBranding) {
      return (
        <>
          Design-system branding (wordmarks and marks from Figma). Source:{' '}
          <code>src/components/ui/{slug}.tsx</code> — vector assets live under <code>src/assets/branding/svg/</code>.
        </>
      )
    }
    if (isMedallion) {
      return (
        <>
          Custom UDS component: choose <code>tone=&quot;pastel&quot;</code> (default) or{' '}
          <code>tone=&quot;solid&quot;</code>. Palettes are <code>MEDALLION_PASTEL_PALETTE</code> and{' '}
          <code>MEDALLION_SOLID_PALETTE</code>; the root sets <code>data-tone</code>. Source:{' '}
          <code>src/components/ui/{slug}.tsx</code> and <code>medallion-palette.ts</code>.
        </>
      )
    }
    if (isDotStatus) {
      return (
        <>
          Small circular status indicator using UDS accent tokens, with optional outline ring. Use beside labels,
          list rows, or tabs for availability and severity cues. Source: <code>src/components/ui/{slug}.tsx</code>.
        </>
      )
    }
    return (
      <>
        This package implementation wraps the underlying primitive with UDS tokens and exports. Source:{' '}
        <code>src/components/ui/{slug}.tsx</code>.
      </>
    )
  })()

  const propsIntro = (() => {
    if (isBranding || isMedallion || isDotStatus) {
      return (
        <>
          Primary API surface for this module. The last row notes forwarding to the root{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">
            {isDotStatus ? 'span' : 'div'}
          </code>{' '}
          — open{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">src/components/ui/{slug}.tsx</code> for
          exact typings.
        </>
      )
    }
    if (isText) {
      return (
        <>
          Typography groups are <code className="rounded bg-[var(--uds-surface-secondary)] px-1">body</code>,{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">heading</code>, and{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">display</code>. Pair each group with a{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">size</code> step and optional{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">lineHeight</code> preset from the{' '}
          <code className="rounded bg-[var(--uds-surface-secondary)] px-1">--uds-type-*</code> tokens. See{' '}
          <Link to="/docs/foundations/typography" className="docs-link font-medium underline-offset-2">
            Typography foundations
          </Link>{' '}
          for the underlying scale.
        </>
      )
    }
    return (
      <>
        Primary API surface for this module. The last row notes forwarding to the underlying DOM, Radix, or
        third-party types—open{' '}
        <code className="rounded bg-[var(--uds-surface-secondary)] px-1">src/components/ui/{slug}.tsx</code> for
        exact typings. Cross-check the{' '}
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
    )
  })()

  const exampleSections = (wrapperClassName?: string) => {
    const items = examples.map((section, index) => (
      <DocsPageSection
        key={section.id}
        title={section.title}
        description={getSectionDescription(section.title, section.description, index)}
      >
        <DocsExampleStage data-docs-example={section.id}>
          {section.previewInner ?? section.preview}
        </DocsExampleStage>
        <CodePanel code={section.code} label="Example (JSX)" />
      </DocsPageSection>
    ))

    if (!showPreviewBrand) return items

    return (
      <div
        data-docs-preview-brand
        data-brand={previewBrand}
        className={cn(
          'docs-preview-brand-scope flex min-w-0 flex-col gap-[length:calc(var(--uds-spacing-48)+var(--uds-spacing-24))]',
          wrapperClassName,
          docsPreviewBrandScopeClassName(previewBrand),
        )}
        style={DOCS_COMPONENT_PREVIEW_THEME_VARS}
      >
        {items}
      </div>
    )
  }

  return (
    <DocsPageShell
      eyebrow={catalogLabel}
      title={name}
      description={meta.summary}
      breadcrumb={breadcrumb}
    >
      <Text
        variant="body"
        size="14"
        appearance="secondary"
        className="m-0 [&_code]:rounded-[length:var(--uds-radius-4)] [&_code]:bg-[var(--uds-surface-secondary)] [&_code]:px-1.5 [&_code]:py-0.5"
      >
        {sourceNote}
      </Text>

      {showPreviewBrand ? (
        <div className="not-prose border-b border-uds-border-primary pb-[length:var(--uds-spacing-24)]">
          <DocsComponentPreviewBrandToolbar
            brand={previewBrand}
            onBrandChange={setPreviewBrandAndPersist}
            selectId={`docs-component-preview-brand-${slug}`}
            className="mt-0"
          />
        </div>
      ) : null}

      <DocsPageSection
        title="Import"
        description={
          isBranding
            ? 'Import from @chghealthcare/unified-design-system; bundled SVG wordmarks and marks live under src/assets/branding/svg/ (emitted into dist).'
            : undefined
        }
      >
        <CodePanel code={importExample} label="Module path" language="typescript" />
      </DocsPageSection>

      {exampleSections()}

      <DocsPageSection title="Props" description={propsIntro}>
        <PropsTable props={getShadcnComponentProps(slug)} variant="component" />
      </DocsPageSection>
    </DocsPageShell>
  )
}
