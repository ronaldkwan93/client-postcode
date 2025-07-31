import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Suburbs from "./Suburbs";
import userEvent from "@testing-library/user-event";

describe("Suburb page Tests", () => {
  it("Should render correct content", () => {
    render(<Suburbs />);
    // screen.debug();
    const header = screen.getByRole("heading", { level: 2 });
    expect(header)
      .toHaveTextContent(/Suburb finder/i)
      .toBeInTheDocument();
  });

  it("Should refresh the inputs when refresh button has been clicked", async () => {
    const user = userEvent.setup();
    render(<Suburbs />);
    const suburbInput = screen.getByPlaceholderText(/Enter 4-digit postcode/i);
    await user.type(suburbInput, "2141");
    expect(suburbInput).toHaveValue("2141");
    // screen.debug();
    const refreshBtn = screen.getByTestId("refresh-btn");
    await user.click(refreshBtn);
    expect(suburbInput).toHaveValue("");
  });

  it("Should give a validation error when inputs are empty", async () => {
    const user = userEvent.setup();
    render(<Suburbs />);
    const submitBtn = screen.getByTestId("submit-btn");
    await user.click(submitBtn);
    const errorMsg = screen.getByTestId("validation-error-msg");
    screen.debug();
    expect(errorMsg).toBeInTheDocument();
  });
});
