import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { render } from "utils/test-utils";
import { Input } from "./Input";

describe("<Input />", () => {
  const onChangeMock = jest.fn();

  const inputMock = () => {
    const renderResult = render(
      <Input
        id="test-input"
        type="password"
        placeholder="Password"
        required
        autoFocus
        invalid={false}
        onChange={onChangeMock}
      />
    );
    return {
      ...renderResult,
      input: renderResult.getByPlaceholderText(/password/i) as HTMLInputElement
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const { input } = inputMock();
    expect(input).toBeTruthy();
  });

  it("should have id", () => {
    const { input } = inputMock();
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("should have placeholder", () => {
    const { getByPlaceholderText } = inputMock();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("should be required", () => {
    const { input } = inputMock();
    expect(input).toBeRequired();
  });

  it("should have type", () => {
    const { input } = inputMock();
    expect(input).toHaveAttribute("type", "password");
  });

  it("should have modifier", () => {
    const { input } = inputMock();
    expect(input).toHaveClass("input input--valid");
  });

  it("should be focused", () => {
    const { input } = inputMock();
    expect(input).toHaveFocus();
  });

  it("should call passed function on input change", () => {
    const { input } = inputMock();

    expect(input.value).toBe("");

    fireEvent.change(input, {
      target: {
        value: "my name is jeff"
      }
    });

    expect(input.value).toBe("my name is jeff");
    expect(input.value).not.toBe("my name is shady");
  });
});
