import { entryReducer } from "store/entry/reducer";
import { FETCH_ENTRY_ERROR, FETCH_ENTRY_SUCCESS } from "store/entry/types";

describe("entry reducer", () => {
  it("should handle FETCH_ENTRY_SUCCESS", () => {
    expect(
      entryReducer(
        {},
        {
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
        }
      )
    ).toEqual({
      current: {
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
  });

  it("should handle FETCH_ENTRY_ERROR", () => {
    expect(
      entryReducer(
        {
          current: {
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
              }
            ]
          }
        },
        {
          type: FETCH_ENTRY_ERROR,
          payload: {
            id: "a993638b-6df3-4377-87aa-3f4f0d39b53c",
            error: {
              message: "unable to fetch entry from server",
              name: "fetch entry error"
            }
          }
        }
      )
    ).toEqual({
      current: {
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
          }
        ]
      },
      error: {
        message:
          "Entry id: a993638b-6df3-4377-87aa-3f4f0d39b53c :: unable to fetch entry from server",
        name: "fetch entry error"
      }
    });
  });
});
