import axios from "axios";

<<<<<<< HEAD
export const instance = axios.create({
//   baseURL: "http://192.168.1.190:3001", //rani
  baseURL: "http://192.168.1.5:3001",
// baseURL: "http://localhost::3001",
});

// const localIP = '192.168.0.176'
=======
>>>>>>> 3c8fa304f6b607d159f58e03fffbc00c7c641694
// export const instance = axios.create({
// //   baseURL: "http://192.168.1.190:3001", //rani
//   baseURL: "http://192.168.1.9:3001",
// // baseURL: "http://localhost::3001",
// });

const localIP = '192.168.0.176'
export const instance = axios.create({
  baseURL: `http://${localIP}:3001`,
});
