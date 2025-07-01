import React from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log("profile", user);
  return (
    <div>
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button className="cursor-pointer text-sm min-w-20 border border-amber-300 hover:border-amber-400 hover:bg-amber-300 px-3 py-1 rounded-full mt-3">
        Edit
      </button>
      <UserProfileAvatarEdit />
    </div>
  );
};

export default Profile;
