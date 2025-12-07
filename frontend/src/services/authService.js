import api from "../api/axiosClient";

export async function loginApi({ username, password }) {
  return api.post("/api/auth/login", { username, password });
}
