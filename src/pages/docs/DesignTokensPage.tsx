import { useMemo, useState } from "react";
import { Button } from "../../design-system/components/Button";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Table } from "../../design-system/components/Table";
import { Tabs } from "../../design-system/components/Tabs";
import { Text } from "../../design-system/components/Text";
import tokensCss from "../../design-system/tokens/index.css?raw";
import blurPrimitivesCss from "../../design-system/tokens/primitives/_blur.primitives.scss?raw";
import boxShadowPrimitivesCss from "../../design-system/tokens/primitives/_boxshadow.primitives.scss?raw";
import containerPrimitivesCss from "../../design-system/tokens/primitives/_container.primitives.scss?raw";
import elevationPrimitivesCss from "../../design-system/tokens/primitives/_elevation.primitives.scss?raw";
import gapPrimitivesCss from "../../design-system/tokens/primitives/_gap.primitives.scss?raw";
import sizingPrimitivesCss from "../../design-system/tokens/primitives/_sizing.primitives.scss?raw";
import { DocPageLayout } from "./DocPageLayout";

const PRIMITIVE_COLUMNS = [
  { key: "token", label: "Variable" },
  { key: "value", label: "Default Value" },
];

const SEMANTIC_COLUMNS = [
  { key: "token", label: "Variable" },
  { key: "lightValue", label: "Light Value" },
  { key: "darkValue", label: "Dark Value" },
];

const PRIMITIVE_GROUPS: Record<string, readonly string[]> = {
  Blur: ["--uds-blur-"],
  BoxShadow: ["--uds-boxshadow-"],
  Container: ["--uds-container-"],
  Elevation: ["--uds-elevation-"],
  Gap: ["--uds-gap-"],
  Spacing: ["--uds-spacing-"],
  Radius: ["--uds-radius-"],
  Sizing: ["--uds-sizing-"],
  Typography: ["--uds-font-size-", "--uds-font-weight-", "--uds-line-"],
  BorderWidth: ["--uds-border-width-"],
  FocusRing: ["--uds-focus-ring-"],
  Shadow: ["--uds-shadow-"],
  Motion: ["--uds-animation-"],
};

const SEMANTIC_GROUPS: Record<string, readonly string[]> = {
  Text: ["--uds-text-"],
  Surface: ["--uds-surface-"],
  Border: ["--uds-border-"],
  Icon: ["--uds-icon-"],
  Code: ["--uds-code-"],
  Scrim: ["--uds-scrim-"],
  Shadow: ["--uds-shadow-"],
  System: ["--uds-system-"],
};

const SEMANTIC_PREFIXES = [
  "--uds-text-",
  "--uds-surface-",
  "--uds-border-",
  "--uds-icon-",
  "--uds-code-",
  "--uds-scrim-",
  "--uds-shadow-",
  "--uds-system-",
] as const;

