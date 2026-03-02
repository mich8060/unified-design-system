export const CodeSpec = {
  allowedVariants: {
    language: ["markup", "css", "clike", "javascript", "typescript", "tsx", "jsx", "json", "bash", "sql"],
    inline: [true, false],
  },
  defaults: {
    language: "javascript",
    inline: false,
  },
} as const;
