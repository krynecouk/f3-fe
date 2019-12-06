import { client } from "./f3-client";
import { EntryField } from "store/entry/types";

export const f3 = {
  _client: client,
  auth: {
    login: (username: string, password: string) =>
      client.post("/api/login", { name: username, password: password })
  },
  root: {
    get: () => client.get("/api/entry"),
    suggest: () => client.get("/api/entry/suggest-parent"),
    create: (appId: string, fields: EntryField[]) =>
      client.post("/api/entry", { appId, fields })
  },
  entry: {
    get: (id: string) => client.get(`/api/entry/${id}`),
    create: (
      appId: string,
      parentId: string,
      parentFieldCode: string,
      fields: EntryField[]
    ) =>
      client.post(`/api/entry/${parentId}/${parentFieldCode}`, {
        appId,
        fields
      }),
    suggest: (id: string) => client.get(`/api/entry/${id}/suggest-parent`),
    children: (id: string, fieldCode?: string) =>
      fieldCode
        ? client.get(`/api/entry/${id}/children/${fieldCode}`)
        : client.get(`/api/entry/${id}/children`)
  },
  application: {
    get: (appId: string) => client.get(`/api/application/${appId}`),
    all: () => client.get("/api/application")
  }
};
