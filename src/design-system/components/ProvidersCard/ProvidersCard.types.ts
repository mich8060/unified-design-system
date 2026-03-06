import type { HTMLAttributes, ReactNode } from "react";

export interface ProvidersCardTag {
  label: string;
  color?: string;
}

export interface ProvidersCardProps extends HTMLAttributes<HTMLDivElement> {
  name: ReactNode;
  specialty?: ReactNode;
  location?: ReactNode;
  availability?: ReactNode;
  startDate?: ReactNode;
  statusLabel?: ReactNode;
  statusVariant?: string;
  avatarSrc?: string;
  avatarInitials?: string;
  tags?: ProvidersCardTag[];
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}
