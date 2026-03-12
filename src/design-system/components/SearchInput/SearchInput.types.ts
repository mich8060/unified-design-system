import type { TextInputProps } from "../TextInput";

export interface SearchInputDropdownOption {
  value: string;
  label: string;
}

export interface SearchInputProps
  extends Omit<TextInputProps, "type" | "icon" | "iconPosition"> {
  /**
   * Optional scope/filter dropdown rendered inside the right side of the input.
   * Pass options to enable it.
   */
  dropdownOptions?: SearchInputDropdownOption[];
  /** Current selected dropdown value. */
  dropdownValue?: string;
  /** Called when dropdown selection changes. */
  onDropdownChange?: (value: string) => void;
  /** Placeholder shown in the dropdown when no value is selected. */
  dropdownPlaceholder?: string;
  /** Optional disabled override for the embedded dropdown. */
  dropdownDisabled?: boolean;
  /** Menu placement for the embedded dropdown popover. */
  dropdownPlacement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}
