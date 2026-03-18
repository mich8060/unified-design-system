import type { HTMLAttributes, ReactNode } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: (...args: unknown[]) => void;
  title?: unknown;
  subtitle?: unknown;
  badge?: unknown;
  header?: unknown;
  footer?: unknown;
  size?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  dismissible?: boolean;
  headerActions?: ReactNode;
  headerAlign?: "start" | "center" | "space-between";
  footerAlign?: "start" | "center" | "end" | "space-between";
  bodyPadding?: "none" | "compact" | "default";
  container?: unknown;
  className?: string;
  children?: ReactNode;
}
