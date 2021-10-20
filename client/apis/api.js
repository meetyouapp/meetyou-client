import axios from "axios";

<<<<<<< HEAD
export const instance = axios.create({
  // baseURL: "http://192.168.1.190:3001", //rani
  baseURL: "http://192.168.1.5:3001",
  // baseURL: "http://localhost::3001",
});

// const localIP = '192.168.0.176'
=======
>>>>>>> 6e48d65a2a6924f11f61ced9a50ac05e219c047d
// export const instance = axios.create({
//   baseURL: "http://192.168.1.190:3001", //rani
//   // baseURL: "http://192.168.1.9:3001",
//   // baseURL: "http://localhost::3001",
// });

const localIP = '192.168.0.176'
export const instance = axios.create({
  baseURL: `http://${localIP}:3001`,
});
