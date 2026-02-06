import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Divider from "../ui/Divider/Divider";
import "./ColorsDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";

// Accent colors arranged by color theory (hue order: ROYGBIV + variations)
const ACCENT_COLORS = [
  // Reds and warm colors
  "red",
  "rose",
  // Oranges
  "orange",
  "amber",
  // Yellows
  "yellow",
  "lime",
  // Greens
  "green",
  "emerald",
  // Blues and cyans
  "aqua",
  "cyan",
  "sky",
  "blue",
  "indigo",
  // Purples and violets
  "violet",
  "purple",
  "fuchsia",
  "magenta",
];

const COLOR_SHADES = [
  "25",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
];

const NEUTRAL_SHADES = [
  "25",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
];

const BRAND_SHADES = [
  "25",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

const BRAND_SCALES = ["primary", "secondary", "tertiary", "quaternary"];

function getComputedStyleValue(token, theme = null) {
  if (typeof window === "undefined") return "";
  
  const root = document.documentElement;
  const currentMode = root.getAttribute("data-mode");
  
  // If a specific theme is requested and it's different from current, temporarily change it
  let themeChanged = false;
  if (theme) {
    const needsDark = theme === "dark";
    // Check if dark mode is currently active (via data-mode)
    const isCurrentlyDark = currentMode === "dark";
    
    if (needsDark !== isCurrentlyDark) {
      // Set data-mode to match the requested theme
      if (needsDark) {
        root.setAttribute("data-mode", "dark");
      } else {
        root.removeAttribute("data-mode");
      }
      themeChanged = true;
      // Force a reflow to ensure styles are recalculated
      void root.offsetHeight;
    }
  }
  
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  
  // Restore original theme if we changed it
  if (themeChanged) {
    if (currentMode) {
      root.setAttribute("data-mode", currentMode);
    } else {
      root.removeAttribute("data-mode");
    }
  }
  
  return value;
}

// Convert hex or rgba to RGB
function colorToRgb(color) {
  if (!color) return null;
  
  // Handle hex colors
  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
    };
  }
  
  // Handle rgba colors
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
    };
  }
  
  return null;
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  // Default to white background if color is transparent or invalid
  const bgColor = color2 || "#ffffff";
  const fgColor = color1 || "#000000";

  const rgb1 = colorToRgb(fgColor);
  const rgb2 = colorToRgb(bgColor);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Define brand color groups
const getBrandColorGroups = () => [
  {
    id: "primary",
    name: "Primary",
    tokenPrefix: "--uds-color-primary-",
    shades: BRAND_SHADES,
    swatchToken: "--uds-color-primary-500",
  },
  {
    id: "secondary",
    name: "Secondary",
    tokenPrefix: "--uds-color-secondary-",
    shades: BRAND_SHADES,
    swatchToken: "--uds-color-secondary-500",
  },
  {
    id: "tertiary",
    name: "Tertiary",
    tokenPrefix: "--uds-color-tertiary-",
    shades: BRAND_SHADES,
    swatchToken: "--uds-color-tertiary-500",
  },
  {
    id: "quaternary",
    name: "Quaternary",
    tokenPrefix: "--uds-color-quaternary-",
    shades: BRAND_SHADES,
    swatchToken: "--uds-color-quaternary-500",
  },
];

// Define other color groups (neutrals and accents)
const getOtherColorGroups = () => [
  {
    id: "neutrals",
    name: "Neutrals",
    tokenPrefix: "--uds-color-neutrals-",
    shades: NEUTRAL_SHADES,
    swatchToken: "--uds-color-neutrals-500",
  },
  ...ACCENT_COLORS.map((color) => ({
    id: color,
    name: color.charAt(0).toUpperCase() + color.slice(1),
    tokenPrefix: `--uds-color-accent-${color}-`,
    shades: COLOR_SHADES,
    swatchToken: `--uds-color-accent-${color}-500`,
  })),
];

