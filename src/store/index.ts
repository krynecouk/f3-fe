import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { spawn } from "redux-saga/effects";
import { authReducer as auth } from "store/auth/reducer";
import { appReducer as app } from "store/app/reducer";
import { entryReducer as entry } from "store/entry/reducer";
import { watchLogin, watchLogout } from "store/auth/sagas";
import { stateStorage } from "storages";
import { throttle } from "lodash";
import { watchFetchApps } from "store/app/sagas";
import { watchFetchEntry } from "store/entry/sagas";

const rootReducer = combineReducers({
  auth,
  app,
  entry
});

function* rootSaga() {
  yield spawn(watchLogin);
  yield spawn(watchLogout);
  yield spawn(watchFetchApps);
  yield spawn(watchFetchEntry);
}

export type StoreState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const saga = createSagaMiddleware();
  const enhancer = applyMiddleware(saga);
  const persistedState = stateStorage.getState();
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(enhancer)
  );

  saga.run(rootSaga);

  store.subscribe(
    throttle(() => {
      stateStorage.setState(store.getState());
    }, 1000)
  );

  return store;
};

export default configureStore();
