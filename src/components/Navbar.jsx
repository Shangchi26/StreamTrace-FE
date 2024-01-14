import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Navbar = ({ user }) => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="/user-profile">
          My Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="/provider">
          My Channel
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={logout} rel="noopener noreferrer">
          Logout
        </div>
      ),
    },
  ];
  return (
    <>
      <nav className="sticky top-0 z-50 h-20 w-full bg-gray-900 flex items-center justify-between px-5 md:px-10 border-b border-gray-600">
        <a href="/" className="h-14 w-14">
          <img src={logo} alt="" className="w-full object-cover" />
        </a>
        <div
          className="text-white xl:hidden"
          onClick={() => setNavbar(!navbar)}
        >
          <FaBars size={25} />
        </div>
        <div className="hidden xl:flex justify-center gap-5 py-6">
          {user ? (
            <>
              <Dropdown menu={{ items }} placement="bottomRight">
                <button className="text-white font-semibold">
                  Hello, {user.user_name}
                </button>
              </Dropdown>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-white py-2 flex w-32 justify-center rounded-md bg-blue-600 hover:bg-blue-700 duration-300 font-semibold"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-white py-2 flex w-32 justify-center rounded-md bg-blue-600 hover:bg-blue-700 duration-300 font-semibold"
              >
                Register
              </a>
            </>
          )}
        </div>
        <div
          className={`absolute duration-300 w-full left-0 bg-gray-900 ${
            navbar ? "top-0" : "-top-40"
          }`}
        >
          <div className="h-20 w-full flex justify-between items-center px-5 md:px-10">
            <div className="w-14 h-14">
              <img src={logo} alt="" className="w-14 object-cover" />
            </div>
            <div className="text-white" onClick={() => setNavbar(!navbar)}>
              <IoClose size={30} />
            </div>
          </div>
          <div className="flex justify-center gap-5 py-6">
            {user ? (
              <>
                <p className="font-semibold text-white">
                  Hello, {user.user_name}
                </p>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white py-2 flex w-32 justify-center rounded-md bg-blue-600 hover:bg-blue-700 duration-300 font-semibold"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-white py-2 flex w-32 justify-center rounded-md bg-blue-600 hover:bg-blue-700 duration-300 font-semibold"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
