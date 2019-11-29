import {
  FETCH_APPS,
  FETCH_APPS_ERROR,
  FETCH_APPS_SUCCESS
} from "store/app/types";
import { fetchApps, fetchAppsError, fetchAppsSuccess } from "store/app/actions";

describe("app action creators", () => {
  it("should create FETCH_APPS", () => {
    const expectedAction = {
      type: FETCH_APPS
    };

    expect(fetchApps()).toEqual(expectedAction);
  });

  it("should create FETCH_APPS_SUCCESS", () => {
    const expectedAction = {
      type: FETCH_APPS_SUCCESS,
      payload: [
        {
          appId: "user_app",
          appFacets: ["USER"],
          fields: {
            login: {
              fieldCode: "login",
              fieldType: "plain",
              mandatory: true
            },
            plaintext_password: {
              fieldCode: "plaintext_password",
              fieldType: "plain",
              mandatory: false
            }
          }
        },
        {
          appId: "client",
          appFacets: [],
          applicationHookId: "user_app_hook",
          fields: {
            name: {
              fieldCode: "name",
              fieldType: "plain",
              mandatory: true
            }
          }
        }
      ]
    };

    expect(
      fetchAppsSuccess([
        {
          appId: "user_app",
          appFacets: ["USER"],
          fields: {
            login: {
              fieldCode: "login",
              fieldType: "plain",
              mandatory: true
            },
            plaintext_password: {
              fieldCode: "plaintext_password",
              fieldType: "plain",
              mandatory: false
            }
          }
        },
        {
          appId: "client",
          appFacets: [],
          applicationHookId: "user_app_hook",
          fields: {
            name: {
              fieldCode: "name",
              fieldType: "plain",
              mandatory: true
            }
          }
        }
      ])
    ).toEqual(expectedAction);
  });

  it("should create FETCH_APPS_ERROR", () => {
    const expectedAction = {
      type: FETCH_APPS_ERROR,
      payload: {
        message: "unable to fetch apps"
      }
    };

    expect(
      fetchAppsError({ message: "unable to fetch apps" } as Error)
    ).toEqual(expectedAction);
  });
});
