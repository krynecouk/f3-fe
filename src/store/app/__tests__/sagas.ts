import { recordSaga } from "utils/test-utils";
import {
  fetchApps as fetchAppsAction,
  fetchAppsError,
  fetchAppsSuccess
} from "store/app/actions";

describe("app sagas", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should send request to fetch all applications", async () => {
    const getAppsMock = jest.fn();

    mockApplicationApi(getAppsMock);

    const { fetchApps } = await import("store/app/sagas");
    await recordSaga(fetchApps, fetchAppsAction());

    expect(getAppsMock).toHaveBeenCalledTimes(1);
  });

  it("should dispatch FETCH_APPS_SUCCESS", async () => {
    const getAppsMock = jest.fn().mockReturnValue({
      data: [
        {
          appId: "client",
          appFacets: [],
          applicationHookId: null,
          fields: {
            code: {
              fieldCode: "code",
              fieldType: "plain",
              mandatory: false
            },
            gender: {
              fieldCode: "gender",
              fieldType: "enum",
              mandatory: true
            }
          }
        }
      ]
    });

    mockApplicationApi(getAppsMock);

    const { fetchApps } = await import("store/app/sagas");
    const dispatched = await recordSaga(fetchApps, fetchAppsAction());

    const expectedAction = fetchAppsSuccess([
      {
        appId: "client",
        appFacets: [],
        applicationHookId: null,
        fields: {
          code: {
            fieldCode: "code",
            fieldType: "plain",
            mandatory: false
          },
          gender: {
            fieldCode: "gender",
            fieldType: "enum",
            mandatory: true
          }
        }
      }
    ]);

    expect(dispatched[0]).toEqual(expectedAction);
  });

  it("should dispatch FETCH_APPS_ERROR if error is thrown", async () => {
    const error = Error("500");
    const getAppsMock = jest.fn().mockImplementation(() => {
      throw error;
    });

    mockApplicationApi(getAppsMock);

    const { fetchApps } = await import("store/app/sagas");
    const dispatched = await recordSaga(fetchApps, fetchAppsAction());

    expect(dispatched[0]).toEqual(fetchAppsError(error));
  });

  const mockApplicationApi = (all: Function) => {
    jest.doMock("api/f3/f3", () => ({ f3: { application: { all } } }));
  };
});
