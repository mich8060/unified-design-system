import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import Table from "./Table";
import type { TableColumn, TableSortDirection } from "./Table.types";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    bodyWeight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
      description: "Font weight applied to body cells.",
    },
    columns: {
      control: false,
      description: "Array of column definitions.",
    },
    data: {
      control: false,
      description: "Array of data row objects.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on the table wrapper.",
    },
  },
  args: {
    bodyWeight: "medium",
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Shared fixtures ──────────────────────────────────────────────────────────

type Clinician = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  status: string;
  shifts: number;
};

const CLINICIAN_DATA: Clinician[] = [
  { id: "C-1001", name: "Dr. Sarah Mitchell", specialty: "Emergency Medicine", location: "Phoenix, AZ", status: "Active", shifts: 18 },
  { id: "C-1002", name: "Dr. James Okafor", specialty: "Internal Medicine", location: "Austin, TX", status: "Active", shifts: 22 },
  { id: "C-1003", name: "Dr. Wei Chen", specialty: "Radiology", location: "Denver, CO", status: "Inactive", shifts: 0 },
  { id: "C-1004", name: "Dr. Priya Sharma", specialty: "Hospitalist", location: "Orlando, FL", status: "Active", shifts: 14 },
  { id: "C-1005", name: "Dr. Marcus Rivera", specialty: "Anesthesiology", location: "Seattle, WA", status: "Pending", shifts: 6 },
  { id: "C-1006", name: "Dr. Angela Torres", specialty: "Family Medicine", location: "Nashville, TN", status: "Active", shifts: 20 },
  { id: "C-1007", name: "Dr. Robert Kim", specialty: "Orthopedics", location: "Chicago, IL", status: "Inactive", shifts: 0 },
];

const BASE_COLUMNS: TableColumn<Clinician>[] = [
  { key: "id", label: "Clinician ID", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "specialty", label: "Specialty", align: "left" },
  { key: "location", label: "Location", align: "left" },
  { key: "shifts", label: "Shifts", align: "right" },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    columns: BASE_COLUMNS as TableColumn[],
    data: CLINICIAN_DATA as Record<string, unknown>[],
  },
};

export const DefaultTable: Story = {
  name: "Default",
  args: {
    columns: BASE_COLUMNS as TableColumn[],
    data: CLINICIAN_DATA as Record<string, unknown>[],
    bodyWeight: "medium",
  },
};

export const BodyWeightVariants: Story = {
  name: "Body Weight Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
        <div key={weight}>
          <p style={{ marginBottom: 8, fontWeight: "bold" }}>bodyWeight: {weight}</p>
          <Table
            bodyWeight={weight}
            columns={BASE_COLUMNS as TableColumn[]}
            data={CLINICIAN_DATA.slice(0, 3) as Record<string, unknown>[]}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithColumnIcons: Story = {
  name: "With Column Header Icons",
  args: {
    columns: [
      { key: "id", label: "ID", icon: "IdentificationCard", align: "left" },
      { key: "name", label: "Name", icon: "User", align: "left" },
      { key: "specialty", label: "Specialty", icon: "Stethoscope", align: "left" },
      { key: "location", label: "Location", icon: "MapPin", align: "left" },
      { key: "shifts", label: "Shifts", icon: "Calendar", align: "right" },
    ] as TableColumn[],
    data: CLINICIAN_DATA as Record<string, unknown>[],
  },
};

export const Sortable: Story = {
  name: "Sortable Columns",
  render: () => {
    const SortableTable = () => {
      const [sortKey, setSortKey] = useState<string | null>(null);
      const [sortDir, setSortDir] = useState<TableSortDirection>("asc");

      const handleSort = (column: TableColumn) => {
        if (sortKey === column.key) {
          setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
          setSortKey(column.key);
          setSortDir("asc");
        }
      };

      const sortedData = [...CLINICIAN_DATA].sort((a, b) => {
        if (!sortKey) return 0;
        const aVal = String(a[sortKey as keyof Clinician]);
        const bVal = String(b[sortKey as keyof Clinician]);
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });

      const columns: TableColumn[] = [
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: sortKey === "name" ? sortDir : undefined,
          onSort: handleSort,
        },
        {
          key: "specialty",
          label: "Specialty",
          sortable: true,
          sortDirection: sortKey === "specialty" ? sortDir : undefined,
          onSort: handleSort,
        },
        {
          key: "location",
          label: "Location",
          sortable: true,
          sortDirection: sortKey === "location" ? sortDir : undefined,
          onSort: handleSort,
        },
        { key: "shifts", label: "Shifts", align: "right" },
      ];

      return (
        <Table
          columns={columns}
          data={sortedData as Record<string, unknown>[]}
        />
      );
    };

    return <SortableTable />;
  },
};

export const WithFilterableColumns: Story = {
  name: "Filterable Columns",
  args: {
    columns: [
      { key: "id", label: "ID", align: "left" },
      { key: "name", label: "Name", filterable: true, align: "left" },
      { key: "specialty", label: "Specialty", filterable: true, align: "left" },
      { key: "location", label: "Location", filterable: true, align: "left" },
      { key: "shifts", label: "Shifts", align: "right" },
    ] as TableColumn[],
    data: CLINICIAN_DATA as Record<string, unknown>[],
  },
};

export const WithCustomRender: Story = {
  name: "Custom Cell Renderer",
  render: () => {
    const statusColors: Record<string, string> = {
      Active: "green",
      Inactive: "#aaa",
      Pending: "orange",
    };

    const columns: TableColumn[] = [
      { key: "id", label: "Clinician ID", align: "left" },
      { key: "name", label: "Name", align: "left" },
      { key: "specialty", label: "Specialty", align: "left" },
      {
        key: "status",
        label: "Status",
        align: "left",
        render: (row) => {
          const status = String(row.status);
          return (
            <span
              style={{
                display: "inline-block",
                padding: "2px 10px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
                background: statusColors[status] ?? "#eee",
                color: status === "Active" ? "white" : status === "Pending" ? "white" : "#555",
              }}
            >
              {status}
            </span>
          );
        },
      },
      { key: "shifts", label: "Shifts", align: "right" },
    ];

    return (
      <Table
        columns={columns}
        data={CLINICIAN_DATA as Record<string, unknown>[]}
      />
    );
  },
};

export const EmptyState: Story = {
  name: "Empty Data",
  args: {
    columns: BASE_COLUMNS as TableColumn[],
    data: [],
  },
};

export const ColumnAlignment: Story = {
  name: "Column Alignment",
  args: {
    columns: [
      { key: "id", label: "Left (ID)", align: "left" },
      { key: "name", label: "Center (Name)", align: "center" },
      { key: "specialty", label: "Left (Specialty)", align: "left" },
      { key: "location", label: "Center (Location)", align: "center" },
      { key: "shifts", label: "Right (Shifts)", align: "right" },
    ] as TableColumn[],
    data: CLINICIAN_DATA as Record<string, unknown>[],
  },
};
