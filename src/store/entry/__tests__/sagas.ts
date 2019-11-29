import { recordSaga } from "utils/test-utils";
import {
  fetchEntry as fetchEntryAction,
  fetchEntryError,
  fetchEntrySuccess
} from "store/entry/actions";

describe("entry sagas", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should send request to fetch entry", async () => {
    const getEntryMock = jest.fn();

    mockEntryApi(getEntryMock);

    const { fetchEntry } = await import("store/entry/sagas");
    await recordSaga(fetchEntry, fetchEntryAction("123"));

    expect(getEntryMock).toHaveBeenCalledTimes(1);
    expect(getEntryMock).toHaveBeenCalledWith("123");
  });

  it("should dispatch FETCH_ENTRY_SUCCESS", async () => {
    const getEntryMock = jest.fn().mockReturnValue({
      data: {
        id: "a993638b-6df3-4377-87aa-3f4f0d39b53c",
        appId: "pracovnik",
        parentId: "USER_ROOT",
        parentFieldCode: "USER_ROOT",
        version: 1,
        createdAt: "2019-11-27T06:42:45.938Z",
        fields: [
          {
            value: "harry",
            code: "jmeno"
          },
          {
            value: "admin",
            code: "login"
          },
          {
            value: null,
            code: "plain_password"
          }
        ]
      }
    });

    mockEntryApi(getEntryMock);

    const { fetchEntry } = await import("store/entry/sagas");
    const dispatched = await recordSaga(
      fetchEntry,
      fetchEntryAction("a993638b-6df3-4377-87aa-3f4f0d39b53c")
    );

    const expectedAction = fetchEntrySuccess({
      id: "a993638b-6df3-4377-87aa-3f4f0d39b53c",
      appId: "pracovnik",
      parentId: "USER_ROOT",
      parentFieldCode: "USER_ROOT",
      version: 1,
      createdAt: "2019-11-27T06:42:45.938Z",
      fields: [
        {
          value: "harry",
          code: "jmeno"
        },
        {
          value: "admin",
          code: "login"
        },
        {
          value: null,
          code: "plain_password"
        }
      ]
    });

    expect(dispatched[0]).toEqual(expectedAction);
  });

  it("should dispatch FETCH_ENTRY_ERROR if error is thrown", async () => {
    const error = Error("500");
    const getEntryMock = jest.fn().mockImplementation(() => {
      throw error;
    });

    mockEntryApi(getEntryMock);

    const { fetchEntry } = await import("store/entry/sagas");
    const dispatched = await recordSaga(fetchEntry, fetchEntryAction("123"));

    expect(dispatched[0]).toEqual(fetchEntryError("123", error));
  });

  const mockEntryApi = (get: Function) => {
    jest.doMock("api/f3/f3", () => ({ f3: { entry: { get } } }));
  };
});
