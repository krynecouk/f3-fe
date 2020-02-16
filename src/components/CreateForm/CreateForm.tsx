import React, { FormEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { Option } from "components/Select/Select";
import { Button, Select } from "components";
import { entryCreate, history } from "router";
import { Suggest, useSuggests } from "hooks/useSuggests";

interface CreateEntryFormProps {
  onCreate: () => void;
}

export const CreateForm = ({ onCreate }: CreateEntryFormProps) => {
  const entry = useSelector((state: StoreState) => state.entry.current);
  const [suggests] = useSuggests(entry);
  const [selected, setSelected] = useState<Option>({});

  // FIXME: wrong use of memo
  const options: Option[] = useMemo(
    () =>
      suggests.appsHere.map((suggest: Suggest) => {
        return {
          value: suggest.appId,
          label: suggest.appId
        };
      }),
    [suggests]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { value } = selected;

    const selectedSuggest = suggests.appsHere.find(
      suggest => suggest.appId === value
    );

    if (!selectedSuggest) {
      return;
    }

    const { appId, parentId, parentFieldCode } = selectedSuggest;
    onCreate();
    history.push(entryCreate(appId, parentId, parentFieldCode));
  };

  return (
    <div className="create-form">
      <form onSubmit={onSubmit}>
        <span>Choose type of entry you want to create:</span>
        <Select
          options={options}
          onChange={(opt: Option[]) => {
            setSelected(opt[0]);
          }}
        />
        <Button
          type="submit"
          text="Create"
          invalid={!selected || !selected.value || options.length === 0}
        />
      </form>
    </div>
  );
};
