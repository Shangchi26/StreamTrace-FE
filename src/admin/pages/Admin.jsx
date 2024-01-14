import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Admin = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="relative min-w-max min-h-screen bg-gray-600">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div className={`${sidebar ? "pl-[300px]" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
