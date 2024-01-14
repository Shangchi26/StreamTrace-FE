import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";

const User = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/all-user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setUserList(data);
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="px-10 py-20 text-white">
      <h2 className="text-3xl md:text-5xl font-semibold py-5">Users Manage</h2>
      <div>
        <table className="min-w-full">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Avatar
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                User Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Count
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((key, index) => (
              <tr key={key.id} className="border-b transition duration-300 ease-in-out hover:bg-gray-800 h-max">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium w-60">
                  {key.full_name}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12">
                    <Avatar
                      imageUrl={key.avatar}
                      fullName={key.full_name}
                    />
                  </div>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {key.user_name}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {key.email}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {key.count}
                </td>

                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <button className="bg-red-600 py-2 px-5 rounded hover:bg-red-700 duration-300 font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
