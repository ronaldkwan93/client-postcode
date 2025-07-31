import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Header from "./Header";
import { UserContextProvider } from "../../context/UserContextProvider";


describe("Header Tests", () => {
  it("Clicking login button navigates to login page", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserContextProvider>
      </MemoryRouter>
    );
    const loginBtn = screen.getByTestId("login-btn");
    await user.click(loginBtn);
    // screen.debug();
    expect(screen.getByTestId("login-page")).toBeInTheDocument;
  });
});
