import React, { Suspense, ReactNode } from "react";
import { Router, Switch, Route, Redirect } from "../util/Router";
import ErrorBoundary from "./ErrorBoundary";
import ChannelMessagesPage from "../pages/channel/messages";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import { Spinner } from "../framework/Spinner";
// import Friends from "../pages/friends/friends";

export default function Routes({ children }: { children?: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="text page-center headline">
            <Spinner></Spinner>
          </div>
        }
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/channels/@me" />
            </Route>
            <Route
              exact
              path="/channels/@me"
              component={ChannelMessagesPage}
            ></Route>
            <Route
              exact
              path="/channels/:guild/:channel?"
              component={ChannelMessagesPage}
            ></Route>
            <Route exact path="/login" component={LoginPage}></Route>
            <Route exact path="/register" component={RegisterPage}></Route>
          </Switch>
          {children}
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
