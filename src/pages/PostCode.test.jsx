import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PostCode from "./PostCode";

describe("Homepage Tests", () => {
  it("Should run tests", () => {
    expect(1 + 1).toBe(2);
  });

  it("Should render correct content", () => {
    render(<PostCode />);
    // screen.debug();
    const header = screen.getByRole('heading', {level: 2})
    expect(header).toHaveTextContent(/postcode finder/i).toBeInTheDocument();
  });
});
