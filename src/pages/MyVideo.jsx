import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const MyVideo = () => {
  const { user } = useUser();
  const id = user.id;
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const video = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/my-video/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setVideoList(data);
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };
    video();
  }, [id]);

  const deleteVideo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete-video/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("An error occurred during delete: ", error);
    }
  }
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-800 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Thumbnail
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      View
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Status
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
                  {videoList.map((key, index) => (
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-800 h-max">
                      <td className="py-4 whitespace-nowrap text-sm font-medium w-60">
                        <img
                          src={key.thumbnail}
                          alt={key.name}
                          className="h-28 object-cover"
                        />
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {key.name}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {key.description}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {key.view}
                      </td>
                      <td className={`text-sm font-light px-6 py-4 whitespace-nowrap ${key.status === 0 ? "text-red-600" : "text-green-500"}`}>
                        {key.status === 0 ? "Unconfirmed" : "Confirmed"}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        <button onClick={() => deleteVideo(key.id)} className="bg-red-600 py-2 px-5 rounded hover:bg-red-700 duration-300 font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVideo;
