import type { HTMLAttributes, ReactNode } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastAppearance = "icon" | "dot-indicator" | "avatar";
export type ToastActions = "none" | "close" | "subtle" | "buttons";
export type ToastSize = "default" | "condensed";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title?: ReactNode;
  message?: ReactNode;
  leading?: ReactNode;
  icon?: string | ReactNode;
  appearance?: ToastAppearance; // legacy, prefer leading slot
  actions?: ToastActions;
  size?: ToastSize;
  avatarSrc?: string;
  avatarInitials?: string;
  showIcon?: boolean; // legacy alias for appearance
  showClose?: boolean; // legacy alias for actions
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onClose?: () => void;
  className?: string;
}
