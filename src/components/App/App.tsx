import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "router";
import * as routes from "router/routes";
import { HomeScreen, LoginScreen } from "screens";
import { Header, Footer, Main } from "components";
import "./App.scss";
import "styles/utilities.scss";

export const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Main>
        <Switch>
          <Route path={routes.HOME} exact component={HomeScreen} />
          <Route path={routes.LOGIN} exact component={LoginScreen} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};
