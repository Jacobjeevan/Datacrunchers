import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Resources from "./Resources";
import ResourceDetail from "./ResourceDetail";

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
