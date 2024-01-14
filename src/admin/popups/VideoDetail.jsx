import React from "react";

const VideoDetail = ({ visibal, onClose, video }) => {
  if (!visibal) {
    return null;
  }
  const confirmVideo = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/video-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          id: video.id,
        }),
      });
      const response = await result.json();
      if (!result.ok) {
        console.error(response.error);
      } else {
        window.location.reload();
        onClose()
      }
    } catch (error) {
      console.error("An error occurred during confirm.", error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        onClick={onClose}
        className="bg-black opacity-30 backdrop-blur-sm fixed inset-0"
      ></div>
      <div className="bg-white relative z-10 text-black p-5 rounded-lg w-full md:w-[600px]">
        <h3 className="font-semibold text-xl mb-2">{video.name}</h3>
        <video src={video.src} controls></video>
        <div className="flex justify-end mt-2 gap-2">
          {video.status === 0 && (
            <button
              onClick={confirmVideo}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-700 duration-300 font-semibold rounded text-white"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 duration-300 font-semibold rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
