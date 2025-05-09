import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { toast } from "react-toastify";
import GetError from "../Utils/GetError";
import AuthUser from "../services/authServices";
import { useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa";

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        firstName,
        lastName,
        userName,
        password,
      };
      setLoading(true);
      const response = await AuthUser.registerUser(data);
      console.log(response.data);

      toast.success(`Hello ${data.firstName}, You are registerd Successfully`);
      navigate("/login");
      setLoading(false);
    } catch (err) {
      console.log("error");
      toast.error(GetError(err));
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-md mx-auto my-12 p-8 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create your TODO account
          </h1>

          {/* Form data  */}
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* first Name  */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dodo-blue"
                  placeholder="Abdalla"
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>

              {/* Last Name  */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dodo-blue"
                  placeholder="Taher"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>

            {/* userName  */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                User name
              </label>
              <input
                id="userName"
                type="userName"
                value={userName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dodo-blue"
                placeholder="Abdalla_Taher"
                onChange={(e) => setuserName(e.target.value)}
              />
            </div>

            {/* Password  */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dodo-blue"
                placeholder="••••••••"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={!firstName || !lastName || !userName || !password}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dodo-blue"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin inline mr-4" />
                    Loading ...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-dodo-blue hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
