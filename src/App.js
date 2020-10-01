import React, { useState, useEffect } from "react";
import Dashboard from "./layout/common/Dashboard";
import Header from "./layout/common/Header";
import "./App.css";
import { AuthContext } from "./layout/common/Auth";
import { getUser } from "./api/users";

export default function App() {
  const [user, set] = useState();

  const setUser = (user) => {
    set(user);
  };

  useEffect(() => {
    async function getUserFromSession() {
      let user = await getUser();
      if (user) {
        setUser(user);
      }
    }
    getUserFromSession();
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
