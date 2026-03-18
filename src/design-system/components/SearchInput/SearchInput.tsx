import Dropdown from "../Dropdown/Dropdown";
import { TextInput } from "../TextInput";
import "./_search-input.scss";
import type { SearchInputProps } from "./SearchInput.types";

const BASE_CLASS = "uds-search-input";

export function SearchInput({
  width = "md",
  context = "default",
  dropdownOptions,
  dropdownValue,
  onDropdownChange,
  dropdownPlaceholder = "All",
  dropdownDisabled = false,
  dropdownPlacement = "bottom-end",
  className = "",
  disabled = false,
  size = "default",
  ...props
}: SearchInputProps) {
  const hasDropdown = Boolean(dropdownOptions && dropdownOptions.length > 0);
  const wrapperClassName = [
    BASE_CLASS,
    `${BASE_CLASS}--width-${width}`,
    `${BASE_CLASS}--context-${context}`,
    hasDropdown && `${BASE_CLASS}--with-dropdown`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const dropdownControl = hasDropdown ? (
    <Dropdown
      options={dropdownOptions}
      value={dropdownValue}
      onChange={(value) => {
        if (typeof value === "string") {
          onDropdownChange?.(value);
        }
      }}
      placeholder={dropdownPlaceholder}
      size={size}
      placement={dropdownPlacement}
      disabled={disabled || dropdownDisabled}
      searchable={false}
      menuFullWidth={false}
      className={`${BASE_CLASS}__dropdown-control`}
    />
  ) : null;

  return (
    <TextInput
      type="search"
      icon="MagnifyingGlass"
      iconPosition="left"
      placeholder={props.placeholder ?? "Search"}
      className={wrapperClassName}
      disabled={disabled}
      size={size}
      endAdornment={dropdownControl}
      {...props}
    />
  );
}
