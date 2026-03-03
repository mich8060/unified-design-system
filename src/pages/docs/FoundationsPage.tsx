import { Flex, Table, Text } from "../../design-system";
import { colorTokens } from "../../design-system/tokens/runtime/color";
import { motionTokens } from "../../design-system/tokens/runtime/motion";
import { radiusTokens } from "../../design-system/tokens/runtime/radius";
import { shadowTokens } from "../../design-system/tokens/runtime/shadow";
import { spacingTokens } from "../../design-system/tokens/runtime/spacing";
import { typographyTokens } from "../../design-system/tokens/runtime/typography";
import { DocPageLayout } from "./DocPageLayout";

const PRIMITIVE_COLUMNS = [
  { key: "token", label: "Token" },
  { key: "value", label: "Value" },
];

const spacingRows = Object.entries(spacingTokens).map(([token, value]) => ({
  token: `--uds-spacing-${token}`,
  value,
}));

const radiusRows = Object.entries(radiusTokens).map(([token, value]) => ({
  token: `--uds-radius-${token}`,
  value,
}));

const motionRows = Object.entries(motionTokens).map(([token, value]) => ({
  token,
  value,
}));

const shadowRows = Object.entries(shadowTokens.light).map(([token, value]) => ({
  token,
  value,
}));

const typographyRows = Object.entries(typographyTokens.root)
  .filter(([token]) => token.startsWith("--uds-font-size-") || token.startsWith("--uds-line-"))
  .map(([token, value]) => ({
    token,
    value,
  }));

type ColorSwatch = {
  name: string;
  value: string;
};

function SwatchGroup({ title, swatches }: { title: string; swatches: ColorSwatch[] }) {
  return (
    <Flex direction="column" gap="8">
      <Text as="h3" variant="heading-24" weight="medium" leading="regular">
        {title}
      </Text>
      <Flex gap="12" wrap>
        {swatches.map((swatch) => (
          <Flex
            key={`${title}-${swatch.name}`}
            direction="column"
            gap="8"
            style={{
              width: "132px",
              padding: "8px",
              border: "1px solid var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-8)",
              backgroundColor: "var(--uds-surface-primary)",
            }}
          >
            <div
              style={{
                height: "48px",
                borderRadius: "var(--uds-radius-4)",
                border: "1px solid var(--uds-border-primary)",
                backgroundColor: swatch.value,
              }}
            />
            <Text as="span" variant="body-12" weight="semibold" leading="regular">
              {swatch.name}
            </Text>
            <Text as="span" variant="body-12" leading="regular">
              {swatch.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export function FoundationsPage() {
  return (
    <DocPageLayout
      title="Foundations"
      description="Color scales and primitive tokens used as the base layer of the design system."
    >
      <Flex direction="column" gap="24">
        <Text as="h2" variant="heading-24" weight="bold" leading="regular">
          Colors
        </Text>

        <SwatchGroup
          title="System Colors"
          swatches={Object.entries(colorTokens.system).map(([name, value]) => ({ name, value }))}
        />

        <SwatchGroup
          title="Neutral Scale"
          swatches={Object.entries(colorTokens.neutrals).map(([tone, value]) => ({
            name: `neutrals-${tone}`,
            value,
          }))}
        />

        <SwatchGroup
          title="Brand Primary Scale"
          swatches={Object.entries(colorTokens.brand.primary).map(([tone, value]) => ({
            name: `primary-${tone}`,
            value,
          }))}
        />

        <SwatchGroup
          title="Accent Scales (500 tone)"
          swatches={Object.entries(colorTokens.accent).map(([family, tones]) => ({
            name: `${family}-500`,
            value: tones["500"],
          }))}
        />

        <Text as="h2" variant="heading-24" weight="bold" leading="regular">
          Primitives
        </Text>

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Spacing
          </Text>
          <Table columns={PRIMITIVE_COLUMNS} data={spacingRows} />
        </Flex>

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Radius
          </Text>
          <Table columns={PRIMITIVE_COLUMNS} data={radiusRows} />
        </Flex>

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Typography (Sizes and Line Heights)
          </Text>
          <Table columns={PRIMITIVE_COLUMNS} data={typographyRows} />
        </Flex>

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Motion
          </Text>
          <Table columns={PRIMITIVE_COLUMNS} data={motionRows} />
        </Flex>

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            Shadow (Light Theme)
          </Text>
          <Table columns={PRIMITIVE_COLUMNS} data={shadowRows} />
        </Flex>
      </Flex>
    </DocPageLayout>
  );
}
