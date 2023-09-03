import { profileType } from "@/types";
import Avatar from "boring-avatars";
import React from "react";

interface Props {
  profile?: profileType;
  bio?: string;
  isProfile: boolean;
  username?: string;
  email?: string;
}

const Profile = (props: Props) => {
  const { profile, bio, isProfile, email, username } = props;
  return (
    <div className="flex">
      {isProfile ? (
        <>
          <div className="mr-4 mt-4">
            <Avatar size={60} name={profile?.user.email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
          </div>
          <div className="p-2">
            <p className="font-bold text-2xl">{profile?.user.username}</p>
            <p>{bio}</p>
          </div>
        </>
      ) : (
        <>
          <div className="mr-4 mt-4">
            <Avatar size={60} name={email} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
          </div>
          <div className="p-2">
            <p className="font-bold text-2xl mt-4">{username}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
