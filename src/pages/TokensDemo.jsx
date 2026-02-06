import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Divider from "../ui/Divider/Divider";
import "./TokensDemo.scss";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Tabs from "../ui/Tabs/Tabs";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";

const BRANDS = [
  "designSystem",
  "comphealth",
  "connect",
  "gms",
  "locumsmart",
  "modio",
  "weatherby",
  "wireframe",
];
const MODES = ["light", "dark"];

const BRAND_LABELS = {
  designSystem: "Design System",
  comphealth: "CompHealth",
  connect: "Connect",
  gms: "GMS",
  locumsmart: "LocumSmart",
  modio: "Modio",
  weatherby: "Weatherby",
  wireframe: "Wireframe",
};

function TokensDemo() {
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch design-tokens.css from public first, then fall back to extracting from loaded stylesheets
    const loadTokens = async () => {
      try {
        // Try fetching from public folder
        const response = await fetch("/styles/tokens.css");
        if (response.ok) {
          const cssText = await response.text();
          const parsed = parseTokens(cssText);
          setTokens(parsed);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn(
          "Could not fetch tokens.css from public, trying alternative method...",
          err,
        );
      }

      // Fallback: Extract from loaded stylesheets
      try {
        const extracted = extractTokensFromStylesheets();
        if (extracted) {
          setTokens(extracted);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Failed to extract tokens from stylesheets:", err);
      }

      setLoading(false);
    };

    loadTokens();
  }, []);

  const extractTokensFromStylesheets = () => {
    // Extract CSS variables from the root element
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const rootTokens = [];

    // Get all CSS variables from :root
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        if (!sheet.cssRules) continue;

        for (let j = 0; j < sheet.cssRules.length; j++) {
          const rule = sheet.cssRules[j];
          if (rule instanceof CSSStyleRule) {
            if (rule.selectorText === ":root" || rule.selectorText === "html") {
              for (let k = 0; k < rule.style.length; k++) {
                const prop = rule.style[k];
                if (prop.startsWith("--")) {
                  const value = rule.style.getPropertyValue(prop).trim();
                  rootTokens.push({
                    name: prop.substring(2),
                    value: value,
                    group: "Root",
                  });
                }
              }
            }
          }
        }
      } catch (e) {
        // CORS or security error, skip
        continue;
      }
    }

    return {
      core: rootTokens,
      brands: {},
      modes: { light: [], dark: [] },
    };
  };

  const parseTokens = (cssText) => {
    const result = {
      core: [],
      brands: {},
      modes: { light: [], dark: [] },
    };

    // Parse core tokens (:root) - there may be multiple :root blocks, combine them
    // Use a more robust regex that handles nested braces
    const rootRegex = /:root\s*\{((?:[^{}]|\{[^{}]*\})*)\}/gs;
    const allRootTokens = [];
    let rootMatch;
    while ((rootMatch = rootRegex.exec(cssText)) !== null) {
      const rootContent = rootMatch[1];
      const rootTokens = parseTokenBlock(rootContent);
      allRootTokens.push(...rootTokens);
    }
    result.core = allRootTokens;

    // Parse brand tokens
    BRANDS.forEach((brand) => {
      const brandRegex = new RegExp(
        `\\[data-brand="${brand}"\\]\\s*\\{((?:[^{}]|\\{[^{}]*\\})*)\\}`,
        "gs",
      );
      const brandMatch = cssText.match(brandRegex);
      if (brandMatch) {
        const brandContent = brandMatch[1];
        result.brands[brand] = parseTokenBlock(brandContent);
      }
    });

    // Parse mode tokens (using data-theme instead of data-mode)
    MODES.forEach((mode) => {
      // For light mode, parse from :root (default)
      if (mode === "light") {
        // Light mode tokens are in :root, but we already parsed those as core
        // We can extract them separately if needed, but for now we'll leave light empty
        // or use the core tokens
        result.modes[mode] = [];
      } else {
        // For dark mode, parse from [data-theme="dark"]
        const modeRegex = new RegExp(
          `\\[data-theme="${mode}"\\]\\s*\\{((?:[^{}]|\\{[^{}]*\\})*)\\}`,
          "gs",
        );
        const modeMatch = cssText.match(modeRegex);
        if (modeMatch) {
          const modeContent = modeMatch[1];
          result.modes[mode] = parseTokenBlock(modeContent);
        }
      }
    });

    return result;
  };

  const parseTokenBlock = (content) => {
    const tokens = [];
    const lines = content.split("\n");

    let currentGroup = null;
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("/*")) {
        // Check if it's a group comment
        if (trimmed.startsWith("/*") && trimmed.endsWith("*/")) {
          const groupMatch = trimmed.match(/\/\*\s*(.+?)\s*\*\//);
          if (groupMatch && groupMatch[1] && !groupMatch[1].includes("=")) {
            currentGroup = groupMatch[1].trim();
          }
        }
        continue;
      }

      const tokenMatch = trimmed.match(/--([^:]+):\s*(.+?);/);
      if (tokenMatch) {
        const [, name, value] = tokenMatch;
        tokens.push({
          name: name.trim(),
          value: value.trim(),
          group: currentGroup,
        });
      }
    }

    return tokens;
  };

  const groupTokensByComment = (tokenList) => {
    const groups = {};

    // Priority order for color groups (to maintain consistent ordering)
    const groupOrder = ["Primary", "Secondary", "Tertiary", "Quaternary"];

    tokenList.forEach((token) => {
      // Use the group from the comment if available, otherwise fallback to extracting from name
      let groupName = token.group;

      // If no comment group, try to extract from token name
      if (!groupName || groupName === "Other" || groupName === "Unnamed") {
        const parts = token.name.split("-");
        const baseParts = parts.slice(1); // Skip prefix like 'brand', 'system', 'uds'

        // Check for numeric suffix patterns (e.g., primary-25, accent-blue-100)
        const hasNumericSuffix = /^\d+$/.test(baseParts[baseParts.length - 1]);

        if (hasNumericSuffix && baseParts.length >= 2) {
          // For tokens with numeric suffixes, group by the color/palette name
          const colorName = baseParts[0];
          // Capitalize first letter
          groupName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
        } else if (baseParts.length > 0) {
          // Use first part, capitalized
          groupName =
            baseParts[0].charAt(0).toUpperCase() + baseParts[0].slice(1);
        } else {
          groupName = "Other";
        }
      }

      // Normalize group name (capitalize first letter)
      const normalizedGroup =
        groupName.charAt(0).toUpperCase() + groupName.slice(1);

      if (!groups[normalizedGroup]) {
        groups[normalizedGroup] = {
          displayName: normalizedGroup,
          tokens: [],
        };
      }
      groups[normalizedGroup].tokens.push(token);
    });

    // Sort tokens within each group by name (numerically for numbered tokens)
    Object.values(groups).forEach((group) => {
      group.tokens.sort((a, b) => {
        // Extract numbers from token names for better sorting
        const numA = a.name.match(/\d+/)?.[0];
        const numB = b.name.match(/\d+/)?.[0];
        if (numA && numB) {
          return parseInt(numA, 10) - parseInt(numB, 10);
        }
        return a.name.localeCompare(b.name);
      });
    });

    // Sort groups by priority (Primary, Secondary, Tertiary, Quaternary first), then alphabetically
    const sortedGroups = {};

    // First add priority groups in order
    groupOrder.forEach((groupKey) => {
      if (groups[groupKey]) {
        sortedGroups[groupKey] = groups[groupKey];
      }
    });

    // Then add remaining groups alphabetically
    Object.keys(groups)
      .sort()
      .forEach((groupKey) => {
        if (!groupOrder.includes(groupKey)) {
          sortedGroups[groupKey] = groups[groupKey];
        }
      });

    return sortedGroups;
  };

  const groupedTokens = useMemo(() => {
    if (!tokens) return null;

    const groupTokens = (tokenList) => {
      // Group tokens by comment groups from the CSS file (Primary, Secondary, Tertiary, etc.)
      return groupTokensByComment(tokenList);
    };

    return {
      core: groupTokens(tokens.core),
      brands: Object.fromEntries(
        Object.entries(tokens.brands).map(([brand, tokenList]) => [
          brand,
          groupTokens(tokenList),
        ]),
      ),
      modes: Object.fromEntries(
        Object.entries(tokens.modes).map(([mode, tokenList]) => [
          mode,
          groupTokens(tokenList),
        ]),
      ),
    };
  }, [tokens]);

  const isColorValue = (value) => {
    return (
      /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value.trim()) ||
      /^rgba?\(/.test(value.trim()) ||
      /^rgb\(/.test(value.trim())
    );
  };

  const getColorValue = (value) => {
    if (value.startsWith("var(--")) {
      // For CSS variables, we'd need to resolve them
      return null;
    }
    if (isColorValue(value)) {
      return value.trim();
    }
    return null;
  };

  const TokenValue = ({ value }) => {
    const colorValue = getColorValue(value);

    if (colorValue) {
      return (
        <div className="token-value token-value--color">
          <span
            className="token-value__swatch"
            style={{ backgroundColor: colorValue }}
          />
          <span className="token-value__text">{value}</span>
        </div>
      );
    }

    return <span className="token-value token-value--text">{value}</span>;
  };

  const TokenTable = ({ title, tokens, groupedData }) => {
    // If we have grouped data, render subgroups
    if (
      groupedData &&
      typeof groupedData === "object" &&
      !Array.isArray(groupedData)
    ) {
      const entries = Object.entries(groupedData);
      if (entries.length === 0) return null;

      return (
        <div className="token-table-wrapper">
          {title && <h3 className="token-table-wrapper__title">{title}</h3>}
          {entries.map(([subgroupKey, subgroupData]) => {
            // Ensure subgroupData is an object with the expected structure
            if (!subgroupData || typeof subgroupData !== "object") {
              return null;
            }

            // Check if this subgroup has nested subgroups (from comments)
            if (
              subgroupData.subgroups &&
              Array.isArray(subgroupData.subgroups)
            ) {
              return (
                <div key={subgroupKey} className="token-subgroup">
                  <h4 className="token-subgroup__title">
                    {subgroupData.displayName || subgroupKey}
                  </h4>
                  {subgroupData.subgroups.map((nestedSubgroup, idx) => {
                    if (
                      !nestedSubgroup ||
                      !nestedSubgroup.tokens ||
                      !Array.isArray(nestedSubgroup.tokens)
                    ) {
                      return null;
                    }

                    return (
                      <div key={idx} className="token-subgroup-nested">
                        {nestedSubgroup.displayName &&
                          nestedSubgroup.displayName !== "Unnamed" && (
                            <h5 className="token-subgroup-nested__title">
                              {nestedSubgroup.displayName}
                            </h5>
                          )}
                        <table className="token-table">
                          <thead>
                            <tr>
                              <th className="token-table__header token-table__header--name">
                                Token Name
                              </th>
                              <th className="token-table__header token-table__header--value">
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {nestedSubgroup.tokens.map((token, tokenIdx) => (
                              <tr
                                key={`${token.name}-${tokenIdx}`}
                                className="token-table__row"
                              >
                                <td className="token-table__cell token-table__cell--name">
                                  <code>{token.name}</code>
                                </td>
                                <td className="token-table__cell token-table__cell--value">
                                  <TokenValue value={token.value} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Simple subgroup with tokens
            if (subgroupData.tokens && Array.isArray(subgroupData.tokens)) {
              return (
                <div key={subgroupKey} className="token-subgroup">
                  <h4 className="token-subgroup__title">
                    {subgroupData.displayName || subgroupKey}
                  </h4>
                  <table className="token-table">
                    <thead>
                      <tr>
                        <th className="token-table__header token-table__header--name">
                          Token Name
                        </th>
                        <th className="token-table__header token-table__header--value">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subgroupData.tokens.map((token, idx) => (
                        <tr
                          key={`${token.name}-${idx}`}
                          className="token-table__row"
                        >
                          <td className="token-table__cell token-table__cell--name">
                            <code>{token.name}</code>
                          </td>
                          <td className="token-table__cell token-table__cell--value">
                            <TokenValue value={token.value} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    }

    // Fallback for non-grouped tokens
    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) return null;

    return (
      <div className="token-table-wrapper">
        {title && <h3 className="token-table-wrapper__title">{title}</h3>}
        <table className="token-table">
          <thead>
            <tr>
              <th className="token-table__header token-table__header--name">
                Token Name
              </th>
              <th className="token-table__header token-table__header--value">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, idx) => (
              <tr key={`${token.name}-${idx}`} className="token-table__row">
                <td className="token-table__cell token-table__cell--name">
                  <code>{token.name}</code>
                </td>
                <td className="token-table__cell token-table__cell--value">
                  <TokenValue value={token.value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const BrandTable = ({ brand }) => {
    const brandTokens = groupedTokens?.brands[brand];

    if (!brandTokens) return null;

    return (
      <div className="tokens-section">
        <h3 className="tokens-section__title">
          {BRAND_LABELS[brand] || brand}
        </h3>
        <div className="tokens-section__content">
          <TokenTable groupedData={brandTokens} />
        </div>
      </div>
    );
  };

  const ModeTable = ({ mode }) => {
    const modeTokens = groupedTokens?.modes[mode];

    if (!modeTokens) return null;

    return (
      <div className="tokens-section">
        <h3 className="tokens-section__title">
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h3>
        <div className="tokens-section__content">
          <TokenTable groupedData={modeTokens} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="tokens-demo">
        <div className="tokens-demo__loading">Loading tokens...</div>
      </div>
    );
  }

  if (!tokens) {
    return (
      <div className="tokens-demo">
        <div className="tokens-demo__error">Failed to load tokens.</div>
      </div>
    );
  }

  return (
    <div>
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Design Tokens</h1>
              <p className="page__header-description">
                Figma-like token display organized by brand and mode
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
          <div className="demo-group">
            <h2 className="demo-group__heading">Core Tokens</h2>
            <p className="demo-group__description">
              Base design tokens available across all brands and modes.
            </p>
            <TokenTable title="Core" tokens={tokens?.core} groupedData={groupedTokens?.core} />
          </div>

          {Object.keys(groupedTokens?.brands || {}).length > 0 && (
            <div className="demo-group">
              <h2 className="demo-group__heading">Brand Tokens</h2>
              <p className="demo-group__description">
                Brand-specific token overrides.
              </p>
              {Object.keys(groupedTokens.brands).map((brand) => (
                <BrandTable key={brand} brand={brand} />
              ))}
            </div>
          )}

          {Object.keys(groupedTokens?.modes || {}).length > 0 && (
            <div className="demo-group">
              <h2 className="demo-group__heading">Mode Tokens</h2>
              <p className="demo-group__description">
                Light and dark mode token overrides.
              </p>
              {Object.keys(groupedTokens.modes).map((mode) => (
                <ModeTable key={mode} mode={mode} />
              ))}
            </div>
          )}
        </div>

        <Divider variant="solid" />
      </main>
    </div>
  );
}

export default TokensDemo;
