import React from "react";
import UDS from "./UDS.jsx";

const UDSLayout = UDS as any;

const meta = {
  title: "Components/UDS",
  component: UDS,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: { control: false },
    className: { control: "text" },
  },
};

export default meta;

export const Default = {
  render: (args: any) => (
    <div style={{ minHeight: "100vh", background: "#f6f7fb", padding: "16px" }}>
      <UDSLayout {...args}>
        <UDSLayout.Menu style={{ padding: "16px", background: "white", borderRadius: "8px" }}>
          Menu area
        </UDSLayout.Menu>
        <UDSLayout.Content style={{ padding: "16px", background: "white", borderRadius: "8px" }}>
          <UDSLayout.Main style={{ padding: "16px", border: "1px dashed #d0d7e2", borderRadius: "8px" }}>
            Main content
          </UDSLayout.Main>
        </UDSLayout.Content>
        <UDSLayout.Listview style={{ padding: "16px", background: "white", borderRadius: "8px" }}>
          List view
        </UDSLayout.Listview>
        <UDSLayout.Panel style={{ padding: "16px", background: "white", borderRadius: "8px" }}>
          Side panel
        </UDSLayout.Panel>
      </UDSLayout>
    </div>
  ),
  args: {
    className: "",
  },
};
