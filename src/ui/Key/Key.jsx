import React from 'react';
import './Key.scss';

const BASE_CLASS = 'uds-key';

const appearanceClassMap = {
    light: 'light',
    dark: 'dark',
};

/**
 * Key component for displaying keyboard key representations
 * @param {string} label - The text or symbol to display on the key (e.g., "Esc", "⌘", "Ctrl")
 * @param {string} appearance - Visual style variant: 'light' or 'dark'
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the key element
 */
export default function Key({
    label,
    appearance = 'light',
    className = '',
    ...props
}) {
    const classNames = [
        BASE_CLASS,
        appearanceClassMap[appearance] && `${BASE_CLASS}--${appearanceClassMap[appearance]}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <kbd className={classNames} {...props}>
            {label}
        </kbd>
    );
}
