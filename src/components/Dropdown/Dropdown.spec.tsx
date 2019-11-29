import { cleanup, render } from "utils/test-utils";
import React from "react";
import { Dropdown } from "components/Dropdown/Dropdown";
import { fireEvent } from "@testing-library/dom";

describe("<Dropdown />", () => {
  const itemOnClickMock = jest.fn();

  const dropdownMock = () => {
    const renderResult = render(
      <Dropdown
        button={<button>DROPDOWN BUTTON</button>}
        items={[
          { name: "MAIN_DROPDOWN_ITEM", isMain: true },
          "---",
          {
            name: "DROPDOWN ITEM",
            onClick: itemOnClickMock
          }
        ]}
      />
    );

    return {
      ...renderResult,
      button: renderResult.getByText(/dropdown button/i) as HTMLButtonElement,
      menu: renderResult.container.querySelector(
        ".dropdown__menu"
      ) as HTMLUListElement,
      item: renderResult.getByText(/dropdown item/i) as HTMLLIElement
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const { container } = dropdownMock();
    expect(container).toBeTruthy();
  });

  it("should toggle visibility of dropdown menu on dropdown button click", () => {
    const { button, menu } = dropdownMock();

    expectIsHidden(menu);

    fireEvent.click(button);

    expectIsVisible(menu);

    fireEvent.click(button);

    expectIsHidden(menu);

    fireEvent.click(button);
    fireEvent.click(button);

    expectIsHidden(menu);
  });

  it("should call passed dropdown item onClick function", () => {
    const { item } = dropdownMock();

    expect(itemOnClickMock).toHaveBeenCalledTimes(0);

    fireEvent.click(item);

    expect(itemOnClickMock).toHaveBeenCalledTimes(1);

    fireEvent.click(item);
    fireEvent.click(item);

    expect(itemOnClickMock).toHaveBeenCalledTimes(3);
  });

  const expectIsVisible = (el: HTMLElement) => {
    const classes = el.classList;
    expect(classes).toContain("dropdown__menu--visible");
    expect(classes).not.toContain("dropdown__menu--hidden");
  };

  const expectIsHidden = (el: HTMLElement) => {
    const classes = el.classList;
    expect(classes).not.toContain("dropdown__menu--visible");
    expect(classes).toContain("dropdown__menu--hidden");
  };
});
