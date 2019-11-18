import { curry } from "ramda";
import { KeyValueStorage } from "storages";

const get = (key: string) => localStorage.getItem(key) || undefined;

const set = (key: string, data: string) => localStorage.setItem(key, data);

const setKey = curry(set);

const remove = (key: string) => localStorage.removeItem(key);

export const ls: KeyValueStorage<string, string> = {
  get,
  set,
  setKey,
  remove
};
