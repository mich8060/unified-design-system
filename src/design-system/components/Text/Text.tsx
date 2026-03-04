import React from "react";
import type { TextLeading, TextProps, TextWeight } from "./Text.types";
import "./_text.scss";

const weightClass: Record<TextWeight, string> = {
  regular: "ds-text--weight-regular",
  medium: "ds-text--weight-medium",
  semibold: "ds-text--weight-semibold",
  bold: "ds-text--weight-bold"
};

const leadingClass: Record<TextLeading, string> = {
  tight: "ds-text--leading-tight",
  regular: "ds-text--leading-regular",
  loose: "ds-text--leading-loose"
};

export function Text<T extends React.ElementType = "p">({
  as,
  variant,
  weight = "regular" as TextWeight,
  leading = "regular" as TextLeading,
  className = "",
  children,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? "p") as React.ElementType;

  return (
    <Component
      className={[
        "ds-text",
        `ds-text--${variant}`,
        weightClass[weight],
        leadingClass[leading],
        className
      ].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Component>
  );
}
