import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useNavigation } from "react-router-dom";
import Loading from "../Loading";
import Comment from "./sections/Comment";
import Channel from "./sections/Channel";

const Video = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/video-detail/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video detail:", error.message);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const addView = async () => {
      try {
        const result = await fetch("http://localhost:8000/api/video-add-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        });
        const response = await result.json();
        if (!result.ok) {
          console.error(response.error);
        }
      } catch (error) {
        console.error("An error occurred during fetch data.", error);
      }
    };

    addView();
  }, [id]);

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

  if (!video) {
    return <Loading />;
  }
  return (
    <section className="min-h-screen w-full bg-gray-900 text-white pt-20">
      <div className="xl:flex xl:justify-between mx-10 md:mx-auto xl:w-[1024px] md:w-[740px] gap-10">
        <div>
          <video
            controls
            className="w-full max-w-[740px] max-h-[416px] aspect-w-16 aspect-h-9 object-cover mb-8"
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Channel video={video} />
          <div className="w-full py-2">
            <div className="title">
              <h2 className="text-2xl font-semibold">{video.name}</h2>
              <p>{video.view} Views</p>
              <p>{video.description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:w-[320px] sm:grid-cols-3 xl:grid-cols-1 gap-5 py-10 xl:pt-0">
          {topVideos.slice(0, 7).map((video, index) => (
            <a
              key={video.id}
              href="#"
              className={`relative xl:w-[320px] flex xl:mb-3 ${
                video.id == id ? "hidden" : ""
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.name}
                className="w-48 object-cover"
              />
              <div className="absolute bottom-1 text-white px-2 xl:relative w-full">
                <h3>{video.name}</h3>
                <p>{video.view} Views</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* start comment component */}
      <Comment videoId={id} comments={video.comments} />
      {/* end comment component */}
    </section>
  );
};

export default Video;
