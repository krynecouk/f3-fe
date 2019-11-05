import React from "react";
import { render } from "@testing-library/react";
import { LoginScene } from "./LoginScene";

describe("<LoginScene />", () => {
  it("should render without crashing", () => {
    const { container } = render(<LoginScene />);
    expect(container).toBeTruthy();
  });
});
