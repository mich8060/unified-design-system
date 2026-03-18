import React from "react";
import { render, screen } from "@testing-library/react";
import { DescriptionList } from "./DescriptionList";

describe("DescriptionList", () => {
  it("renders rows from item data", () => {
    render(
      <DescriptionList
        items={[
          { label: "Label A", value: "Value A" },
          { label: "Label B", value: "Value B" },
        ]}
      />
    );

    expect(screen.getByText("Label A")).toBeInTheDocument();
    expect(screen.getByText("Value B")).toBeInTheDocument();
  });
});
