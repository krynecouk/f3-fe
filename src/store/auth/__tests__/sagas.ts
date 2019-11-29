import {
  login as loginAction,
  loginError,
  loginSuccess,
  logout as logoutAction,
  logoutError,
  logoutSuccess
} from "store/auth/actions";
import { recordSaga } from "utils/test-utils";
import * as routes from "router";

describe("auth sagas", () => {
  describe("login saga", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should send login request with username and password", async () => {
      const loginMock = jest.fn();

      mockLoginApi(loginMock);

      const { login } = await import("store/auth/sagas");
      await recordSaga(login, loginAction("harry", "123"));

      expect(loginMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith("harry", "123");
    });

    it("should redirect to home page", async () => {
      const loginMock = jest.fn().mockReturnValue({ data: {} });
      const pushMock = jest.fn();

      mockLoginApi(loginMock);
      mockHistory(pushMock);

      const { login } = await import("store/auth/sagas");
      await recordSaga(login, loginAction("harry", "123"));

      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(routes.ROOT);
    });

    it("should dispatch LOGIN_SUCCESS", async () => {
      const loginMock = jest.fn().mockReturnValue({
        data: {
          credentials: {
            accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJI",
            tokenType: "Bearer",
            expiresIn: 43200
          },
          user: {
            id: "SUPER_ADMIN",
            name: "harry"
          }
        }
      });

      mockLoginApi(loginMock);

      const { login } = await import("store/auth/sagas");
      const dispatched = await recordSaga(login, loginAction("harry", "123"));

      const expectedAction = loginSuccess({
        credentials: {
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJI",
          tokenType: "Bearer",
          expiresIn: 43200
        },
        user: {
          id: "SUPER_ADMIN",
          name: "harry"
        }
      });

      expect(dispatched[0]).toEqual(expectedAction);
    });

    it("should dispatch LOGIN_ERROR if error is thrown", async () => {
      const error = Error("401");
      const loginMock = jest.fn().mockImplementation(() => {
        throw error;
      });
      mockLoginApi(loginMock);

      const { login } = await import("store/auth/sagas");
      const dispatched = await recordSaga(login, loginAction("harry", "123"));

      expect(dispatched[0]).toEqual(loginError(error));
    });
  });

  describe("logout saga", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should redirect to login page", async () => {
      const pushMock = jest.fn();

      mockHistory(pushMock);

      const { logout } = await import("store/auth/sagas");
      await recordSaga(logout, logoutAction());

      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(routes.LOGIN);
    });

    it("should dispatch LOGOUT_SUCCESS", async () => {
      const { logout } = await import("store/auth/sagas");
      const dispatched = await recordSaga(logout, logoutAction());

      expect(dispatched[0]).toEqual(logoutSuccess());
    });

    it("should dispatch LOGOUT_ERROR if error is thrown", async () => {
      const error = Error("unable to history push");
      const pushMock = jest.fn().mockImplementation(() => {
        throw error;
      });

      mockHistory(pushMock);

      const { logout } = await import("store/auth/sagas");
      const dispatched = await recordSaga(logout, logoutAction());

      expect(dispatched[0]).toEqual(logoutError(error));
    });
  });
});

const mockLoginApi = (login: Function) => {
  jest.doMock("api/f3/f3", () => ({ f3: { auth: { login } } }));
};

const mockHistory = (push: Function) => {
  jest.doMock("router/history", () => ({ push }));
};
