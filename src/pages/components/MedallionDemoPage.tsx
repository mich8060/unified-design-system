import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Flex } from "../../design-system/components/Flex";
import { Medallion } from "../../design-system/components/Medallion";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const MEDALLION_COLORS = [
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

const MEDALLION_SHAPES = ["circle", "square", "roundedSquare", "diamond"] as const;
const MEDALLION_SIZES = ["small", "default", "large", "xl"] as const;

const MEDALLION_PROPS: ComponentPropRow[] = [
  { prop: "icon", type: "string | ReactNode", defaultValue: '"FileText"', description: "Icon content displayed in the medallion." },
  { prop: "shape", type: '"circle" | "square" | "roundedSquare" | "diamond"', defaultValue: '"circle"', description: "Shape variant for the medallion container." },
  { prop: "size", type: '"small" | "default" | "large" | "xl"', defaultValue: '"default"', description: "Size variant for the medallion." },
  {
    prop: "color",
    type: MEDALLION_COLORS.map((color) => `"${color}"`).join(" | "),
    defaultValue: '"neutral"',
    description: "Preset color palette aligned with Tag colors.",
  },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for the medallion root." },
];

const BASIC_SNIPPET = `<Medallion />
<Medallion icon="FileText" color="blue" />
<Medallion icon="FileText" color="green" />`;

const SHAPES_SNIPPET = `<Medallion shape="circle" color="blue" />
<Medallion shape="square" color="blue" />
<Medallion shape="roundedSquare" color="blue" />
<Medallion shape="diamond" color="blue" />`;

const SIZES_SNIPPET = `<Medallion size="small" color="blue" />
<Medallion size="default" color="blue" />
<Medallion size="large" color="blue" />
<Medallion size="xl" color="blue" />`;

const COLORS_SNIPPET = `{MEDALLION_COLORS.map((color) => (
  <Medallion key={color} color={color} icon="FileText" />
))}`;

const MATRIX_SNIPPET = `{MEDALLION_SIZES.map((size) => (
  <Flex key={size} direction="column" gap="8">
    <Text as="p" variant="body-14" weight="semibold" leading="regular">
      {size}
    </Text>
    <Flex alignItems="center" gap="10" wrap>
      {MEDALLION_SHAPES.map((shape) => (
        <Medallion key={\`\${size}-\${shape}\`} size={size} shape={shape} color="blue" />
      ))}
    </Flex>
  </Flex>
))}`;

export function MedallionDemoPage() {
  return (
    <DocPageLayout
      title="Medallion"
      description="Medallion displays an icon inside shape and color variants using the same preset palette as Tag."
    >
      <Flex direction="column" gap="40">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Medallion />
            <Medallion icon="FileText" color="blue" />
            <Medallion icon="FileText" color="green" />
          </Flex>
          <Code language="tsx" code={BASIC_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Shapes
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Medallion shape="circle" color="blue" />
            <Medallion shape="square" color="blue" />
            <Medallion shape="roundedSquare" color="blue" />
            <Medallion shape="diamond" color="blue" />
          </Flex>
          <Code language="tsx" code={SHAPES_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Sizes
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Medallion size="small" color="blue" />
            <Medallion size="default" color="blue" />
            <Medallion size="large" color="blue" />
            <Medallion size="xl" color="blue" />
          </Flex>
          <Code language="tsx" code={SIZES_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Colors
          </Text>
          <Flex alignItems="center" gap="10" wrap>
            {MEDALLION_COLORS.map((color) => (
              <Medallion key={color} color={color} icon="FileText" />
            ))}
          </Flex>
          <Code language="tsx" code={COLORS_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Size x Shape Matrix
          </Text>
          <Flex direction="column" gap="12">
            {MEDALLION_SIZES.map((size) => (
              <Flex key={size} direction="column" gap="8">
                <Text as="p" variant="body-14" weight="semibold" leading="regular">
                  {size}
                </Text>
                <Flex alignItems="center" gap="10" wrap>
                  {MEDALLION_SHAPES.map((shape) => (
                    <Medallion key={`${size}-${shape}`} size={size} shape={shape} color="blue" />
                  ))}
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Code language="tsx" code={MATRIX_SNIPPET} />
        </Flex>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={MEDALLION_PROPS} title="Medallion Props" />
    </DocPageLayout>
  );
}
