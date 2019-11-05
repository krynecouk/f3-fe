import React from "react";
import { Logout } from "./Logout";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("<Logout />", () => {
  const logout = (onLogout: () => void) =>
    render(<Logout onLogout={onLogout} />);

  const logoutMock = () => {
    const onLogout = jest.fn();
    const renderResult = logout(onLogout);
    return {
      ...renderResult,
      logoutButton: renderResult.getByText(/logout/i),
      onLogout
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const { container } = logoutMock();
    expect(container).toBeTruthy();
  });

  it("should have logout button", () => {
    const { logoutButton } = logoutMock();

    expect(logoutButton).toBeTruthy();
    expect(logoutButton).toContainHTML("button");
  });

  it("should execute fn on logout button click", () => {
    const { logoutButton, onLogout } = logoutMock();

    expect(onLogout).toHaveBeenCalledTimes(0);

    fireEvent.click(logoutButton);

    expect(onLogout).toHaveBeenCalledTimes(1);

    fireEvent.click(logoutButton);
    fireEvent.click(logoutButton);

    expect(onLogout).toHaveBeenCalledTimes(3);
  });
});
