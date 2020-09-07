import React from "react";
import Dashboard from "./layout/common/Dashboard";
import Header from "./layout/common/Header";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Container>
        <Router>
          <Header />
          <Dashboard />
        </Router>
      </Container>
    </div>
  );
}
