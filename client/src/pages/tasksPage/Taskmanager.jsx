import React, { useState, useEffect } from "react";
import "./Taskmanager.css";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import TaskCard from "./TaskCard";
import NewTaskDialouge from "./NewTaskDialouge";
import { useNavigate } from "react-router";
import GetUser from "../../Utils/GetUser";
import GetError from "../../Utils/GetError";
import TasksOperation from "../../services/taskServices";

function Taskmanager() {
  const [showModal, setShowModal] = useState(false);
  const [getAllTodoFn, setGetAllTodoFn] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchedTask, setSearchedTask] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const navigate = useNavigate();
  // Global Getting todos to be refreshed after deleting or updating todo
  const getAllTodo = async () => {
    try {
      let user = GetUser();
      const response = await TasksOperation.getAllTasks(user?.userId);
      setAllTodo(response.data.todo);
    } catch (err) {
      GetError(err);
      // console.log(err);
    }
  };

  // Getting All Todo
  useEffect(() => {
    let user = GetUser();
    if (user && user?.userId) {
      getAllTodo();
    } else {
      navigate("/login");
    }
  }, [navigate]);
  // useEffect(() => {
  //   onProvideGetAllTodo(() => getAllTodo);
  // }, []);

  // const handleAddTask = (task) => {
  //   if (getAllTodoFn) {
  //     getAllTodoFn();
  //   }
  // };

  const handleSelectedStatus = (value) => {
    setSelectedStatus(value);
  };
  return (
    <div className="task-container">
      {/* Header */}
      <Navbar />

      <div className="task-header mt-12">
        <h1 className="task-title">Your Tasks</h1>

        {/* Search */}
        <div className="task-search-box">
          <input
            type="text"
            placeholder="Search Tasks Here..."
            className="task-search-input"
            value={searchedTask}
            onChange={(e) => {
              setSearchedTask(e.target.value);
            }}
          />
        </div>

        {/* Adding New Task  */}
        <div className="task-controls">
          <button
            className="task-add-button hover:cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>

          {/* Selection Task depending on status  */}
          <select
            className="task-filter-select"
            value={selectedStatus}
            onChange={(e) => handleSelectedStatus(e.target.value)}
          >
            <option value={"Not Completed"}>Not Completed</option>
            <option value={"Completed"}>Completed</option>
            <option value={"all"}>All</option>
          </select>
        </div>
      </div>

      {/* Task card calling  */}

      <TaskCard
        onProvideGetAllTodo={(fn) => setGetAllTodoFn(() => fn)}
        selectedStatus={selectedStatus}
        searchedTask={searchedTask}
        allTodo={allTodo}
        setAllTodo={setAllTodo}
        getAllTodo={getAllTodo}
      />

      {/* <NewTaskDialouge (Pop-up)/> */}
      {showModal && (
        <NewTaskDialouge
          // onSubmit={handleAddTask}
          getAllTodo={getAllTodo}
          onClose={() => setShowModal(false)}
          allTodo={allTodo}
          setAllTodo={setAllTodo}
        />
      )}
    </div>
  );
}

export default Taskmanager;
