import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PostCode from "./PostCode";
import userEvent from "@testing-library/user-event";

describe("Postcode page Tests", () => {
  it("Should render correct content", () => {
    render(<PostCode />);
    // screen.debug();
    const header = screen.getByRole("heading", { level: 2 });
    expect(header)
      .toHaveTextContent(/postcode finder/i)
      .toBeInTheDocument();
  });

  it("Should refresh the inputs when refresh button has been clicked", async () => {
    const user = userEvent.setup();
    render(<PostCode />);
    const suburbInput = screen.getByPlaceholderText(/enter suburb name/i);
    await user.type(suburbInput, "Burwood");
    expect(suburbInput).toHaveValue("Burwood");
    // screen.debug();
    const refreshBtn = screen.getByTestId("refresh-btn");
    await user.click(refreshBtn);
    expect(suburbInput).toHaveValue("");
  });

  it("Should give a validation error when inputs are empty", async () => {
    const user = userEvent.setup();
    render(<PostCode />);
    const submitBtn = screen.getByTestId("submit-btn");
    await user.click(submitBtn);
    const errorMsg = screen.getByTestId("validation-error-msg");
    screen.debug();
    expect(errorMsg).toBeInTheDocument();
  });
});
