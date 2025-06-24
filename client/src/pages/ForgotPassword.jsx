import { useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import useMobile from "../hooks/useMobile";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();

  const [data, setData] = useState({
    email: "",
  });

  const validValue = Object.values(data).every((el) => el);

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
        ...SummaryApi.forgotPassword,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
        });
        navigate("/verify-forgot-password-otp", {
          state: data,
        });
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
          Forgot Password
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
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/*Password Field*/}

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
            Send OTP
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

export default ForgotPassword;
