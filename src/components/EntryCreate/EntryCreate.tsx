import React from "react";
import { AppField } from "store/app/types";
import { useFieldReducer } from "hooks/useFieldReducer";
import { Field, Button } from "components";
import { EntryField } from "store/entry/types";

interface EntryCreateProps {
  fields: AppField[];
  onCreate: (field: EntryField[]) => void;
}

export const EntryCreate = ({ fields, onCreate }: EntryCreateProps) => {
  const [state, dispatch] = useFieldReducer();

  return (
    <form
      className="entry-create"
      onSubmit={e => {
        e.preventDefault();
        onCreate(state);
      }}
    >
      <div className="entry-create__content">
        {fields.map(field => {
          return (
            <Field
              key={field.fieldCode}
              field={field}
              onChange={
                value => dispatch({ code: field.fieldCode, value: value }) // FIXME: leading debounce
              }
            />
          );
        })}
      </div>
      <Button text="Create" type="submit" />
    </form>
  );
};
