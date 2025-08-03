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

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fatchUserDetails();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className=" bg-slate-400 h-[calc(88vh)] p-2 mx-1 rounded-md">
      <div className="flex bg-slate-200 h-full justify-center py-12">

        <div className="w-auto  bg-slate-400 h-80 rounded-lg py-4">
          <h1 className="text-center text-3xl text-white font-semibold">
            Login
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="p-4 pt-2">
              <div className="bg-slate-200 p-2 flex rounded-xl my-4 w-auto">
                <label htmlFor="email" className="text-3xl mx-1 cursor-pointer">
                  {" "}
                  <MdEmail />{" "}
                </label>
                <div className="  ">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    placeholder="Enter your email"
                    className=" h-full outline-none bg-slate-200 px-1 "
                  />
                </div>
              </div>

              <div className="bg-slate-200  p-2 flex rounded-xl mt-4">
                <label htmlFor="" className="text-2xl mx-1 cursor-pointer">
                  {" "}
                  <FaLock />{" "}
                </label>
                <div className="bg-slate-100 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-64 h-full outline-none bg-slate-200 px-2"
                  />
                </div>
                <div
                  className="cursor-pointer text-md p-1 px-2 bg-slate-200 justify-self-end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <div>
                <Link
                  to={"/Forget-Password"}
                  className="block w-fit ml-auto hover:underline hover:text-slate-900"
                >
                  Forget Password ?
                </Link>
              </div>

              <button className="bg-slate-500 text-white px-6 py-2 w-full  rounded-xl  transition-all mx-auto block mt-4 hover:bg-slate-700">
                Login
              </button>
              <br />
              <p className=" flex justify-between">
                Don't have account ?{" "}
                <Link
                  to={"/signUp"}
                  className=" hover:underline hover:text-slate-900"
                >
                  SignUp
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
