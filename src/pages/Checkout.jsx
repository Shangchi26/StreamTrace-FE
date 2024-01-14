import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "antd";

const Checkout = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [packageInfo, setPackageInfo] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [successCheckout, setSuccessCheckout] = useState(false);
  useEffect(() => {
    const fetchPackageInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/package-info/${packageId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        setPackageInfo(data);
      } catch (error) {
        console.error("Error fetching packages:", error.message);
      }
    };
    fetchPackageInfo();
  }, [packageId]);

  const postCheckout = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          package_id: packageInfo.id,
          price: packageInfo.price,
          count: packageInfo.count,
        }),
      });
      const response = await result.json();
      if (!result.ok) {
        console.error(response.error);
      } else {
        setSuccessCheckout(true);
        setTimeout(() => {
          navigate("/provider");
        }, 2000);
      }
    } catch (error) {
      console.error("An error occurred during checkout.", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-[10%] py-10">
      <h2 className="text-3xl md:text-5xl font-bold">Checkout.</h2>
      <div className="py-5 md:py-10 md:grid md:grid-cols-2 md:gap-10">
        <div className="w-full flex justify-center">
          <img
            src={packageInfo.image}
            alt={packageInfo.name}
            className="w-[300px]"
          />
        </div>
        <div className="">
          <div className="border-b border-gray-500 px-10 py-3">
            <h3 className="uppercase text-xl">
              <span className="font-semibold inline-block w-32">Package</span>{" "}
              {packageInfo.name}
            </h3>
            <p className="py-2">
              <span className="font-semibold inline-block w-32">Have</span>{" "}
              {packageInfo.count} times upload video
            </p>
          </div>
          <div className="border-b border-gray-500 px-10 py-3">
            <p className="py-1">
              <span className="inline-block font-semibold w-32">User name</span>
              {user.full_name}
            </p>
            <p className="py-1">
              <span className="inline-block font-semibold w-32">
                User email
              </span>
              {user.email}
            </p>
          </div>
          <div className="px-10 py-3 flex justify-between">
            <p>
              <span className="inline-block w-32 font-semibold">Total</span>$
              {packageInfo.price}
            </p>
            <button
              onClick={postCheckout}
              className="bg-blue-600 px-10 py-2 rounded hover:bg-blue-700 duration-300 font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={successCheckout}
        title="Checkout successfully"
        footer={[]}
      >
        <p>Please wait a few seconds...</p>
      </Modal>
    </div>
  );
};

export default Checkout;
