import { Code, Divider, Layout, Statistics, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const STATISTICS_PROPS: ComponentPropRow[] = [
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Metric label/title text." },
  { prop: "value", type: "ReactNode", defaultValue: "-", description: "Primary KPI value." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Optional supporting context under the value." },
  { prop: "changeText", type: "ReactNode", defaultValue: "-", description: "Optional change indicator text." },
  { prop: "trend", type: '"up" | "down" | "neutral"', defaultValue: '"neutral"', description: "Color and icon direction for change row." },
  { prop: "icon", type: "string", defaultValue: "-", description: "Optional icon name shown in the leading icon tile." },
  { prop: "iconAccent", type: '"amber" | "aqua" | "blue" | "cyan" | "emerald" | "fuchsia" | "green" | "indigo" | "lime" | "magenta" | "orange" | "purple" | "red" | "rose" | "sky" | "violet" | "yellow"', defaultValue: "-", description: "Named icon-tile accent style (50 background + 600 icon)." },
  { prop: "labelBoxColor", type: "string", defaultValue: "-", description: "Custom icon-tile background color. Overrides iconAccent background when provided." },
  { prop: "progressValue", type: "number", defaultValue: "-", description: "Optional progress bar percentage (0-100)." },
  { prop: "progressLabel", type: "ReactNode", defaultValue: "-", description: "Label shown next to the progress bar." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for the root container." },
  { prop: "style", type: "CSSProperties", defaultValue: "-", description: "Inline styles for the root container." },
  { prop: "...rest", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "-", description: "Standard div attributes (id, data-*, aria-*, etc.)." },
];

const FULL_CARD_SNIPPET = `<Statistics
  label="Total Revenue"
  value="$45,290"
  helperText="12% increase from previous period"
  icon="CornersOut"
  iconAccent="red"
  progressValue={30}
  progressLabel="Improving"
/>`;

const MINIMAL_SNIPPET = `<Statistics
  label="Open Requisitions"
  value="42"
  helperText="Current month"
/>`;

const TREND_ONLY_SNIPPET = `<Statistics
  label="Avg Time to Fill"
  value="17d"
  helperText="Rolling 30-day average"
  changeText="No change"
  trend="neutral"
  icon="Clock"
/>`;

const LABEL_BOX_COLOR_SNIPPET = `<Statistics
  label="Pipeline Velocity"
  value="84%"
  icon="Gauge"
  labelBoxColor="var(--uds-system-success-subtle)"
/>`;

const ICON_ACCENT_SNIPPET = `<Statistics
  label="Pipeline Velocity"
  value="84%"
  icon="Gauge"
  iconAccent="sky"
/>`;

export function StatisticsDemoPage() {
  return (
    <DocPageLayout title="Statistics" description="Statistics presents KPI values with optional trend and helper context.">
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Dashboard Card</Text>
        <Statistics
          label="Total Revenue"
          value="$45,290"
          helperText="12% increase from previous period"
          icon="CornersOut"
          iconAccent="red"
          progressValue={30}
          progressLabel="Improving"
        />
        <Code language="tsx" code={FULL_CARD_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Minimal (Conditional Sections Hidden)</Text>
        <Statistics
          label="Open Requisitions"
          value="42"
          helperText="Current month"
        />
        <Code language="tsx" code={MINIMAL_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Trend</Text>
        <Statistics
          label="Avg Time to Fill"
          value="17d"
          helperText="Rolling 30-day average"
          changeText="No change"
          trend="neutral"
          icon="Clock"
        />
        <Code language="tsx" code={TREND_ONLY_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Icon Accent Presets</Text>
        <Text as="p" variant="body-16" leading="regular">
          Use <code>iconAccent</code> to pick a named accent color (for example: red, sky, blue).
        </Text>
        <Statistics
          label="Pipeline Velocity"
          value="84%"
          icon="Gauge"
          iconAccent="sky"
        />
        <Code language="tsx" code={ICON_ACCENT_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Custom Label Box Color</Text>
        <Text as="p" variant="body-16" leading="regular">
          Pass <code>labelBoxColor</code> for custom backgrounds when you need a non-preset value.
        </Text>
        <Statistics
          label="Pipeline Velocity"
          value="84%"
          icon="Gauge"
          labelBoxColor="var(--uds-system-success-subtle)"
        />
        <Code language="tsx" code={LABEL_BOX_COLOR_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <ComponentPropsTable rows={STATISTICS_PROPS} title="Statistics Props" />
    </DocPageLayout>
  );
}
