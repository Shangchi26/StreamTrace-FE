import React, { useEffect, useState } from "react";
import film from "../assets/film.png";

const Home = ({ videos }) => {
  const [newVideos, setNewVideos] = useState([]);
  const [topVideos, setTopVideos] = useState([]);
  useEffect(() => {
    const fetchTopVideos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-top");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTopVideos(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchTopVideos();
  }, []);

  useEffect(() => {
    const fetchNewVideos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-new");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNewVideos(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchNewVideos();
  }, []);
  return (
    <section className="w-full min-h-screen bg-gray-900">
      <div className="px-10 py-5 md:px-20 xl:px-[20%]">
        <h2 className="mb-2 font-bold text-white text-2xl">Popular Film</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {topVideos.slice(0, 9).map((video, index) => (
            <a
              key={video.id}
              href={`/video/${video.id}`}
              className={`relative group cursor-pointer overflow-hidden ${
                index === 0
                  ? "xl:col-start-1 xl:col-end-3 xl:row-start-1 xl:row-end-3"
                  : ""
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.name}
                className="w-full h-full object-cover group-hover:scale-110 duration-300"
              />
              <div className="absolute bottom-1 text-white px-2">
                <h3>{video.name}</h3>
                <p>{video.view} Views</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="px-10 py-5 md:px-20 xl:px-[20%]">
        <h2 className="mb-2 font-bold text-white text-2xl">New Film</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {newVideos.slice(0, 9).map((video, index) => (
            <div
              key={video.id}
              className={`relative group cursor-pointer overflow-hidden ${
                index === 0
                  ? "xl:col-start-1 xl:col-end-3 xl:row-start-1 xl:row-end-3"
                  : ""
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.name}
                className="w-full h-full object-cover group-hover:scale-110 duration-300"
              />
              <div className="absolute bottom-1 text-white px-2">
                <h3>{video.name}</h3>
                <p>Views: {video.view} Views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
