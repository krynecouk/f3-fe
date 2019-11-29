import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  onClick?: (event: React.BaseSyntheticEvent) => void;
  isValid?: boolean;
  modifier?: string;
}

export const Button = ({
  modifier,
  text,
  isValid = true,
  ...props
}: ButtonProps) => {
  const btnModifier = !!modifier ? `btn--${modifier}` : "";
  const btnValidModifier = isValid ? "btn--valid" : "btn--invalid";
  return (
    <button className={`btn ${btnModifier} ${btnValidModifier}`} {...props}>
      {text}
    </button>
  );
};
