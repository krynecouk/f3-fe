import { localStorageDao as ls } from "./local-storage-dao";

describe("Local Storage DAO", () => {
  const TEST_KEY = "f3_local_storage_test";

  afterEach(() => ls.removeLocal(TEST_KEY));

  it("should set new local storage item", () => {
    ls.setLocal(TEST_KEY)("a");
    const result = ls.getLocal(TEST_KEY);
    expect(result).toBeTruthy();
    expect(result).toBe("a");
  });

  it("should return undefined if local storage item was not found", () => {
    const result = ls.getLocal("FAKE_KEY");
    expect(result).toBeFalsy();
    expect(result).toBe(undefined);
  });

  it("should remove local storage item", () => {
    ls.setLocal(TEST_KEY)("a");
    const created = ls.getLocal(TEST_KEY);
    expect(created).toBeTruthy();
    expect(created).toBe("a");

    ls.removeLocal(TEST_KEY);
    const removed = ls.getLocal(TEST_KEY);
    expect(removed).toBeFalsy();
    expect(removed).toBe(undefined);
  });
});
