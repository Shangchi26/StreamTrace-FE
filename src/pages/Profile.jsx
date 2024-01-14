import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { FaRegEdit } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user } = useUser();
  const [isActive, setIsActive] = useState(1);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setUserName(user.user_name);
    }
  }, []);
  return (
    <div className="md:py-10">
      <div>
        <ul className="flex justify-around">
          <li
            onClick={() => setIsActive(1)}
            className={`${
              isActive === 1 ? "bg-gray-400" : ""
            } w-full text-center py-2 border-gray-300 border-b duration-300 cursor-pointer`}
          >
            My Account
          </li>
          <li
            onClick={() => setIsActive(2)}
            className={`${
              isActive === 2 ? "bg-gray-400" : ""
            } w-full text-center py-2 border-gray-300 border-b duration-300 cursor-pointer`}
          >
            Change Password
          </li>
        </ul>
      </div>
      <div className="mt-10">
        {isActive === 1 ? (
          <div className="flex flex-col items-center md:px-[25%]">
            <h3 className="text-3xl md:text-5xl font-semibold mb-10">
              Account Setting
            </h3>
            <div className="w-20 h-20 relative group">
              {user && (
                <>
                  <Avatar
                    imageUrl={user.avatar}
                    fullName={user.full_name}
                    createdAt={user.created_at}
                  />
                  <div className="absolute flex items-center justify-center top-0 w-full h-full group-hover:bg-black opacity-60 duration-300 cursor-pointer rounded-full">
                    <FaRegEdit
                      size={25}
                      className="opacity-0 group-hover:opacity-100 duration-300"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-full py-5 px-10">
              <div className="flex gap-2 py-2 items-center">
                <label htmlFor="fullName" className="w-28 text-end">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="text-black w-full py-1 rounded"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex gap-2 py-2 items-center">
                <label htmlFor="userName" className="w-28 text-end">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="text-black w-full py-1 rounded"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex gap-2 py-2 items-center">
                <label htmlFor="email" className="w-28 text-end">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="text-black w-full py-1 rounded bg-white opacity-30"
                  value={user.email}
                  disabled
                />
              </div>
              <div className="w-full flex justify-center">
                <button className="w-32 md:w-64 text-center bg-blue-500 py-1 rounded mt-1">
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center px-10 md:px-[25%]">
            <h3 className="text-3xl md:text-5xl font-semibold mb-10">
              Change Password
            </h3>
            <div className="py-2 w-full">
              <label htmlFor="oldPassword" className="text-end">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="text-black w-full py-1 px-2 rounded"
                placeholder="Enter your old password..."
              />
            </div>
            <div className="py-2 w-full">
              <label htmlFor="newPassword" className="text-end">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="text-black w-full py-1 px-2 rounded"
                placeholder="Enter your old password..."
              />
            </div>
            <div className="py-2 w-full">
              <label htmlFor="cPassword" className="text-end">
                Confirm Password
              </label>
              <input
                type="password"
                id="cPassword"
                className="text-black w-full py-1 px-2 rounded"
                placeholder="Enter your old password..."
              />
            </div>
            <button className="w-32 md:w-64 text-center bg-blue-500 py-1 rounded mt-2">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
