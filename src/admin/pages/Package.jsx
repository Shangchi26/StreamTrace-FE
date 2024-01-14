import React, { useEffect, useState } from "react";
import PackageUpdate from "../popups/PackageUpdate";
import AddPackage from "../popups/AddPackage";

const Package = () => {
  const [packageList, setPackageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const handleOnClose = () => setShowModal(false);
  const handleAddClose = () => setShowAddPackage(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const handleDetail = (p) => {
    setSelectedPackage(p);
    setShowModal(true);
  };
  const handleAddPackage = () => {
    setShowAddPackage(true)
  }
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get-all-package"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data)
        setPackageList(data);
      } catch (error) {
        console.error("Error fetching packages:", error.message);
      }
    };
    fetchPackage();
  }, []);
  return (
    <div className="px-5 md:px-10 py-20 text-white">
      <button className="block text-3xl md:text-5xl font-semibold py-5">
        Packages Manage
      </button>
      <button
        onClick={handleAddPackage}
        className="my-2 bg-blue-500 px-5 py-1 rounded hover:bg-blue-700 duration-300"
      >
        Add Package
      </button>
      <div>
        <table className="w-full">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-2 md:px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-2 md:px-6 py-4 text-left"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-2 md:px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-2 md:px-6 py-4 text-left"
              >
                Count
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-2 md:px-6 py-4 text-left"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {packageList.map((key, index) => (
              <tr
                key={key.id}
                className="border-b transition duration-300 ease-in-out hover:bg-gray-800 h-max"
              >
                <td className="py-4 px-2 md:px-6 whitespace-nowrap text-sm font-medium w-60">
                  <img src={key.image} alt={key.name} />
                </td>
                <td className=" px-2 md:px-6 py-4 whitespace-nowrap">
                  {key.name}
                </td>
                <td className=" px-2 md:px-6 py-4 whitespace-nowrap">
                  ${key.price}
                </td>
                <td className=" px-2 md:px-6 py-4 whitespace-nowrap">
                  {key.count}
                </td>

                <td className=" px-2 md:px-6 py-4 whitespace-nowrap">
                  <button className="bg-red-600 py-2 px-5 mr-2 rounded hover:bg-red-700 duration-300 font-semibold">
                    Delete
                  </button>
                  <button
                    onClick={() => handleDetail(key)}
                    className="bg-blue-600 py-2 px-5 rounded hover:bg-blue-700 duration-300 font-semibold"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PackageUpdate
        onClose={handleOnClose}
        visibal={showModal}
        p={selectedPackage}
      />
      <AddPackage onClose={handleAddClose} visibal={showAddPackage} />
    </div>
  );
};

export default Package;
