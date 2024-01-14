import React, { useEffect, useState } from "react";
import { FaPlus, FaRegHeart, FaHeart } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { useUser } from "../../context/UserContext";
import Avatar from "../../components/Avatar";

const Channel = ({ video }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [reloadSubcription, setReloadSubcription] = useState(false);
  const [checkSubcription, setCheckSubcription] = useState(false);
  const [subcription, setSubcription] = useState(0);
  const [like, setLike] = useState(0);
  const { user } = useUser();
  const providerId = video.user_id;
  // console.log(video)

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/video-check-favorite/${user.id}-${video.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data)
        setCheckFavorite(data);
      } catch (error) {
        console.error("Error fetching video favorite:", error.message);
      }
    };
    checkFavorite();
    const timeoutId = setTimeout(() => {
      setReloadComponent(true);
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [reloadComponent]);

  useEffect(() => {
    const countFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/video-favorite-count/${video.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        setLike(data);
      } catch (error) {
        console.error("Error fetching video favorite:", error.message);
      }
    };
    countFavorite();
  }, [reloadComponent]);

  const addFavorite = async () => {
    try {
      const result = await fetch(
        "http://localhost:8000/api/video-add-favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            video_id: video.id,
          }),
        }
      );
      const response = await result.json();
      if (result.ok) {
        setReloadComponent((prev) => !prev);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred during add favorite.", error);
    }
  };

  useEffect(() => {
    const checkSubcription = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/check-subcription/${user.id}-${providerId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //   console.log(data);
        setCheckSubcription(data);
      } catch (error) {
        console.error("Error fetching video comment: ", error.message);
      }
    };
    checkSubcription();
  }, [reloadSubcription]);

  useEffect(() => {
    const countSubcription = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/count-subcription/${providerId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubcription(data);
      } catch (error) {
        console.error("Error fetching subscription: ", error.message);
      }
    };
    countSubcription();
  }, [reloadComponent]);

  const addSubcription = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/add-subcription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          provider_id: providerId,
        }),
      });
      const response = await result.json();
      if (result.ok) {
        setReloadSubcription((prev) => !prev);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred during subcription.", error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/video-remove-favorite`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            video_id: video.id,
          }),
        }
      );
      if (response.ok) {
        setReloadComponent((prev) => !prev);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred during delete.", error);
    }
  };

  const removeSubcription = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/remove-subcription",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            provider_id: providerId,
          }),
        }
      );
      if (response.ok) {
        setReloadSubcription((prev) => !prev);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred during delete.", error);
    }
  };
  return (
    <div className="w-full flex items-center justify-between h-8 my-3">
      <div className="flex flex-row items-center gap-3">
        <div className="w-12 h-12">
          <Avatar
            imageUrl={video.user_avatar}
            fullName={video.user_full_name}
          />
        </div>
        <div>
          <h3 className="font-semibold text-2xl">{video.user_full_name}</h3>
          <p>{subcription} Subscriptions</p>
        </div>
      </div>
      <div className="flex h-full">
        {checkFavorite ? (
          <button
            onClick={removeFavorite}
            className="bg-gray-600 hover:bg-gray-500 duration-300 px-3 h-full text-red-600 rounded-s-md border-r border-gray-700 flex items-center gap-1"
          >
            <span className="text-black">{like}</span> <FaHeart />
          </button>
        ) : (
          <button
            onClick={addFavorite}
            className="bg-gray-600 hover:bg-gray-500 duration-300 px-3 h-full text-black rounded-s-md border-r border-gray-700 flex items-center gap-1"
          >
            <span>{like}</span> <FaRegHeart />
          </button>
        )}
        <div className="bg-gray-600 hover:bg-gray-500 duration-300 px-3 h-full flex items-center text-black font-semibold">
          {video.user}
        </div>
        {checkSubcription ? (
          <button
            onClick={removeSubcription}
            className="bg-gray-600 hover:bg-gray-500 duration-300 px-3 h-full rounded-e-md border-l border-gray-700"
          >
            <MdDone size={25} className="text-green-600" />
          </button>
        ) : (
          <button
            onClick={addSubcription}
            className="bg-gray-600 hover:bg-gray-500 duration-300 px-3 h-full rounded-e-md border-l border-gray-700"
          >
            <FaPlus size={25} className="text-blue-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Channel;
