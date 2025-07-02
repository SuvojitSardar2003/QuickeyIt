import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //console.log("profile", user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/*profile upload and display image*/}
      <div className="w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        className="cursor-pointer text-sm min-w-20 border border-amber-300 hover:border-amber-400 hover:bg-amber-300 px-3 py-1 rounded-full mt-3"
        onClick={() => setProfileAvatarEdit(true)}
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}

      {/*name,mobile,email,change password*/}
      <form action="" className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Enter your Name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-amber-400 rounded"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-amber-400 rounded"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-amber-400 rounded"
            value={userData.mobile}
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold hover:bg-amber-300 border-amber-300 text-amber-400 hover:text-neutral-900 rounded-xl">
          {loading ? "Loading" : "Submit"}
        </button>

        {/*<div className="grid">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Enter your Name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-amber-400 rounded"
            value={userData.name}
            onChange={handleOnChange}
          />
        </div>*/}
      </form>
    </div>
  );
};

export default Profile;
