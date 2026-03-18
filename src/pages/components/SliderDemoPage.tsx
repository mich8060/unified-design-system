import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Slider } from "../../design-system/components/Slider";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const SLIDER_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "number | [number, number]", defaultValue: "min (uncontrolled)", description: "Current value for single slider, or tuple for range slider." },
  { prop: "onChange", type: "(value: number | [number, number]) => void", defaultValue: "-", description: "Called when slider value changes." },
  { prop: "min", type: "number", defaultValue: "0", description: "Minimum allowed value." },
  { prop: "max", type: "number", defaultValue: "100", description: "Maximum allowed value." },
  { prop: "step", type: "number", defaultValue: "1", description: "Step increment between selectable values." },
  { prop: "range", type: "boolean", defaultValue: "false", description: "Enables dual-thumb range behavior." },
  { prop: "showLabels", type: "boolean", defaultValue: "false", description: "Shows percentage labels under slider." },
  { prop: "label", type: "string", defaultValue: "-", description: "Header label shown above slider." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and updates styling." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on root element." },
];

function toNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toRange(value: unknown, fallback: [number, number]): [number, number] {
  if (Array.isArray(value) && value.length >= 2) {
    return [toNumber(value[0], fallback[0]), toNumber(value[1], fallback[1])];
  }
  return fallback;
}

export function SliderDemoPage() {
  const [volume, setVolume] = useState(35);
  const [steppedValue, setSteppedValue] = useState(40);
  const [priceRange, setPriceRange] = useState<[number, number]>([25, 75]);

  return (
    <DocPageLayout
      title="Slider"
      description="Slider enables numeric value selection for single values or ranges within a bounded min/max scale."
    >
      <Layout direction="column" gap="40">
        <Layout direction="column" gap="10">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic Slider
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Single-value slider with a live value readout.
          </Text>
          <Layout direction="column" gap="8" style={{ maxWidth: "560px" }}>
            <Slider
              label="Volume"
              min={0}
              max={100}
              value={volume}
              onChange={(next: unknown) => setVolume(toNumber(next, volume))}
            />
            <Text as="span" variant="body-14" leading="regular">
              Current value: {volume}
            </Text>
          </Layout>
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="10">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            With Labels
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Show percentage labels to communicate relative progress.
          </Text>
          <Layout direction="column" gap="8" style={{ maxWidth: "560px" }}>
            <Slider
              label="Completion"
              min={0}
              max={100}
              value={volume}
              onChange={(next: unknown) => setVolume(toNumber(next, volume))}
              showLabels
            />
          </Layout>
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="10">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Stepped Values
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Use larger step intervals for coarse-grained selections.
          </Text>
          <Layout direction="column" gap="8" style={{ maxWidth: "560px" }}>
            <Slider
              label="Zoom Level"
              min={0}
              max={100}
              step={10}
              value={steppedValue}
              onChange={(next: unknown) => setSteppedValue(toNumber(next, steppedValue))}
              showLabels
            />
            <Text as="span" variant="body-14" leading="regular">
              Step value: {steppedValue}
            </Text>
          </Layout>
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="10">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Range Slider
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Dual-thumb slider for selecting a min and max range.
          </Text>
          <Layout direction="column" gap="8" style={{ maxWidth: "560px" }}>
            <Slider
              label="Price Range"
              min={0}
              max={100}
              range
              showLabels
              value={priceRange as unknown as number}
              onChange={(next: unknown) => setPriceRange(toRange(next, priceRange))}
            />
            <Text as="span" variant="body-14" leading="regular">
              Selected range: {priceRange[0]} - {priceRange[1]}
            </Text>
          </Layout>
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="10">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Disabled
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Disabled slider preserves value display while preventing interaction.
          </Text>
          <Layout direction="column" gap="8" style={{ maxWidth: "560px" }}>
            <Slider label="Disabled Slider" min={0} max={100} value={60} disabled />
          </Layout>
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={SLIDER_PROPS} title="Slider Props" />
    </DocPageLayout>
  );
}
