import assert from 'node:assert/strict'
import test from 'node:test'
import {
  computeRetainedSnapshotVersions,
  semverBumpKind,
  shouldMaterializeDocsSnapshot,
  shouldShowDocsVersionSelector,
} from './docs-version-policy.mjs'

test('semverBumpKind', () => {
  assert.equal(semverBumpKind(undefined, '1.0.0'), 'initial')
  assert.equal(semverBumpKind('1.0.5', '1.0.6'), 'patch')
  assert.equal(semverBumpKind('1.0.5', '1.1.0'), 'minor')
  assert.equal(semverBumpKind('1.0.5', '2.0.0'), 'major')
  assert.equal(semverBumpKind('1.0.5', '1.0.5'), 'same')
})

test('shouldMaterializeDocsSnapshot skips patch', () => {
  const result = shouldMaterializeDocsSnapshot({
    packageVersion: '1.0.6',
    latestSnapshotVersion: '1.0.5',
    snapshotExists: false,
  })
  assert.equal(result.write, false)
  assert.equal(result.reason, 'patch-skip')
})

test('shouldMaterializeDocsSnapshot allows minor', () => {
  const result = shouldMaterializeDocsSnapshot({
    packageVersion: '1.1.0',
    latestSnapshotVersion: '1.0.5',
    snapshotExists: false,
  })
  assert.equal(result.write, true)
  assert.equal(result.reason, 'minor')
})

test('shouldMaterializeDocsSnapshot refreshes existing', () => {
  const result = shouldMaterializeDocsSnapshot({
    packageVersion: '1.0.5',
    latestSnapshotVersion: '1.0.5',
    snapshotExists: true,
  })
  assert.equal(result.write, true)
  assert.equal(result.reason, 'refresh-existing')
})

test('computeRetainedSnapshotVersions keeps only newest', () => {
  assert.deepEqual(computeRetainedSnapshotVersions(['1.0.5', '1.0.4', '1.0.3']), ['1.0.5'])
  assert.deepEqual(computeRetainedSnapshotVersions(['1.1.0', '1.0.5', '1.0.4']), ['1.1.0'])
  assert.deepEqual(computeRetainedSnapshotVersions(['2.0.0', '1.1.0']), ['2.0.0'])
})

test('shouldShowDocsVersionSelector always false', () => {
  assert.equal(shouldShowDocsVersionSelector(['1.0.5']), false)
  assert.equal(shouldShowDocsVersionSelector(['1.1.0', '1.0.5']), false)
})
