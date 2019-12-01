import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  invalid?: boolean;
  modifier?: string;
}

export const Button = ({
  modifier,
  text,
  invalid = false,
  ...props
}: ButtonProps) => {
  const btnModifier = !!modifier ? `btn--${modifier}` : "";
  const btnValidModifier = invalid ? "btn--invalid" : "btn--valid";
  return (
    <button className={`btn ${btnModifier} ${btnValidModifier}`} {...props}>
      {text}
    </button>
  );
};
