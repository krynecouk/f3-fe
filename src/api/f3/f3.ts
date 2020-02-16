import { client } from "./f3-client";
import { EntryField } from "store/entry/types";

export const f3 = {
  _client: client,
  auth: {
    login: (username: string, password: string) =>
      client.post("/api/login", { name: username, password: password })
  },
  entries: {
    get: () => client.get(`api/entries`),
    getByParentId: (parentEntryId: string) =>
      client.get(`api/entries/${parentEntryId}`),
    getByParentFieldCode: (parentEntryId: string, parentFieldCode: string) =>
      client.get(`api/entries/${parentEntryId}/${parentFieldCode}`)
  },
  entry: {
    get: () => client.get(`/api/entry`),
    getById: (id: string) => client.get(`/api/entry/${id}`),
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
        ? client.get(`/api/entries/${id}/${fieldCode}`)
        : client.get(`/api/entries/${id}`)
  },
  application: {
    get: (appId: string) => client.get(`/api/applications/${appId}`),
    all: () => client.get("/api/applications")
  }
};
