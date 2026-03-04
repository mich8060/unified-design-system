import type { LayoutManifestRules } from "./types";
import { CompositionRules } from "./composition.manifest.ts";

export const LayoutRules: LayoutManifestRules = {
  spacingSystem: {
    unit: 4,
    allowedTokens: [
      "--uds-spacing-0",
      "--uds-spacing-2",
      "--uds-spacing-4",
      "--uds-spacing-6",
      "--uds-spacing-8",
      "--uds-spacing-10",
      "--uds-spacing-12",
      "--uds-spacing-14",
      "--uds-spacing-16",
      "--uds-spacing-18",
      "--uds-spacing-24",
      "--uds-spacing-32",
      "--uds-spacing-36",
      "--uds-spacing-40",
      "--uds-spacing-48",
      "--uds-spacing-64",
      "--uds-spacing-80",
    ],
    defaultToken: "--uds-spacing-16",
  },
  verticalRhythm: {
    sectionGapToken: "--uds-spacing-24",
    contentGapToken: "--uds-spacing-16",
    compactGapToken: "--uds-spacing-8",
  },
  allowedComposition: CompositionRules.allowedChildrenByParent,
  allowedParents: CompositionRules.allowedParentsByChild,
  disallowedNesting: CompositionRules.disallowedPairs.map(({ parent, child }) => ({ parent, child })),
  maxWidth: {
    content: "1280px",
    form: "640px",
    dialog: "720px",
  },
  actionPlacement: {
    primaryActionPosition: "end",
    secondaryActionPosition: "start",
    maxPrimaryActionsPerSection: 1,
  },
};
