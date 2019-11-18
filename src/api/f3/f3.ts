import { client } from "./f3-client";

export const f3 = {
  _client: client,
  auth: {
    login: (username: string, password: string) =>
      client.post("/api/login", { name: username, password: password })
  },
  entry: {
    get: () => client.get("/api/entry")
  }
};