const ACCENT_PATTERN = /accent/i;
const PRIMITIVE_COLOR_REFERENCE_PATTERN = /var\(--uds-color-[a-z0-9-]+\)/i;
const TIER_ORDER = ["primary", "secondary", "tertiary", "quaternary"] as const;
const CSS_VAR_REFERENCE_PATTERN = /^var\((--[a-z0-9-]+)\)$/i;
const HEX_COLOR_PATTERN = /^#([0-9a-f]{3,8})$/i;
const COLOR_FUNCTION_PATTERN = /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(/i;

function extractTokenMap(cssSource: string): Map<string, string> {
  const tokenMap = new Map<string, string>();
  const declarationPattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null = declarationPattern.exec(cssSource);

  while (match) {
    tokenMap.set(match[1], match[2].trim());
    match = declarationPattern.exec(cssSource);
  }

  return tokenMap;
}

function extractModeBlocks(cssSource: string, selector: ":root" | ".theme-dark"): string {
  const selectorPattern = new RegExp(`\\${selector}\\s*\\{([\\s\\S]*?)\\}`, "gi");
  const blocks: string[] = [];
  let match: RegExpExecArray | null = selectorPattern.exec(cssSource);

  while (match) {
    blocks.push(match[1]);
    match = selectorPattern.exec(cssSource);
  }

  return blocks.join("\n");
}

function rowsForPrimitivePrefixes(prefixes: readonly string[], tokenMap: Map<string, string>) {
  return Array.from(tokenMap.entries())
    .filter(([tokenName]) => prefixes.some((prefix) => tokenName.startsWith(prefix)))
    .map(([token, value]) => ({ token, value }))
    .sort((left, right) => left.token.localeCompare(right.token));
}

function tierSortRank(tokenName: string): number {
  const exactTierIndex = TIER_ORDER.findIndex((tier) => tokenName.endsWith(`-${tier}`));
  if (exactTierIndex >= 0 && !tokenName.includes("-brand-")) {
    return exactTierIndex;
  }
  if (exactTierIndex >= 0 && tokenName.includes("-brand-")) {
    return TIER_ORDER.length + exactTierIndex;
  }
  return Number.POSITIVE_INFINITY;
}

function shouldIncludeSemanticRow(tokenName: string, lightValue: string, darkValue: string): boolean {
  if (
    tokenName.startsWith("--uds-icon-") ||
    tokenName.startsWith("--uds-system-") ||
    tokenName.startsWith("--uds-code-") ||
    tokenName.startsWith("--uds-scrim-") ||
    tokenName.startsWith("--uds-shadow-")
  ) {
    return true;
  }

  const tokenOrValueHasAccent =
    ACCENT_PATTERN.test(tokenName) ||
    ACCENT_PATTERN.test(lightValue) ||
    ACCENT_PATTERN.test(darkValue);

  if (tokenOrValueHasAccent) {
    return false;
  }

  const referencesPrimitiveColor =
    tokenName.startsWith("--uds-color-") ||
    PRIMITIVE_COLOR_REFERENCE_PATTERN.test(lightValue) ||
    PRIMITIVE_COLOR_REFERENCE_PATTERN.test(darkValue);

  return !referencesPrimitiveColor;
}

function isDirectColorValue(value: string): boolean {
  const normalized = value.trim();
  if (normalized === "transparent") {
    return true;
  }
  return HEX_COLOR_PATTERN.test(normalized) || COLOR_FUNCTION_PATTERN.test(normalized);
}

function resolveColorValue(
  rawValue: string,
  primaryTokenMap: Map<string, string>,
  fallbackTokenMap?: Map<string, string>,
  visited = new Set<string>()
): string | null {
  const normalized = rawValue.trim();
  if (isDirectColorValue(normalized)) {
    return normalized;
  }

  const referenceMatch = normalized.match(CSS_VAR_REFERENCE_PATTERN);
  if (!referenceMatch) {
    return null;
  }

  const referenceToken = referenceMatch[1];
  if (visited.has(referenceToken)) {
    return null;
  }

  const referencedValue = primaryTokenMap.get(referenceToken) ?? fallbackTokenMap?.get(referenceToken);
  if (!referencedValue) {
    return null;
  }

  visited.add(referenceToken);
  return resolveColorValue(referencedValue, primaryTokenMap, fallbackTokenMap, visited);
}

async function copyToClipboard(value: string): Promise<void> {
  if (typeof window === "undefined") return;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function renderValueCell(value: string, resolvedColor: string | null) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {resolvedColor ? (
        <span
          aria-hidden="true"
          title={resolvedColor}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "var(--uds-radius-4)",
            border: "1px solid var(--uds-border-primary)",
            backgroundColor: resolvedColor,
            display: "inline-block",
            flex: "0 0 auto",
          }}
        />
      ) : null}
      <span>{value}</span>
      <Button
        appearance="ghost"
        size="xsmall"
        layout="icon-only"
        icon="Copy"
        label="Copy value"
        aria-label={`Copy value ${value}`}
        onClick={() => {
          void copyToClipboard(value);
        }}
      />
    </div>
  );
}

const primitiveTokenSource = [
  tokensCss,
  blurPrimitivesCss,
  boxShadowPrimitivesCss,
  containerPrimitivesCss,
  elevationPrimitivesCss,
  gapPrimitivesCss,
  sizingPrimitivesCss,
].join("\n");

const primitiveTokenMap = extractTokenMap(primitiveTokenSource);
const primitiveGroupEntries = Object.entries(PRIMITIVE_GROUPS).map(([groupName, prefixes]) => ({
  groupName,
  rows: rowsForPrimitivePrefixes(prefixes, primitiveTokenMap),
}));

