import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Projects from "./Projects";
import ProjectDetail from "./ProjectDetail";

export default function ProjectDashboard() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Projects />
      </Route>
      <Route exact path={`${path}/:projectid`}>
        <ProjectDetail />
      </Route>
    </Switch>
  );
}
