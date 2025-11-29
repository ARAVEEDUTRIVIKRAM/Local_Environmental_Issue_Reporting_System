// frontend/src/api/axiosClient.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",   // backend in Docker
});

// Attach token automatically for every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
