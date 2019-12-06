import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Select } from "components";

describe("<Select />", () => {
  const onChangeMock = jest.fn();
  const selectMock = () => {
    const renderResult = render(
      <Select
        placeholder="select..."
        options={[
          { value: "test_option_1", label: "option1" },
          { value: "test_option_2", label: "option2" }
        ]}
        onChange={onChangeMock}
      />
    );

    return {
      ...renderResult,
      select: renderResult.getByText(/select.../i) as HTMLDivElement,
      selectInput: renderResult.container.querySelector(".select input")!,
      selectControl: renderResult.container.querySelector(".select__control")!
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const { container } = selectMock();
    expect(container).toBeTruthy();
  });

  it("should show options only on select click", () => {
    const { queryByText, selectInput, selectControl } = selectMock();

    expect(queryByText("option1")).toBeFalsy();
    expect(queryByText("option2")).toBeFalsy();

    fireEvent.focus(selectInput);
    fireEvent.mouseDown(selectControl);

    expect(queryByText("option1")).toBeTruthy();
    expect(queryByText("option2")).toBeTruthy();
  });

  it("should call onChange fn on option click", () => {
    const { queryByText, selectInput, selectControl } = selectMock();

    fireEvent.focus(selectInput);
    fireEvent.mouseDown(selectControl);

    const option1 = queryByText("option1")!;

    fireEvent.click(option1);

    expect(onChangeMock).toBeCalled();
  });
});
