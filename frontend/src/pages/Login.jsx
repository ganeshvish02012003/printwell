import React, { useContext } from "react";
import { useState } from "react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fatchUserDetails } = useContext(Context);

  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Try to parse JSON only if response has body
      let dataApi;
      const text = await dataResponse.text();
      try {
        dataApi = JSON.parse(text);
      } catch (err) {
        throw new Error(
          "Server did not return valid JSON. Raw response: " + text
        );
      }

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fatchUserDetails();
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-slate-400 min-h-[88vh] p-2 mx-1 rounded-md flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-100 rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-slate-700">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email */}
          <div className="bg-white p-2 flex items-center rounded-lg mb-4">
            <MdEmail className="text-xl sm:text-2xl mx-2 text-slate-600" />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="flex-1 text-sm sm:text-base outline-none bg-transparent px-2"
              required
            />
          </div>

          {/* Password */}
          <div className="bg-white p-2 flex items-center rounded-lg mb-2">
            <FaLock className="text-xl sm:text-2xl mx-2 text-slate-600" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="flex-1 text-sm sm:text-base outline-none bg-transparent px-2"
              required
            />
            <div
              className="cursor-pointer text-lg px-2 text-slate-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <Link
            to={"/Forget-Password"}
            className="block text-right text-xs sm:text-sm text-slate-600 hover:underline"
          >
            Forget Password?
          </Link>

          {/* Button */}
          <button className="w-full mt-4 bg-slate-600 hover:bg-slate-700 text-white text-sm sm:text-base font-medium py-2 rounded-lg transition-all">
            Login
          </button>

          <p className="mt-4 text-center text-sm sm:text-base text-slate-700">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signUp"}
              className="text-slate-900 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
