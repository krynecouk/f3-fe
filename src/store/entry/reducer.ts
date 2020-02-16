import {
  EntryAction,
  EntryState,
  FETCH_ENTRY_ERROR,
  FETCH_ENTRY_SUCCESS
} from "store/entry/types";
import { tagError } from "utils/error-utils";

const defaultState: EntryState = {};

export const entryReducer = (
  state: EntryState | undefined = defaultState,
  action: EntryAction
): EntryState => {
  switch (action.type) {
    case FETCH_ENTRY_SUCCESS:
      return { current: action.payload };
    case FETCH_ENTRY_ERROR:
      const { id, error } = action.payload;
      return { ...state, error: tagError(`Entry id: ${id}`, error) };
    default:
      return state;
  }
};
