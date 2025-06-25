import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import useMobile from "../hooks/useMobile";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const validValue = Object.values(data).every((el) => el);

  // Fetch email from location.state and focus on 1st box
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      setData((preve) => {
        return {
          ...preve,
        };
      });
    } else {
      toast.error("Email not found. Please go back.");
      navigate("/forgot-password");
    }
  }, [location.state, navigate]);

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
        ...SummaryApi.resetPassword,
        data: {
          email,
          ...data,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setData({
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-4">
      <div className=" bg-white w-full my-4 max-w-lg mx-auto rounded-xl border p-6 ">
        <p className="mx-auto flex justify-center font-semibold text-lg ">
          Enter Your Password
        </p>
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
              value={email}
              disabled
            />
          </div>

          {/*Password Field*/}

          <div className="grid gap-1">
            <label htmlFor="newPassword">Password:</label>
            <div className="bg-blue-50 p-2 rounded-xl flex justify-between items-center border  focus-within:border-2 focus-within:border-black">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="w-full outline-none"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="text-black cursor-pointer"
                onClick={() => {
                  const bothFilled = data.newPassword && data.confirmPassword;
                  if (bothFilled) {
                    setShowPassword((prev) => !prev);
                    setShowConfirmPassword((prev) => !prev);
                  } else {
                    setShowPassword((prev) => !prev);
                  }
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {/*Confirm Password Field*/}

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="bg-blue-50 p-2 rounded-xl flex justify-between items-center border  focus-within:border-2 focus-within:border-black">
              <input
                type={showPassword || showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="w-full outline-none"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter confirm password"
              />
              <button
                type="button"
                className="text-black cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showPassword || showConfirmPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </button>
            </div>
          </div>
          {/* OTP input fields */}

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
            Change Password
          </button>
          {/*</div>*/}
        </form>

        <p>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-600 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
