import { useAuth } from "@/context/Auth";
import apiClient from "@/lib/apiClient";
import { goodType, postType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import Comment from "@/components/Comment";

interface Props {
  post: postType;
  good: goodType[];
}

export const getServerSideProps = async (context: any) => {
  const { postId } = context.params;
  try {
    const postData = await apiClient.get(`/posts/${postId}`);
    const goodData = await apiClient.get(`/good/${postId}`);
    if (!postData.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        post: postData.data,
        good: goodData.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const PostPage = ({ post, good }: Props) => {
  // console.log(goodData);
  const [commentText, setCommentText] = useState("");
  const [count, setCount] = useState(good.length);
  const [isGooded, setIsGooded] = useState(false);

  const router = useRouter();
  const [isTrueUser, setIsTrueUser] = useState<boolean>(false);
  const timeArray = Object.values(post);
  const exactTimeArray = timeArray.slice(3, 11);
  const everyTime = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return;
    } else if (user.id === post.authorId) {
      setIsTrueUser(true);
    }
    //いいねしているユーザーだった場合useStateにオブジェクトでセット
    const foundGood = good.find((e) => e.userId === user.id && e.postId === post.id);
    if (foundGood) {
      setIsGooded(true);
    }
    console.log(isGooded);
  });

  //投稿削除api
  const onClickDelete = async () => {
    try {
      if (confirm("本当に削除しますか？")) {
        await apiClient.delete(`/posts/edit/${post.id}`);
        alert("削除しました。");
        router.push(`/profile/${post.authorId}`);
      }
    } catch (err) {
      console.log(err);
      alert("権限がありません。");
    }
  };
  //commentAPI
  const onClickComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //good追加API
  const onClickGood = async () => {
    try {
      await apiClient.put(`/good/${post.id}`);
      setCount(isGooded ? count - 1 : count + 1);
      setIsGooded(!isGooded);
    } catch (err) {
      console.log(err);
      alert("権限がありません。");
    }
  };

  return (
    <div>
      <div className="container mx-auto bg-slate-50 shadow-sm  mt-7 text-gray-600 rounded-lg">
        <div className="p-10">
          <div className="m-10 border-amber-950 border-2 rounded-md">
            <h3 className="font-bold text-3xl p-4 bg-blue-500 rounded-md">EVENING PLANNER</h3>
            <h4 className="text-3xl p-4 rounded-sm font-bold">{post.title}</h4>
            <ul className=" m-0">
              {exactTimeArray.map((time: any, index) => (
                <li key={index}>
                  <div className="flex border-gray-200 border-t-2">
                    <p className="py-4 px-6 text-xl font-bold w-24 border-amber-950 border-r-2 lg:w-32 text-center">{everyTime[index]}</p>
                    <p className="p-4 text-center text-xl font-bold ">{time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <label className="block mx-10 my-2">
            <span className="text-gray-700 ml-4">内容説明</span>
          </label>
          <div className="mx-10 border-amber-950 border-2 rounded-md p-4">
            <p className="text-xl">{post.content}</p>
          </div>
          <div className="flex justify-between mx-10">
            <span className="m-4 p-4 lg:px-8 bg-red-300 text-center rounded-md hover:bg-red-400 hover:cursor-pointer" onClick={onClickGood}>
              ♥{count}人がいいねしました
            </span>
            {isTrueUser ? (
              <div className="flex justify-end mx-10 my-2">
                <Link href={`/posts/edit/${post.id}`}>
                  <button className="px-2 py-1 bg-green-400 text-white font-semibold rounded hover:bg-green-500 mx-2">編集</button>
                </Link>
                <div>
                  <button onClick={onClickDelete} className="px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500">
                    削除
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mx-10 my-14">
            <form onSubmit={onClickComment}>
              <p className="text-lg">コメント</p>
              <textarea className="block mt-2 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
              <button type="submit" className="bg-blue-300 rounded-md h-10 w-20  my-4 mx-auto">
                投稿
              </button>
            </form>
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
