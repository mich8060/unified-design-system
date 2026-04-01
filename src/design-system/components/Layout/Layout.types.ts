import type React from "react";

export type LayoutDirection = "row" | "column";
export type LayoutJustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type LayoutAlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
export type LayoutWrap = "nowrap" | "wrap" | "wrap-reverse";
export type LayoutAppearance =
  | "full"
  | "equal"
  | "right"
  | "left";
export type LayoutGapToken =
  | "0"
  | "2"
  | "4"
  | "6"
  | "8"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "24"
  | "32"
  | "48"
  | "64"
  | "80";
export type LayoutGapTokenName = `spacing-${LayoutGapToken}`;
export type LayoutGapSpecial = "auto";

export interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  direction?: LayoutDirection;
  justifyContent?: LayoutJustifyContent;
  alignItems?: LayoutAlignItems;
  appearance?: LayoutAppearance;
  itemsPerRow?: number;
  wrap?: boolean | LayoutWrap;
  gap?: LayoutGapToken | LayoutGapTokenName | LayoutGapSpecial | number | string;
  mt?: LayoutGapToken | LayoutGapTokenName | number | string;
  mb?: LayoutGapToken | LayoutGapTokenName | number | string;
  pl?: LayoutGapToken | LayoutGapTokenName | number | string;
  minWidth?: number | string;
  shrink?: number;
  grow?: number;
  fullHeight?: boolean;
  fullWidth?: boolean;
  inline?: boolean;
}

export interface LayoutItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}
