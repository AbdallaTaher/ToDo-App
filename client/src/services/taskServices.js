import axios from "axios";
import GetUser from "../Utils/GetUser";

const SERVER_URL = "http://localhost:5000/api";

const authHeaders = () => {
  let userToken = GetUser()?.token;
  return { headers: { Authorization: userToken } };
};
const getAllTasks = (userId) => {
  return axios.get(`${SERVER_URL}/todo/get-all-todo/${userId}`, authHeaders());
};
const deleteTask = (taskId) => {
  return axios.delete(`${SERVER_URL}/todo/deleteTodo/${taskId}`, authHeaders());
};
const updateTask = (taskId, taskData) => {
  return axios.patch(
    `${SERVER_URL}/todo/update-to-do/${taskId}`,
    taskData,
    authHeaders()
  );
};
const createTask = (taskData) => {
  return axios.post(`${SERVER_URL}/todo/createTodo`, taskData, authHeaders());
};

const TasksOperation = {
  getAllTasks,
  deleteTask,
  updateTask,
  createTask,
};

export default TasksOperation;
