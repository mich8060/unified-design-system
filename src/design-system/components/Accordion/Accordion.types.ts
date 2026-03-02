import type { HTMLAttributes, ReactNode } from "react";

export type AccordionVariant = "default" | "secondary";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
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
