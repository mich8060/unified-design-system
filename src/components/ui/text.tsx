"use client"

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

/** Semantic text colors from `--uds-text-*` / `text-uds-text-*` theme tokens. */
export const TEXT_APPEARANCES = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "disabled",
  "placeholder",
  "inverse",
  "brand-primary",
  "brand-secondary",
  "brand-tertiary",
  "brand-quaternary",
  "link-primary-default",
  "link-primary-hover",
  "link-primary-active",
  "link-primary-visited",
  "link-secondary-default",
  "link-secondary-hover",
  "link-secondary-active",
  "link-secondary-visited",
] as const

export type TextAppearance = (typeof TEXT_APPEARANCES)[number]

export const TEXT_VARIANTS = ["body", "heading", "display"] as const
export type TextVariant = (typeof TEXT_VARIANTS)[number]

export const TEXT_BODY_SIZES = ["10", "12", "14", "16", "18", "20"] as const
export const TEXT_HEADING_SIZES = ["24", "28", "32"] as const
export const TEXT_DISPLAY_SIZES = ["36", "48", "60", "72", "96", "128"] as const

export type TextBodySize = (typeof TEXT_BODY_SIZES)[number]
export type TextHeadingSize = (typeof TEXT_HEADING_SIZES)[number]
export type TextDisplaySize = (typeof TEXT_DISPLAY_SIZES)[number]
export type TextSize = TextBodySize | TextHeadingSize | TextDisplaySize

export const TEXT_LINE_HEIGHTS = ["regular", "tight", "loose"] as const
export type TextLineHeight = (typeof TEXT_LINE_HEIGHTS)[number]

const DEFAULT_TEXT_SIZE: Record<TextVariant, TextSize> = {
  body: "14",
  heading: "24",
  display: "48",
}

const textVariants = cva("min-w-0 font-sans text-foreground [font-family:var(--font-inter)]", {
  variants: {
    weight: {
      regular: "font-uds-regular",
      medium: "font-uds-medium",
      semibold: "font-uds-semibold",
      bold: "font-uds-bold",
    },
    appearance: {
      primary: "text-uds-text-primary",
      secondary: "text-uds-text-secondary",
      tertiary: "text-uds-text-tertiary",
      quaternary: "text-uds-text-quaternary",
      disabled: "text-uds-text-disabled",
      placeholder: "text-uds-text-placeholder",
      inverse: "text-uds-text-inverse",
      "brand-primary": "text-uds-text-brand-primary",
      "brand-secondary": "text-uds-text-brand-secondary",
      "brand-tertiary": "text-uds-text-brand-tertiary",
      "brand-quaternary": "text-uds-text-brand-quaternary",
      "link-primary-default": "text-uds-text-link-primary-default",
      "link-primary-hover": "text-uds-text-link-primary-hover",
      "link-primary-active": "text-uds-text-link-primary-active",
      "link-primary-visited": "text-uds-text-link-primary-visited",
      "link-secondary-default": "text-uds-text-link-secondary-default",
      "link-secondary-hover": "text-uds-text-link-secondary-hover",
      "link-secondary-active": "text-uds-text-link-secondary-active",
      "link-secondary-visited": "text-uds-text-link-secondary-visited",
    },
  },
  defaultVariants: {
    weight: "regular",
  },
})

function typographyStyleClass(
  variant: TextVariant,
  size: TextSize,
  lineHeight: TextLineHeight,
): string {
  const prefix = `--uds-type-${variant}-${size}`
  return cn(
    `[font-size:var(${prefix}-font-size)]`,
    `[line-height:var(${prefix}-line-${lineHeight})]`,
    `[letter-spacing:var(${prefix}-letter-spacing)]`,
    `[text-transform:var(${prefix}-text-transform)]`,
  )
}

type TextAs = "p" | "span" | "div" | "strong" | "em" | "label"

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> &
  VariantProps<typeof textVariants> & {
    /** Typography group from the UDS type scale. */
    variant?: TextVariant
    /** Step within the selected group (`body`, `heading`, or `display`). */
    size?: TextSize
    /** Line-height preset from the typography style tokens. */
    lineHeight?: TextLineHeight
    /** Root element; defaults to `p`. */
    as?: TextAs
  }

function Text({
  className,
  variant = "body",
  size,
  lineHeight = "regular",
  weight,
  appearance,
  as: Comp = "p",
  ...rest
}: TextProps) {
  const resolvedSize = size ?? DEFAULT_TEXT_SIZE[variant]

  return React.createElement(Comp, {
    ...rest,
    "data-variant": variant,
    "data-size": resolvedSize,
    "data-line-height": lineHeight,
    className: cn(
      textVariants({ weight, appearance }),
      typographyStyleClass(variant, resolvedSize, lineHeight),
      className,
    ),
  } as never)
}

export { Text, textVariants }
