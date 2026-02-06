import React, { useState } from 'react';
import Input from './Input';

/**
 * Figma Code Connect for Input component
 * 
 * Simple execution version of input with various configurations
 */
export default function InputFigma({
    value,
    placeholderText = 'Placeholder',
    type = 'text',
    size = 'default',
    state = 'default',
    placeholder = false,
    disabled = false,
}) {
    const [internalValue, setInternalValue] = useState(value || '');

    const handleChange = (e) => {
        setInternalValue(e.target.value);
    };

    return (
        <Input
            value={placeholder ? '' : (value || internalValue)}
            onChange={handleChange}
            placeholder={placeholder ? placeholderText : undefined}
            type={type}
            size={size.toLowerCase()}
            state={state.toLowerCase()}
            disabled={disabled || state === 'disabled'}
        />
    );
}
