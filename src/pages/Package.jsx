import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Package = () => {
  const [packageList, setPackageList] = useState([]);
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
    <div>
      <div className="md:flex md:justify-around">
        {packageList.map((key, index) => (
          <div key={key.id} className="flex flex-col items-center gap-2 py-5 w-[25%]">
            <img src={key.image} alt={key.name} />
            <Link
              to={`/checkout/${key.id}`}
              className="px-10 py-1 w-max bg-blue-500 hover:bg-blue-600 duration-300 rounded"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
