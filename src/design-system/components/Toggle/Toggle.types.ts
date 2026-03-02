import type { InputHTMLAttributes } from "react";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange" | "size"> {
  checked?: boolean;
  state?: "off" | "on" | "indeterminate";
  size?: "large" | "small";
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}
