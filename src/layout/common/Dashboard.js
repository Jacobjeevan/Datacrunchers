import React, { Component } from "react";
import Officers from "../components/Officers";
import Projects from "../components/Projects";
import Resources from "../components/Resources";
import Careers from "../components/Careers";
import { Switch, Route } from "react-router-dom";
import "../../css/dashboard.css";
import Container from "react-bootstrap/Container";
import EventDashboard from "./EventDashboard";

export default class Dashboard extends Component {
  render() {
    return (
      <Container className="dashboard">
        <Switch>
          <Route exact path="/" component={Officers} />
          <Route path="/" component={EventDashboard} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/career-prep" component={Careers} />
        </Switch>
      </Container>
    );
  }
}
