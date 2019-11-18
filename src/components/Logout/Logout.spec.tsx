import React from "react";
import { Logout } from "./Logout";
import { render, fireEvent, cleanup } from "utils/test-utils";
import { logout } from "store/auth/actions";

describe("<Logout />", () => {
  const logoutMock = () => {
    const renderResult = render(<Logout />);
    return {
      ...renderResult,
      logoutButton: renderResult.getByText(/logout/i)
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

  it("should dispatch logout action on every button click", () => {
    const { logoutButton, dispatch } = logoutMock();

    expect(dispatch).toHaveBeenCalledTimes(0);

    fireEvent.click(logoutButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(logout());

    fireEvent.click(logoutButton);
    expect(dispatch).toHaveBeenCalledWith(logout());
    fireEvent.click(logoutButton);
    expect(dispatch).toHaveBeenCalledWith(logout());

    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
