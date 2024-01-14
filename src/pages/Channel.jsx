import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useUser } from "../context/UserContext";

const Channel = () => {
  const { user } = useUser();
  const id = user.id;
  const [count, setCount] = useState(null);
  const [subcriptionList, setSubcriptionList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [countSub, setCountSub] = useState(null);
  useEffect(() => {
    const count = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/count-subcription/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setCount(data);
      } catch (error) {
        console.error("Error fetching video detail:", error.message);
      }
    };
    count();
  }, [id]);

  useEffect(() => {
    const subcriptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/get-subscription/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubcriptionList(data);
      } catch (error) {
        console.error("Error fetching video subscriplist:", error.message);
      }
    };
    subcriptions();
  }, [id]);

  useEffect(() => {
    const comments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/get-all-review/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data)
        setCommentList(data);
      } catch (error) {
        console.error("Error fetching video subscriplist:", error.message);
      }
    };
    comments();
  }, [id]);

  useEffect(() => {
    const countSub = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/count-subcription/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountSub(data)
      } catch (error) {
        console.error("Error fetching video subscriplist:", error.message);
      }
    };
    countSub()
  }, [id]);

  return (
    <div className="z-0">
      <div className="flex items-center gap-3">
        <div className="w-20 h-20">
          <Avatar
            imageUrl={user.avatar}
            fullName={user.full_name}
            createdAt={user.created_at}
          />
        </div>
        <div>
          <h3 className="text-3xl font-semibold">{user.full_name}</h3>
          <p>{count} Subscriptions</p>
        </div>
      </div>
      <div className="border rounded-lg mt-5 w-max py-2 px-5 bg-gray-700 shadow-2xl">
        <h3 className="text-2xl font-semibold border-b">In This Week</h3>
        <p className="pt-2">We have {countSub} new subscriptions</p>
      </div>
      <div className="md:grid grid-cols-2">
        <div className="py-5">
          <h3 className="py-2 font-semibold text-xl">
            Your Channel's Subscription
          </h3>
          {subcriptionList.slice(0, 9).map((sub, index) => (
            <div key={sub.id} className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8">
                <Avatar
                  imageUrl={sub.user_avatar}
                  fullName={sub.user_name}
                  createdAt={sub.user_created_at}
                />
              </div>
              <p>{sub.user_name}</p>
            </div>
          ))}
          <a
            href="#"
            className="flex items-center gap-2 hover:pl-2 duration-300 hover:text-blue-400"
          >
            See all <FaArrowRightLong />
          </a>
        </div>
        <div className="md:py-5">
          <h3 className="py-2 font-semibold text-xl">Your Video's Comment</h3>
          {commentList.slice(0, 9).map((comment, index) => (
            <div key={comment.id} className="mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <Avatar
                    imageUrl={comment.user.avatar}
                    fullName={comment.user.full_name}
                    createdAt={comment.user.created_at}
                  />
                </div>
                <p className="font-semibold">
                  <a href="#" className="hover:underline">
                    {comment.user.full_name}
                  </a>{" "}
                  for {comment.video.name}
                </p>
              </div>
              <p className="pl-10">{comment.comment}</p>
            </div>
          ))}
          <a
            href="#"
            className="flex items-center gap-2 hover:pl-2 duration-300 hover:text-blue-400"
          >
            See all <FaArrowRightLong />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Channel;
