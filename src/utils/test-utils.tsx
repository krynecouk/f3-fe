import { runSaga } from "redux-saga";
import { render } from "@testing-library/react";
import { Store } from "redux";
import configureStore from "redux-mock-store";
import React from "react";
import { Provider } from "react-redux";
import { StoreState } from "store";

const customRender = (ui: React.ReactElement, options?: any) => {
  const dispatch = jest.fn();

  const storeMock: Store = {
    ...configureStore([]),
    dispatch: dispatch,
    getState: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
    [Symbol.observable]: jest.fn()
  };

  const StoreProvider = ({ children }: { children: any }) => {
    return <Provider store={storeMock}>{children}</Provider>;
  };

  return {
    ...render(ui, { wrapper: StoreProvider, ...options }),
    dispatch
  };
};

type Action = { type: string; payload?: {} };

const recordSaga = async (saga: any, action: Action, state?: StoreState) => {
  const dispatched: Action[] = [];

  await runSaga(
    {
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => state
    },
    saga,
    action
  );

  return dispatched;
};

export * from "@testing-library/react";
export { customRender as render };
export { recordSaga };
