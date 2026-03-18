import { useMemo, useState } from "react";
import { Avatar } from "../../design-system/components/Avatar";
import { Button } from "../../design-system/components/Button";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Status } from "../../design-system/components/Status";
import { Table } from "../../design-system/components/Table";
import type { TableColumn, TableSortDirection } from "../../design-system/components/Table";
import { Tag } from "../../design-system/components/Tag";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

type ProviderRow = {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  location: string;
  assignments: number;
  priority: "Low" | "Medium" | "High";
  status: "Active" | "Pending" | "At Risk";
};

const TABLE_PROPS: ComponentPropRow[] = [
  { prop: "columns", type: "TableColumn[]", defaultValue: "[]", description: "Column definitions for headers, alignment, and custom cell rendering." },
  { prop: "data", type: "Record<string, unknown>[]", defaultValue: "[]", description: "Row data source used by each column key." },
  { prop: "bodyWeight", type: '"regular" | "medium" | "semibold" | "bold"', defaultValue: '"medium"', description: "Controls body cell font weight." },
  { prop: "className", type: "string", defaultValue: '""', description: "Adds classes to the table root." },
];

const TABLE_COLUMN_PROPS: ComponentPropRow[] = [
  { prop: "key", type: "string", defaultValue: "-", description: "Row key used to resolve cell value." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Header content for the column." },
  { prop: "icon", type: "string", defaultValue: "-", description: "Optional header icon shown before label." },
  { prop: "align", type: '"left" | "center" | "right"', defaultValue: '"left"', description: "Cell text alignment for the column." },
  { prop: "render", type: "(row, rowIndex, colIndex) => ReactNode", defaultValue: "-", description: "Custom render function for rich cell content." },
  { prop: "sortable", type: "boolean", defaultValue: "false", description: "Enables sort affordance icon in header." },
  { prop: "sortDirection", type: '"asc" | "desc"', defaultValue: "-", description: "Current sort direction indicator for sortable headers." },
  { prop: "onSort", type: "(column) => void", defaultValue: "-", description: "Header click callback for sortable columns." },
  { prop: "filterable", type: "boolean", defaultValue: "false", description: "Shows a filter affordance icon in the header." },
];

const PROVIDER_ROWS: ProviderRow[] = [
  { id: "p-1", name: "Alexis Hall", initials: "AH", specialty: "Cardiology", location: "Denver, CO", assignments: 4, priority: "High", status: "Active" },
  { id: "p-2", name: "Jordan Reeves", initials: "JR", specialty: "Hospitalist", location: "Phoenix, AZ", assignments: 2, priority: "Medium", status: "Pending" },
  { id: "p-3", name: "Casey Morgan", initials: "CM", specialty: "Neurology", location: "Boise, ID", assignments: 6, priority: "High", status: "At Risk" },
  { id: "p-4", name: "Taylor Nguyen", initials: "TN", specialty: "Radiology", location: "Salt Lake City, UT", assignments: 1, priority: "Low", status: "Active" },
];

const BASIC_SNIPPET = `<Table
  columns={[
    { key: "name", label: "Provider" },
    { key: "specialty", label: "Specialty" },
    { key: "location", label: "Location" },
  ]}
  data={rows}
/>`;

const RICH_CELLS_SNIPPET = `<Table
  columns={[
    {
      key: "name",
      label: "Provider",
      render: (row) => (
        <Layout alignItems="center" gap="8">
          <Avatar initials={row.initials} size="small" />
          <Text as="span" variant="body-14">{row.name}</Text>
        </Layout>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Status label={row.status} variant="blue" />,
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => (
        <Tag label={row.priority} color={row.priority === "High" ? "red" : "blue"} solid rounded />
      ),
    },
  ]}
  data={rows}
/>`;

const SORTABLE_SNIPPET = `const [sort, setSort] = useState({ key: "name", direction: "asc" });

<Table
  columns={[
    {
      key: "name",
      label: "Provider",
      icon: "User",
      sortable: true,
      sortDirection: sort.key === "name" ? sort.direction : undefined,
      onSort: () => toggleSort("name"),
    },
    {
      key: "assignments",
      label: "Assignments",
      align: "right",
      sortable: true,
      sortDirection: sort.key === "assignments" ? sort.direction : undefined,
      onSort: () => toggleSort("assignments"),
    },
  ]}
  data={sortedRows}
/>`;

export function TableDemoPage() {
  const [sort, setSort] = useState<{ key: keyof ProviderRow; direction: TableSortDirection }>({
    key: "name",
    direction: "asc",
  });

  const sortedRows = useMemo(() => {
    const rows = [...PROVIDER_ROWS];
    rows.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];
      const order = sort.direction === "asc" ? 1 : -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * order;
      }
      return String(aValue).localeCompare(String(bValue)) * order;
    });
    return rows;
  }, [sort]);

  const toggleSort = (key: keyof ProviderRow) => {
    setSort((previous) => ({
      key,
      direction: previous.key === key && previous.direction === "asc" ? "desc" : "asc",
    }));
  };

  const basicColumns: TableColumn<ProviderRow>[] = [
    { key: "name", label: "Provider" },
    { key: "specialty", label: "Specialty" },
    { key: "location", label: "Location" },
  ];

  const richColumns: TableColumn<ProviderRow>[] = [
    {
      key: "name",
      label: "Provider",
      render: (row) => (
        <Layout alignItems="center" gap="8">
          <Avatar initials={row.initials} size="small" />
          <Layout direction="column" gap="2">
            <Text as="span" variant="body-14" weight="medium" leading="regular">
              {row.name}
            </Text>
            <Text as="span" variant="body-12" leading="regular" tone="secondary">
              {row.location}
            </Text>
          </Layout>
        </Layout>
      ),
    },
    { key: "specialty", label: "Specialty" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Status
          label={row.status}
          variant={row.status === "At Risk" ? "red" : row.status === "Pending" ? "orange" : "green"}
        />
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => (
        <Tag
          label={row.priority}
          color={row.priority === "High" ? "red" : row.priority === "Medium" ? "orange" : "blue"}
          solid
          rounded
          size="compact"
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: () => (
        <Button
          appearance="ghost"
          size="xsmall"
          layout="icon-only"
          icon="DotsThreeVertical"
          label="Row actions"
        />
      ),
    },
  ];

  const sortableColumns: TableColumn<ProviderRow>[] = [
    {
      key: "name",
      label: "Provider",
      icon: "User",
      sortable: true,
      sortDirection: sort.key === "name" ? sort.direction : undefined,
      onSort: () => toggleSort("name"),
    },
    {
      key: "specialty",
      label: "Specialty",
      sortable: true,
      sortDirection: sort.key === "specialty" ? sort.direction : undefined,
      onSort: () => toggleSort("specialty"),
    },
    {
      key: "assignments",
      label: "Assignments",
      align: "right",
      sortable: true,
      sortDirection: sort.key === "assignments" ? sort.direction : undefined,
      onSort: () => toggleSort("assignments"),
    },
    {
      key: "priority",
      label: "Priority",
      align: "center",
      render: (row) => (
        <Tag
          label={row.priority}
          color={row.priority === "High" ? "red" : row.priority === "Medium" ? "orange" : "blue"}
          rounded
        />
      ),
    },
  ];

  return (
    <DocPageLayout
      title="Table"
      description="Table supports standard cells, rich custom cells, and sortable header cells for data-heavy workflows."
    >
      <Layout direction="column" gap="32">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic Data Cells
          </Text>
          <Table columns={basicColumns} data={PROVIDER_ROWS} />
          <Code language="tsx" code={BASIC_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Rich Cell Content
          </Text>
          <Table columns={richColumns} data={PROVIDER_ROWS} bodyWeight="regular" />
          <Code language="tsx" code={RICH_CELLS_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Sortable and Utility Headers
          </Text>
          <Text as="p" variant="body-14" leading="regular" tone="secondary">
            Click sortable headers to toggle ascending and descending order.
          </Text>
          <Table columns={sortableColumns} data={sortedRows} />
          <Code language="tsx" code={SORTABLE_SNIPPET} />
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TABLE_PROPS} title="Table Props" />
      <ComponentPropsTable rows={TABLE_COLUMN_PROPS} title="Table Column Props" />
    </DocPageLayout>
  );
}
