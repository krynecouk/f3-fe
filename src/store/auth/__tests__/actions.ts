import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from "store/auth/types";
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess
} from "store/auth/actions";

describe("auth action creators", () => {
  it("should create LOGIN", () => {
    const expectedAction = {
      type: LOGIN,
      payload: {
        username: "harry",
        password: "123"
      }
    };

    expect(login("harry", "123")).toEqual(expectedAction);
  });

  it("should create LOGIN_SUCCESS", () => {
    const expectedAction = {
      type: LOGIN_SUCCESS,
      payload: {
        credentials: {
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJI"
        },
        user: {
          name: "larry"
        }
      }
    };

    expect(
      loginSuccess({
        credentials: {
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJI"
        },
        user: {
          name: "larry"
        }
      })
    ).toEqual(expectedAction);
  });

  it("should create LOGIN_ERROR", () => {
    const expectedAction = {
      type: LOGIN_ERROR,
      payload: {
        message: "unable to login"
      }
    };

    expect(loginError({ message: "unable to login" } as Error)).toEqual(
      expectedAction
    );
  });

  it("should create LOGOUT", () => {
    const expectedAction = {
      type: LOGOUT
    };

    expect(logout()).toEqual(expectedAction);
  });

  it("should create LOGOUT_SUCCESS", () => {
    const expectedAction = {
      type: LOGOUT_SUCCESS
    };

    expect(logoutSuccess()).toEqual(expectedAction);
  });

  it("should create LOGOUT_ERROR", () => {
    const expectedAction = {
      type: LOGOUT_ERROR,
      payload: {
        message: "unable to logout"
      }
    };

    expect(logoutError({ message: "unable to logout" } as Error)).toEqual(
      expectedAction
    );
  });
});
