import {
  App,
  FETCH_APPS,
  FETCH_APPS_ERROR,
  FETCH_APPS_SUCCESS,
  FetchAppsAction,
  FetchAppsErrorAction,
  FetchAppsSuccessAction
} from "store/app/types";

export const fetchApps = (): FetchAppsAction => {
  return {
    type: FETCH_APPS
  };
};

export const fetchAppsSuccess = (apps: App[]): FetchAppsSuccessAction => {
  return {
    type: FETCH_APPS_SUCCESS,
    payload: apps
  };
};

export const fetchAppsError = (error: Error): FetchAppsErrorAction => {
  return {
    type: FETCH_APPS_ERROR,
    payload: {
      ...error
    }
  };
};
