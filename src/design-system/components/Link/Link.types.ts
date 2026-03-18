import type { AnchorHTMLAttributes } from "react";

export type LinkAppearance = "primary" | "secondary" | "prominent" | "external";
export type LinkUnderline = "always" | "hover" | "none";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  appearance?: LinkAppearance;
  underline?: LinkUnderline;
  external?: boolean;
  iconTrailing?: string;
  disabled?: boolean;
}
