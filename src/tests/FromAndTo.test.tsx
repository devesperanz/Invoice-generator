import React from "react";
import { render } from "@testing-library/react";
import FromAndTo from "../components/section/FromAndTo";
import "@testing-library/jest-dom";

describe("FromAndTo component", () => {
  it("renders without errors", () => {
    const { getByLabelText } = render(
      <FromAndTo handleSubmit={() => {}} register={() => {}} errors={{}} />
    );

    expect(getByLabelText("Invoice Title")).toBeInTheDocument();
    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Phone")).toBeInTheDocument();
    expect(getByLabelText("Address")).toBeInTheDocument();
    expect(getByLabelText("City")).toBeInTheDocument();
    expect(getByLabelText("Country")).toBeInTheDocument();
  });

  it("submits the form correctly", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = render(
      <FromAndTo handleSubmit={handleSubmit} register={() => {}} errors={{}} />
    );
  });
});
