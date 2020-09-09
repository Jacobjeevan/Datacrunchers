import React, { Component } from "react";
import "../../css/projects.css";
import Container from "react-bootstrap/Container";
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
        <ProjectsContainer
          formDisplay={this.state.formDisplay}
          toggleForm={this.toggleForm}
        />
      </Container>
    );
  }
}
