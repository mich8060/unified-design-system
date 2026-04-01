import type { HTMLAttributes } from "react";
import type { ButtonLayout, ButtonProps, ButtonSize } from "../Button/Button.types";

export interface ButtonGroupOption {
  id: string;
  label: string;
  layout?: ButtonLayout;
  size?: ButtonSize;
  icon?: ButtonProps["icon"];
  startSlot?: ButtonProps["startSlot"];
  endSlot?: ButtonProps["endSlot"];
  iconSize?: number;
  disabled?: boolean;
  loading?: boolean;
  onClick?: ButtonProps["onClick"];
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  options?: ButtonGroupOption[];
  orientation?: "horizontal" | "vertical";
  size?: ButtonSize;
  disabled?: boolean;
}
