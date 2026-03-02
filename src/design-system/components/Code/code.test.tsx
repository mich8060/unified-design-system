import React from "react";
import { render } from "@testing-library/react";
import Code from "./Code";

describe("Code", () => {
  it("renders highlighted block code", () => {
    render(<Code code={"const value = 1;"} language="javascript" />);
  });
});
