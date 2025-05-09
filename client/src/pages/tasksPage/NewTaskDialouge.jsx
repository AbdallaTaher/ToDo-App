import React, { useState } from "react";
import TasksOperation from "../../services/taskServices";
import GetError from "../../Utils/GetError";
import { message } from "antd";
import GetUser from "../../Utils/GetUser";
import { toast } from "react-toastify";

function NewTaskDialogue({ onClose, onSubmit, getAllTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = GetUser()?.userId;
      const usertoken = GetUser()?.token;
      // console.log(`userID:${userId}`);
      // console.log(`userToken:${usertoken}`);
      const task = {
        Title: title,
        Description: description,
        isCompleted: false,
        createdBy: userId,
      };

      const createdTask = await TasksOperation.createTask(task);
      // console.log(createdTask.data);

      // onSubmit(createdTask);
      // setTitle("");
      // setDescription("");
      // console.log(createdTask.data);
      // message.success("To do task added successfully");
      // getAllTodo();
      // if (getAllTodo) {
      // getAllTodo(); // <-- wait for this to finish!
      // }
      toast.success("To do task added successfully");
      getAllTodo();
      onClose();
      // setTitle("");
      // setDescription("");
    } catch (err) {
      // console.log(GetError(err));
      toast.error(GetError(err));
    }
  };

  return (
    <div className=" flex items-center justify-center z-50 fixed inset-0 bg-gray-500/70 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md ">
        <div className="flex justify-between items-center   mb-4">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-2xl leading-none hover:cursor-pointer  border-black-500"
          >
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Task title"
            className="w-full border border-red-500 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            name="description"
            value={description}
            placeholder="Description"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskDialogue;
