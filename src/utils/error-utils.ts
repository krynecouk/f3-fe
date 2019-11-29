import { curry } from "ramda";

const tagError = curry(
  (tag: string, error: Error): Error => {
    error.message = error.message ? `${tag} :: ${error.message}` : `${tag}`;
    return error;
  }
);

export { tagError };
