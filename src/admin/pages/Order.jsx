import React, { useEffect, useState } from "react";

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/all-order");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setOrderList(data);
      } catch (error) {
        console.error("Error fetching order:", error.message);
      }
    };
    fetchOrder();
  }, []);
  return (
    <div className="px-10 py-20 text-white">
      <h2 className="text-3xl md:text-5xl font-semibold py-5">Orders Manage</h2>
      <div>
        <table className="min-w-full">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                User
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Package
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Create_at
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-800 h-max">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium w-60">
                  {order.user.full_name}
                </td>
                <td className="text-sm  px-6 py-4 whitespace-nowrap">
                  {order.package.name}
                </td>
                <td className="text-sm  px-6 py-4 whitespace-nowrap">
                  ${order.price}
                </td>
                <td className="text-sm  px-6 py-4 whitespace-nowrap">
                  {order.created_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
