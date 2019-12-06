import { useReducer } from "react";
import { EntryField } from "store/entry/types";

const defaultState: EntryField[] = [];

export const useFieldReducer = () => {
  return useReducer(fieldReducer, defaultState);
};

const fieldReducer = (state: EntryField[], action: EntryField) => {
  const storedField = state.find(field => field.code === action.code);

  return storedField !== undefined
    ? state.map(field => (field.code === action.code ? action : field))
    : [...state, action];
};
