import axios from "axios";
import { http } from "./config";

export const authService = {
  login: async (data) => {
    return http.post("/auth/login", data);
  },
  register: async (data) => {
    return http.post("/auth/register", data);
  },
};
