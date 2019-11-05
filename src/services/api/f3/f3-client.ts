import axios, { AxiosResponse } from "axios";
import { curry } from "ramda";
import { history } from "services/router";
import * as routes from "services/router";
import { authService as as } from "services/auth";

const BASE_URL = process.env.REACT_APP_F3_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL
});

client.interceptors.request.use(request => {
  const bearer = as.getBearer();
  if (!bearer) {
    logout();
  } else {
    request.headers.Authorization = bearer;
  }
  return request;
});

client.interceptors.response.use(
  response => {
    if (isAuth(response)) {
      as.setAuth(JSON.stringify(response.data));
    }
    return response;
  },
  error => {
    const status = error.response.status;

    if (status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

const getUrl = (response: AxiosResponse) => response.config.url;

const containsPath = curry(
  (path: string, url: string | undefined) => !!url && url.includes(path)
);

const containsAuthPath = containsPath("/api/login");

const isAuth = (response: AxiosResponse) => containsAuthPath(getUrl(response));

const logout = () => {
  as.removeAuth();
  history.push(routes.LOGIN);
};

export { client };
