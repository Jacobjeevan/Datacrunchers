import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Careers from "./Careers";
import CareerDetail from "./CareerDetail";

export default function CareerDashboard() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Careers />
      </Route>
      <Route exact path={`${path}/:careerid`}>
        <CareerDetail />
      </Route>
    </Switch>
  );
}
