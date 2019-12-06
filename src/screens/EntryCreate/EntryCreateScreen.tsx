import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { f3 } from "api";
import { App } from "store/app/types";
import { EntryCreate } from "components/EntryCreate/EntryCreate";
import { Modal } from "components";
import { entryView, history } from "router";
import { useModal } from "hooks/useModal";
import "./EntryCreateScreen.scss";

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
  const [visible] = useModal("visible");
  const [error, setError] = useState<any>(undefined);

  if (!app) {
    return <div>Loading...</div>;
  }

  const fields = Object.keys(app.fields).map(k => app.fields[k]);

  return (
    <>
      <Modal
        id="modal__entry-create"
        visible={visible}
        title={`Create ${appId}`}
        onDismiss={() => history.goBack()}
        content={
          <EntryCreate
            fields={fields}
            onCreate={fields => {
              // TODO temporary
              if (parentId === "USER_ROOT") {
                f3.root
                  .create(appId, fields)
                  .then(response => history.push(entryView(response.data.id)))
                  .catch(setError);
              } else {
                f3.entry
                  .create(appId, parentId, parentFieldCode, fields)
                  .then(response => history.push(entryView(response.data.id)))
                  .catch(setError);
              }
            }}
          />
        }
      />
      <Modal
        id="modal__entry-create--error"
        visible={error}
        content={error ? error.response.data : ""}
        onDismiss={() => setError(undefined)}
      />
    </>
  );
};
