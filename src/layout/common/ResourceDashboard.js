import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Resources from "../components/Resources";
import ResourceDetail from "../components/detail/ResourceDetail";

export default function ResourceDashboard() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Resources />
      </Route>
      <Route exact path={`${path}/:resourceid`}>
        <ResourceDetail />
      </Route>
    </Switch>
  );
}
