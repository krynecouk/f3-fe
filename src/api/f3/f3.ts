import { client } from "./f3-client";

export const f3 = {
  _client: client,
  auth: {
    login: (username: string, password: string) =>
      client.post("/api/login", { name: username, password: password })
  },
  root: {
    get: () => client.get("/api/entry"),
    suggest: () => client.get("/api/entry/suggest-parent")
  },
  entry: {
    get: (id: string) => client.get(`/api/entry/${id}`),
    suggest: (id: string) => client.get(`/api/entry/${id}/suggest-parent`)
  },
  application: {
    get: (appId: string) => client.get(`/api/application/${appId}`),
    all: () => client.get("/api/application")
  }
};
