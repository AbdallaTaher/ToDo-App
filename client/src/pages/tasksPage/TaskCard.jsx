import React, { useEffect, useState, useCallback } from "react";
import "./Taskmanager.css";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import TasksOperation from "../../services/taskServices";
import GetUser from "../../Utils/GetUser";
import GetError from "../../Utils/GetError";
import { useNavigate } from "react-router";
import EditTaskDialouge from "./EditTaskDialouge";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFolderOpen } from "react-icons/fa";

function TaskCard({
  onProvideGetAllTodo,
  selectedStatus,
  searchedTask,
  allTodo,
  setAllTodo,
  getAllTodo,
}) {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  // Deleting Todos
  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // blue
      cancelButtonColor: "#d33", // red
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await TasksOperation.deleteTask(item._id);
        toast.success("The task deleted successfully");

        //  The coming line is replacement for getAllTodo function to can delete the last remaining task
        setAllTodo((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== item._id)
        );
      } catch (err) {
        // console.log(err);
        GetError(err);
      }
    }
  };

  // Marking todo as complete
  const handleComplete = async (item) => {
    try {
      const updatedTask = { ...item, isCompleted: true };
      const response = await TasksOperation.updateTask(item._id, updatedTask);
      toast.success("The status became completed seccessfully");
      getAllTodo();
    } catch (err) {
      GetError(err);
    }
  };

  const handleEditModalSubmit = () => {};

  if (allTodo.length === 0) {
    return (
      <div className="no-tasks flex flex-col items-center justify-center mt-24 gap-4">
        <FaFolderOpen size={100} className="text-gray-400" />
        <p className="text-lg text-gray-500">No Tasks Found</p>
      </div>
    );
  }
  // Getting date formatted
  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let finaldate = `${dateString} at ${hh}:${mm}:${ss}`;
    return finaldate;
  };
  return (
    <>
      <div className="task-grid">
        {/* task card start  */}
        {allTodo
          .filter((item) => {
            if (selectedStatus === "all") return true;
            if (selectedStatus === "Completed") return item.isCompleted;
            if (selectedStatus === "Not Completed") return !item.isCompleted;
          })
          .filter((item) => {
            if (searchedTask) {
              return (
                item.Title.toLowerCase().includes(searchedTask.toLowerCase()) ||
                item.Description.toLowerCase().includes(
                  searchedTask.toLowerCase()
                )
              );
            }
            return true;
          })
          .map((item) => {
            return (
              <div className="task-card" key={item?._id}>
                <div className="task-card-header">
                  <h2 className="task-card-title">{item.Title}</h2>

                  {item.isCompleted ? (
                    <span className="task-badge-complete">Completed </span>
                  ) : (
                    <span className="task-badge-incomplete">
                      Not Completed{" "}
                    </span>
                  )}
                </div>
                <p className="task-desc">{item.Description}</p>
                <div className="task-card-footer">
                  <span className="task-date">
                    Created:
                    <span className="ml-9">
                      {getFormattedDate(item.createdAt)}
                      <br></br>
                    </span>
                    Last updated:
                    <span> {getFormattedDate(item.updatedAt)}</span>
                  </span>
                  <div className="task-icons">
                    <FaEdit
                      className="task-icon edit"
                      title="Edit"
                      onClick={() => {
                        setShowEditModal(true);
                        setItemToEdit(item);
                      }}
                    />
                    <FaTrash
                      className="task-icon delete"
                      title="Delete"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    />
                    <FaCheck
                      className="task-icon complete"
                      title="Mark as completed"
                      onClick={() => handleComplete(item)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        {/* task card finish */}

        {/* Edit Modal Screen start  */}
        {showEditModal && (
          <EditTaskDialouge
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditModalSubmit}
            item={itemToEdit}
            getAllTodo={getAllTodo}
          />
        )}
        {/* Edit Modal Screen finish  */}
      </div>
    </>
  );
}

export default TaskCard;
