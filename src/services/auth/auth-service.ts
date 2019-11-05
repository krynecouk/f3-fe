import { localStorageDao } from "services/dao";
import { path } from "ramda";

const AUTH_KEY = "f3_auth";

interface AuthService {
  getAuth: () => string | undefined;
  setAuth: (auth: string) => void;
  removeAuth: () => void;
  getToken: () => string | undefined;
  getBearer: () => string | undefined;
}

const getAuth = () => localStorageDao.getLocal(AUTH_KEY);

const setAuth = localStorageDao.setLocal(AUTH_KEY);

const removeAuth = () => localStorageDao.removeLocal(AUTH_KEY);

const getToken = () => {
  const auth = localStorageDao.getLocal(AUTH_KEY);
  return !!auth ? _parseToken(auth) : undefined;
};

const getBearer = () => {
  const token = getToken();
  return !!token ? `Bearer ${token}` : undefined;
};

const _parseToken = (auth: string) =>
  path<string>(["credentials", "access_token"], JSON.parse(auth));

export const authService: AuthService = {
  getAuth,
  setAuth,
  removeAuth,
  getToken,
  getBearer
};
