import type { HTMLAttributes, ReactNode } from "react";

export interface SelectableCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  leading?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  status?: ReactNode;
  trailing?: ReactNode;
}
