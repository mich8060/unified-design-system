import type { HTMLAttributes } from "react";

export type ContainerAppearance = "default" | "transparent";
export type ContainerPadding = "none" | "xsmall" | "small" | "default" | "large" | "xlarge";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  appearance?: ContainerAppearance;
  padding?: ContainerPadding;
  paddingX?: ContainerPadding;
  paddingY?: ContainerPadding;
}
