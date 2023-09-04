import { useAuth } from "@/context/Auth";
import apiClient from "@/lib/apiClient";
import { goodType, postType } from "@/types";
import React, { useEffect, useState } from "react";

interface Props {
  post: postType;
  count: number;
  good: goodType[];
}

const GoodButton = (props: Props) => {
  const { count, good, post } = props;
  const [likeCount, setLikeCount] = useState(count);
  const [isGooded, setIsGooded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const foundGood = good.find((e) => e.userId === user?.id && e.postId === post.id);
    if (foundGood) {
      setIsGooded(true);
    }
  }, []);

  //good追加API
  const onClickGood = async () => {
    try {
      await apiClient.put(`/good/${post.id}`);
      setLikeCount(isGooded ? count - 1 : count + 1);
      setIsGooded(!isGooded);
      console.log("click");
    } catch (err) {
      console.log(err);
      alert("権限がありません。");
    }
  };
  return (
    <span className="m-4 p-4 lg:px-8 bg-red-300 text-center rounded-md hover:bg-red-400 hover:cursor-pointer" onClick={onClickGood}>
      ♥{likeCount}人がいいねしました
    </span>
  );
};

export default GoodButton;
