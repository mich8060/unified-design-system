import type { HTMLAttributes, ReactNode } from "react";

export type DescriptionListDensity = "default" | "compact";
export type DescriptionListLabelWidth = "sm" | "md" | "lg";
export type DescriptionListVariant = "default" | "separators";

export interface DescriptionListItem {
  id?: string;
  label: ReactNode;
  value: ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
  density?: DescriptionListDensity;
  labelWidth?: DescriptionListLabelWidth;
  variant?: DescriptionListVariant;
  bordered?: boolean;
  fullWidth?: boolean;
}
