import type { InputHTMLAttributes } from "react";

export type FileUploadSize = "default" | "small";

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (...args: unknown[]) => void;
  accept?: unknown[];
  maxSize?: number;
  acceptText?: unknown;
  instructionText?: string;
  size?: FileUploadSize;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}
