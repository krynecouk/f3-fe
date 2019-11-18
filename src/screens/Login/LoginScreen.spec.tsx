import React from "react";
import { render } from "utils/test-utils";
import { LoginScreen } from "./LoginScreen";

describe("<LoginSreen />", () => {
  it("should render without crashing", () => {
    const { container } = render(<LoginScreen />);
    expect(container).toBeTruthy();
  });
});
