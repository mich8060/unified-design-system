export const LayoutRules = {
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
      "--uds-spacing-80"
    ],
    defaultToken: "--uds-spacing-16",
  },
  actionPlacement: {
    primaryActionPosition: "end",
    maxPrimaryActionsPerSection: 1,
  },
  disallowedNesting: [
    { parent: "Modal", child: "Modal" },
    { parent: "Button", child: "Button" },
    { parent: "Table", child: "Table" },
  ]
} as const;
