import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonAppearance =
  | "primary"
  | "soft"
  | "outline"
  | "text"
  | "ghost"
  | "disabled"
  | "destructive";

export type ButtonLayout =
  | "label-only"
  | "icon-left"
  | "icon-right"
  | "icon-only"
  | "only";

export type ButtonSize = "large" | "default" | "small" | "xsmall";

export type ButtonTracking = string | Record<string, unknown>;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  appearance?: ButtonAppearance;
  layout?: ButtonLayout;
  size?: ButtonSize;
  icon?: string | ReactNode;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  iconSize?: number;
  icons?: ReactNode;
  children?: ReactNode;
  tracking?: ButtonTracking;
  loading?: boolean;
}
