import React, { useEffect, useState } from "react";
import { MdSpaceDashboard, MdVideoLibrary } from "react-icons/md";
import { BiSolidPackage, BiSolidVideoPlus } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`xl:relative absolute w-[300px] z-40 min-h-screen flex gap-3 flex-col border-r bg-gray-900 border-gray-500 pl-10 pt-8 ${
        sidebar ? "left-0" : "-left-[300px]"
      } duration-300`}
    >
      <button
        onClick={() => setSidebar(!sidebar)}
        className="absolute xl:hidden -right-8 top-2"
      >
        {sidebar ? <IoClose size={30} /> : <FaBars size={25} />}
      </button>
      <a
        href="/provider/"
        className="flex items-center gap-2 hover:px-2 group duration-300"
      >
        <span className="group-hover:text-blue-300">
          <MdSpaceDashboard size={25} />
        </span>
        <p className="text-xl group-hover:text-blue-300">Your Channel</p>
      </a>
      <a
        href="/provider/package"
        className="flex items-center gap-2 hover:px-2 group duration-300"
      >
        <span className="group-hover:text-blue-300">
          <BiSolidPackage size={25} />
        </span>
        <p className="text-xl group-hover:text-blue-300">Your Package</p>
      </a>
      <a
        href="/provider/video"
        className="flex items-center gap-2 hover:px-2 group duration-300"
      >
        <span className="group-hover:text-blue-300">
          <MdVideoLibrary size={25} />
        </span>
        <p className="text-xl group-hover:text-blue-300">Your Video</p>
      </a>
      <a
        href="/provider/upload-video"
        className="flex items-center gap-2 hover:px-2 group duration-300"
      >
        <span className="group-hover:text-blue-300">
          <BiSolidVideoPlus size={25} />
        </span>
        <p className="text-xl group-hover:text-blue-300">Upload video</p>
      </a>
    </div>
  );
};

export default Sidebar;
