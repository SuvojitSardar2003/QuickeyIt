import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaLongArrowAltRight, FaRegUserCircle } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadaAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      dispatch(updateAvatar(responseData.data.avatar));
      console.log(response);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/30 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-900 block w-fit ml-auto"
        >
          <IoClose size={25} />
        </button>

        <div className="w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="cursor-pointer text-sm min-w-20 border border-amber-300 hover:border-amber-400 hover:bg-amber-300 px-4 py-1 rounded-full mt-3 my-3">
              {loading ? "Loading..." : "Upload"}
            </div>
            <input
              type="file"
              id="uploadProfile"
              className="hidden"
              onChange={handleUploadAvatarImage}
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
