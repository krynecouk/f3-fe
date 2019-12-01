import React from "react";
import ReactSelect from "react-select";

export interface Option {
  value?: string;
  label?: string;
}

interface SelectProps {
  options: Option[];
  onChange: (opt: Option) => void;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    marginTop: "0.5rem"
  }),
  menuList: (provided: any) => ({
    ...provided,
    minHeight: "2rem",
    maxHeight: "20rem"
  })
};

export const Select = ({ options, onChange }: SelectProps) => {
  return (
    <>
      <ReactSelect
        className="select"
        classNamePrefix="select"
        {...(!options.length ? { value: null } : {})}
        options={options}
        styles={customStyles}
        onChange={({ value, label }: any) => onChange({ value, label })}
      />
    </>
  );
};
