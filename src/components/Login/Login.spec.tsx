import React from "react";
import { Login } from "./Login";
import { cleanup, fireEvent, render } from "@testing-library/react";

describe("<Login />", () => {
  const login = (onLogin: () => void) => render(<Login onLogin={onLogin} />);

  const loginMock = () => {
    const onLogin = jest.fn();
    const renderResult = login(onLogin);
    return {
      ...renderResult,
      usernameInput: renderResult.getByPlaceholderText(
        /username/i
      ) as HTMLInputElement,
      passwordInput: renderResult.getByPlaceholderText(
        /password/i
      ) as HTMLInputElement,
      submitButton: renderResult.getByText(/submit/i),
      onLogin
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const { container } = loginMock();
    expect(container).toBeTruthy();
  });

  it("should have username input", () => {
    const { usernameInput } = loginMock();
    expect(usernameInput).toBeTruthy();
    expect(usernameInput).toContainHTML("input");
  });

  it("should be focused on the username input", () => {
    const { usernameInput } = loginMock();
    expect(usernameInput).toHaveFocus();
  });

  it("should have updated username value on input change", () => {
    const { usernameInput } = loginMock();

    expect(usernameInput.value).toBe("");

    fireEvent.change(usernameInput, {
      target: {
        value: "hary"
      }
    });

    expect(usernameInput.value).toBe("hary");
    expect(usernameInput.value).not.toBe("harry");
  });

  it("should have password input with type of password", () => {
    const { passwordInput } = loginMock();
    expect(passwordInput).toBeTruthy();
    expect(passwordInput).toContainHTML("input");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should have updated password value on input change", () => {
    const { passwordInput } = loginMock();

    expect(passwordInput.value).toBe("");

    fireEvent.change(passwordInput, {
      target: {
        value: "marv"
      }
    });

    expect(passwordInput.value).toBe("marv");
    expect(passwordInput.value).not.toBe("marry");
  });

  it("should have submit button", () => {
    const { submitButton } = loginMock();

    expect(submitButton).toBeTruthy();
    expect(submitButton).toContainHTML("button");
  });

  it("should execute fn on submit button click", () => {
    const { submitButton, onLogin } = loginMock();

    expect(onLogin).toHaveBeenCalledTimes(0);

    fireEvent.click(submitButton);

    expect(onLogin).toHaveBeenCalledTimes(1);

    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(onLogin).toHaveBeenCalledTimes(3);
  });
});
