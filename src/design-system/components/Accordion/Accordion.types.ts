import type { HTMLAttributes, ReactNode } from "react";

export type AccordionVariant = "default" | "secondary";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  itemCount?: number;
  headerActions?: ReactNode;
  search?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
  variant?: AccordionVariant;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  defaultExpanded?: boolean;
  children?: ReactNode;
  className?: string;
  onToggle?: (expanded: boolean) => void;
}
