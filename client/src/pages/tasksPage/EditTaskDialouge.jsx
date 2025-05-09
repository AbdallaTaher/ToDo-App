import React, { useState } from "react";
import TasksOperation from "../../services/taskServices";
import GetError from "../../Utils/GetError";
import { message } from "antd";
import GetUser from "../../Utils/GetUser";
import { toast } from "react-toastify";

function EditTaskDialouge({ onClose, onSubmit, item, getAllTodo }) {
  const [editTitle, setEditTitle] = useState(item.Title);
  const [editDescription, setEditDescription] = useState(item.Description);
  const [updatedStatus, setUpdatedStatus] = useState(item.isCompleted);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = GetUser()?.userId;
      const usertoken = GetUser()?.token;
      const task = {
        Title: editTitle,
        Description: editDescription,
        isCompleted: updatedStatus,
        createdBy: userId,
      };

      const updatedTask = await TasksOperation.updateTask(item._id, task);
      onSubmit(updatedTask);
      onClose();
      getAllTodo();
      toast.success("To do task Updated successfully");
    } catch (err) {
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
            value={editTitle}
            placeholder="Task title"
            className="w-full border border-red-500 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            required
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            name="description"
            value={editDescription}
            placeholder="Description"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
            onChange={(e) => setEditDescription(e.target.value)}
          ></textarea>
          <select
            className="task-filter-select"
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
          >
            <option value={false}>Not Completed</option>
            <option value={true}>Completed</option>
          </select>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskDialouge;
