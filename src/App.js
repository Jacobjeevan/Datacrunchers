import React from "react";
import Dashboard from "./layout/common/Dashboard";
import Header from "./layout/common/Header";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Dashboard />
      </Router>
    </div>
  );
}
