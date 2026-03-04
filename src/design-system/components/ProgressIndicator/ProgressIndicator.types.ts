import type { HTMLAttributes, ReactNode } from "react";

export type ProgressIndicatorVariant =
  | "default"
  | "blue"
  | "green"
  | "success"
  | "orange"
  | "warning"
  | "red"
  | "error"
  | "purple";

export type ProgressIndicatorSize = "small" | "medium" | "large";

export type ProgressIndicatorLabelPosition =
  | "false"
  | "right"
  | "bottom"
  | "top-floating"
  | "bottom-floating";

export interface ProgressIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressIndicatorVariant;
  size?: ProgressIndicatorSize;
  label?: ReactNode;
  showValue?: boolean;
  showLabel?: boolean;
  labelPosition?: ProgressIndicatorLabelPosition;
  className?: string;
}
