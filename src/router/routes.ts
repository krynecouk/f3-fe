export const ROOT = "/";
export const ENTRY_VIEW = "/entry/:id";
export const ENTRY_CREATE = "/entry/:appId/:parentId/:parentFieldCode";
export const LOGIN = "/login";

export const entryCreate = (
  appId: string,
  parentId: string,
  parentFieldCode: string
) => `/entry/${appId}/${parentId}/${parentFieldCode}`;
