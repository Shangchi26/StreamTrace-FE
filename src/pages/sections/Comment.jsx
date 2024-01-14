import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import Avatar from "../../components/Avatar";
import { useUser } from "../../context/UserContext";

const Comment = ({ videoId, comments }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [reload, setReload] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/video-comment/${videoId}`
        );
        if (!response.ok) {
          throw new Error("Netword response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        setCommentList(data);
      } catch (error) {
        console.error("Error fetching video comment: ", error.message);
      }
    };

    fetchComment();
  }, [reload]);

  const postComment = async () => {
    try {
      let result = await fetch("http://localhost:8000/api/video-add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          video_id: videoId,
          comment: comment,
        }),
      });
      const response = await result.json();
      if (result.ok) {
        setComment("");
        setReload((prev) => !prev);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred during comment.", error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/video-comment-delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        setReload((prev) => !prev);
        console.log("Delete completed.");
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("An error occurred during delete: ", error);
    }
  };

  return (
    <div className=" mx-10 md:mx-auto xl:w-[1024px] md:w-[768px] ">
      <h3 className="font-semibold text-xl">Comments:</h3>
      {user && (
        <div className="flex gap-3 py-3">
          <textarea
            name="comment"
            id=""
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
            className="w-full bg-white bg-opacity-0 border-b outline-none"
            placeholder="Add your comment"
          ></textarea>
          <button
            onClick={postComment}
            className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 duration-300"
          >
            Submit
          </button>
        </div>
      )}
      {commentList.map((comment) => (
        <div
          key={comment.id}
          className="relative group overflow-hidden border-b border-gray-600 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 object-cover rounded-full">
              <Avatar
                imageUrl={comment.user.avatar}
                fullName={comment.user.full_name}
              />
            </div>
            <p className="font-semibold">{comment.user.full_name}</p>
          </div>
          <p className="ml-11">{comment.comment}</p>
          {!user ? (
            <></>
          ) : (
            user.id === comment.user.id && (
              <button
                onClick={() => deleteComment(comment.id)}
                className="absolute top-3 right-2 xl:-right-7 xl:group-hover:right-2 duration-300 text-red-600"
              >
                <TiDelete size={30} />{" "}
              </button>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
