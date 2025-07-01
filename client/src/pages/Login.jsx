import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import useMobile from "../hooks/useMobile";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const validValue = Object.values(data).every((el) => el);

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="container w-full mx-auto px-4">
      <div className=" bg-white w-full my-4 max-w-lg mx-auto rounded-xl border p-6 ">
        <p className="mx-auto flex justify-center">Welcome to QuickeyIt</p>
        <form className="py-2  grid gap-4" onSubmit={handleSubmit}>
          {/*Name Field*/}

          {/*Email Field*/}

          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-blue-50 p-2 border rounded-xl"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/*Password Field*/}

          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-blue-50 p-2 rounded-xl flex justify-between items-center border  focus-within:border-2 focus-within:border-black">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full outline-none"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="text-black cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-amber-300"
            >
              Forgot password?
            </Link>
          </div>

          {/*Confirm Password Field*/}

          {/*submit*/}

          {/*<div className="flex justify-center items-center">*/}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-700" : "bg-gray-400"
            } border rounded-xl py-2 my-3 w-full ${
              validValue ? "font-semibold" : ""
            } tracking-wide text-white`}
          >
            Login
          </button>
          {/*</div>*/}
        </form>

        <p>
          Don't have account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-600 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
