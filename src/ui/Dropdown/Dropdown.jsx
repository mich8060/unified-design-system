import React, { useState, useRef, useEffect } from "react";
import Icon from "../Icon/Icon";
import "./Dropdown.scss";

const BASE_CLASS = "uds-dropdown";

const stateClassMap = {
  default: "default",
  focused: "focused",
  error: "error",
  disabled: "disabled",
};

/**
 * Dropdown component for custom select inputs
 * @param {array} options - Array of option objects with { value, label } or array of strings
 * @param {string|number} value - Currently selected value
 * @param {function} onChange - Callback when selection changes (receives new value)
 * @param {string} placeholder - Placeholder text when no option is selected
 * @param {string} state - Visual state: 'default', 'focused', 'error', 'disabled'
 * @param {string} id - Unique identifier for the dropdown
 * @param {string} label - Label text for the dropdown
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the dropdown
 */
export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  state = "default",
  id,
  label,
  className = "",
  disabled = false,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const dropdownId =
    id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  // Normalize options to always have { value, label } format
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  // Determine the current state
  const currentState = disabled
    ? "disabled"
    : state === "default" && focused
      ? "focused"
      : state;

  // Get the selected option's label
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocused(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setFocused(false);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = normalizedOptions.findIndex(
          (opt) => opt.value === value,
        );
        const nextIndex =
          currentIndex < normalizedOptions.length - 1 ? currentIndex + 1 : 0;
        if (onChange && !disabled) {
          onChange(normalizedOptions[nextIndex].value);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = normalizedOptions.findIndex(
          (opt) => opt.value === value,
        );
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : normalizedOptions.length - 1;
        if (onChange && !disabled) {
          onChange(normalizedOptions[prevIndex].value);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, value, normalizedOptions, onChange, disabled]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setFocused(!isOpen);
    }
  };

  const handleSelect = (optionValue) => {
    if (onChange && !disabled) {
      onChange(optionValue);
      setIsOpen(false);
      setFocused(false);
    }
  };

  const classNames = [
    BASE_CLASS,
    stateClassMap[currentState] &&
      `${BASE_CLASS}--${stateClassMap[currentState]}`,
    isOpen && `${BASE_CLASS}--open`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${BASE_CLASS}-wrapper`}>
      {label && (
        <label htmlFor={dropdownId} className={`${BASE_CLASS}__label`}>
          {label}
        </label>
      )}
      <div className={classNames} ref={dropdownRef}>
        <button
          type="button"
          id={dropdownId}
          className={`${BASE_CLASS}__trigger`}
          onClick={handleToggle}
          onFocus={() => !disabled && setFocused(true)}
          onBlur={() => !focused && setFocused(false)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={label || placeholder}
          {...props}
        >
          <span
            className={`${BASE_CLASS}__value ${!selectedOption ? `${BASE_CLASS}__value--placeholder` : ""}`}
          >
            {displayValue}
          </span>
          <Icon
            name="CaretDown"
            size={16}
            appearance="regular"
            className={`${BASE_CLASS}__icon ${isOpen ? `${BASE_CLASS}__icon--open` : ""}`}
          />
        </button>
        {isOpen && !disabled && (
          <ul className={`${BASE_CLASS}__list`} role="listbox" ref={listRef}>
            {normalizedOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  className={`${BASE_CLASS}__option ${isSelected ? `${BASE_CLASS}__option--selected` : ""}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={(e) => e.currentTarget.focus()}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
