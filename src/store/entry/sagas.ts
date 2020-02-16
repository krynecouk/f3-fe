import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_ENTRY, FetchEntryAction } from "store/entry/types";
import { f3 } from "api";
import { fetchEntryError, fetchEntrySuccess } from "store/entry/actions";

export function* watchFetchEntry() {
  yield takeLatest(FETCH_ENTRY, fetchEntry);
}

export function* fetchEntry({ payload: { id } }: FetchEntryAction) {
  try {
    const { data } = yield call(f3.entry.getById, id);
    yield put(fetchEntrySuccess(data));
  } catch (error) {
    yield put(fetchEntryError(id, error));
  }
}
