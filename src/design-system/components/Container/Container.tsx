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
  appearance = "transparent",
  padding = "large",
  paddingX,
  paddingY,
  className = "",
  style,
  children,
  ...rest
}: ContainerProps) {
  const classNames = [
    "uds-container",
    `uds-container--appearance-${appearance}`,
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
