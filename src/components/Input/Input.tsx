import React from "react";
import "./Input.scss";

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  onChange?: (event: React.BaseSyntheticEvent) => void;
}

export const Input = ({ invalid, ...props }: InputProps) => {
  return (
    <div className="input--wrapper">
      <input
        className={`input input--${invalid ? "invalid" : "valid"}`}
        {...props}
      />
      <label htmlFor={props.id} className="label">
        {props.placeholder}
      </label>
    </div>
  );
};
