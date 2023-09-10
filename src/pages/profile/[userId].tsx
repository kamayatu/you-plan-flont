import Profile from "@/components/Profile";
import { useAuth } from "@/context/Auth";
import { goodType, postType, profileType } from "@/types";
import Avatar from "boring-avatars";
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { userPosts } from "../api/functions/post";
import { selectProfile, updateBio } from "../api/functions/user";
import { getGoodPosts } from "../api/functions/good";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const userIdQueryParam = Array.isArray(context.query.userId) ? context.query.userId[0] : context.query.userId || "";
  const userId = parseInt(userIdQueryParam);
  try {
    //プロフィールページ
    const userAllPosts = await userPosts(userId);
    const userProfile = await selectProfile(userId);
    const goodedPosts = await getGoodPosts(userId);
    if (!userProfile) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        posts: userAllPosts,
        profile: userProfile,
        goods: goodedPosts,
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

type Props = {
  posts: postType[];
  profile: profileType;
  goods: goodType[];
};

const UserProfile = ({ posts, profile, goods }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<string>(profile?.bio);
  const [baseBio, setBaseBio] = useState<string>(profile?.bio);
  const [isLikePosts, setIsLikePosts] = useState(false);
  const { user } = useAuth();

  //プロフィール編集ボタン
  const onClickEdit = () => {
    setIsEditing(true);
  };

  //プロフィール編集キャンセル
  const cancelEdit = () => {
    setIsEditing(false);
  };

  //プロフィール編集
  const changeBio = async () => {
    try {
      await updateBio(profile.userId, editBio);
      setBaseBio(editBio);
      cancelEdit();
    } catch (err) {
      console.log(err);
      alert("権限がありません");
    }
  };

  const onClickLikeList = () => {
    setIsLikePosts(!isLikePosts);
  };

  return (
    <div className="container mx-auto">
      {!(user && user.id === profile.userId) ? (
        <></>
      ) : isLikePosts ? (
        <div className="flex justify-end">
          <button className="bg-gray-400 rounded-xl p-2 text-white mt-3" onClick={onClickLikeList}>
            お気に入り
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button className="bg-green-400 rounded-xl p-2 text-white mt-3" onClick={onClickLikeList}>
            お気に入り
          </button>
        </div>
      )}
      <div className="bg-white p-4 mt-10 shadow-md rounded-sm">
        <div className="flex justify-between">
          <Profile profile={profile} bio={baseBio} isProfile={true} />
          {!(user && user.id === profile.userId) ? (
            <div></div>
          ) : isEditing ? (
            <div className="flex">
              <textarea onChange={(e) => setEditBio(e.target.value)} value={editBio}></textarea>
              <div className="flex flex-col">
                <button onClick={changeBio}>変更</button>
                <button onClick={cancelEdit}>キャンセル</button>
              </div>
            </div>
          ) : (
            <button onClick={onClickEdit}>編集</button>
          )}
        </div>
      </div>
      {isLikePosts ? (
        <div>
          {/* likeのやつ */}
          {goods.map((good: goodType) => (
            <div key={good.id} className="bg-white shadow-md rounded p-4 my-4">
              <div className="flex items-center">
                <div className="p-2">
                  <Avatar size={40} name={good.post.author.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                  <p>{good.post.author.username}</p>
                  <p>{new Date(good.post.createdAt).toLocaleString()}</p>
                </div>
                <div className="mx-auto text-center">
                  <Link href={`/posts/${good.post.id}`}>
                    <p className="text-2xl">{good.post.title}</p>
                    <p className="text-sm py-2 lg:mx-28">{good.post.content}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* 特定ユーザーの投稿 */}
          {posts.map((post: postType) => (
            <div key={post.id} className="bg-white shadow-md rounded p-4 my-4">
              <div className="flex items-center">
                <div className="p-2">
                  <Avatar size={40} name={post.author.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                  <p>{post.author.username}</p>
                  <p>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <div className="mx-auto text-center">
                  <Link href={`/posts/${post.id}`}>
                    <p className="text-2xl">{post.title}</p>
                    <p className="text-sm py-2 lg:mx-28">{post.content}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
