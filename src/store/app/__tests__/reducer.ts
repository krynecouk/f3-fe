import { appReducer } from "store/app/reducer";
import { FETCH_APPS_ERROR, FETCH_APPS_SUCCESS } from "store/app/types";

describe("app reducer", () => {
  it("should handle FETCH_APPS_SUCCESS", () => {
    expect(
      appReducer(
        { apps: [] },
        {
          type: FETCH_APPS_SUCCESS,
          payload: [
            {
              appId: "employee",
              appFacets: [],
              fields: {
                name: {
                  fieldCode: "name",
                  fieldType: "plain",
                  mandatory: true
                }
              }
            }
          ]
        }
      )
    ).toEqual({
      apps: [
        {
          appId: "employee",
          appFacets: [],
          fields: {
            name: {
              fieldCode: "name",
              fieldType: "plain",
              mandatory: true
            }
          }
        }
      ]
    });
  });

  it("should handle FETCH_APPS_ERROR", () => {
    expect(
      appReducer(
        {
          apps: [
            {
              appId: "employee",
              appFacets: [],
              fields: {
                name: {
                  fieldCode: "name",
                  fieldType: "plain",
                  mandatory: true
                }
              }
            }
          ]
        },
        {
          type: FETCH_APPS_ERROR,
          payload: {
            message: "unable to fetch apps from server",
            name: "fetch apps error"
          }
        }
      )
    ).toEqual({
      apps: [
        {
          appId: "employee",
          appFacets: [],
          fields: {
            name: {
              fieldCode: "name",
              fieldType: "plain",
              mandatory: true
            }
          }
        }
      ],
      error: {
        message: "unable to fetch apps from server",
        name: "fetch apps error"
      }
    });
  });
});
