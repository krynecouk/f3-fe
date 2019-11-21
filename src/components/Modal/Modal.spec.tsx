import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { render } from "utils/test-utils";

describe("<Modal />", () => {
  const onDismissMock = jest.fn();

  let modal: HTMLElement;

  beforeEach(async () => {
    jest.doMock("react-dom", () => ({
      createPortal: (el: React.ReactNode, target: Element) => el
    }));

    const { Modal } = await import("./Modal");
    modal = render(
      <Modal
        id="test-modal"
        visible
        title="Testing Modal"
        content={<div>Content of modal</div>}
        footer={<button onClick={onDismissMock}>cancel</button>}
        onDismiss={onDismissMock}
      />
    ).container;
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("should render without crashing", () => {
    expect(modal).toBeTruthy();
  });

  it("should close modal on x button click", () => {
    const x = modal.querySelector(".modal__close")!;

    expect(onDismissMock).toHaveBeenCalledTimes(0);

    fireEvent.click(x);

    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it("should close modal on cancel button click", () => {
    const button = modal.querySelector("button")!;

    expect(onDismissMock).toHaveBeenCalledTimes(0);

    fireEvent.click(button);

    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it("should close modal on background click", () => {
    const button = modal.querySelector(".modal")!;

    expect(onDismissMock).toHaveBeenCalledTimes(0);

    fireEvent.click(button);

    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it("should NOT close modal on modal itself click", () => {
    const button = modal.querySelector(".modal__content")!;

    expect(onDismissMock).toHaveBeenCalledTimes(0);

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onDismissMock).toHaveBeenCalledTimes(0);
  });
});
