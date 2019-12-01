import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ENTRY_CREATE, ENTRY_VIEW, history, LOGIN, ROOT } from "router";
import { Footer, Header, Main } from "components";
import {
  EntryCreateScreen,
  EntryViewScreen,
  LoginScreen,
  NotFoundScreen,
  RootScreen
} from "screens";
import "./App.scss";

export const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Main>
        <Switch>
          <Route path={ROOT} exact component={RootScreen} />
          <Route path={ENTRY_VIEW} exact component={EntryViewScreen} />
          <Route path={ENTRY_CREATE} exact component={EntryCreateScreen} />
          <Route path={LOGIN} exact component={LoginScreen} />
          <Route component={NotFoundScreen} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};
