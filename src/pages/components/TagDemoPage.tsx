import { Divider, Flex, Tag, Text } from "../../design-system";
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
  { prop: "solid", type: "boolean", defaultValue: "false", description: "Toggles solid fill treatment." },
  { prop: "icon", type: "string | ReactNode", defaultValue: "-", description: "Icon when appearance is `icon-left`." },
  { prop: "onClick", type: "(event) => void", defaultValue: "-", description: "Makes tag interactive and renders as a button." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for tag root." },
];

export function TagDemoPage() {
  return (
    <DocPageLayout
      title="Tag"
      description="Tag displays small labels for status, metadata, and categorization with color and style variants."
    >
      <Flex direction="column" gap="40">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Tag label="Default tag" />
            <Tag label="Icon tag" appearance="icon-left" icon="Tag" />
            <Tag label="Interactive tag" onClick={() => undefined} />
          </Flex>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Sizes
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Tag label="Compact" size="compact" appearance="icon-left" icon="Tag" />
            <Tag label="Default" size="default" appearance="icon-left" icon="Tag" />
          </Flex>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Shape and Fill
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Tag label="Rounded + Outline" color="blue" rounded solid={false} />
            <Tag label="Rounded + Solid" color="blue" rounded solid />
            <Tag label="Square + Outline" color="blue" rounded={false} solid={false} />
            <Tag label="Square + Solid" color="blue" rounded={false} solid />
          </Flex>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Color Variants
          </Text>
          <Flex alignItems="center" gap="10" wrap>
            {TAG_COLORS.map((color) => (
              <Tag key={color} label={color} color={color} solid />
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TAG_PROPS} title="Tag Props" />
    </DocPageLayout>
  );
}
