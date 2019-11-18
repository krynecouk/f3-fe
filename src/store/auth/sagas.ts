import { call, put, takeLatest } from "redux-saga/effects";
import { f3 } from "api";
import * as routes from "router";
import { history } from "router";
import { LOGIN, LoginAction, LOGOUT } from "store/auth/types";
import {
  loginError,
  loginSuccess,
  logoutError,
  logoutSuccess
} from "store/auth/actions";

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}

export function* login(action: LoginAction) {
  try {
    const { payload } = action;
    const { username, password } = payload;
    const response = yield call(f3.auth.login, username, password);
    yield put(loginSuccess(response.data));
    yield call(() => history.push(routes.HOME));
    return response;
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* logout() {
  try {
    yield call(() => history.push(routes.LOGIN));
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
  }
}
