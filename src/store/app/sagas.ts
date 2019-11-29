import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_APPS } from "store/app/types";
import { f3 } from "api";
import { fetchAppsError, fetchAppsSuccess } from "store/app/actions";

export function* watchFetchApps() {
  yield takeLatest(FETCH_APPS, fetchApps);
}

export function* fetchApps() {
  try {
    const { data } = yield call(f3.application.all);
    yield put(fetchAppsSuccess(data));
  } catch (error) {
    yield put(fetchAppsError(error));
  }
}
