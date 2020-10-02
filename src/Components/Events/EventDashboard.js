import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Events from "./Events";
import EventDetail from "./EventDetail";

export default function EventDashboard() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Events />
      </Route>
      <Route exact path={`${path}/:eventid`}>
        <EventDetail />
      </Route>
    </Switch>
  );
}
