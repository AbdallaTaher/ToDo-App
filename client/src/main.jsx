import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Landing from "./pages/landing/landing.jsx";
import ToDoList from "./todo/ToDoList.jsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/to-do-list",
    element: <ToDoList />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
