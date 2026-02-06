import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../ui/Table/Table";
import Badge from "../ui/Badge/Badge";
import Status from "../ui/Status/Status";
import Checkbox from "../ui/Checkbox/Checkbox";
import Button from "../ui/Button/Button";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

/**
 * Table Component Demo & Documentation
 *
 * This page demonstrates the Table component and its various configurations.
 *
 * ## Table Component Props:
 *
 * ### Required Props:
 * - `columns` (array): Array of column definitions
 * - `data` (array): Array of data rows
 *
 * ### Optional Props:
 * - `className` (string): Additional CSS classes
 *
 * ## Column Definition:
 * - `key` (string): Unique key for the column (used to access row data)
 * - `label` (string): Header label text
 * - `icon` (string): Icon name for header cell
 * - `sortable` (boolean): Whether the column is sortable
 * - `filterable` (boolean): Whether the column is filterable
 * - `align` (string): Text alignment: 'left', 'center', or 'right'
 * - `render` (function): Custom render function for cell content: (row, rowIndex, colIndex) => ReactNode
 * - `className` (string): Additional CSS classes for the cell
 *
 * ## Usage Examples:
 *
 * Basic table:
 * ```jsx
 * const columns = [
 *   { key: 'name', label: 'Name' },
 *   { key: 'email', label: 'Email' },
 * ];
 * const data = [
 *   { name: 'John', email: 'john@example.com' },
 *   { name: 'Jane', email: 'jane@example.com' },
 * ];
 * <Table columns={columns} data={data} />
 * ```
 */

const basicColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
];

const basicData = [
  { name: "John Doe", email: "john@example.com", phone: "555-0100" },
  { name: "Jane Smith", email: "jane@example.com", phone: "555-0101" },
  { name: "Bob Johnson", email: "bob@example.com", phone: "555-0102" },
];

const headerColumns = [
  { key: "name", label: "Name", icon: "User" },
  { key: "email", label: "Email", icon: "Envelope", sortable: true },
  { key: "status", label: "Status", icon: "Info", filterable: true },
  { key: "role", label: "Role", sortable: true, filterable: true },
];

const headerData = [
  {
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    role: "User",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Active",
    role: "User",
  },
];

export default function TableDemo() {
  const [selectedRows, setSelectedRows] = useState([]);

  const columnsWithActions = [
    {
      key: "select",
      label: "",
      render: (row, rowIndex) => (
        <Checkbox
          checked={selectedRows.includes(rowIndex)}
          onChange={(checked) => {
            if (checked) {
              setSelectedRows([...selectedRows, rowIndex]);
            } else {
              setSelectedRows(selectedRows.filter((i) => i !== rowIndex));
            }
          }}
        />
      ),
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Status
          label={row.status}
          variant={row.status === "Active" ? "green" : "red"}
          shape="pill"
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <Flex direction="row" gap="8">
          <Button
            appearance="text"
            layout="icon-only"
            icon="Pencil"
            size="small"
            aria-label="Edit"
          />
          <Button
            appearance="text"
            layout="icon-only"
            icon="Trash"
            size="small"
            aria-label="Delete"
          />
        </Flex>
      ),
    },
  ];

  const dataWithActions = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { name: "Bob Johnson", email: "bob@example.com", status: "Active" },
  ];

  const columnsWithIndicators = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "badge",
      label: "Badge",
      render: (row) => <Badge count={row.badge} variant="blue" />,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Status label={row.status} variant={row.statusVariant} shape="pill" />
      ),
    },
  ];

  const dataWithIndicators = [
    {
      name: "John Doe",
      email: "john@example.com",
      badge: 5,
      status: "Active",
      statusVariant: "green",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      badge: 12,
      status: "Pending",
      statusVariant: "yellow",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      badge: 0,
      status: "Inactive",
      statusVariant: "red",
    },
  ];

  const columnsWithInputs = [
    {
      key: "checkbox",
      label: "",
      render: (row, rowIndex) => (
        <Checkbox
          checked={selectedRows.includes(rowIndex)}
          onChange={(checked) => {
            if (checked) {
              setSelectedRows([...selectedRows, rowIndex]);
            } else {
              setSelectedRows(selectedRows.filter((i) => i !== rowIndex));
            }
          }}
        />
      ),
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "toggle",
      label: "Enabled",
      render: (row) => (
        <Flex direction="row" gap="8" alignItems="center">
          <span>{row.enabled ? "Yes" : "No"}</span>
        </Flex>
      ),
    },
  ];

  const dataWithInputs = [
    { name: "John Doe", email: "john@example.com", enabled: true },
    { name: "Jane Smith", email: "jane@example.com", enabled: false },
    { name: "Bob Johnson", email: "bob@example.com", enabled: true },
  ];

  const columnsAligned = [
    { key: "name", label: "Name", align: "left" },
    { key: "email", label: "Email", align: "center" },
    { key: "amount", label: "Amount", align: "right" },
  ];

  const dataAligned = [
    { name: "John Doe", email: "john@example.com", amount: "$1,234.56" },
    { name: "Jane Smith", email: "jane@example.com", amount: "$2,345.67" },
    { name: "Bob Johnson", email: "bob@example.com", amount: "$3,456.78" },
  ];
  
  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Table</h1>
              <p className="page__header-description">
                The Table component displays tabular data with flexible cell content.
          Supports custom cell rendering, header icons, sortable/filterable
          columns, and various cell types including actions, indicators, and
          inputs.
              </p>
            </div>
            <div className="page__header-metadata">
              <div className="page__metadata-row">
                <p className="page__metadata-label">Author</p>
                <a
                  href="https://chgit.slack.com/team/U06V9C0K06S"
                  className="page__metadata-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Michael-Stevens
                </a>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Last updated</p>
                <p className="page__metadata-value">{formatLastUpdated()}</p>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Version</p>
                <Flex direction="row" gap="8" alignItems="center">
                  <p className="page__metadata-value">1.0.0</p>
                  <span className="page__version-badge">BETA</span>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="page__content">
        <div className="page__examples-section">
          <div className="demo-group">
            <h2 className="demo-group__heading">Basic Table</h2>
            <p className="demo-group__description">
              A simple table displaying basic data with columns and rows.
            </p>
            <div className="demo-content">
              <Table columns={basicColumns} data={basicData} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Header Icons</h2>
            <p className="demo-group__description">
              Table headers can include icons and support sortable and filterable indicators.
            </p>
            <div className="demo-content">
              <Table columns={headerColumns} data={headerData} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Actions</h2>
            <p className="demo-group__description">
              Tables can include action columns with buttons, checkboxes for row selection, and custom cell rendering.
            </p>
            <div className="demo-content">
              <Table columns={columnsWithActions} data={dataWithActions} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Indicators</h2>
            <p className="demo-group__description">
              Tables can display badges, status indicators, and other visual elements in cells using custom render functions.
            </p>
            <div className="demo-content">
              <Table columns={columnsWithIndicators} data={dataWithIndicators} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Inputs</h2>
            <p className="demo-group__description">
              Tables can include interactive elements like checkboxes and toggles in cells.
            </p>
            <div className="demo-content">
              <Table columns={columnsWithInputs} data={dataWithInputs} />
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Text Alignment</h2>
            <p className="demo-group__description">
              Table cells support different text alignments: left, center, or right. Useful for numbers, currency, or specific formatting needs.
            </p>
            <div className="demo-content">
              <Table columns={columnsAligned} data={dataAligned} />
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/steps"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Steps</span>
              </Link>
              <Link
                to="/tabs"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Tabs</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
