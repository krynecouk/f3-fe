import {
  AppAction,
  AppState,
  FETCH_APPS_ERROR,
  FETCH_APPS_SUCCESS
} from "store/app/types";

const defaultState: AppState = {
  apps: []
};

export const appReducer = (
  state: AppState | undefined = defaultState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case FETCH_APPS_SUCCESS:
      return { apps: action.payload };
    case FETCH_APPS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
