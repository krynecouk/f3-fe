import { StoreState } from "store";
import { logout } from "store/auth/actions";

describe("f3 http client", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should have authorization header in every request", async () => {
    const stateMock: StoreState = {
      auth: {
        credentials: {
          accessToken: "123"
        },
        user: {}
      }
    };

    jest.doMock("store", () => ({
      getState: () => stateMock
    }));

    const { client } = await import("./f3-client");

    expect(
      // @ts-ignore
      client.interceptors.request.handlers[0].fulfilled({
        headers: {
          Authorization: {}
        }
      })
    ).toStrictEqual({ headers: { Authorization: "Bearer 123" } });
  });

  it("should redirect to login page on response status 401", async () => {
    const dispatch = jest.fn();

    jest.doMock("store", () => ({
      dispatch
    }));

    const { client } = await import("./f3-client");
    // @ts-ignore
    client.interceptors.response.handlers[0]
      .rejected({
        response: {
          status: 401,
          config: {
            url: "/"
          }
        }
      })
      .catch(() => {}); // ignored

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  it("should NOT redirect to login page on response status 401 if already on login page", async () => {
    const dispatch = jest.fn();

    jest.doMock("store", () => ({
      dispatch
    }));

    const { client } = await import("./f3-client");
    // @ts-ignore
    client.interceptors.response.handlers[0]
      .rejected({
        response: {
          status: 401,
          config: {
            url: "/api/login"
          }
        }
      })
      .catch(() => {}); // ignored

    expect(dispatch).not.toHaveBeenCalled();
  });
});
