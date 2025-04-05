import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8397/api/v1",
  timeout: 30000,
});
