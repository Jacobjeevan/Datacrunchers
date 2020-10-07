import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Main/Dashboard";
import Header from "./Components/Main/Header";
import "./App.css";
import { AuthContext } from "./Components/Auth/Auth";
import { getUser } from "./Components/Auth/authAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, set] = useState();

  const setUser = (user) => {
    set(user);
  };

  function isAuthenticated() {
    if (user) {
      return true;
    }
    return false;
  }

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
        <Header />
        <Dashboard />
      </AuthContext.Provider>
    </div>
  );
}
