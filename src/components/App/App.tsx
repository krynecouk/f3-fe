import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "services/router";
import * as routes from "services/router/routes";
import { HomeScene, LoginScene } from "scenes";

export const App = () => (
  <Router history={history}>
    <Switch>
      <Route path={routes.HOME} exact component={HomeScene} />
      <Route path={routes.LOGIN} exact component={LoginScene} />
    </Switch>
  </Router>
);
