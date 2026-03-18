import type React from "react";

export type TextVariant =
  | "display-128"
  | "display-96"
  | "display-72"
  | "display-60"
  | "display-48"
  | "display-36"
  | "heading-32"
  | "heading-28"
  | "heading-24"
  | "body-20"
  | "body-16"
  | "body-14"
  | "body-12";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextLeading = "tight" | "regular" | "loose";
export type TextTone = "primary" | "secondary" | "tertiary" | "muted" | "placeholder" | "disabled";
export type TextColor = TextTone;

export type TextProps<T extends React.ElementType = "p"> = {
  as?: T;
  variant: TextVariant;
  weight?: TextWeight;
  leading?: TextLeading;
  color?: TextColor;
  tone?: TextTone;
  clamp?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;
