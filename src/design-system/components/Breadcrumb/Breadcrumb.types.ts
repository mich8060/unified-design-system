import type { HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
  label?: ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[];
}
