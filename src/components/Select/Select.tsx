import React from "react";
import ReactSelect from "react-select";
import CreatableReactSelect from "react-select/creatable";

export interface Option {
  value?: string;
  label?: string;
}

interface SelectProps {
  options?: Option[];
  placeholder?: string;
  onChange: (opt: Option[]) => void;
  isMulti?: boolean;
  isCreatable?: boolean;
  isDisabled?: boolean;
}

// TODO: make configurable
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

export const Select = ({
  options = [],
  placeholder,
  onChange,
  isMulti = false,
  isCreatable = false,
  isDisabled = false
}: SelectProps) => {
  const attributes: any = {
    isMulti: isMulti,
    isDisabled: isDisabled,
    className: "select",
    classNamePrefix: "select",
    options: options,
    styles: customStyles,
    placeholder: placeholder ? placeholder : "Select...",
    noOptionsMessage: isCreatable
      ? () => "Start typing to create..."
      : () => "No options",
    onChange: (newValue: any) => {
      if (!newValue) {
        return;
      }
      if (!isMulti) {
        onChange([newValue]);
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <>
      {isCreatable ? (
        <CreatableReactSelect {...attributes} />
      ) : (
        <ReactSelect
          {...(!options.length ? { value: null } : {})}
          {...attributes}
        />
      )}
    </>
  );
};
