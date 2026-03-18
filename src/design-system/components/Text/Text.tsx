import React from "react";
import type { TextColor, TextLeading, TextProps, TextTone, TextWeight } from "./Text.types";
import "./_text.scss";

const weightClass: Record<TextWeight, string> = {
  regular: "uds-text--weight-regular",
  medium: "uds-text--weight-medium",
  semibold: "uds-text--weight-semibold",
  bold: "uds-text--weight-bold"
};

const leadingClass: Record<TextLeading, string> = {
  tight: "uds-text--leading-tight",
  regular: "uds-text--leading-regular",
  loose: "uds-text--leading-loose"
};

const toneClass: Record<TextTone, string> = {
  primary: "uds-text--tone-primary",
  secondary: "uds-text--tone-secondary",
  tertiary: "uds-text--tone-tertiary",
  muted: "uds-text--tone-muted",
  placeholder: "uds-text--tone-placeholder",
  disabled: "uds-text--tone-disabled",
};

const colorClass: Record<TextColor, string> = toneClass;

export function Text<T extends React.ElementType = "p">({
  as,
  variant,
  weight = "regular" as TextWeight,
  leading = "regular" as TextLeading,
  color,
  tone = "primary",
  clamp,
  className = "",
  children,
  style,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? "p") as React.ElementType;
  const computedStyle: React.CSSProperties = { ...style };
  const resolvedColor = color ?? tone;

  if (typeof clamp === "number" && clamp > 0) {
    computedStyle.display = "-webkit-box";
    computedStyle.WebkitLineClamp = clamp;
    computedStyle.WebkitBoxOrient = "vertical";
    computedStyle.overflow = "hidden";
  }

  return (
    <Component
      className={[
        "uds-text",
        `uds-text--${variant}`,
        weightClass[weight],
        leadingClass[leading],
        colorClass[resolvedColor],
        className
      ].filter(Boolean).join(" ")}
      style={computedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}
