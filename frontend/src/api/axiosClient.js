import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

console.log("API BASE URL:", baseURL);   

const instance = axios.create({
  baseURL,
});

// Attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
