import type { ButtonHTMLAttributes } from "react";

export interface DropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  options?: unknown[];
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  placeholder?: string;
  size?: string;
  state?: string;
  placement?: string;
  id?: unknown;
  className?: string;
  disabled?: boolean;
}
