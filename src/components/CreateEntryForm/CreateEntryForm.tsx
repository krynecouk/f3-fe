import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { Option, Select } from "components/Select/Select";
import { f3 } from "api";
import { Button } from "components";
import * as routes from "router";
import { history } from "router";

interface Suggest {
  appId: string;
  parentId: string;
  parentFieldCode: string;
}

interface SuggestParent {
  appsHere?: Suggest[];
  appsInParent?: Suggest[];
}

interface CreateEntryFormProps {
  onCreate: () => void;
}

export const CreateEntryForm = ({ onCreate }: CreateEntryFormProps) => {
  const [picked, setPicked] = useState<Option>({});
  const [suggests, setSuggests] = useState<SuggestParent>({});
  const entry = useSelector((state: StoreState) => state.entry.current);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (!entry) {
        result = await f3.root.suggest();
      } else {
        result = await f3.entry.suggest(entry.id);
      }
      setSuggests(result.data);
    };
    fetchData();
    setPicked({});
  }, [entry]);

  const memoizedSuggests = useMemo(() => {
    if (!suggests || !suggests.appsHere) {
      return [];
    } else {
      return suggests.appsHere.map((suggest: Suggest) => {
        return {
          value: suggest.appId,
          label: suggest.appId
        };
      });
    }
  }, [suggests]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = picked;
    if (!suggests.appsHere) {
      return;
    }
    const suggest: Suggest | undefined = suggests.appsHere.find(
      suggest => suggest.appId === value
    );

    if (!suggest) {
      return;
    }

    history.push(
      routes.entryCreate(
        suggest.appId,
        suggest.parentId,
        suggest.parentFieldCode
      )
    );
    onCreate();
  };

  return (
    <div className="create-entry">
      <form onSubmit={onSubmit}>
        <span>Choose type of entry you want to create:</span>
        <Select
          reset={!picked || !picked.value}
          options={memoizedSuggests}
          onChange={(opt: Option) => setPicked(opt)}
        />
        <Button
          type="submit"
          text="Create"
          isValid={!!picked && !!picked.value}
        />
      </form>
    </div>
  );
};
