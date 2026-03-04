import type { HTMLAttributes } from "react";
import type { ReactNode } from "react";

export type ProgressCircleSize = "xxs" | "xs" | "sm" | "md" | "lg";
export type ProgressCircleShape = "circle" | "half-circle";

export interface ProgressCircleProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: ProgressCircleSize;
  shape?: ProgressCircleShape;
  label?: ReactNode;
  valueLabel?: ReactNode;
  showLabel?: boolean;
  className?: string;
}
