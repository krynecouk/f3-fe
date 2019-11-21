import React from "react";
import { render } from "utils/test-utils";

describe("<LoginSreen />", () => {
  it("should render without crashing", async () => {
    jest.doMock("react-dom", () => ({
      createPortal: (el: React.ReactNode, target: Element) => el
    }));
    const { LoginScreen } = await import("./LoginScreen");
    const { container } = render(<LoginScreen />);
    expect(container).toBeTruthy();
  });
});
