import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SelectableCard } from "./SelectableCard";

describe("SelectableCard", () => {
  it("renders content", () => {
    render(<SelectableCard title="Card title" description="Card description" />);
    expect(screen.getByText("Card title")).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
  });

  it("supports selectable interactions", () => {
    const handleSelect = vi.fn();
    render(<SelectableCard title="Clickable" onSelect={handleSelect} selected />);
    fireEvent.click(screen.getByRole("button", { name: /clickable/i }));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
