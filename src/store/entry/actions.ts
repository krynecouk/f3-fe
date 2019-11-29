import {
  Entry,
  FETCH_ENTRY,
  FETCH_ENTRY_ERROR,
  FETCH_ENTRY_SUCCESS,
  FetchEntryAction,
  FetchEntryErrorAction,
  FetchEntrySuccessAction,
  FORGET_ENTRY,
  ForgetEntryAction
} from "store/entry/types";

export const fetchEntry = (id: string): FetchEntryAction => {
  return {
    type: FETCH_ENTRY,
    payload: {
      id
    }
  };
};

export const fetchEntrySuccess = (entry: Entry): FetchEntrySuccessAction => {
  return {
    type: FETCH_ENTRY_SUCCESS,
    payload: entry
  };
};

export const fetchEntryError = (
  id: string,
  error: Error
): FetchEntryErrorAction => {
  return {
    type: FETCH_ENTRY_ERROR,
    payload: { id, error }
  };
};

export const forgetEntry = (): ForgetEntryAction => {
  return {
    type: FORGET_ENTRY
  };
};
