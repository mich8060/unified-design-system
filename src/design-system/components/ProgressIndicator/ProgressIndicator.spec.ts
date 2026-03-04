export const ProgressIndicatorSpec = {
  allowedVariants: {
  "labelPosition": [
    "false",
    "right",
    "bottom",
    "top-floating",
    "bottom-floating"
  ],
  "variant": [
    "default",
    "blue",
    "green",
    "success",
    "orange",
    "warning",
    "red",
    "error",
    "purple"
  ],
  "size": [
    "small",
    "medium",
    "large"
  ]
},
  defaults: {
  "labelPosition": "false",
  "variant": "default",
  "size": "medium"
}
} as const;
