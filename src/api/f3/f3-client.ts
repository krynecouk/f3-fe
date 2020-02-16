import axios from "axios";
import store from "store";
import { logout } from "store/auth/actions";

const BASE_URL = process.env.REACT_APP_F3_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL
});

client.interceptors.request.use(request => {
  const state = store.getState();
  const accessToken = state?.auth?.credentials?.accessToken;
  if (!accessToken) {
      store.dispatch(logout());
  }
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    const status = response?.status;
    const url = response?.config?.url;
    const isLoginPage = url?.includes("/api/login");

    if (!isLoginPage && status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export { client };
