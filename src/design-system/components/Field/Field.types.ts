import type { HTMLAttributes, ReactNode } from "react";

export type FieldState = "default" | "error";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  state?: FieldState;
  required?: boolean;
  helperMessage?: ReactNode;
  maxLength?: number;
  value?: string | number;
  infoIcon?: string;
  onInfoClick?: () => void;
  id?: string;
  className?: string;
  children?: ReactNode;
}
