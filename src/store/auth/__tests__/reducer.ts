import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from "store/auth/types";
import { authReducer } from "store/auth/reducer";

describe("auth reducer", () => {
  it("should handle LOGIN_SUCCESS", () => {
    expect(
      authReducer(undefined, {
        type: LOGIN_SUCCESS,
        payload: {
          credentials: {},
          user: {
            name: "larry farry"
          }
        }
      })
    ).toEqual({
      credentials: {},
      user: {
        name: "larry farry"
      }
    });
  });

  it("should handle LOGIN_ERROR", () => {
    expect(
      authReducer(
        {
          credentials: {},
          user: {
            name: "larry"
          }
        },
        {
          type: LOGIN_ERROR,
          payload: {
            message: "login error occurred",
            name: "login error"
          }
        }
      )
    ).toEqual({
      credentials: {},
      user: {
        name: "larry"
      },
      error: {
        message: "login error occurred",
        name: "login error"
      }
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      authReducer(
        {
          credentials: {
            accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJI"
          },
          user: {
            name: "larry"
          }
        },
        {
          type: LOGOUT_SUCCESS
        }
      )
    ).toEqual({
      credentials: {},
      user: {}
    });
  });

  it("should handle LOGOUT_ERROR", () => {
    expect(
      authReducer(
        {
          credentials: {
            accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJI"
          },
          user: {
            name: "larry"
          }
        },
        {
          type: LOGOUT_ERROR,
          payload: {
            message: "logout error occurred",
            name: "logout error"
          }
        }
      )
    ).toEqual({
      credentials: {},
      user: {},
      error: {
        message: "logout error occurred",
        name: "logout error"
      }
    });
  });
});
