export const ToastSpec = {
  allowedVariants: {
    variant: ["success", "error", "warning", "info"],
    actions: ["none", "close", "subtle", "buttons"],
    size: ["default", "condensed"],
  },
  defaults: {
    variant: "info",
    actions: "none",
    size: "default",
  },
} as const;
