import { useAuth } from "@/context/Auth";
import apiClient from "@/lib/apiClient";
import { commentType } from "@/types";
import Avatar from "boring-avatars";
import Link from "next/link";
import React from "react";

interface Props {
  comment: commentType;
  currentComment: commentType[];
  setCurrentComent: React.Dispatch<React.SetStateAction<commentType[]>>;
}

const Comment = (props: Props) => {
  const { comment, setCurrentComent, currentComment } = props;
  const { user } = useAuth();

  const onClickDeleteComment = () => {
    const commentId = comment.id;
    apiClient.delete(`/comment/${comment.id}`);
    setCurrentComent(currentComment.filter((element: commentType) => !(commentId === element.id)));
  };
  return (
    <div className="flex mt-9">
      <div className="p-3 w-1/5 sm:w-1/4 lg:text-center ">
        <div className="inline-block">
          <Link href={`/`}>
            <Avatar size={40} name={comment.user.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
          </Link>
        </div>
        <p className="text-sm">{comment.user.username}</p>
        {/* <p>{new Date(post.createdAt).toLocaleString()}</p> */}
        <p className="text-sm">2022-22-22</p>
      </div>
      <div className="bg-gray-100 w-full p-4 rounded-lg">
        <p>{comment.comment}</p>
      </div>
      {user && user.id === comment.userId ? (
        <button onClick={onClickDeleteComment} className="ml-2 px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500">
          削除
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
