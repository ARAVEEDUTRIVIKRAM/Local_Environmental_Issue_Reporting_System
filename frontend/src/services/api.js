import axios from "../api/axiosClient";

// ---------- AUTH ----------
export const loginApi = (payload) =>
  axios.post("/api/auth/login", payload);  // {username, password}

export const registerApi = (payload) =>
  axios.post("/api/auth/register", payload); // {username, password}

// ---------- ISSUES ----------
export const getIssuesApi = () =>
  axios.get("/api/issues");

export const getIssueByIdApi = (id) =>
  axios.get(`/api/issues/${id}`);

export const createIssueApi = (payload) =>
  axios.post("/api/issues", payload); // {title, description, imagePath}

// ---------- FILE UPLOAD ----------
export const uploadFileApi = (file) => {
  const form = new FormData();
  form.append("file", file);
  return axios.post("/api/files/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
