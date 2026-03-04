import React, { useState, useRef, useEffect } from "react";
import "./_slider.scss";
import type { SliderProps } from "./Slider.types";

const BASE_CLASS = "uds-slider";

/**
 * Slider component for selecting values within a range
 * @param {number|array} value - Current value(s). For single slider: number. For range slider: [min, max] array
 * @param {function} onChange - Callback function when slider value changes
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} step - Step increment
 * @param {boolean} range - Whether to use range mode (two handles)
 * @param {boolean} showLabels - Whether to show value labels
 * @param {string} label - Optional label text to display above the slider
 * @param {boolean} disabled - Whether the slider is disabled
 * @param {string} className - Additional CSS classes
 * @param {string} 'aria-label' - Accessible label for screen readers
 * @param {object} props - Additional props to pass to the slider element
 */
export default function Slider({
    value: controlledValue,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    showLabels = false,
    label,
    disabled = false,
    className = "",
    "aria-label": ariaLabel,
    ...props
}: SliderProps) {
    const [internalValue, setInternalValue] = useState(range ? [min, max] : min);
    const [isDragging, setIsDragging] = useState(null); // 'min', 'max', or null
    const sliderRef = useRef(null);
    const isControlled = controlledValue !== undefined;

    const value = isControlled ? controlledValue : internalValue;
    const currentMin = range ? value[0] : min;
    const currentMax = range ? value[1] : value;

    const sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`;

    const getPercentage = (val) => {
        return ((val - min) / (max - min)) * 100;
    };

    const getValueFromPosition = (clientX) => {
        if (!sliderRef.current) return min;
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width),
        );
        const rawValue = min + percentage * (max - min);
        return Math.round(rawValue / step) * step;
    };

    const handleMouseDown = (e, handle) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(handle);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || disabled) return;

        const newValue = getValueFromPosition(e.clientX);
        let updatedValue;

        if (range) {
            if (isDragging === "min") {
                updatedValue = [Math.min(newValue, currentMax - step), currentMax];
            } else {
                updatedValue = [currentMin, Math.max(newValue, currentMin + step)];
            }
        } else {
            updatedValue = newValue;
        }

        if (!isControlled) {
            setInternalValue(updatedValue);
        }
        if (onChange) {
            onChange(updatedValue);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
    };

    useEffect(() => {
        if (isDragging) {
            const moveHandler = (e) => handleMouseMove(e);
            const upHandler = () => handleMouseUp();
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", upHandler);
            return () => {
                document.removeEventListener("mousemove", moveHandler);
                document.removeEventListener("mouseup", upHandler);
            };
        }
    }, [ // eslint-disable-line react-hooks/exhaustive-deps
        isDragging,
        currentMin,
        currentMax,
        range,
        step,
        disabled,
        isControlled,
        onChange,
    ]);

    const handleInputChange = (e, handle) => {
        if (disabled) return;
        const newValue = parseFloat(e.target.value);
        let updatedValue;

        if (range) {
            if (handle === "min") {
                updatedValue = [Math.min(newValue, currentMax - step), currentMax];
            } else {
                updatedValue = [currentMin, Math.max(newValue, currentMin + step)];
            }
        } else {
            updatedValue = newValue;
        }

        if (!isControlled) {
            setInternalValue(updatedValue);
        }
        if (onChange) {
            onChange(updatedValue);
        }
    };

    const minPercentage = getPercentage(currentMin);
    const maxPercentage = getPercentage(currentMax);
    const leftPosition = minPercentage;
    const width = maxPercentage - minPercentage;

    const classNames = [
        BASE_CLASS,
        range && `${BASE_CLASS}--range`,
        disabled && `${BASE_CLASS}--disabled`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classNames} {...props}>
            {label && (
                <div className={`${BASE_CLASS}__header`}>
                    <label htmlFor={sliderId} className={`${BASE_CLASS}__label`}>
                        {label}
                    </label>
                </div>
            )}
            <div className={`${BASE_CLASS}__container`} ref={sliderRef}>
                <div className={`${BASE_CLASS}__track`}>
                    {range ? (
                        <>
                            <div
                                className={`${BASE_CLASS}__fill`}
                                style={{
                                    left: `${leftPosition}%`,
                                    width: `${width}%`,
                                }}
                            />
                            <input
                                type="range"
                                id={`${sliderId}-min`}
                                min={min}
                                max={max}
                                step={step}
                                value={currentMin}
                                onChange={(e) => handleInputChange(e, "min")}
                                disabled={disabled}
                                className={`${BASE_CLASS}__input ${BASE_CLASS}__input--min`}
                                aria-label={ariaLabel || `${label || "Slider"} minimum value`}
                            />
                            <input
                                type="range"
                                id={`${sliderId}-max`}
                                min={min}
                                max={max}
                                step={step}
                                value={currentMax}
                                onChange={(e) => handleInputChange(e, "max")}
                                disabled={disabled}
                                className={`${BASE_CLASS}__input ${BASE_CLASS}__input--max`}
                                aria-label={ariaLabel || `${label || "Slider"} maximum value`}
                            />
                            <div
                                className={`${BASE_CLASS}__thumb ${BASE_CLASS}__thumb--min`}
                                style={{ left: `${minPercentage}%` }}
                                onMouseDown={(e) => handleMouseDown(e, "min")}
                                role="slider"
                                aria-valuemin={min}
                                aria-valuemax={max}
                                aria-valuenow={currentMin}
                                tabIndex={disabled ? -1 : 0}
                            />
                            <div
                                className={`${BASE_CLASS}__thumb ${BASE_CLASS}__thumb--max`}
                                style={{ left: `${maxPercentage}%` }}
                                onMouseDown={(e) => handleMouseDown(e, "max")}
                                role="slider"
                                aria-valuemin={min}
                                aria-valuemax={max}
                                aria-valuenow={currentMax}
                                tabIndex={disabled ? -1 : 0}
                            />
                        </>
                    ) : (
                        <>
                            <div
                                className={`${BASE_CLASS}__fill`}
                                style={{ width: `${maxPercentage}%` }}
                            />
                            <input
                                type="range"
                                id={sliderId}
                                min={min}
                                max={max}
                                step={step}
                                value={currentMax}
                                onChange={(e) => handleInputChange(e, "single")}
                                disabled={disabled}
                                className={`${BASE_CLASS}__input`}
                                aria-label={ariaLabel || label || "Slider"}
                            />
                            <div
                                className={`${BASE_CLASS}__thumb`}
                                style={{ left: `${maxPercentage}%` }}
                                onMouseDown={(e) => handleMouseDown(e, "single")}
                                role="slider"
                                aria-valuemin={min}
                                aria-valuemax={max}
                                aria-valuenow={currentMax}
                                tabIndex={disabled ? -1 : 0}
                            />
                        </>
                    )}
                </div>
                {showLabels && (
                    <div className={`${BASE_CLASS}__labels`}>
                        {range ? (
                            <>
                                <span
                                    className={`${BASE_CLASS}__label-value`}
                                    style={{ left: `${minPercentage}%` }}
                                >
                                    {Math.round(((currentMin - min) / (max - min)) * 100)}%
                                </span>
                                <span
                                    className={`${BASE_CLASS}__label-value`}
                                    style={{ left: `${maxPercentage}%` }}
                                >
                                    {Math.round(((currentMax - min) / (max - min)) * 100)}%
                                </span>
                            </>
                        ) : (
                            <>
                                <span className={`${BASE_CLASS}__label-value`}>0%</span>
                                <span
                                    className={`${BASE_CLASS}__label-value`}
                                    style={{ left: `${maxPercentage}%` }}
                                >
                                    {Math.round(((currentMax - min) / (max - min)) * 100)}%
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
