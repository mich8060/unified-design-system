import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { TagColor } from "../Tag";

export type EventCardType = "travel" | "assignment" | "unassigned";
export type EventCardStatus = "active" | "past" | "pending";
export type EventCardColor = TagColor;

export interface EventCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  type?: EventCardType;
  status?: EventCardStatus;
  color?: EventCardColor;
  badge?: unknown;
  icon?: string | ReactNode;
  startCap?: boolean;
  endCap?: boolean;
  onClick?: (...args: unknown[]) => void;
  className?: string;
}
