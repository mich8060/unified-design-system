import type { HTMLAttributes } from "react";

export type TableBodyWeight = "regular" | "medium" | "semibold" | "bold";

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns?: unknown[];
  data?: unknown[];
  className?: string;
  bodyWeight?: TableBodyWeight;
}