// Component to render a color group table
function ColorGroupTable({ group, theme, refreshKey }) {
  const background = theme === "light" ? "#ffffff" : "#111828";
  
  const colorTableData = useMemo(() => {
    const colors = [];

    group.shades.forEach((shade) => {
      const token = `${group.tokenPrefix}${shade}`;
      // Pass the theme to getComputedStyleValue so it reads from the correct mode
      const colorValue = getComputedStyleValue(token, theme);
      
      if (colorValue) {
        const contrast = getContrastRatio(colorValue, background);
        const colorName = `${group.name} ${shade}`;
        
        colors.push({
          name: colorName,
          token: token,
          value: colorValue,
          contrast: contrast.toFixed(2),
        });
      }
    });

    return colors;
  }, [group, theme, background, refreshKey]);

  if (colorTableData.length === 0) return null;

  return (
    <div className="colors-demo__table-wrapper">
      <table className="colors-demo__table">
        <thead>
          <tr>
            <th className="colors-demo__table-header">Preview</th>
            <th className="colors-demo__table-header">Color name</th>
            <th className="colors-demo__table-header">Token</th>
            <th className="colors-demo__table-header">Contrast :1</th>
            <th className="colors-demo__table-header colors-demo__table-header--sortable">
              Value Hex
            </th>
          </tr>
        </thead>
        <tbody>
          {colorTableData.map((color, index) => (
            <tr key={index} className="colors-demo__table-row">
              <td className="colors-demo__table-cell">
                <div
                  className="colors-demo__table-preview"
                  style={{
                    backgroundColor: color.value,
                  }}
                />
              </td>
              <td className="colors-demo__table-cell colors-demo__table-cell--name">
                {color.name}
              </td>
              <td className="colors-demo__table-cell">
                <code className="colors-demo__token">{color.token}</code>
              </td>
              <td className="colors-demo__table-cell">
                {color.contrast}
              </td>
              <td className="colors-demo__table-cell">
                {color.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ColorsDemo() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedOtherColorGroup, setSelectedOtherColorGroup] = useState("neutrals");
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentBrand, setCurrentBrand] = useState("");

  // Watch for brand and mode changes
  useEffect(() => {
    const updateBrand = () => {
      const brand = document.documentElement.getAttribute("data-brand") || "";
      const mode = document.documentElement.getAttribute("data-mode") || "light";
      setCurrentBrand(`${brand}-${mode}`);
    };

    // Initial check
    updateBrand();

    // Watch for changes to data-brand and data-mode attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && 
            (mutation.attributeName === "data-brand" || mutation.attributeName === "data-mode")) {
          updateBrand();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-brand", "data-mode"],
    });

    return () => observer.disconnect();
  }, []);

  // Refresh colors when theme or brand changes
  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [selectedTheme, currentBrand]);

  const brandColorGroups = useMemo(() => {
    return getBrandColorGroups().map((group) => ({
      ...group,
      // Use selected theme for swatch preview
      swatchColor: getComputedStyleValue(group.swatchToken, selectedTheme) || "#000000",
    }));
  }, [selectedTheme, refreshKey]);

  const otherColorGroups = useMemo(() => {
    return getOtherColorGroups().map((group) => ({
      ...group,
      // Use selected theme for swatch preview
      swatchColor: getComputedStyleValue(group.swatchToken, selectedTheme) || "#000000",
    }));
  }, [selectedTheme, refreshKey]);

  const selectedOtherGroup = useMemo(() => {
    return otherColorGroups.find((group) => group.id === selectedOtherColorGroup) || otherColorGroups[0];
  }, [selectedOtherColorGroup, otherColorGroups]);

  const otherColorTableData = useMemo(() => {
    const colors = [];
    const background = selectedTheme === "light" ? "#ffffff" : "#111828";

    selectedOtherGroup.shades.forEach((shade) => {
      const token = `${selectedOtherGroup.tokenPrefix}${shade}`;
      // Pass the selected theme to getComputedStyleValue so it reads from the correct mode
      const colorValue = getComputedStyleValue(token, selectedTheme);
      
      if (colorValue) {
        const contrast = getContrastRatio(colorValue, background);
        const colorName = `${selectedOtherGroup.name} ${shade}`;
        
        colors.push({
          name: colorName,
          token: token,
          value: colorValue,
          contrast: contrast.toFixed(2),
        });
      }
    });

    return colors;
  }, [selectedOtherGroup, selectedTheme, refreshKey]);

  return (
    <section className="page colors-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Colors</h1>
              <p className="page__header-description">
                Color palettes using <code>--uds-color-*</code> variables from design tokens.
              </p>
            </div>
            <div className="page__header-metadata">
              <div className="page__metadata-row">
                <p className="page__metadata-label">Author</p>
                <a
                  href="https://chgit.slack.com/team/U06V9C0K06S"
                  className="page__metadata-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Michael-Stevens
                </a>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Last updated</p>
                <p className="page__metadata-value">{formatLastUpdated()}</p>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Version</p>
                <Flex direction="row" gap="8" alignItems="center">
                  <p className="page__metadata-value">1.0.0</p>
                  <span className="page__version-badge">BETA</span>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page__content">
        <div className="page__examples-section">
          {/* Brand Colors Section */}
          <div className="demo-group">
            <h2 className="demo-group__heading">Brand Colors</h2>
            <p className="demo-group__description">
              Primary, Secondary, Tertiary, and Quaternary color palettes used for brand theming.
            </p>
            
            <div className="colors-demo__header">
              <h3 className="colors-demo__theme-title">
                {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} theme
              </h3>
              <div className="colors-demo__theme-selector">
                <label htmlFor="theme-select" className="colors-demo__theme-label">
                  Color theme
                </label>
                <select
                  id="theme-select"
                  className="colors-demo__theme-select-input"
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            {brandColorGroups.map((group) => (
              <div key={`${group.id}-${refreshKey}`} style={{ marginBottom: "48px" }}>
                <h4 style={{ 
                  fontSize: "20px", 
                  fontWeight: "600", 
                  marginBottom: "16px",
                  color: "var(--uds-text-primary)"
                }}>
                  {group.name}
                </h4>
                <ColorGroupTable group={group} theme={selectedTheme} refreshKey={refreshKey} />
              </div>
            ))}
          </div>

          {/* Other Colors Section (Neutrals and Accents) */}
          <div className="demo-group">
            <h2 className="demo-group__heading">Other Colors</h2>
            <p className="demo-group__description">
              Neutrals and accent color palettes.
            </p>

            <div className="colors-demo__header">
              <h3 className="colors-demo__theme-title">
                {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} theme
              </h3>
            </div>

            {/* Color Swatch Selector */}
            <div style={{ marginBottom: "16px" }}>
              <p style={{ 
                fontSize: "14px", 
                color: "var(--uds-text-secondary)", 
                marginBottom: "12px",
                fontWeight: "500"
              }}>
                Select a color palette:
              </p>
              <div className="colors-demo__swatch-selector">
                {otherColorGroups.map((group) => {
                  const swatchColor = group.swatchColor || "#000000";
                  const isSelected = selectedOtherColorGroup === group.id;
                  
                  return (
                    <button
                      key={group.id}
                      className={`colors-demo__swatch ${isSelected ? "colors-demo__swatch--selected" : ""}`}
                      onClick={() => setSelectedOtherColorGroup(group.id)}
                      aria-label={`Select ${group.name} color group`}
                      title={group.name}
                      style={{
                        backgroundColor: swatchColor,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Color Table */}
            <div className="colors-demo__table-wrapper">
              <table className="colors-demo__table">
                <thead>
                  <tr>
                    <th className="colors-demo__table-header">Preview</th>
                    <th className="colors-demo__table-header">Color name</th>
                    <th className="colors-demo__table-header">Token</th>
                    <th className="colors-demo__table-header">Contrast :1</th>
                    <th className="colors-demo__table-header colors-demo__table-header--sortable">
                      Value Hex
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {otherColorTableData.map((color, index) => (
                    <tr key={index} className="colors-demo__table-row">
                      <td className="colors-demo__table-cell">
                        <div
                          className="colors-demo__table-preview"
                          style={{
                            backgroundColor: color.value,
                          }}
                        />
                      </td>
                      <td className="colors-demo__table-cell colors-demo__table-cell--name">
                        {color.name}
                      </td>
                      <td className="colors-demo__table-cell">
                        <code className="colors-demo__token">{color.token}</code>
                      </td>
                      <td className="colors-demo__table-cell">
                        {color.contrast}
                      </td>
                      <td className="colors-demo__table-cell">
                        {color.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Divider variant="solid" />
      </main>
    </section>
  );
}
