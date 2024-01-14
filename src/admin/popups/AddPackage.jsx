import React, { useEffect, useState } from "react";

const AddPackage = ({ visibal, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);
  const [imageUrl, setImageUrl] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const getImageUrl = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "fd3hkfji");
    try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhmfdihb0/upload",
          {
            method: "POST",
            body: formData,
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress < 99 ? progress : 99);
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to upload package image to Cloudinary`);
        }

        const result = await response.json();
        setImageUrl(result.secure_url);
        console.log(imageUrl)
    } catch (error) {
         console.error(`Error uploading package image to Cloudinary:`, error);
         throw error;
    }
  };
  useEffect(() => {
    if(selectedFile) {
        getImageUrl(selectedFile)
    }
  }, [selectedFile])
  useEffect(() => {
    let timeout;
    if (imageUrl && uploadProgress < 99) {
      timeout = setTimeout(() => {
        setUploadProgress(100);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [imageUrl, uploadProgress]);

  if (!visibal) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        onClick={onClose}
        className="bg-black opacity-30 backdrop-blur-sm fixed inset-0"
      ></div>
      <div className="bg-white relative z-10 text-black p-5 rounded-lg w-full md:w-[600px]">
        <h3>Add Package</h3>
        <div className="py-2 w-full">
          <label
            htmlFor="name"
            className="inline-block w-[25%] border py-2 rounded-s-md bg-gray-300 text-start px-2"
          >
            Package name
          </label>
          <input
            type="text"
            id="name"
            className="border-none bg-gray-200 py-2 rounded-e-md w-[75%]"
          />
        </div>
        <div className="py-2 w-full">
          <label
            htmlFor="count"
            className="inline-block w-[25%] border py-2 rounded-s-md bg-gray-300 text-start px-2"
          >
            Package count
          </label>
          <input
            type="number"
            id="count"
            className="border-none bg-gray-200 py-2 rounded-e-md w-[75%]"
          />
        </div>
        <div className="py-2 w-full">
          <label
            htmlFor="price"
            className="inline-block w-[25%] border py-2 rounded-s-md bg-gray-300 text-start px-2"
          >
            Package price
          </label>
          <input
            type="text"
            id="price"
            className="border-none bg-gray-200 py-2 rounded-e-md w-[75%]"
          />
        </div>
        <div
          class="bg-gray-100 py-2 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
          id="dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label
            for="fileInput"
            class="cursor-pointer flex flex-col items-center space-y-2"
          >
            <svg
              class="w-16 h-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span class="text-gray-600">Drag and drop your image here</span>
            <span class="text-gray-500 text-sm">(skip to use old image)</span>
          </label>
          <input
            type="file"
            id="fileInput"
            class="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {selectedFile && (
          <>
            <div className="flex items-center mt-4">
              <div
                className="bg-blue-500 h-2 rounded-md"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <span className="ml-2">{uploadProgress}%</span>
            </div>

            {imageUrl && (
              <div className="text-center">
                <p>{imageUrl}</p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end mt-2 gap-2">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 duration-300 font-semibold rounded text-white">
            Update
          </button>

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

export default AddPackage;
