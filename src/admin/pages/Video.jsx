import React, { useEffect, useState } from "react";
import VideoDetail from "../popups/VideoDetail";

const Video = () => {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/all-video");
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
    fetchVideo();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleDetail = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  }

  const deleteVideo = async (id) => {
    try {
      const result = await fetch(
        `http://localhost:8000/api/delete-video/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (result.ok) {
        const updatedVideoList = videoList.filter((video) => video.id !== id);
        setVideoList(updatedVideoList);
      } else {
        console.error("Error deleting video");
      }
    } catch (error) {
      console.error("An error occurred during delete:", error);
    }
  };

  return (
    <div className="px-10 py-20 text-white min-w-full">
      <h2 className="text-3xl md:text-5xl font-semibold py-5">Videos Manage</h2>
      <div>
        <table className="min-w-full">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium hidden md:block px-6 py-4 text-left"
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
                className="text-sm hidden md:block font-medium px-6 py-4 text-left"
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
                <td className="py-4 px-6 hidden md:block whitespace-nowrap text-sm font-medium w-60">
                  <img
                    src={key.thumbnail}
                    alt={key.name}
                    className="h-28 object-cover"
                  />
                </td>
                <td className="text-sm px-6 py-4 whitespace-nowrap">
                  {key.name}
                </td>
                <td className="text-sm px-6 py-4 hidden md:block whitespace-nowrap">
                  {key.description}
                </td>
                <td className="text-sm px-6 py-4 whitespace-nowrap">
                  {key.view}
                </td>
                <td
                  className={`text-sm px-6 py-4 whitespace-nowrap ${
                    key.status === 0 ? "text-red-600" : "text-green-500"
                  }`}
                >
                  {key.status === 0 ? "Unconfirmed" : "Confirmed"}
                </td>

                <td className="text-sm px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteVideo(key.id)}
                    className="bg-red-600 py-2 px-5 mr-3 rounded hover:bg-red-700 duration-300 font-semibold"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDetail(key)}
                    className="bg-blue-600 py-2 px-5 rounded hover:bg-blue-700 duration-300 font-semibold"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <VideoDetail
          onClose={handleOnClose}
          visibal={showModal}
          video={selectedVideo}
        />
      </div>
    </div>
  );
};

export default Video;
