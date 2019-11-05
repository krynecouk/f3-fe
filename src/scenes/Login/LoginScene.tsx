import React from "react";
import { Login } from "components";
import { f3 } from "services/api";
import { history } from "services/router";
import * as routes from "services/router/routes";

export const LoginScene = () => (
  <Login
    onLogin={(username: string, password: string) => {
      f3.auth.login(username, password).then(() => history.push(routes.HOME));
    }}
  />
);
