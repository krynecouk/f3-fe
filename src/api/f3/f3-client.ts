import axios from "axios";
import store from "store";
import { logout } from "store/auth/actions";

const BASE_URL = process.env.REACT_APP_F3_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL
});

client.interceptors.request.use(request => {
  const state = store.getState();
  request.headers.Authorization = `Bearer ${state.auth.credentials.accessToken}`; // FIXME null check in Typescript 3.7
  return request;
});

client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      const {
        status,
        config: { url }
      } = response;
      const isLoginPage = !!url && url.includes("/api/login");

      if (!isLoginPage && status === 401) {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export { client };
