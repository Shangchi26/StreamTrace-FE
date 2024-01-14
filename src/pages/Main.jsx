import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '../Loading'

const Main = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUset = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUset();
  }, []);
  if(!user) {
    return <Loading />
  }
  return (
    <div className="w-full bg-gray-900">
      <Navbar user={user} />
      <div className="min-h-screen text-white">
        <Outlet user={user} />
      </div>
      <Footer />
    </div>
  );
}

export default Main