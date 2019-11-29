import {
  fetchEntry,
  fetchEntryError,
  fetchEntrySuccess,
  forgetEntry
} from "store/entry/actions";
import {
  FETCH_ENTRY,
  FETCH_ENTRY_ERROR,
  FETCH_ENTRY_SUCCESS,
  FORGET_ENTRY
} from "store/entry/types";

describe("entry action creators", () => {
  it("should create FETCH_ENTRY", () => {
    const expectedAction = {
      type: FETCH_ENTRY,
      payload: {
        id: "123"
      }
    };

    expect(fetchEntry("123")).toEqual(expectedAction);
  });

  it("should create FETCH_ENTRY_SUCCESS", () => {
    const expectedAction = {
      type: FETCH_ENTRY_SUCCESS,
      payload: {
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
    };

    expect(
      fetchEntrySuccess({
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
      })
    ).toEqual(expectedAction);
  });

  it("should create FETCH_ENTRY_ERROR", () => {
    const expectedAction = {
      type: FETCH_ENTRY_ERROR,
      payload: {
        id: "123",
        error: {
          message: "unable to fetch entry"
        }
      }
    };

    expect(
      fetchEntryError("123", { message: "unable to fetch entry" } as Error)
    ).toEqual(expectedAction);
  });

  it("should create FORGET_ENTRY", () => {
    const expectedAction = {
      type: FORGET_ENTRY
    };

    expect(forgetEntry()).toEqual(expectedAction);
  });
});
