import { curry } from "ramda";

interface LocalStorageDao {
  getLocal: (key: string) => string | undefined;
  setLocal: (key: string) => (data: string) => void;
  removeLocal: (key: string) => void;
}

const getLocal = (key: string) => localStorage.getItem(key) || undefined;

const setLocal = curry((key: string, data: string) =>
  localStorage.setItem(key, data)
);

const removeLocal = (key: string) => localStorage.removeItem(key);

export const localStorageDao: LocalStorageDao = {
  getLocal,
  setLocal,
  removeLocal
};
