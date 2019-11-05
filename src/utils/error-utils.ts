import { curry } from "ramda";

const throwError = curry((tag: string, error: Error): never => {
  error.message = error.message ? `${tag} :: ${error.message}` : `${tag}`;
  throw error;
});

export { throwError };
