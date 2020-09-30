import React, { useState, useEffect } from "react";
import Dashboard from "./layout/common/Dashboard";
import Header from "./layout/common/Header";
import "./App.css";
import { AuthContext } from "./layout/common/Auth";

export default function App() {
  const [user, set] = useState();

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set(user);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <Header />
        <Dashboard />
      </AuthContext.Provider>
    </div>
  );
}
