import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://env-issue-backend.onrender.com";

const api = axios.create({
  baseURL,
  // Render's free instance can need time to wake after inactivity.
  timeout: 65000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
