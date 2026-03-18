import { Layout } from "../../design-system/components/Layout";
import { Table } from "../../design-system/components/Table";
import { Text } from "../../design-system/components/Text";

export interface ComponentPropRow {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

const COLUMNS = [
  { key: "prop", label: "Prop" },
  { key: "type", label: "Type" },
  { key: "defaultValue", label: "Default" },
  { key: "description", label: "Description" },
];

interface ComponentPropsTableProps {
  rows: ComponentPropRow[];
  title?: string;
}

export function ComponentPropsTable({
  rows,
  title = "Props",
}: ComponentPropsTableProps) {
  return (
    <Layout direction="column" gap="12">
      <Text as="h2" variant="heading-24" weight="medium" leading="regular">
        {title}
      </Text>
      <Table columns={COLUMNS} data={rows} />
    </Layout>
  );
}
