import React from "react";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { App } from "store/app/types";

export const EntryCreateScreen = ({
  match: { params }
}: RouteComponentProps<{
  appId: string;
  parentId: string;
  parentFieldCode: string;
}>) => {
  const { appId, parentId, parentFieldCode } = params;
  const app: App = useSelector((state: StoreState) =>
    state.app.apps.find(app => app.appId === appId)
  )!;

  if (!app) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(app)}</div>;
};
