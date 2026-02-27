import React from "react";
import "./_flex.scss";
import type { FlexProps } from "./Flex.types";

const GAP_TOKEN_VALUES = new Set([
  "0",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "24",
  "32",
  "48",
  "64",
  "80",
]);
const warnedGapValues = new Set<string>();

function normalizeWrap(wrap: FlexProps["wrap"]): "nowrap" | "wrap" | "wrap-reverse" {
  if (wrap === true) return "wrap";
  if (wrap === false || wrap == null) return "nowrap";
  return wrap;
}

function toKebab(value: string): string {
  return value.replace(/\s+/g, "-");
}

function normalizeGap(gap: FlexProps["gap"]): string | number | undefined {
  if (gap == null) return undefined;

  const rawGap = String(gap).trim();
  const tokenSuffix = rawGap.match(/^spacing-(\d+)$/)?.[1] ?? rawGap;
  if (GAP_TOKEN_VALUES.has(tokenSuffix)) {
    return `var(--uds-spacing-${tokenSuffix})`;
  }

  return gap;
}

function warnInvalidGap(gap: FlexProps["gap"]) {
  if (
    gap == null ||
    typeof import.meta === "undefined" ||
    !import.meta.env?.DEV
  ) {
    return;
  }

  const rawGap = String(gap).trim();
  const tokenSuffix = rawGap.match(/^spacing-(\d+)$/)?.[1] ?? rawGap;
  const isProbablyToken = /^\d+$/.test(tokenSuffix);

  if (isProbablyToken && !GAP_TOKEN_VALUES.has(tokenSuffix)) {
    const warningKey = `token:${tokenSuffix}`;
    if (!warnedGapValues.has(warningKey)) {
      warnedGapValues.add(warningKey);
      console.warn(
        `Flex gap "${gap}" is not a supported spacing token. Use one of: ${Array.from(
          GAP_TOKEN_VALUES
        ).join(", ")} or "spacing-<token>".`
      );
    }
  }
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(
  {
    as: Component = "div",
    direction = "row",
    justifyContent,
    alignItems,
    wrap = false,
    gap,
    fullWidth = false,
    inline = false,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const wrapValue = normalizeWrap(wrap);

  const classes = [
    "ds-flex",
    `ds-flex--direction-${direction}`,
    justifyContent && `ds-flex--justify-${toKebab(justifyContent)}`,
    alignItems && `ds-flex--align-${toKebab(alignItems)}`,
    `ds-flex--wrap-${toKebab(wrapValue)}`,
    inline && "ds-flex--inline",
    fullWidth && "ds-flex--full-width",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const computedStyle: React.CSSProperties = {};
  if (gap != null && style?.gap == null) {
    warnInvalidGap(gap);
    computedStyle.gap = normalizeGap(gap);
  }
  if (fullWidth && style?.width == null) {
    computedStyle.width = "100%";
  }

  return (
    <Component ref={ref} className={classes} style={{ ...computedStyle, ...style }} {...rest}>
      {children}
    </Component>
  );
});
