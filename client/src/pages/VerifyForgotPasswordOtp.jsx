import { useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import useMobile from "../hooks/useMobile";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

const VerifyForgotPasswordOtp = () => {
  const firstInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();

  const [email, setEmail] = useState("");

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const validValue = data.every((el) => el);

  // Fetch email from location.state and focus on 1st box
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      toast.error("Email not found. Please go back.");
      navigate("/forgot-password");
    }
    //focus on 1st box
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.otpVerification,
        data: {
          email,
          otp: data.join(""),
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
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
        <p className="mx-auto flex justify-center font-semibold text-lg ">
          Enter OTP
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

          {/*Confirm Password Field*/}

          {/* OTP input fields */}
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP:</label>
            <div className="flex justify-between gap-2 mt-3">
              {data.map((Element, i) => {
                return (
                  <input
                    key={i}
                    type="text"
                    name="otp"
                    id="otp"
                    ref={i === 0 ? firstInputRef : null}
                    value={data[i]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newDate = [...data];
                      newDate[i] = value;
                      setData(newDate);

                      // Auto move to next input if a digit is entered
                      if (value && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}
                    /*onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !data[i] &&
                        e.target.previousElementSibling
                      ) {
                        e.preventDefault(); // Prevent default backspace behavior
                        const newData = [...data];
                        newData[i - 1] = ""; // Optional: clear previous input too
                        setData(newData);
                        e.target.previousElementSibling.focus();
                      }
                    }}*/
                    /*onPaste={(e) => {
                      if (i === 0) {
                        e.preventDefault();
                        const paste = e.clipboardData.getData("text").trim();
                        if (/^\d{6}$/.test(paste)) {
                          const pasteArray = paste.split("");
                          setData(pasteArray);
                          // Focus last box
                          setTimeout(() => {
                            e.target.parentElement
                              .querySelectorAll("input")[5]
                              .focus();
                          }, 0);
                        }
                      }
                    }}*/
                    maxLength={1}
                    className="w-12 h-12 p-2 border rounded text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

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
            Verify OTP
          </button>
          {/*</div>*/}
        </form>

        <p>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-600 hover:text-green-800"
          >
            login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default VerifyForgotPasswordOtp;
