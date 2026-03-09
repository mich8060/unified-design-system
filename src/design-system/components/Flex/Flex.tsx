import React from "react";
import "./_flex.scss";
import type { FlexItemProps, FlexProps } from "./Flex.types";

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

function resolveTopBottom(top?: boolean, bottom?: boolean): "flex-start" | "flex-end" | undefined {
  if (top) return "flex-start";
  if (bottom) return "flex-end";
  return undefined;
}

function resolveLeftRight(left?: boolean, right?: boolean): "flex-start" | "flex-end" | undefined {
  if (left) return "flex-start";
  if (right) return "flex-end";
  return undefined;
}

function normalizeGap(gap: FlexProps["gap"]): string | number | undefined {
  if (gap == null) return undefined;

  const rawGap = String(gap).trim();
  if (rawGap === "auto") {
    return undefined;
  }
  const tokenSuffix = rawGap.match(/^spacing-(\d+)$/)?.[1] ?? rawGap;
  if (GAP_TOKEN_VALUES.has(tokenSuffix)) {
    return `var(--uds-spacing-${tokenSuffix})`;
  }

  return gap;
}

function toCssLengthValue(value: string | number | undefined): string {
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "string" && value.trim().length > 0) return value;
  return "0px";
}

function normalizeItemsPerRow(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const normalized = Math.floor(value);
  return normalized > 0 ? normalized : undefined;
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

const FlexBase = React.forwardRef<HTMLElement, FlexProps>(function Flex(
  {
    as: Component = "div",
    direction = "row",
    justifyContent,
    alignItems,
    top = false,
    bottom = false,
    left = false,
    right = false,
    itemsPerRow,
    ItemsPerRow,
    wrap = false,
    gap,
    fullWidth = false,
    span = false,
    inline = false,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const resolvedItemsPerRow = normalizeItemsPerRow(itemsPerRow ?? ItemsPerRow);
  const shouldApplyItemsPerRow = direction === "row" && resolvedItemsPerRow !== undefined;
  const wrapValue = normalizeWrap(shouldApplyItemsPerRow ? true : wrap);
  const hasAutoGap = String(gap).trim() === "auto";
  const verticalAlignment = resolveTopBottom(top, bottom);
  const horizontalAlignment = resolveLeftRight(left, right);
  const resolvedJustifyContent =
    justifyContent ??
    (direction === "row" ? horizontalAlignment : verticalAlignment);
  const resolvedAlignItems =
    alignItems ??
    (direction === "row" ? verticalAlignment : horizontalAlignment);

  const classes = [
    "uds-flex",
    `uds-flex--direction-${direction}`,
    resolvedJustifyContent && `uds-flex--justify-${toKebab(resolvedJustifyContent)}`,
    resolvedAlignItems && `uds-flex--align-${toKebab(resolvedAlignItems)}`,
    `uds-flex--wrap-${toKebab(wrapValue)}`,
    inline && "uds-flex--inline",
    fullWidth && "uds-flex--full-width",
    span && "uds-flex--span",
    shouldApplyItemsPerRow && "uds-flex--items-per-row",
    hasAutoGap && "uds-flex--gap-auto",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const computedStyle: React.CSSProperties & Record<string, string | number> = {};
  const normalizedGap = normalizeGap(gap);
  const hasStyleGap = style?.gap != null;
  const resolvedGapValue = hasStyleGap ? style?.gap : normalizedGap;

  if (gap != null && !hasStyleGap) {
    warnInvalidGap(gap);
    computedStyle.gap = normalizedGap;
  }

  if (shouldApplyItemsPerRow) {
    computedStyle["--uds-flex-items-per-row"] = String(resolvedItemsPerRow);
    computedStyle["--uds-flex-gap-resolved"] = toCssLengthValue(
      resolvedGapValue as string | number | undefined
    );
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

const FlexFull = React.forwardRef<HTMLElement, FlexItemProps>(function FlexFull(
  {
    as: Component = "div",
    className,
    children,
    ...rest
  },
  ref
) {
  const classes = ["uds-flex__full", className].filter(Boolean).join(" ");

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
});

type FlexCompound = typeof FlexBase & {
  Full: typeof FlexFull;
};

export const Flex = FlexBase as FlexCompound;
Flex.Full = FlexFull;
