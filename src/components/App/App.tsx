import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "router";
import * as routes from "router/routes";
import { LoginScreen } from "screens";
import { Footer, Header, Main } from "components";
import "./App.scss";
import { EntryViewScreen } from "screens/Entry/EntryViewScreen";
import { NotFoundScreen } from "screens/NotFound/NotFoundScreen";
import { RootScreen } from "screens/Root/RootScreen";
import { EntryCreateScreen } from "screens/Entry/EntryCreateScreen";

export const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Main>
        <Switch>
          <Route path={routes.ROOT} exact component={RootScreen} />
          <Route path={routes.ENTRY_VIEW} exact component={EntryViewScreen} />
          <Route
            path={routes.ENTRY_CREATE}
            exact
            component={EntryCreateScreen}
          />
          <Route path={routes.LOGIN} exact component={LoginScreen} />
          <Route component={NotFoundScreen} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};
