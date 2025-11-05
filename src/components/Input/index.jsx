import React, { useState, forwardRef } from "react";
import "./styles.scss";

const Input = forwardRef(({
    label,
    placeholder = "Placeholder",
    value,
    onChange,
    type = "text",
    variant = "default", // default, search, password, date, number, select
    size = "default", // default, sm, lg
    state = "default", // default, error, disabled
    theme = "light", // light, dark
    helperText,
    errorMessage,
    characterCount,
    maxLength,
    prefix,
    suffix,
    leadingIcon,
    trailingIcon,
    showClearButton = false,
    showPasswordToggle = false,
    className = "",
    id,
    name,
    required = false,
    autoComplete,
    ...rest
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Handle password toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle clear button
    const handleClear = () => {
        if (onChange) {
            const event = {
                target: { value: "" },
                currentTarget: { value: "" }
            };
            onChange(event);
        }
    };

    // Determine input type
    const inputType = type === "password" && showPassword ? "text" : type;

    // Build CSS classes
    const inputClasses = [
        "uds-input",
        size !== "default" && `uds-input--${size}`,
        variant !== "default" && `uds-input--${variant}`,
        state !== "default" && `uds-input--${state}`,
        theme !== "light" && `uds-input--${theme}`,
        isFocused && "uds-input--focused",
        className
    ].filter(Boolean).join(" ");

    const containerClasses = [
        "uds-input-container",
        theme !== "light" && `uds-input-container--${theme}`
    ].filter(Boolean).join(" ");

    // Render icons
    const renderIcon = (icon, position, clickable = false) => {
        if (!icon) return null;
        
        const iconClasses = [
            "uds-input__icon",
            `uds-input__icon--${position}`,
            clickable && "uds-input__icon--clickable"
        ].filter(Boolean).join(" ");

        return (
            <span 
                className={iconClasses}
                onClick={clickable ? (position === "trailing" && showClearButton ? handleClear : position === "trailing" && showPasswordToggle ? togglePasswordVisibility : null) : undefined}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={clickable ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (position === "trailing" && showClearButton) handleClear();
                        if (position === "trailing" && showPasswordToggle) togglePasswordVisibility();
                    }
                } : undefined}
            >
                {icon}
            </span>
        );
    };

    // Render prefix/suffix
    const renderAffix = (content, position) => {
        if (!content) return null;
        
        return (
            <span className={`uds-input__${position}`}>
                {content}
            </span>
        );
    };

    // Render character count
    const renderCharacterCount = () => {
        if (!characterCount && !maxLength) return null;
        
        const currentLength = value?.length || 0;
        const max = maxLength || characterCount;
        
        return (
            <span className="uds-input__character-count">
                {currentLength}/{max}
            </span>
        );
    };

    // Render helper text or error message
    const renderHelperText = () => {
        if (state === "error" && errorMessage) {
            return (
                <div className="uds-input__error-message">
                    {errorMessage}
                </div>
            );
        }
        
        if (helperText) {
            return (
                <div className="uds-input__helper-text">
                    {helperText}
                </div>
            );
        }
        
        return null;
    };

    // Render select dropdown arrow
    const renderSelectArrow = () => {
        if (variant !== "select") return null;
        
        return (
            <span className="uds-input__select-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        );
    };

    // Render number input controls
    const renderNumberControls = () => {
        if (variant !== "number") return null;
        
        return (
            <div className="uds-input__number-controls">
                <button 
                    type="button" 
                    className="uds-input__number-btn uds-input__number-btn--up"
                    onClick={(e) => {
                        e.preventDefault();
                        // Handle increment
                        if (onChange) {
                            const currentValue = parseFloat(value) || 0;
                            const event = {
                                target: { value: String(currentValue + 1) },
                                currentTarget: { value: String(currentValue + 1) }
                            };
                            onChange(event);
                        }
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button 
                    type="button" 
                    className="uds-input__number-btn uds-input__number-btn--down"
                    onClick={(e) => {
                        e.preventDefault();
                        // Handle decrement
                        if (onChange) {
                            const currentValue = parseFloat(value) || 0;
                            const event = {
                                target: { value: String(currentValue - 1) },
                                currentTarget: { value: String(currentValue - 1) }
                            };
                            onChange(event);
                        }
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={inputId} className="uds-input__label">
                    {label}
                    {required && <span className="uds-input__required">*</span>}
                </label>
            )}
            
            <div className="uds-input__wrapper">
                {renderAffix(prefix, "prefix")}
                {renderIcon(leadingIcon, "leading")}
                
                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={state === "disabled"}
                    required={required}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    className={inputClasses}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                />
                
                {renderIcon(trailingIcon, "trailing")}
                {renderSelectArrow()}
                {renderNumberControls()}
                
                {renderAffix(suffix, "suffix")}
                
                {renderCharacterCount()}
            </div>
            
            {renderHelperText()}
        </div>
    );
});

Input.displayName = "Input";

export default Input;


