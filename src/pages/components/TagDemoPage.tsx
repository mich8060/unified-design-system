import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Tag } from "../../design-system/components/Tag";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TAG_COLORS = [
  "transparent",
  "neutral",
  "red",
  "orange",
  "yellow",
  "emerald",
  "green",
  "sky",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "fuchsia",
  "magenta",
  "inverse",
] as const;

const TAG_APPEARANCES = ["label-only", "icon-left"] as const;
const TAG_SIZES = ["compact", "default"] as const;

const TAG_PROPS: ComponentPropRow[] = [
  { prop: "label", type: "string", defaultValue: '"Label"', description: "Text content inside the tag." },
  { prop: "appearance", type: '"label-only" | "icon-left"', defaultValue: '"label-only"', description: "Controls whether an icon is shown at the left." },
  { prop: "size", type: '"compact" | "default"', defaultValue: '"compact"', description: "Tag size variant." },
  {
    prop: "color",
    type: TAG_COLORS.map((color) => `"${color}"`).join(" | "),
    defaultValue: '"transparent"',
    description: "Color token variant applied to the tag.",
  },
  { prop: "rounded", type: "boolean", defaultValue: "true", description: "Toggles rounded corner shape." },
  { prop: "pastel", type: "boolean", defaultValue: "false", description: "Toggles pastel treatment with lighter color fills." },
  { prop: "solid", type: "boolean", defaultValue: "false", description: "Toggles solid fill treatment." },
  { prop: "outlined", type: "boolean", defaultValue: "false", description: "Toggles outlined treatment with a visible border." },
  { prop: "icon", type: "string | ReactNode", defaultValue: "-", description: "Icon when appearance is `icon-left`." },
  { prop: "onClick", type: "(event) => void", defaultValue: "-", description: "Makes tag interactive and renders as a button." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for tag root." },
];

const APPEARANCE_SNIPPET = `<Tag label="Label Only" appearance="label-only" />
<Tag label="Icon Left" appearance="icon-left" icon="Tag" />`;

const SIZE_SNIPPET = `<Tag label="Compact" size="compact" appearance="icon-left" icon="Tag" />
<Tag label="Default" size="default" appearance="icon-left" icon="Tag" />`;

const PASTEL_SNIPPET = `<Tag label="Blue Pastel" color="blue" pastel />
<Tag label="Emerald Pastel" color="emerald" pastel />
<Tag label="Magenta Pastel" color="magenta" pastel />`;

const SHAPE_FILL_SNIPPET = `<Tag label="Rounded + Subtle" color="blue" rounded />
<Tag label="Square + Subtle" color="blue" rounded={false} />
<Tag label="Rounded + Pastel" color="blue" rounded pastel />
<Tag label="Square + Pastel" color="blue" rounded={false} pastel />
<Tag label="Rounded + Outlined" color="blue" rounded outlined />
<Tag label="Square + Outlined" color="blue" rounded={false} outlined />
<Tag label="Rounded + Solid" color="blue" rounded solid />
<Tag label="Square + Solid" color="blue" rounded={false} solid />`;

const COLOR_MATRIX_SNIPPET = `{TAG_COLORS.map((color) => (
  <Tag key={color} label={color} color={color} />
))}

{TAG_COLORS.map((color) => (
  <Tag key={\`\${color}-pastel\`} label={color} color={color} pastel />
))}

{TAG_COLORS.map((color) => (
  <Tag key={\`\${color}-outlined\`} label={color} color={color} outlined />
))}

{TAG_COLORS.map((color) => (
  <Tag key={\`\${color}-solid\`} label={color} color={color} solid />
))}`;

export function TagDemoPage() {
  return (
    <DocPageLayout
      title="Tag"
      description="Tag displays small labels for status, metadata, and categorization with color and style variants."
    >
      <Layout direction="column" gap="40">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Appearance Variants
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Tag label="Label Only" appearance="label-only" />
            <Tag label="Icon Left" appearance="icon-left" icon="Tag" />
          </Layout>
          <Code language="tsx" code={APPEARANCE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Sizes
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Tag label="Compact" size="compact" appearance="icon-left" icon="Tag" />
            <Tag label="Default" size="default" appearance="icon-left" icon="Tag" />
          </Layout>
          <Code language="tsx" code={SIZE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Pastel Tags
          </Text>
          <Text as="p" variant="body-14" weight="regular" leading="regular">
            Pastel keeps the same preset colors with lighter surfaces for reduced visual intensity.
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Tag label="Blue Pastel" color="blue" pastel />
            <Tag label="Emerald Pastel" color="emerald" pastel />
            <Tag label="Magenta Pastel" color="magenta" pastel />
          </Layout>
          <Code language="tsx" code={PASTEL_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Shape and Treatment
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Tag label="Rounded + Subtle" color="blue" rounded />
            <Tag label="Square + Subtle" color="blue" rounded={false} />
            <Tag label="Rounded + Pastel" color="blue" rounded pastel />
            <Tag label="Square + Pastel" color="blue" rounded={false} pastel />
            <Tag label="Rounded + Outlined" color="blue" rounded outlined />
            <Tag label="Square + Outlined" color="blue" rounded={false} outlined />
            <Tag label="Rounded + Solid" color="blue" rounded solid />
            <Tag label="Square + Solid" color="blue" rounded={false} solid />
          </Layout>
          <Code language="tsx" code={SHAPE_FILL_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Every Color (Label-Only)
          </Text>
          <Text as="p" variant="body-14" weight="regular" leading="regular">
            Subtle
          </Text>
          <Layout alignItems="center" gap="10" wrap>
            {TAG_COLORS.map((color) => (
              <Tag key={`${color}-subtle`} label={color} color={color} />
            ))}
          </Layout>
          <Text as="p" variant="body-14" weight="regular" leading="regular">
            Pastel
          </Text>
          <Layout alignItems="center" gap="10" wrap>
            {TAG_COLORS.map((color) => (
              <Tag key={`${color}-pastel`} label={color} color={color} pastel />
            ))}
          </Layout>
          <Text as="p" variant="body-14" weight="regular" leading="regular">
            Outlined
          </Text>
          <Layout alignItems="center" gap="10" wrap>
            {TAG_COLORS.map((color) => (
              <Tag key={`${color}-outlined`} label={color} color={color} outlined />
            ))}
          </Layout>
          <Text as="p" variant="body-14" weight="regular" leading="regular">
            Solid
          </Text>
          <Layout alignItems="center" gap="10" wrap>
            {TAG_COLORS.map((color) => (
              <Tag key={`${color}-solid`} label={color} color={color} solid />
            ))}
          </Layout>
          <Code language="tsx" code={COLOR_MATRIX_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Every Color (Icon-Left)
          </Text>
          {TAG_APPEARANCES.map((appearance) =>
            appearance === "icon-left" ? (
              <Layout key={appearance} direction="column" gap="10">
                {TAG_SIZES.map((size) => (
                  <Layout key={`${appearance}-${size}`} direction="column" gap="8">
                    <Text as="p" variant="body-14" weight="semibold" leading="regular">
                      {size === "compact" ? "Compact" : "Default"}
                    </Text>
                    <Layout alignItems="center" gap="10" wrap>
                      {TAG_COLORS.map((color) => (
                        <Tag
                          key={`${appearance}-${size}-${color}`}
                          label={color}
                          color={color}
                          size={size}
                          appearance="icon-left"
                          icon="Tag"
                          solid
                        />
                      ))}
                    </Layout>
                  </Layout>
                ))}
              </Layout>
            ) : null
          )}
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TAG_PROPS} title="Tag Props" />
    </DocPageLayout>
  );
}
