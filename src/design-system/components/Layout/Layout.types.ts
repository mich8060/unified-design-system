import type React from "react";

export type FlexDirection = "row" | "column";
export type FlexJustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type FlexAlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type FlexAppearance =
  | "full"
  | "equal"
  | "right"
  | "left";
export type FlexGapToken =
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
export type FlexGapTokenName = `spacing-${FlexGapToken}`;
export type FlexGapSpecial = "auto";

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  direction?: FlexDirection;
  justifyContent?: FlexJustifyContent;
  alignItems?: FlexAlignItems;
  appearance?: FlexAppearance;
  itemsPerRow?: number;
  wrap?: boolean | FlexWrap;
  gap?: FlexGapToken | FlexGapTokenName | FlexGapSpecial | number | string;
  mt?: FlexGapToken | FlexGapTokenName | number | string;
  mb?: FlexGapToken | FlexGapTokenName | number | string;
  pl?: FlexGapToken | FlexGapTokenName | number | string;
  minWidth?: number | string;
  shrink?: number;
  grow?: number;
  fullHeight?: boolean;
  fullWidth?: boolean;
  inline?: boolean;
}

export interface FlexItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}
