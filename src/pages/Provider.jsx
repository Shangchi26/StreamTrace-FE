import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdSpaceDashboard, MdVideoLibrary } from "react-icons/md";
import { BiSolidPackage, BiSolidVideoPlus } from "react-icons/bi";
import { FaBars } from "react-icons/fa";

const Provider = () => {
  return (
    <section className="relative w-full min-h-screen xl:grid xl:grid-cols-[300px_auto] bg-gray-900 text-white">
      <Sidebar />
      <div className='pt-16 px-10'>
        <Outlet />
      </div>
    </section>
  );
}

export default Provider