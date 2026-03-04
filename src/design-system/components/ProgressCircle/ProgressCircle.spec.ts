export const ProgressCircleSpec = {
  allowedVariants: {
  "shape": [
    "circle",
    "half-circle"
  ],
  "size": [
    "xxs",
    "xs",
    "sm",
    "md",
    "lg"
  ]
},
  defaults: {
  "shape": "circle",
  "size": "md"
}
} as const;
