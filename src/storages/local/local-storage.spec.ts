import { ls } from "./local-storage";

describe("local-storage", () => {
  const TEST_KEY = "f3_local_storage_test";

  afterEach(() => ls.remove(TEST_KEY));

  it("should set new local storage item", () => {
    ls.set(TEST_KEY, "a");
    const result = ls.get(TEST_KEY);
    expect(result).toBeTruthy();
    expect(result).toBe("a");
  });

  it("should return undefined if local storage item was not found", () => {
    const result = ls.get("FAKE_KEY");
    expect(result).toBeFalsy();
    expect(result).toBe(undefined);
  });

  it("should remove local storage item", () => {
    ls.setKey(TEST_KEY)("a");
    const created = ls.get(TEST_KEY);
    expect(created).toBeTruthy();
    expect(created).toBe("a");

    ls.remove(TEST_KEY);
    const removed = ls.get(TEST_KEY);
    expect(removed).toBeFalsy();
    expect(removed).toBe(undefined);
  });
});
