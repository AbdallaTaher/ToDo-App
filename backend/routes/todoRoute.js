const express = require("express");
const router = express.Router();
const {
  createToDo,
  deleteTodo,
  updateTask,
  getAllTasks,
} = require("../controllers/ToDoController");
const Todo = require("../models/toDoModel");
const verifyToken = require("../Middlewares/jwtMiddleware");

router.get("/get-all-todo/:userId", verifyToken, getAllTasks);
router.post("/createTodo", verifyToken, createToDo);
router.delete("/deleteTodo/:id", verifyToken, deleteTodo);
router.patch("/update-to-do/:id", verifyToken, updateTask);

module.exports = router;
