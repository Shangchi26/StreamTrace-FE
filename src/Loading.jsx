import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex w-full h-screen bg-gray-900 items-center justify-center">
      <Spin />
    </div>
  );
};

export default Loading;
