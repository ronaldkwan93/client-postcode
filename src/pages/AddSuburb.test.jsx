import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AddSuburb from "./AddSuburb";
import { UserContextProvider } from "../context/UserContextProvider";

describe("Add suburbs page Tests", () => {

  it("Should render correct content", () => {
    render(
      <UserContextProvider >
        <AddSuburb />
      </UserContextProvider>
    );
    // screen.debug();
    const header = screen.getByRole("heading", { level: 2 });
    expect(header)
      .toHaveTextContent(/add a suburb/i)
      .toBeInTheDocument();
  });

  it("Should provide error message if role is not an admin", () => {
    render(
      <UserContextProvider initialValue={{ userRole: "user", loggedInUser: "ron" }} >
        <AddSuburb />
      </UserContextProvider>
    );
    const message = screen.getByTestId("auth-error-msg");
    expect(message).toBeInTheDocument();
  })
});
