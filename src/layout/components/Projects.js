import React, { Component } from "react";
import "../../css/projects.css";
import Container from "react-bootstrap/Container";
import Projectsform from "./private/Projectsform";
import ProjectsContainer from "./ProjectContainer";
import Button from "react-bootstrap/Button";

export default class Projects extends Component {
  state = {
    formDisplay: false,
  };

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  };

  render() {
    return (
      <Container>
        <Button variant="primary" onClick={this.toggleForm}>
          Add Project
        </Button>{" "}
        {this.state.formDisplay ? (
          <Projectsform toggle={this.toggleForm} />
        ) : null}
        <ProjectsContainer />
      </Container>
    );
  }
}
