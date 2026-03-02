import type { HTMLAttributes } from "react";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  code: string;
  language?: string;
  inline?: boolean;
}
