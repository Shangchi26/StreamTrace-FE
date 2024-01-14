import React, { useState } from "react";
import { MdSpaceDashboard, MdVideoLibrary } from "react-icons/md";
import { FaUser, FaShoppingBasket } from "react-icons/fa";
import { IoClose, IoIdCard } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";

const Sidebar = ({ sidebar, setSidebar}) => {
  return (
    <div
      className={`top-0 w-[300px] min-h-screen bg-gray-800 absolute md:fixed text-white ${
        sidebar ? "left-0" : "-left-[300px]"
      } duration-300`}
    >
      <button
        onClick={() => setSidebar(!sidebar)}
        className={`absolute top-2 ${sidebar ? "right-2" : "-right-8"}`}
      >
        {sidebar ? <IoClose size={30} /> : <FaBars size={25} />}
      </button>
      <a href="/admin" className="flex justify-center my-10 mx-auto">
        <h2 className="inline-block text-3xl font-semibold underline">
          StreamTrace
        </h2>
      </a>
      <ul className="py-5 px-8 text-xl">
        <li className="py-2 px-2 my-1 rounded-lg duration-300 hover:px-4 hover:bg-gray-600 cursor-pointer">
          <a href="/admin" className="w-full h-full flex items-center gap-1">
            <span>
              <MdSpaceDashboard size={25} />
            </span>{" "}
            DashBoard
          </a>
        </li>
        <li className="py-2 px-2 my-1 rounded-lg duration-300 hover:px-4 hover:bg-gray-600 cursor-pointer">
          <a
            href="/admin/user-manage"
            className="w-full h-full flex items-center gap-1"
          >
            <span>
              <FaUser />
            </span>
            Users
          </a>
        </li>
        <li className="py-2 px-2 my-1 rounded-lg duration-300 hover:px-4 hover:bg-gray-600 cursor-pointer">
          <a
            href="/admin/video-manage"
            className="w-full h-full flex items-center gap-1"
          >
            <span>
              <MdVideoLibrary />
            </span>
            Videos
          </a>
        </li>
        <li className="py-2 px-2 my-1 rounded-lg duration-300 hover:px-4 hover:bg-gray-600 cursor-pointer">
          <a
            href="/admin/all-order"
            className="w-full h-full flex items-center gap-1"
          >
            <span>
              <FaShoppingBasket />
            </span>
            Order
          </a>
        </li>
        <li className="py-2 px-2 my-1 rounded-lg duration-300 hover:px-4 hover:bg-gray-600 cursor-pointer">
          <a
            href="/admin/package-manage"
            className="w-full h-full flex items-center gap-1"
          >
            <span>
              <IoIdCard />
            </span>
            Packages
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
