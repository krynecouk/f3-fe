export { ls as keyValueStorage } from "./local/local-storage";
export { stateStorage } from "./state/state-storage";

export interface KeyValueStorage<K, V> {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  setKey: (key: K) => (value: V) => void;
  remove: (key: K) => void;
}
