import React from "react";
import "./_layout.scss";
import type { LayoutItemProps, LayoutProps } from "./Layout.types";

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

function normalizeWrap(wrap: LayoutProps["wrap"]): "nowrap" | "wrap" | "wrap-reverse" {
  if (wrap === true) return "wrap";
  if (wrap === false || wrap == null) return "nowrap";
  return wrap;
}

function toKebab(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function normalizeAppearance(
  appearance: LayoutProps["appearance"]
): NonNullable<LayoutProps["appearance"]> {
  if (appearance === "equal" || appearance === "right" || appearance === "left") {
    return appearance;
  }

  // Backward-compatible mapping for older string variants.
  if (appearance === ("2 Equal Column" as unknown as LayoutProps["appearance"])) return "equal";
  if (appearance === ("Content Right" as unknown as LayoutProps["appearance"])) return "right";
  if (appearance === ("Content Left" as unknown as LayoutProps["appearance"])) return "left";
  return "full";
}

function normalizeGap(gap: LayoutProps["gap"]): string | number | undefined {
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

function normalizeSpaceValue(value: LayoutProps["gap"]): string | number | undefined {
  if (value == null) return undefined;
  const tokenized = normalizeGap(value);
  if (tokenized == null) return undefined;
  return tokenized;
}

function normalizeItemsPerRow(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const normalized = Math.floor(value);
  return normalized > 0 ? normalized : undefined;
}

function warnInvalidGap(gap: LayoutProps["gap"]) {
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
        `Layout gap "${gap}" is not a supported spacing token. Use one of: ${Array.from(
          GAP_TOKEN_VALUES
        ).join(", ")} or "spacing-<token>".`
      );
    }
  }
}

const LayoutBase = React.forwardRef<HTMLElement, LayoutProps>(function Layout(
  {
    as: Component = "div",
    direction = "row",
    justifyContent,
    alignItems,
    appearance = "full",
    itemsPerRow,
    wrap = false,
    gap,
    mt,
    mb,
    pl,
    minWidth,
    shrink,
    grow,
    fullHeight = false,
    fullWidth = false,
    inline = false,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const resolvedItemsPerRow = normalizeItemsPerRow(itemsPerRow);
  const shouldApplyItemsPerRow = direction === "row" && resolvedItemsPerRow !== undefined;
  const wrapValue = normalizeWrap(shouldApplyItemsPerRow ? true : wrap);
  const hasAutoGap = String(gap).trim() === "auto";
  const resolvedAppearance = normalizeAppearance(appearance);

  const classes = [
    "uds-flex",
    `uds-flex--direction-${direction}`,
    `uds-flex--appearance-${toKebab(resolvedAppearance)}`,
    justifyContent && `uds-flex--justify-${toKebab(justifyContent)}`,
    alignItems && `uds-flex--align-${toKebab(alignItems)}`,
    `uds-flex--wrap-${toKebab(wrapValue)}`,
    inline && "uds-flex--inline",
    fullWidth && "uds-flex--full-width",
    fullWidth && "uds-flex--span",
    shouldApplyItemsPerRow && "uds-flex--items-per-row",
    hasAutoGap && "uds-flex--gap-auto",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const computedStyle: React.CSSProperties & Record<string, string | number> = {};
  const normalizedGap = normalizeGap(gap);
  const hasStyleGap = style?.gap != null;

  if (gap != null && !hasStyleGap) {
    warnInvalidGap(gap);
    computedStyle.gap = normalizedGap;
  }

  if (shouldApplyItemsPerRow) {
    computedStyle["--uds-flex-items-per-row"] = String(resolvedItemsPerRow);
  }

  if (fullWidth && style?.width == null) {
    computedStyle.width = "100%";
  }
  if (fullHeight && style?.height == null) {
    computedStyle.height = "100%";
  }
  if (style?.marginTop == null && mt != null) {
    computedStyle.marginTop = normalizeSpaceValue(mt);
  }
  if (style?.marginBottom == null && mb != null) {
    computedStyle.marginBottom = normalizeSpaceValue(mb);
  }
  if (style?.paddingLeft == null && pl != null) {
    computedStyle.paddingLeft = normalizeSpaceValue(pl);
  }
  if (style?.minWidth == null && minWidth != null) {
    computedStyle.minWidth = minWidth;
  }
  if (style?.flexShrink == null && typeof shrink === "number") {
    computedStyle.flexShrink = shrink;
  }
  if (style?.flexGrow == null && typeof grow === "number") {
    computedStyle.flexGrow = grow;
  }

  return (
    <Component ref={ref} className={classes} style={{ ...computedStyle, ...style }} {...rest}>
      {children}
    </Component>
  );
});

const LayoutFill = React.forwardRef<HTMLElement, LayoutItemProps>(function LayoutFill(
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

type LayoutCompound = typeof LayoutBase & {
  Fill: typeof LayoutFill;
  Full: typeof LayoutFill;
};

export const Layout = LayoutBase as LayoutCompound;
Layout.Fill = LayoutFill;
Layout.Full = LayoutFill;
