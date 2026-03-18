import { Button, Table } from "@chg-ds/unified-design-system";
import "@chg-ds/unified-design-system/styles.css";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "specialty", label: "Specialty" },
  { key: "location", label: "Location" },
];

const data = Array.from({ length: 20 }).map((_, idx) => ({
  name: `Doctor ${idx + 1}`,
  specialty: idx % 2 === 0 ? "Cardiology" : "Radiology",
  location: idx % 3 === 0 ? "Denver, CO" : "Salt Lake City, UT",
}));

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <Button label="Small component: Button" appearance="primary" />
      <div style={{ marginTop: 24 }}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
