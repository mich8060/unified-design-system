import { HouseIcon, cn } from '@chg-ds/unified-design-system'
import type { ComponentProps } from 'react'
import { CATALOG_META } from '../../catalog-meta'
import { getShadcnComponentMeta } from '../../shadcn-component-meta'
import { getShadcnComponentProps } from '../../shadcn-component-props'
import { getShadcnExamples } from '../../shadcn-examples'
import {
  SHADCN_UI_SLUGS,
  formatShadcnComponentName,
  getShadcnDocsUrl,
  type ShadcnUiSlug,
} from '../../shadcn-ui-registry'
import { getCustomSections } from '../../sections/custom-sections'
import { createDocsVersionBundle } from '../create-bundle'

function WelcomeMenuIcon(props: ComponentProps<typeof HouseIcon>) {
  const { className, ...rest } = props
  return <HouseIcon {...rest} size={32} className={cn('shrink-0', className)} />
}

const LEGACY_COMPONENT_SLUGS = SHADCN_UI_SLUGS.filter((slug) => slug !== 'token-input') as readonly ShadcnUiSlug[]

const bundle = createDocsVersionBundle({
  id: '1.0.1',
  catalog: CATALOG_META,
  shadcnSlugs: LEGACY_COMPONENT_SLUGS,
  getCustomSections,
  getShadcnComponentMeta,
  getShadcnComponentProps,
  getShadcnExamples,
  formatShadcnComponentName,
  getShadcnDocsUrl,
  welcomeMenuIcon: WelcomeMenuIcon,
})

export default bundle
