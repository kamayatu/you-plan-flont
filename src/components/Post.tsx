import { postType } from "@/types";
import Avatar from "boring-avatars";
import Link from "next/link";
import React from "react";

type Props = {
  post: postType;
};

const Post = (props: Props) => {
  const { post } = props;
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 mx-3">
      <div className="flex items-center">
        <div className="p-2">
          <Link href={`/profile/${post.authorId}`}>
            <Avatar size={40} name={post.author.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
          </Link>
          <p>{post.author?.username}</p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <div className="mx-auto text-center ">
          <Link href={`/posts/${post.id}`}>
            <p className="text-2xl">{post.title}</p>
            <p className="text-sm py-2 lg:mx-28">{post.content}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
