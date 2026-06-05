import { getDocsVersionManifest } from './manifest'
import {
  loadDocsVersionBundle,
  resolveDocsVersionId,
  validateDocsVersionManifestForTests,
} from './resolve'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

validateDocsVersionManifestForTests()

const manifest = getDocsVersionManifest()
assert(resolveDocsVersionId(null) === manifest.defaultVersion, 'null should fall back to default version')
assert(resolveDocsVersionId('not-a-version') === manifest.defaultVersion, 'invalid id should fall back to default version')

for (const entry of manifest.versions) {
  assert(resolveDocsVersionId(entry.id) === entry.id, `expected ${entry.id} to resolve to itself`)
}

for (const entry of manifest.versions) {
  const bundle = await loadDocsVersionBundle(entry.id)
  assert(bundle.id === entry.id, `bundle id should match manifest entry ${entry.id}`)
  assert(bundle.catalog.length > 0, `bundle ${entry.id} should include catalog entries`)
  assert(bundle.shadcnSlugs.length > 0, `bundle ${entry.id} should include component slugs`)
  assert(bundle.navigation.items.length > 0, `bundle ${entry.id} should include navigation items`)
  assert(
    bundle.navigation.navIdToRoute.introduction === '/docs/introduction',
    `bundle ${entry.id} should map introduction nav id`,
  )
}

if (manifest.versions.length >= 2) {
  const olderId = manifest.versions[manifest.versions.length - 1]?.id
  const currentBundle = await loadDocsVersionBundle(manifest.defaultVersion)
  const olderBundle = await loadDocsVersionBundle(olderId)
  assert(
    olderBundle.shadcnSlugs.length <= currentBundle.shadcnSlugs.length,
    'older minor/major snapshot should not expose more component slugs than the current snapshot',
  )
}

console.log(`docs versions smoke: ${manifest.versions.length} bundles validated`)
