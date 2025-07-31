import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AddSuburb from "./AddSuburb";
import { UserContextProvider } from "../context/UserContextProvider";

describe("Add suburbs page Tests", () => {
  it("Should run tests", () => {
    expect(1 + 1).toBe(2);
  });

  it("Should render correct content", () => {
    render(
      <UserContextProvider>
        <AddSuburb />
      </UserContextProvider>
    );
    // screen.debug();
    const header = screen.getByRole("heading", { level: 2 });
    expect(header)
      .toHaveTextContent(/add a suburb/i)
      .toBeInTheDocument();
  });
});
