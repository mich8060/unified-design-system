import React from "react";
import "./_container.scss";
import type { ContainerPadding, ContainerProps } from "./Container.types";

const PADDING_TOKEN_MAP: Record<ContainerPadding, string> = {
  none: "var(--uds-spacing-0)",
  xsmall: "var(--uds-spacing-8)",
  small: "var(--uds-spacing-12)",
  default: "var(--uds-spacing-16)",
  large: "var(--uds-spacing-24)",
  xlarge: "var(--uds-spacing-32)",
};

export function Container({
  appearance = "default",
  rounded = true,
  surface,
  border = "default",
  radius = "md",
  overflow = "visible",
  padding = "large",
  paddingX,
  paddingY,
  className = "",
  style,
  children,
  ...rest
}: ContainerProps) {
  const resolvedSurface =
    surface ??
    (appearance === "secondary"
      ? "secondary"
      : appearance === "transparent"
        ? "transparent"
        : "default");
  const resolvedRadius = rounded ? radius : "none";
  const classNames = [
    "uds-container",
    `uds-container--surface-${resolvedSurface}`,
    `uds-container--border-${border}`,
    `uds-container--radius-${resolvedRadius}`,
    `uds-container--overflow-${overflow}`,
    `uds-container--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const computedStyle: React.CSSProperties = { ...style };
  if (paddingX !== undefined) {
    const xValue = PADDING_TOKEN_MAP[paddingX];
    computedStyle.paddingLeft = xValue;
    computedStyle.paddingRight = xValue;
  }
  if (paddingY !== undefined) {
    const yValue = PADDING_TOKEN_MAP[paddingY];
    computedStyle.paddingTop = yValue;
    computedStyle.paddingBottom = yValue;
  }

  return (
    <div className={classNames} style={computedStyle} {...rest}>
      {children}
    </div>
  );
}
