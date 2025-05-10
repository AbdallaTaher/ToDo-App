import axios from "axios";

// const SERVER_URL = "http://localhost:5000/api";
const SERVER_URL = "https://todo-app-production-b3e6.up.railway.app/";

const registerUser = (data) => {
  return axios.post(`${SERVER_URL}/register`, data);
};
const loginUser = (data) => {
  return axios.post(`${SERVER_URL}/login`, data);
};

const AuthUser = {
  registerUser,
  loginUser,
};

export default AuthUser;
