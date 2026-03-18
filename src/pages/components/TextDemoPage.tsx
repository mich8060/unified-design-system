import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TEXT_VARIANTS = [
  "display-128",
  "display-96",
  "display-72",
  "display-60",
  "display-48",
  "display-36",
  "heading-32",
  "heading-28",
  "heading-24",
  "body-20",
  "body-16",
  "body-14",
  "body-12",
] as const;

const TEXT_PROPS: ComponentPropRow[] = [
  {
    prop: "variant",
    type: [
      '"display-128"',
      '"display-96"',
      '"display-72"',
      '"display-60"',
      '"display-48"',
      '"display-36"',
      '"heading-32"',
      '"heading-28"',
      '"heading-24"',
      '"body-20"',
      '"body-16"',
      '"body-14"',
      '"body-12"',
    ].join(" | "),
    defaultValue: "-",
    description: "Type scale variant token.",
  },
  { prop: "weight", type: '"regular" | "medium" | "semibold" | "bold"', defaultValue: '"regular"', description: "Font weight token." },
  { prop: "leading", type: '"tight" | "regular" | "loose"', defaultValue: '"regular"', description: "Line-height token." },
  { prop: "tone", type: '"primary" | "secondary" | "tertiary" | "muted" | "placeholder" | "disabled"', defaultValue: '"primary"', description: "Semantic text color tone." },
  { prop: "clamp", type: "number", defaultValue: "-", description: "Line clamp value for truncation." },
  { prop: "as", type: "ElementType", defaultValue: '"p"', description: "Semantic element to render." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on text root." },
];

export function TextDemoPage() {
  return (
    <DocPageLayout
      title="Text"
      description="Text defines hierarchy and readability. Choose variants by semantic role first, then adjust weight and leading."
    >
      <Layout direction="column" gap="8">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Typography Scale
        </Text>
        <Layout direction="column" gap="4">
          {TEXT_VARIANTS.map((variant) => (
            <Text key={variant} as="p" variant={variant} weight="regular" leading="regular">
              {variant}
            </Text>
          ))}
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="8">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Weight Variants
        </Text>
        <Layout direction="column" gap="4">
          <Text as="p" variant="body-16" weight="regular" leading="regular">Regular body-16</Text>
          <Text as="p" variant="body-16" weight="medium" leading="regular">Medium body-16</Text>
          <Text as="p" variant="body-16" weight="semibold" leading="regular">Semibold body-16</Text>
          <Text as="p" variant="body-16" weight="bold" leading="regular">Bold body-16</Text>
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="8">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Leading Variants
        </Text>
        <Layout direction="column" gap="4">
          <Text as="p" variant="body-16" weight="regular" leading="tight">Tight leading body text sample.</Text>
          <Text as="p" variant="body-16" weight="regular" leading="regular">Regular leading body text sample.</Text>
          <Text as="p" variant="body-16" weight="regular" leading="loose">Loose leading body text sample.</Text>
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="8">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Tone Variants
        </Text>
        <Layout direction="column" gap="4">
          <Text as="p" variant="body-14" tone="primary">Primary tone text</Text>
          <Text as="p" variant="body-14" tone="secondary">Secondary tone text</Text>
          <Text as="p" variant="body-14" tone="tertiary">Tertiary tone text</Text>
          <Text as="p" variant="body-14" tone="placeholder">Placeholder tone text</Text>
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="8">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Clamp
        </Text>
        <Text as="p" variant="body-14" clamp={2}>
          This paragraph is clamped to two lines. Use the clamp prop for card/list layouts where
          description copy should remain compact and not push sibling content out of alignment.
        </Text>
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="8">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Semantic Element Variants
        </Text>
        <Layout direction="column" gap="4">
          <Text as="h1" variant="heading-32" weight="semibold" leading="regular">Rendered as h1</Text>
          <Text as="h3" variant="heading-24" weight="semibold" leading="regular">Rendered as h3</Text>
          <Text as="span" variant="body-14" weight="regular" leading="regular">Rendered as span</Text>
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TEXT_PROPS} />
    </DocPageLayout>
  );
}
