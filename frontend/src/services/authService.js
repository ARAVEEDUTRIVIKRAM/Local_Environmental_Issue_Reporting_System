import { api } from "../utils/api";

export async function login(username, password) {
  return api.post("/api/auth/login", { username, password });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
}
