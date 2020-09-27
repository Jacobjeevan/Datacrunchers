import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Careers from "../components/Careers";
import CareerDetail from "../components/detail/CareerDetail";

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
