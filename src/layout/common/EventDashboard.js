import React, { Fragment } from "react";
import Events from "../components/Events";
import { Route } from "react-router-dom";
import EventDetail from "../components/detail/EventDetail";

export default function EventDashboard() {
  return (
    <Fragment>
      <div className="dashboard-body">
        <Route exact path="/events">
          <Events />
        </Route>
        <Route exact path="/events/:eventid">
          <EventDetail />
        </Route>
      </div>
    </Fragment>
  );
}
