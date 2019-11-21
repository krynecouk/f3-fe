import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  onClick?: (event: React.BaseSyntheticEvent) => void;
  modifier?: string;
}

export const Button = ({ modifier, text, ...props }: ButtonProps) => {
  const btnModifier = !!modifier ? `btn--${modifier}` : "";
  return (
    <button className={`btn ${btnModifier}`} {...props}>
      {text}
    </button>
  );
};
