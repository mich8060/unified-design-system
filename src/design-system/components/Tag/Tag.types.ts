import type { HTMLAttributes, ReactNode } from "react";

export type TagAppearance = "label-only" | "icon-left";
export type TagSize = "compact" | "default";
export type TagColor =
  | "transparent"
  | "neutral"
  | "red"
  | "orange"
  | "yellow"
  | "emerald"
  | "green"
  | "sky"
  | "cyan"
  | "blue"
  | "indigo"
  | "purple"
  | "fuchsia"
  | "magenta"
  | "inverse";

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  appearance?: TagAppearance;
  size?: TagSize;
  color?: TagColor;
  rounded?: boolean;
  solid?: boolean;
  outlined?: boolean;
  icon?: string | ReactNode;
  className?: string;
  onClick?: (...args: unknown[]) => void;
}
