export const EventCardSpec = {
  allowedVariants: {
    type: ["travel", "assignment", "unassigned"],
    status: ["active", "past", "pending"],
    color: [
      "transparent",
      "neutral",
      "red",
      "orange",
      "yellow",
      "emerald",
      "green",
      "sky",
      "cyan",
      "blue",
      "indigo",
      "purple",
      "fuchsia",
      "magenta",
      "inverse",
    ],
  },
  defaults: {
    title: "Title",
    type: "travel",
    status: "active",
  },
} as const;
