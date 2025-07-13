import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import ConfirmLogout from "../layouts/ConfirmLogout";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        //window.history.back();
        navigate("/");
      }
    } catch (error) {
      AxiosToastError();
    }
  };

  return (
    <>
      <div>
        <div className="font-semibold">My Account</div>
        <div className="text-sm flex items-center gap-2">
          <span className="max-w-52 text-ellipsis line-clamp-1">
            {user.name || user.mobile}{" "}
            <span className="text-medium text-red-600">
              {user.role === "ADMIN" ? "(Admin)" : ""}
            </span>
          </span>
          <Link
            to={"/dashboard/profile"}
            onClick={close}
            className="hover:text-yellow-300"
          >
            <HiOutlineExternalLink size={15} />
          </Link>
        </div>

        <Divider />

        <div className="text-sm grid gap-1 ">
          {isAdmin(user.role) && (
            <Link
              to={"/dashboard/category"}
              onClick={close}
              className="px-2 lg:hover:bg-slate-100 py-1"
            >
              Category
            </Link>
          )}

          {isAdmin(user.role) && (
            <Link
              to={"/dashboard/subcategory"}
              onClick={close}
              className="px-2 lg:hover:bg-slate-100 py-1"
            >
              Sub Category
            </Link>
          )}

          {isAdmin(user.role) && (
            <Link
              to={"/dashboard/upload-product"}
              onClick={close}
              className="px-2 lg:hover:bg-slate-100 py-1"
            >
              Upload Product
            </Link>
          )}

          {isAdmin(user.role) && (
            <Link
              to={"/dashboard/product"}
              onClick={close}
              className="px-2 lg:hover:bg-slate-100 py-1"
            >
              Product
            </Link>
          )}

          <Link
            to={"/dashboard/myorders"}
            onClick={close}
            className="px-2 lg:hover:bg-slate-100 py-1"
          >
            My Orders
          </Link>

          <Link
            to={"/dashboard/address"}
            onClick={close}
            className="px-2 hover:bg-slate-100 py-1"
          >
            Save Address
          </Link>

          <button
            onClick={() => {
              setShowConfirmLogout(true);
            }}
            className="text-left px-2 hover:bg-slate-100 cursor-pointer py-1"
          >
            Log Out
          </button>
        </div>
      </div>
      {showConfirmLogout && (
        <ConfirmLogout
          onConfirm={() => {
            setShowConfirmLogout(false);
            handleLogout();
          }}
          onCancel={() => {
            setShowConfirmLogout(false);
            if (close) close();
          }}
        />
      )}
    </>
  );
};

export default UserMenu;
