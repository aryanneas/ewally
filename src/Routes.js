import React from "react";
import { isAuthenticated } from "./auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login  from "./components/Login";
import Extrato  from "./components/Extrato";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/extrato" component={Extrato} />
    </Switch>
  </BrowserRouter>
);

export default Routes;