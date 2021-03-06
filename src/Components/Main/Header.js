import React, { Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, Redirect } from "react-router-dom";
import "./header.css";
import { AuthContext } from "../Auth/Auth";
import { logoutUser } from "../Auth/authAPI";
import { Button } from "react-bootstrap";

class Header extends Component {
  render() {
    const { user, setUser } = this.context;

    async function logout() {
      await logoutUser();
      setUser({});
      return <Redirect to="/" />;
    }

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
                {user ? (
                  <Button onClick={() => logout()}> Logout</Button>
                ) : (
                  <Fragment>
                    <div className="navbar-item">
                      <Link to="/login">Login</Link>
                    </div>
                    <div className="navbar-item">
                      <Link to="/register">Register</Link>
                    </div>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}

Header.contextType = AuthContext;

export default Header;
