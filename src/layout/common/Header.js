import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "../../css/header.css";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Container>
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
            <Navbar.Brand>
              <Link to="/">Data Crunchers</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link to="/events">Events</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/projects">Projects</Link>
                </Nav.Link>
                <NavDropdown title="Library" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/resources">Resources</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/career-prep">Career Prep</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link>Login</Nav.Link>
                <Nav.Link>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}
