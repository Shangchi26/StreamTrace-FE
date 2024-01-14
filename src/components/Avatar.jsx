import React from "react";

const Avatar = ({ imageUrl, fullName }) => {
  
  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt={fullName} className="aspect-square object-cover rounded-full" />
      ) : (
        <div
          className="w-full h-full font-semibold text-xl rounded-full flex items-center justify-center bg-gray-700"
        >
          <p className="">{fullName.charAt(0)}</p>
        </div>
      )}
    </>
  );
};

export default Avatar;
