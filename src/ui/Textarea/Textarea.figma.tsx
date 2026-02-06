import React, { useState } from 'react';
import Textarea from './Textarea';

/**
 * Figma Code Connect for Textarea component
 * 
 * Simple execution version of textarea with various configurations
 */
export default function TextareaFigma({
    value,
    placeholderText = 'Placeholder',
    size = 'default',
    state = 'default',
    placeholder = false,
    scrollbar = 'false',
    resize = true,
}) {
    const [internalValue, setInternalValue] = useState(value || '');

    const handleChange = (e) => {
        setInternalValue(e.target.value);
    };

    return (
        <Textarea
            value={placeholder ? '' : (value || internalValue)}
            onChange={handleChange}
            placeholder={placeholder ? placeholderText : undefined}
            size={size.toLowerCase()}
            state={state.toLowerCase()}
            resize={resize}
            disabled={state === 'disabled'}
        />
    );
}
