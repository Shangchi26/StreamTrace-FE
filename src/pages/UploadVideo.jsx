import React, { useEffect, useState } from "react";
import imageEmpty from "../assets/empty.jpg";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const [imageSelected, setImageSelected] = useState(null);
  const [videoSelected, setVideoSelected] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (imageSelected) {
      uploadMedia(imageSelected, "image");
    }
  }, [imageSelected]);

  useEffect(() => {
    if (videoSelected) {
      uploadMedia(videoSelected, "video");
    }
  }, [videoSelected]);

  const uploadMedia = async (selectedFile, mediaType) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "fd3hkfji");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhmfdihb0/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to upload ${mediaType} to Cloudinary`);
      }

      const result = await response.json();

      if (mediaType === "image") {
        setThumbnailUrl(result.secure_url);
      } else if (mediaType === "video") {
        setVideoUrl(result.secure_url);
      }
    } catch (error) {
      console.error(`Error uploading ${mediaType} to Cloudinary:`, error);
      throw error;
    }
  };

  const handleImageChange = (e) => {
    setImageSelected(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideoSelected(e.target.files[0]);
  };

  const handleDrop = (e, mediaType) => {
    e.preventDefault();

    const selectedFile = e.dataTransfer.files[0];

    if (mediaType === "image") {
      setImageSelected(selectedFile);
    } else if (mediaType === "video") {
      setVideoSelected(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const postVideo = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/video-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          name: name,
          description: description,
          thumbnail: thumbnailUrl,
          src: videoUrl,
        }),
      });
      const response = await result.json();
      if (!result.ok) {
        console.error(response.error)
      } else {
        navigate("/provider/video");
      }
    } catch (error) {
        console.error("An error occurred during fetch data.", error);
    }
  }

  return (
    <div className="px-10 text-white">
      <h2 className="text-3xl md:text-5xl font-semibold py-5">Upload Video</h2>
      <div className="w-full grid grid-cols-1 xl:grid-cols-[max(600px)_400px] gap-10 px-5 xl:px-0">
        <div className="w-full xl:max-w-[600px]">
          <div className="mb-3 w-full">
            <label htmlFor="name" className="block">
              Video Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full text-black px-2 py-1 rounded outline-none"
              placeholder="Enter your video name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 w-full">
            <label htmlFor="description" className="block">
              Video Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full text-black px-2 py-1 rounded outline-none"
              placeholder="Enter your video description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="mb-8">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              class="sr-only"
              onChange={handleImageChange}
            />
            <label
              for="file"
              onDrop={(e) => handleDrop(e, "image")}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span class="mb-2 block text-xl font-semibold">
                  Drop image here
                </span>
                <span class="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium">
                  Browse
                </span>
              </div>
            </label>
          </div>
          <div class="mb-8">
            <input
              type="file"
              name="file"
              id="file"
              accept="video/*"
              class="sr-only"
              onChange={handleVideoChange}
            />
            <label
              for="file"
              onDrop={(e) => handleDrop(e, "video")}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span class="mb-2 block text-xl font-semibold">
                  Drop video here
                </span>
                <span class="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium">
                  Browse
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="">
            <h3 className="text-xl font-semibold">{name}</h3>
            {videoUrl && thumbnailUrl && (
              <video width="320" height="240" poster={thumbnailUrl} className="my-2" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          <p>{description}</p>
          </div>
          {name && videoUrl && thumbnailUrl && description && (
            <button onClick={postVideo} className="bg-blue-500 px-5 py-1 rounded hover:bg-blue-700 duration-300 my-3">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
