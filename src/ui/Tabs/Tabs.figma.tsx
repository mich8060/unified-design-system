import React from 'react';
import Tabs from './Tabs';

/**
 * Figma Code Connect for Tabs component
 * 
 * Simple execution version of tabs with various appearances and configurations
 */
export default function TabsFigma({
    tabs = 6,
    appearance = 'underline',
    activeTab = 1,
    fill = true,
}) {
    const tabsCount = Math.min(Math.max(parseInt(tabs) || 6, 2), 6);
    const activeIndex = Math.min(Math.max(parseInt(activeTab) || 1, 1), tabsCount) - 1;

    const tabLabels = Array.from({ length: tabsCount }, (_, i) => ({
        label: `Tab ${i + 1}`,
    }));

    return (
        <Tabs
            tabs={tabLabels}
            appearance={appearance}
            activeTab={activeIndex}
            fill={fill}
        />
    );
}
