import type { HTMLAttributes, ReactNode } from "react";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  content?: unknown;
  placement?: string;
  disabled?: boolean;
  defaultVisible?: boolean;
  className?: string;
}
