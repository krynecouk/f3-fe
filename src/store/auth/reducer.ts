import {
  Auth,
  AuthAction,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from "store/auth/types";

const defaultState: Auth = {
  credentials: {},
  user: {}
};

export const authReducer = (
  state: Auth | undefined = defaultState,
  action: AuthAction
): Auth => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    case LOGIN_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT_SUCCESS:
      return defaultState;
    case LOGOUT_ERROR:
      return { ...defaultState, error: action.payload };
    default:
      return state;
  }
};