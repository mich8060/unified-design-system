import type { TextInputProps } from "../TextInput";

export interface URLInputProps
  extends Omit<TextInputProps, "type" | "inputMode"> {}
