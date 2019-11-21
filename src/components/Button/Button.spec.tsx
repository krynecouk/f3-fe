import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { render } from "utils/test-utils";
import { Button } from "./Button";

describe("<Button />", () => {
  const onClickMock = jest.fn();

  const buttonMock = () => {
    const renderResult = render(
      <Button
        type="button"
        modifier="green"
        text="Test"
        onClick={onClickMock}
      />
    );
    return {
      ...renderResult,
      button: renderResult.getByText("Test")
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const { button } = buttonMock();
    expect(button).toBeTruthy();
  });

  it("should contain text", () => {
    const { button } = buttonMock();
    expect(button).toHaveTextContent("Test");
  });

  it("should have type", () => {
    const { button } = buttonMock();
    expect(button).toHaveAttribute("type", "button");
  });

  it("should have modifier", () => {
    const { button } = buttonMock();
    expect(button).toHaveClass("btn btn--green");
  });

  it("should call passed function on button click", () => {
    const { button } = buttonMock();
    expect(onClickMock).toHaveBeenCalledTimes(0);

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(3);
  });
});
