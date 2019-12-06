import React from "react";
import { AppField } from "store/app/types";
import { Input, Select, Pair, SubApp } from "components";

interface FieldProps {
  field: AppField;
  value?: any;
  onChange: (value: any) => void;
  readOnly?: boolean;
}

export const Field = ({
  field,
  value,
  onChange,
  readOnly = false
}: FieldProps) => {
  switch (field.fieldType) {
    case "plain":
      return (
        <Input
          value={value}
          readOnly={readOnly}
          id={field.fieldCode}
          placeholder={field.fieldCode}
          required={field.mandatory}
          onChange={e => onChange(e.target.value)}
        />
      );
    case "enums":
    case "options":
      return (
        <Select
          placeholder={readOnly ? value : field.fieldCode}
          isDisabled={readOnly}
          isMulti={true}
          isCreatable={true}
          onChange={option => onChange(option.map(option => option.value))}
        />
      );
    case "enum":
      return (
        <Select
          isCreatable={true}
          placeholder={readOnly ? value : field.fieldCode}
          isDisabled={readOnly}
          onChange={option => onChange(option[0].value)}
        />
      );
    case "key_value":
      return (
        <Pair
          value={value}
          readOnly={readOnly}
          id={field.fieldCode}
          placeholder={field.fieldCode}
          required={field.mandatory}
          onChange={e => onChange(e)}
        />
      );
    case "subapp":
      if (readOnly) {
        return <SubApp fieldCode={field.fieldCode} />;
      } else {
        return (
          <Input
            id={field.fieldCode}
            readOnly={true}
            value={field.fieldCode}
            placeholder={field.fieldType}
          />
        );
      }
    case "shadow":
      return <></>;
    default:
      return (
        <div>
          {field.fieldCode} ({field.fieldType}) - NOT SUPPORTED FIELD TYPE
        </div>
      );
  }
};
