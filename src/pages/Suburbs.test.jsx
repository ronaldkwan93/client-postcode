import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Suburbs from "./Suburbs";

describe("Homepage Tests", () => {
  it("Should run tests", () => {
    expect(1 + 1).toBe(2);
  });

  it("Should render correct content", () => {
    render(<Suburbs />);
    // screen.debug();
    const header = screen.getByRole('heading', {level: 2})
    expect(header).toHaveTextContent(/Suburb finder/i).toBeInTheDocument();
  });
});
