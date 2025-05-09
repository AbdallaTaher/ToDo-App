import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import avatar3 from "../assets/avatar3.png";
import "./Navbar.css";
import { NavLink } from "react-router";
import GetUser from "./../Utils/GetUser";
import { Dropdown } from "antd";
import { useNavigate } from "react-router";

function Navbar() {
  const [userDetails, setUserDetails] = useState("");
  const user = GetUser();
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    setUserDetails(user);
  }, []);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("toDoAppUser");
    navigate("/login");
  };

  const items = [
    { label: <span onClick={handleLogout}>Logout</span>, key: "1" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  return (
    <header>
      <div className="container">
        <NavLink to="/" className="logo-part">
          <div className="logo">
            <img src={logo} alt="TODO Logo" className="w-8 h-8" />
          </div>
          <h1>TODO</h1>
        </NavLink>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <NavLink to="/" className="list-item">
                Home
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/to-do-list" className="list-item">
                  My Tasks
                </NavLink>
              </li>
            )}
            {user ? (
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <div className="flex justify-between items-center  border-black-100 border-1 rounded-md px-4">
                  <input
                    type="file"
                    accept="image/*"
                    id="profileUpload"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profileUpload" className="cursor-pointer">
                    <img
                      src={selectedImage ? selectedImage : avatar3}
                      alt="profile"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  </label>
                  <span className="list-item hover:cursor-pointer">{`Hello ${user?.userName}`}</span>
                </div>
              </Dropdown>
            ) : (
              <>
                <li>
                  <NavLink to="/Login" className="list-item">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Register" className="list-item">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
