import type { HTMLAttributes, ReactNode } from "react";
import type { TagColor } from "../Tag";

export type MedallionShape = "circle" | "square" | "roundedSquare" | "diamond";
export type MedallionSize = "small" | "default" | "large" | "xl";

export interface MedallionProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string | ReactNode;
  shape?: MedallionShape;
  size?: MedallionSize;
  color?: TagColor;
  className?: string;
}
