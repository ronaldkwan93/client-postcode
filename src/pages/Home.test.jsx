import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

describe("Homepage Tests", () => {
  it("Should run tests", () => {
    expect(1 + 1).toBe(2);
  });

  it("Should render correct content", () => {
    render(<Home />);
    // screen.debug();
    const header = screen.getByRole("heading", { level: 1 });
    expect(header)
      .toHaveTextContent(/postcode api/i)
      .toBeInTheDocument();
  });

  it("Should render options when clicked on button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const button = screen.getByTestId("action");
    await user.click(button);
    // screen.debug();
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  
});