const lightTokenMap = extractTokenMap(extractModeBlocks(tokensCss, ":root"));
const darkTokenMap = extractTokenMap(extractModeBlocks(tokensCss, ".theme-dark"));

function rowsForSemanticPrefixes(prefixes: readonly string[]) {
  const allTokens = Array.from(new Set([...lightTokenMap.keys(), ...darkTokenMap.keys()]));
  return allTokens
    .filter((tokenName) => prefixes.some((prefix) => tokenName.startsWith(prefix)))
    .map((token) => {
      const lightValue = lightTokenMap.get(token) ?? "—";
      const darkValue = darkTokenMap.get(token) ?? "—";
      const resolvedLightColor = resolveColorValue(lightValue, lightTokenMap);
      const resolvedDarkColor = resolveColorValue(darkValue, darkTokenMap, lightTokenMap);
      return {
        token,
        lightValue: renderValueCell(lightValue, resolvedLightColor),
        darkValue: renderValueCell(darkValue, resolvedDarkColor),
        _rawLightValue: lightValue,
        _rawDarkValue: darkValue,
      };
    })
    .filter((row) => shouldIncludeSemanticRow(row.token, row._rawLightValue, row._rawDarkValue))
    .sort((left, right) => {
      const leftRank = tierSortRank(left.token);
      const rightRank = tierSortRank(right.token);
      if (leftRank !== rightRank) {
        return leftRank - rightRank;
      }
      return left.token.localeCompare(right.token);
    });
}

const allSemanticRows = rowsForSemanticPrefixes(SEMANTIC_PREFIXES);
const semanticGroupEntries = Object.entries(SEMANTIC_GROUPS).map(([groupName, prefixes]) => ({
  groupName,
  rows: rowsForSemanticPrefixes(prefixes),
}));
const groupedSemanticTokens = new Set(
  semanticGroupEntries.flatMap((entry) => entry.rows).map((row) => row.token)
);
const semanticInventoryRows = allSemanticRows.filter((row) => !groupedSemanticTokens.has(row.token));

export function DesignTokensPage() {
  const [activePrimitiveGroupIndex, setActivePrimitiveGroupIndex] = useState(0);
  const [activeSemanticGroupIndex, setActiveSemanticGroupIndex] = useState(0);

  const primitiveTabItems = useMemo(
    () => primitiveGroupEntries.map((entry) => ({ id: entry.groupName, label: entry.groupName })),
    []
  );
  const semanticTabItems = useMemo(
    () => semanticGroupEntries.map((entry) => ({ id: entry.groupName, label: entry.groupName })),
    []
  );

  const activePrimitiveGroup =
    primitiveGroupEntries[activePrimitiveGroupIndex] ?? primitiveGroupEntries[0];
  const activeSemanticGroup =
    semanticGroupEntries[activeSemanticGroupIndex] ?? semanticGroupEntries[0];

  return (
    <DocPageLayout
      title="Design Tokens"
      description="Design tokens keep visual decisions consistent across brands and themes."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="0">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Primitive Sections
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Primitive variables are base design decisions for spacing, typography, shape, shadow, border width,
            focus ring, and motion.
          </Text>
        </Layout>
        <Tabs
          tabs={primitiveTabItems}
          appearance="underline"
          activeTab={activePrimitiveGroupIndex}
          onTabChange={(index: unknown) => {
            if (typeof index === "number") {
              setActivePrimitiveGroupIndex(index);
            }
          }}
        />
        <Table columns={PRIMITIVE_COLUMNS} data={activePrimitiveGroup?.rows ?? []} />

        <Divider variant="solid" />

        {semanticInventoryRows.length > 0 ? (
          <Table columns={SEMANTIC_COLUMNS} data={semanticInventoryRows} />
        ) : null}

        <Layout direction="column" gap="12">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Semantic Sections
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Semantic variables map design intent to implementable CSS properties for text, surface, border, icon,
            code, scrim, shadow, and system feedback values.
          </Text>
          <Tabs
            tabs={semanticTabItems}
            appearance="underline"
            activeTab={activeSemanticGroupIndex}
            onTabChange={(index: unknown) => {
              if (typeof index === "number") {
                setActiveSemanticGroupIndex(index);
              }
            }}
          />
          <Table columns={SEMANTIC_COLUMNS} data={activeSemanticGroup?.rows ?? []} />
        </Layout>
      </Layout>
    </DocPageLayout>
  );
}
