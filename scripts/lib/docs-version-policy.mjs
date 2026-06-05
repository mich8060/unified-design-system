/**
 * Docs snapshot policy: new frozen documentation versions only on minor/major package bumps.
 * Patch releases reuse the latest snapshot for the current major.minor line.
 */

/** @param {string} version */
export function parseSemver(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) {
    throw new Error(`Invalid semver: ${version}`)
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  }
}

/**
 * @param {string | undefined} fromVersion highest existing snapshot (undefined if none)
 * @param {string} toVersion package.json version
 * @returns {'initial' | 'major' | 'minor' | 'patch' | 'same' | 'prerelease'}
 */
export function semverBumpKind(fromVersion, toVersion) {
  const to = parseSemver(toVersion)
  if (!fromVersion) return 'initial'

  const from = parseSemver(fromVersion)
  if (to.major !== from.major) return to.major > from.major ? 'major' : 'prerelease'
  if (to.minor !== from.minor) return to.minor > from.minor ? 'minor' : 'prerelease'
  if (to.patch !== from.patch) return to.patch > from.patch ? 'patch' : 'prerelease'
  return 'same'
}

/**
 * @param {{
 *   packageVersion: string
 *   latestSnapshotVersion?: string
 *   snapshotExists: boolean
 *   force?: boolean
 * }} options
 */
export function shouldMaterializeDocsSnapshot({
  packageVersion,
  latestSnapshotVersion,
  snapshotExists,
  force = false,
}) {
  if (force) {
    return { write: true, reason: 'forced' }
  }

  if (snapshotExists) {
    return { write: true, reason: 'refresh-existing' }
  }

  const bump = semverBumpKind(latestSnapshotVersion, packageVersion)
  if (bump === 'initial' || bump === 'major' || bump === 'minor') {
    return { write: true, reason: bump }
  }

  if (bump === 'patch') {
    return { write: false, reason: 'patch-skip' }
  }

  return { write: false, reason: bump }
}

function compareSemverDesc(a, b) {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  if (pa.major !== pb.major) return pb.major - pa.major
  if (pa.minor !== pb.minor) return pb.minor - pa.minor
  return pb.patch - pa.patch
}

/** True when major or minor segment differs (not a patch-only sibling). */
export function isDifferentMinorOrMajorLine(a, b) {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  return pa.major !== pb.major || pa.minor !== pb.minor
}

/**
 * Sidebar history: keep the newest snapshot and at most one older minor/major line.
 * Patch-only folders are dropped so the selector never lists 1.0.1, 1.0.2, …
 *
 * @param {string[]} snapshotVersions semver dirs on disk, any order
 */
export function computeRetainedSnapshotVersions(snapshotVersions) {
  const sorted = [...snapshotVersions].sort(compareSemverDesc)
  if (sorted.length <= 1) return sorted

  const newest = sorted[0]
  const previousLine = sorted.find((version) => isDifferentMinorOrMajorLine(version, newest))
  return previousLine ? [newest, previousLine] : [newest]
}

/** Show docs version UI only when two minor/major lines are archived. */
export function shouldShowDocsVersionSelector(retainedVersions) {
  return retainedVersions.length >= 2
}
