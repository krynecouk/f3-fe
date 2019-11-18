import React from "react";
import { Login } from "./Login";
import { cleanup, fireEvent, render } from "utils/test-utils";
import { login } from "store/auth/actions";

describe("<Login />", () => {
  const loginMock = () => {
    const renderResult = render(<Login />);
    return {
      ...renderResult,
      usernameInput: renderResult.getByPlaceholderText(
        /username/i
      ) as HTMLInputElement,
      passwordInput: renderResult.getByPlaceholderText(
        /password/i
      ) as HTMLInputElement,
      submitButton: renderResult.getByText(/submit/i)
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

  it("should dispatch login action on every submit button click", () => {
    const { submitButton, dispatch } = loginMock();

    expect(dispatch).toHaveBeenCalledTimes(0);

    fireEvent.click(submitButton);

    expect(dispatch).toHaveBeenCalledTimes(1);

    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it("should dispatch login action with username and password on submit button click", () => {
    const {
      usernameInput,
      passwordInput,
      submitButton,
      dispatch
    } = loginMock();

    fireEvent.change(usernameInput, {
      target: {
        value: "harry"
      }
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "123"
      }
    });

    expect(dispatch).toHaveBeenCalledTimes(0);

    fireEvent.click(submitButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(login("harry", "123"));
  });
});
