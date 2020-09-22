import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "../../css/header.css";
import { withAuth0 } from "@auth0/auth0-react";

class Header extends Component {
  render() {
    const { loginWithRedirect, isAuthenticated, logout } = this.props.auth0;
    return (
      <div>
        <Container>
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
            <div className="navbar-item">
              <Link to="/">Data Crunchers</Link>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" as="ul">
                <div className="navbar-item">
                  <Link to="/events">Events</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/projects">Projects</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/resources">Resources</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/career-prep">Career Prep</Link>
                </div>
              </Nav>
              <Nav>
                {isAuthenticated ? (
                  <Nav.Link
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    onClick={() => loginWithRedirect({ prompt: "consent" })}
                  >
                    Login
                  </Nav.Link>
                )}
                <Nav.Link>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default withAuth0(Header);
