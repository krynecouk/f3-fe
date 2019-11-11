import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "services/router";
import * as routes from "services/router/routes";
import { HomeScene, LoginScene } from "scenes";
import { Header, Footer, Main } from "components";
import "./App.scss";

export const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Main>
        <Switch>
          <Route path={routes.HOME} exact component={HomeScene} />
          <Route path={routes.LOGIN} exact component={LoginScene} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};
