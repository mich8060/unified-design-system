import type { HTMLAttributes, ReactNode } from "react";

export type TableBodyWeight = "regular" | "medium" | "semibold" | "bold";
export type TableCellAlign = "left" | "center" | "right";
export type TableSortDirection = "asc" | "desc";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label?: ReactNode;
  icon?: string;
  align?: TableCellAlign;
  sortable?: boolean;
  filterable?: boolean;
  className?: string;
  render?: (row: T, rowIndex: number, colIndex: number) => ReactNode;
  sortDirection?: TableSortDirection;
  onSort?: (column: TableColumn<T>) => void;
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns?: TableColumn[];
  data?: Record<string, unknown>[];
  className?: string;
  bodyWeight?: TableBodyWeight;
}
