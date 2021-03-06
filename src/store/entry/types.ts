export const FETCH_ENTRY = "FETCH_ENTRY";
export const FETCH_ENTRY_SUCCESS = "FETCH_ENTRY_SUCCESS";
export const FETCH_ENTRY_ERROR = "FETCH_ENTRY_ERROR";

export interface EntryField {
  code: string;
  value?: string | number | boolean | string[] | null;
}

export interface Entry {
  id: string;
  name?: string;
  appId: string;
  parentId: string;
  parentFieldCode: string;
  version: number;
  createdAt: string;
  fields: EntryField[];
}

export interface EntryState {
  current?: Entry;
  error?: Error;
}

export interface FetchEntryAction {
  type: typeof FETCH_ENTRY;
  payload: {
    id: string;
  };
}

export interface FetchEntrySuccessAction {
  type: typeof FETCH_ENTRY_SUCCESS;
  payload: Entry;
}

export interface FetchEntryErrorAction {
  type: typeof FETCH_ENTRY_ERROR;
  payload: {
    id: string;
    error: Error;
  };
}

export type EntryAction =
  | FetchEntryAction
  | FetchEntrySuccessAction
  | FetchEntryErrorAction;
