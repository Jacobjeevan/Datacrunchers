import React, { Component } from "react";
import Officers from "../Officers/Officers";
import { Switch, Route } from "react-router-dom";
import "./dashboard.css";
import Container from "react-bootstrap/Container";
import EventDashboard from "../Events/EventDashboard";
import ProjectDashboard from "../Projects/ProjectDashboard";
import CareerDashboard from "../Careers/CareerDashboard";
import ResourceDashboard from "../Resources/ResourceDashboard";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

export default class Dashboard extends Component {
  render() {
    return (
      <Container className="dashboard">
        <div className="dashboard-body">
          <Switch>
            <Route exact path="/">
              <Officers />
            </Route>
            <Route path="/events">
              <EventDashboard />
            </Route>
            <Route path="/projects">
              <ProjectDashboard />
            </Route>
            <Route path="/career-prep">
              <CareerDashboard />
            </Route>
            <Route path="/resources">
              <ResourceDashboard />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        </div>
      </Container>
    );
  }
}
