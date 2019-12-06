export const FETCH_APPS = "FETCH_APPS";
export const FETCH_APPS_SUCCESS = "FETCH_APPS_SUCCESS";
export const FETCH_APPS_ERROR = "FETCH_APPS_ERROR";

export type AppFieldType =
  | "plain"
  | "relationship"
  | "subapp"
  | "options"
  | "enums"
  | "enum"
  | "key_value"
  | "shadow";

export interface AppField {
  fieldCode: string;
  fieldType: AppFieldType;
  mandatory: boolean;
}

export interface App {
  appId: string;
  appFacets: string[];
  applicationHookId?: string | null;
  fields: { [key: string]: AppField };
}

export interface AppState {
  apps: App[];
  error?: Error;
}

export interface FetchAppsAction {
  type: typeof FETCH_APPS;
}

export interface FetchAppsSuccessAction {
  type: typeof FETCH_APPS_SUCCESS;
  payload: App[];
}

export interface FetchAppsErrorAction {
  type: typeof FETCH_APPS_ERROR;
  payload: Error;
}

export type AppAction =
  | FetchAppsAction
  | FetchAppsSuccessAction
  | FetchAppsErrorAction;
