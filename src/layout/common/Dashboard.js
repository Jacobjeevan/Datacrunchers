import React, { Component } from "react";
import Events from "../components/Events";
import Officers from "../components/Officers";
import Projects from "../components/Projects";
import Resources from "../components/Resources";
import Career from "../components/Career";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Officers} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/career-prep" component={Career} />
          </Switch>
        </Router>
      </div>
    );
  }
}
