// @ts-ignore
describe("state-storage", () => {
  const mockState = {
    auth: {
      credentials: {},
      user: {}
    },
    falsy: {
      missing: undefined,
      nullable: null,
      empty: "",
      false: false
    }
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it("should store state into persistent key-value storage", async () => {
    console.error = jest.fn();
    jest.doMock("storages/local/local-storage", () => ({
      ls: {
        set: (key: string, value: string) => {}
      }
    }));

    const stateStorageModule = await import("./state-storage");
    stateStorageModule.stateStorage.setState(mockState);

    expect(console.error).not.toBeCalled();
  });

  it("should return state from persistent key-value storage", async () => {
    jest.doMock("storages/local/local-storage", () => ({
      ls: {
        get: (key: string) => JSON.stringify(mockState)
      }
    }));

    const stateStorageModule = await import("./state-storage");
    expect(stateStorageModule.stateStorage.getState()).toEqual(mockState);
  });
});
