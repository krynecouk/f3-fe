import {
  Auth,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LoginAction,
  LoginErrorAction,
  LoginSuccessAction,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  LogoutAction,
  LogoutErrorAction,
  LogoutSuccessAction
} from "store/auth/types";

export const login = (username: string, password: string): LoginAction => {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    }
  };
};

export const loginSuccess = (auth: Auth): LoginSuccessAction => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      ...auth
    }
  };
};

export const loginError = (error: Error): LoginErrorAction => {
  return {
    type: LOGIN_ERROR,
    payload: {
      ...error
    }
  };
};

export const logout = (): LogoutAction => {
  return {
    type: LOGOUT
  };
};

export const logoutSuccess = (): LogoutSuccessAction => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error: Error): LogoutErrorAction => {
  return {
    type: LOGOUT_ERROR,
    payload: {
      ...error
    }
  };
};
