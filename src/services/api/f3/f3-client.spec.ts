import * as routes from "services/router/routes";

describe("f3 http client", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should have authorization header in every request", async () => {
    jest.doMock("services/auth", () => ({
      authService: {
        getBearer: () => "Bearer 123"
      }
    }));

    const clientModule = await import("./f3-client");
    expect(
      // @ts-ignore
      clientModule.client.interceptors.request.handlers[0].fulfilled({
        headers: {
          Authorization: {}
        }
      })
    ).toStrictEqual({ headers: { Authorization: "Bearer 123" } });
  });

  it("should redirect to login page if token is undefined", async () => {
    const historyPushMock = jest.fn();

    jest.doMock("services/auth", () => ({
      authService: {
        removeAuth: () => undefined,
        getBearer: () => undefined
      }
    }));

    jest.doMock("services/router/history", () => ({
      push: historyPushMock
    }));

    const clientModule = await import("./f3-client");
    // @ts-ignore
    clientModule.client.interceptors.request.handlers[0].fulfilled({
      headers: {
        Authorization: {}
      }
    });

    expect(historyPushMock).toHaveBeenCalledTimes(1);
    expect(historyPushMock).toHaveBeenCalledWith(routes.LOGIN);
  });

  it("should store authorization data on successful login request", async () => {
    const setAuthMock = jest.fn();
    jest.doMock("services/auth", () => ({
      authService: {
        setAuth: setAuthMock
      }
    }));

    const clientModule = await import("./f3-client");
    // @ts-ignore
    clientModule.client.interceptors.response.handlers[0].fulfilled({
      config: {
        url: "/api/login"
      }
    });

    expect(setAuthMock).toHaveBeenCalledTimes(1);
  });

  it("should NOT store authorization data if it is NOT login request", async () => {
    const setAuthMock = jest.fn();
    jest.doMock("services/auth", () => ({
      setAuth: setAuthMock
    }));

    const clientModule = await import("./f3-client");
    // @ts-ignore
    clientModule.client.interceptors.response.handlers[0].fulfilled({
      config: {
        url: "/api/entry"
      }
    });

    expect(setAuthMock).not.toHaveBeenCalled();
  });

  it("should remove authorization data on response status 401", async () => {
    const removeAuthMock = jest.fn();
    jest.doMock("services/auth", () => ({
      authService: {
        removeAuth: removeAuthMock
      }
    }));

    const clientModule = await import("./f3-client");
    // @ts-ignore
    clientModule.client.interceptors.response.handlers[0]
      .rejected({
        response: {
          status: 401
        }
      })
      .catch(() => {}); // ignored

    expect(removeAuthMock).toHaveBeenCalledTimes(1);
  });

  it("should redirect to login page on response status 401", async () => {
    const removeAuthMock = jest.fn();
    const historyPushMock = jest.fn();

    jest.doMock("services/auth", () => ({
      authService: {
        removeAuth: removeAuthMock
      }
    }));

    jest.doMock("services/router/history", () => ({
      push: historyPushMock
    }));

    const clientModule = await import("./f3-client");
    // @ts-ignore
    clientModule.client.interceptors.response.handlers[0]
      .rejected({
        response: {
          status: 401
        }
      })
      .catch(() => {}); // ignored

    expect(historyPushMock).toHaveBeenCalledTimes(1);
    expect(historyPushMock).toHaveBeenCalledWith(routes.LOGIN);
  });
});
