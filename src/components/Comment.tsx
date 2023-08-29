import Avatar from "boring-avatars";
import Link from "next/link";
import React from "react";

const Comment = () => {
  return (
    <div>
      <div className="flex mt-9">
        <div className="p-3 w-1/5 sm:w-1/4 lg:text-center ">
          <div className="inline-block">
            <Link href={`/`}>
              <Avatar size={40} name={"name"} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
            </Link>
          </div>
          <p className="text-sm">ユーザー名</p>
          {/* <p>{new Date(post.createdAt).toLocaleString()}</p> */}
          <p className="text-sm">2022-22-22</p>
        </div>
        <div className="bg-gray-100 w-full p-4 rounded-lg">
          <p>コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント</p>
        </div>
      </div>
      <div className="flex mt-9">
        <div className="p-3 w-1/5 sm:w-1/4 lg:text-center ">
          <div className="inline-block">
            <Link href={`/`}>
              <Avatar size={40} name={"name"} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
            </Link>
          </div>
          <p className="text-sm">ユーザー名</p>
          {/* <p>{new Date(post.createdAt).toLocaleString()}</p> */}
          <p className="text-sm">2022-22-22</p>
        </div>
        <div className="bg-gray-100 w-full p-4 rounded-lg">
          <p>コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント</p>
        </div>
      </div>
      <div className="flex mt-9">
        <div className="p-3 w-1/5 sm:w-1/4 lg:text-center ">
          <div className="inline-block">
            <Link href={`/`}>
              <Avatar size={40} name={"name"} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
            </Link>
          </div>
          <p className="text-sm">ユーザー名</p>
          {/* <p>{new Date(post.createdAt).toLocaleString()}</p> */}
          <p className="text-sm">2022-22-22</p>
        </div>
        <div className="bg-gray-100 w-full p-4 rounded-lg">
          <p>コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
