import React, { createContext, useEffect, useState } from "react";
import { loginApi } from "../services/authService";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (username, password) => {
    const res = await loginApi({ username, password });
    const { token, role, name } = res.data;

    // 🔑 VERY IMPORTANT: key must be "token"
    localStorage.setItem("token", token);
    const userObj = { username, role, name };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
