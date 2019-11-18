import { StoreState } from "store";
import { keyValueStorage } from "storages";

interface StateStorage {
  setState: (state: StoreState) => void;
  getState: () => StoreState;
}

const STATE_KEY = "state";

const setState = (state: StoreState) => {
  try {
    const serializedState = JSON.stringify(state);
    keyValueStorage.set(STATE_KEY, serializedState);
  } catch {
    console.error("Unable to store state", state);
  }
};

const getState = () => {
  try {
    const serializedState = keyValueStorage.get(STATE_KEY);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Unable to get state from storage", err);
    return undefined;
  }
};

export const stateStorage: StateStorage = {
  setState,
  getState
};
