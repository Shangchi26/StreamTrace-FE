import React, { useState } from "react";

const PackageUpdate = ({ visibal, onClose, p }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);

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

  if (!visibal) {
    return null;
  }
  const id = p.id;
  const update = async () => {
    try {
      const result = await fetch(
        `http://localhost:8000/api/update-package/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            price: price,
            count: count,
            image: selectedFile,
          }),
        }
      );
      const response = await result.json();
      if (result.ok) {
        window.location.reload();
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.log("An error occurred during update.", error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        onClick={onClose}
        className="bg-black opacity-30 backdrop-blur-sm fixed inset-0"
      ></div>
      <div className="bg-white relative z-10 text-black p-5 rounded-lg w-full md:w-[600px]">
        <h3 className="font-semibold text-xl">Package Update</h3>
        <div className="py-2 w-full">
          <label
            htmlFor="name"
            className="inline-block w-[25%] border py-2 rounded-s-md bg-gray-300 text-start px-2"
          >
            Package name
          </label>
          <input
            id="name"
            type="text"
            // value={p.name}
            onChange={(e) => setName(e.target.value)}
            className="border-none bg-gray-200 py-2 rounded-e-md w-[75%]"
          />
        </div>
        <div className="py-2 w-full">
          <label
            htmlFor="price"
            className="inline-block w-[25%] border py-2 rounded-s-md bg-gray-300 text-start px-2"
          >
            Price
          </label>
          <input
            id="price"
            type="text"
            // value={p.price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-none bg-gray-200 py-2 rounded-e-md w-[75%]"
          />
        </div>
        <div className="py-2 w-full">
          <label
            htmlFor="count"
            className="inline-block w-[25%] border py-2 rounded-s-md bg-gray-300 text-start px-2"
          >
            Count
          </label>
          <input
            id="count"
            type="number"
            // value={p.count}
            onChange={(e) => setCount(e.target.value)}
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
          <div className="text-center">
            <p>{selectedFile.name}</p>
          </div>
        )}
        <div className="flex justify-end mt-2 gap-2">
          <button
            onClick={update}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 duration-300 font-semibold rounded text-white"
          >
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

export default PackageUpdate;
