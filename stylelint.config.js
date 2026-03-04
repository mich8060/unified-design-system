export default {
  extends: ["stylelint-config-recommended-scss"],
  ignoreFiles: [
    "dist/**",
    "storybook-static/**",
    "node_modules/**",
    ".consumer-perf/**"
  ],
  rules: {
    "block-no-empty": null,
    "color-no-hex": null,
    "declaration-block-no-duplicate-properties": null,
    "declaration-block-no-duplicate-custom-properties": null,
    "max-nesting-depth": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "scss/load-no-partial-leading-underscore": null,
    "selector-class-pattern": null
  },
  overrides: [
    {
      files: [
        "src/design-system/components/**/*.scss",
        "src/app-shell/**/*.scss",
        "src/styles/**/*.scss"
      ],
      rules: {
        "color-no-hex": true,
        "max-nesting-depth": 3
      }
    }
  ]
};
