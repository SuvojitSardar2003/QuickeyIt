import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        close();
      }
    } catch (error) {
      AxiosToastError();
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user.name || user.mobile}</div>
      <Divider />
      <div className="text-sm grid gap-1 ">
        <Link to={""} className="px-2 hover:bg-slate-100 py-1">
          My Orders
        </Link>
        <Link to={""} className="px-2 hover:bg-slate-100 py-1">
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-slate-100 cursor-pointer py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
