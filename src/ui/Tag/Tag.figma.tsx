import React from 'react';
import Tag from './Tag';

/**
 * Figma Code Connect for Tag component
 * 
 * Simple execution version of tag with various configurations
 */
export default function TagFigma({
    label = 'Label',
    appearance = 'label-only',
    size = 'compact',
    color = 'transparent',
    rounded = true,
    solid = false,
    icon,
}) {
    return (
        <Tag
            label={label}
            appearance={appearance}
            size={size}
            color={color}
            rounded={rounded}
            solid={solid}
            icon={icon}
        />
    );
}
