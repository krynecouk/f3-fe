import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "store";
import { fetchEntry } from "store/entry/actions";
import { Entry } from "store/entry/types";
import { App } from "store/app/types";

export const EntryViewScreen = ({
  match: { params }
}: RouteComponentProps<{ id: string }>) => {
  const entry: Entry = useSelector((state: StoreState) => state.entry.current)!;
  const app: App | undefined = useSelector((state: StoreState) => {
    return entry
      ? state.app.apps.find(app => app.appId === entry.appId)
      : undefined;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntry(params.id));
  }, [dispatch, params]);

  if (!entry || !app || entry.id !== params.id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {entry.fields.map(field => {
        return (
          <div key={field.code}>
            {app.fields[field.code].fieldType} / {field.value}
          </div>
        );
      })}
    </div>
  );
};
