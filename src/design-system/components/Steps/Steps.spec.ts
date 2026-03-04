export const StepsSpec = {
  allowedVariants: {
  "orientation": [
    "horizontal",
    "vertical"
  ],
  "status": [
    "complete",
    "active",
    "incomplete",
    "disabled",
    "error"
  ],
  "size": [
    "default",
    "compact"
  ]
},
  defaults: {
  "orientation": "horizontal",
  "size": "default"
}
} as const;
