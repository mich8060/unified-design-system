import type { ButtonHTMLAttributes } from "react";

export type PaginationVariant = "default" | "line";

export interface PaginationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (...args: unknown[]) => void;
  variant?: PaginationVariant;
  showJumpInput?: boolean;
  showDoubleButtons?: boolean;
  showFirstLast?: boolean;
  className?: string;
}
