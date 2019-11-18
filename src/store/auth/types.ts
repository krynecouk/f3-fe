export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

interface Credentials {
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

interface User {
  id?: string;
  name?: string;
}

export interface Auth {
  credentials: Credentials;
  user: User;
  error?: Error;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: {
    username: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: Auth;
}

export interface LoginErrorAction {
  type: typeof LOGIN_ERROR;
  payload: Error;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface LogoutErrorAction {
  type: typeof LOGOUT_ERROR;
  payload: Error;
}

export type AuthAction =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutErrorAction;
