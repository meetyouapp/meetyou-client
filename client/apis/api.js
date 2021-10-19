import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://192.168.1.190:3001",
  baseURL: "http://192.168.1.9:3001",
  // baseURL: "http://localhost::3001",
});
