import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (token && username) setUser({ username, role });
    setReady(true);
  }, []);

  const login = async (username, password) => {
    const res = await axios.post("/auth/login", { username, password });
    const { token, username: uname, role, name } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("username", uname);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name || uname);
    setUser({ username: uname, role });
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
