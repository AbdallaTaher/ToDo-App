import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../services/authServices";
import { toast } from "react-toastify";
import GetError from "../Utils/GetError";
import { FaSpinner } from "react-icons/fa";

import "./Login.css";
function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        userName,
        password,
      };
      setloading(true);
      const response = await AuthUser.loginUser(data);
      console.log(response.data);
      localStorage.setItem("toDoAppUser", JSON.stringify(response.data));
      toast.success(`Hello ${data.userName}, You are logged in successfully`);
      navigate("/to-do-list");
      setloading(false);
    } catch (err) {
      // console.log("Error now in log in", err);
      toast.error(GetError(err));
      setloading(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-md mx-auto my-12 p-8 bg-white shadow-md rounded ">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to TODO</h1>
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div>
              <input
                id="userName"
                type="text"
                className="userNameStyle"
                placeholder="Username"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                className="passwordStyle"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="buttonStyle"
                disabled={!userName || !password}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin inline mr-4" />
                    Logging in ...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-dodo-blue hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
