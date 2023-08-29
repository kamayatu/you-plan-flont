import { useAuth } from "@/context/Auth";
import apiClient from "@/lib/apiClient";
import { postType, profileType } from "@/types";
import Avatar from "boring-avatars";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const { userId } = context.params;
    const userAllPosts = await apiClient.get(`posts/user/${userId}`);
    const userProfile = await apiClient.get(`users/profile/${userId}`);
    if (!userProfile.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        posts: userAllPosts.data,
        profile: userProfile.data,
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
};

const UserProfile = ({ posts, profile }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<string>(profile?.bio);
  const [baseBio, setBaseBio] = useState<string>(profile?.bio);
  const [isTrueUser, setIsTrueUser] = useState<boolean>(false);
  const [urlUserId, setUrlUserId] = useState<number>();

  const { user } = useAuth();

  //ログインユーザーがプロフィールユーザーか確認
  useEffect(() => {
    if (profile) {
      setUrlUserId(profile.userId);
    }

    // if (user?.id === urlUserId) {
    //   setIsTrueUser(true);
    // }
    if (!user) {
      return;
    } else if (user?.id === urlUserId) {
      setIsTrueUser(true);
    }
  });

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
      await apiClient.put(`/users/profile/${profile?.userId}`, {
        bio: editBio,
      });
      setBaseBio(editBio);
      cancelEdit();
    } catch (err) {
      alert("権限がありません");
    }
  };

  return (
    <div className="container mx-auto">
      {isTrueUser ? (
        <div className="flex justify-end">
          <button className="bg-green-400 rounded-xl p-2 text-white mt-3">お気に入り</button>
        </div>
      ) : (
        <></>
      )}
      <div className="bg-white p-4 mt-10 shadow-md rounded-sm">
        <div className="flex justify-between">
          <div className="flex">
            <div className="mr-4 mt-4">
              <Avatar size={60} name={profile?.user.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
            </div>
            <div className="p-2">
              <p className="font-bold text-2xl">{profile?.user.username}</p>
              <p>{baseBio}</p>
            </div>
          </div>
          {!isTrueUser ? (
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
      {posts.map((post: postType) => (
        <div key={post.id} className="bg-white shadow-md rounded p-4 my-4">
          <div className="flex items-center">
            <div className="p-2">
              <Avatar size={40} name={post.author.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
              <p>{post.author.username}</p>
              <p>{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div className="mx-auto text-center ">
              <Link href={`/posts/${post.id}`}>
                <p className="text-2xl">{post.title}</p>
                <p className="text-sm">{post.content}</p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
