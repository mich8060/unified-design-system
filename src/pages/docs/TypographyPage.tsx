import { useMemo, useState } from "react";
import { Layout } from "../../design-system/components/Layout";
import { Table } from "../../design-system/components/Table";
import { Tabs } from "../../design-system/components/Tabs";
import { Text } from "../../design-system/components/Text";
import { typographyTokens } from "../../design-system/tokens/runtime/typography";
import { DocPageLayout } from "./DocPageLayout";

type TypographyTokenMap = Record<string, string>;

const SCALE_COLUMNS = [
  { key: "preview", label: "Preview" },
];

const WEIGHT_COLUMNS = [
  { key: "token", label: "Token" },
  { key: "value", label: "Value" },
  { key: "preview", label: "Preview" },
];

const viewportOptions = [
  { id: "desktop", label: "Desktop", tokens: typographyTokens.root },
  { id: "tablet", label: "Tablet", tokens: typographyTokens.tablet },
  { id: "mobile", label: "Mobile", tokens: typographyTokens.mobile },
] as const;

function getScaleRows(scaleTokens: TypographyTokenMap) {
  const sizeEntries = Object.entries(scaleTokens)
    .filter(([token]) => token.startsWith("--uds-font-size-"))
    .map(([token, size]) => {
      const suffix = token.replace("--uds-font-size-", "");
      const lineHeightToken = `--uds-line-${suffix}`;
      const lineHeight = scaleTokens[lineHeightToken] ?? "—";
      return { token, size, lineHeight };
    })
    .sort((left, right) => Number(right.size.replace("px", "")) - Number(left.size.replace("px", "")));

  return sizeEntries.map((entry) => ({
    preview: (
      <Layout direction="column" gap="4">
        <span
          style={{
            display: "block",
            fontFamily: "var(--uds-font-family)",
            fontSize: entry.size,
            fontWeight: "var(--uds-font-weight-medium)",
            lineHeight: entry.lineHeight,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          The quick brown fox jumps over the lazy dog.
        </span>
        <Text as="span" variant="body-12" leading="regular" tone="secondary">
          token: {entry.token} | size: {entry.size} | line-height: {entry.lineHeight}
        </Text>
      </Layout>
    ),
  }));
}

const weightRows = [
  { token: "--uds-font-weight", value: typographyTokens.root["--uds-font-weight"] },
  { token: "--uds-font-weight-medium", value: typographyTokens.root["--uds-font-weight-medium"] },
  { token: "--uds-font-weight-semibold", value: typographyTokens.root["--uds-font-weight-semibold"] },
  { token: "--uds-font-weight-bold", value: typographyTokens.root["--uds-font-weight-bold"] },
].map((entry) => ({
  ...entry,
  preview: (
    <span
      style={{
        fontFamily: "var(--uds-font-family)",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: entry.value,
      }}
    >
      Typography weight sample
    </span>
  ),
}));

export function TypographyPage() {
  const [activeViewportIndex, setActiveViewportIndex] = useState(0);

  const viewportTabs = useMemo(
    () => viewportOptions.map((item) => ({ id: item.id, label: item.label })),
    []
  );

  const activeViewport = viewportOptions[activeViewportIndex] ?? viewportOptions[0];
  const scaleRows = useMemo(() => getScaleRows(activeViewport.tokens), [activeViewport]);

  return (
    <DocPageLayout
      title="Typography"
      description="Typography foundations define readable type scales, line heights, and weights across desktop, tablet, and mobile breakpoints."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="8">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Type Scale
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Reference these font size and line-height tokens when defining text hierarchy. Toggle viewport tabs to inspect responsive scale adjustments.
          </Text>
        </Layout>

        <Tabs
          tabs={viewportTabs}
          appearance="underline"
          activeTab={activeViewportIndex}
          onTabChange={(index: unknown) => {
            if (typeof index === "number") {
              setActiveViewportIndex(index);
            }
          }}
        />

        <Table columns={SCALE_COLUMNS} data={scaleRows} />

        <Layout direction="column" gap="8">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Font Weights
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            These weight tokens are used throughout heading, label, and body text variants.
          </Text>
        </Layout>

        <Table columns={WEIGHT_COLUMNS} data={weightRows} />
      </Layout>
    </DocPageLayout>
  );
}
