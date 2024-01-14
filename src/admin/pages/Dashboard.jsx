import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { data } from "autoprefixer";

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardList, setDashboardList] = useState({});
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dashboard");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setDashboardList(data);
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };
    fetchDashboard();
  }, []);
  const data = {
    labels: [
      "5 Month Ago",
      "4 Month Ago",
      "3 Month Ago",
      "2 Month Ago",
      "Last Month",
      "This Month",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          dashboardList.revenueFiveMonthsAgo,
          dashboardList.revenueFourMonthsAgo,
          dashboardList.revenueThreeMonthsAgo,
          dashboardList.revenueTwoMonthsAgo,
          dashboardList.revenueLastMonth,
          dashboardList.revenueThisMonth,
        ],
        borderColor: 'black',
        backgroundColor: 'cyan',
        borderWidth: 1
      },
    ],
  };
  const options = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="py-10 px-10 text-white">
      <h2 className="text-3xl md:text-5xl font-semibold my-5">Dashboard.</h2>
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3">
        <div className="w-[250px] bg-gray-700 border rounded-xl px-5 py-4 hover:shadow-xl shadow-lg duration-300">
          <h3 className="font-semibold text-xl border-b">To day</h3>
          <p>
            We have {dashboardList.ordersToday} orders - $
            {dashboardList.revenueToday}
          </p>
        </div>
        <div className="w-[250px] bg-gray-700 border rounded-xl px-5 py-4 hover:shadow-xl shadow-lg duration-300">
          <h3 className="font-semibold text-xl border-b">This week</h3>
          <p>
            We have {dashboardList.ordersThisWeek} orders - $
            {dashboardList.revenueThisWeek}
          </p>
        </div>
        <div className="w-[250px] bg-gray-700 border rounded-xl px-5 py-4 hover:shadow-xl shadow-lg duration-300">
          <h3 className="font-semibold text-xl border-b">This month</h3>
          <p>
            We have {dashboardList.ordersThisMonth} orders - $
            {dashboardList.revenueThisMonth}
          </p>
        </div>
      </div>
      <div className="w-2/3 py-10">
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};

export default Dashboard;
