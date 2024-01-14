import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("")

  const navigate = useNavigate();

  const loginApi = async () => {
      let result = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user_name: userName, password: password }),
      });
      const response = await result.json()
      if (result.ok) {
        navigate('/')
      } else {
        setErrorLogin(response.error);
        console.log(errorLogin)
      }
  };
  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/banner.jpg)",
      }}
    >
      <a href="/" className="absolute z-10 top-3 left-10">
        <img src={logo} className="w-14 object-cover" alt="" />
      </a>
      <div className="absolute bg-gradient-to-b from-zinc-800 to-zinc-700 opacity-75 inset-0 z-0" />
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <h1 className="mb-3 font-bold text-5xl">Hi! Welcome Back </h1>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  User Name
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  name="user_name"
                  onChange={(e) => setuserName(e.target.value)}
                  placeholder="Enter your user name"
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <p className="text-red-600">{errorLogin}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="register"
                    className="text-zinc-600 hover:text-zinc-800"
                  >
                    Do not have an account?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  onClick={loginApi}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
