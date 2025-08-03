import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { Link, useNavigate } from "react-router-dom";
import ImageTobase64 from "../helpers/ImageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate()

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageTobase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handleOnChange = (e) => {
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

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      // console.log("dataAPI",dataApi)

      if(dataApi.success){
        toast.success(dataApi.message)
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
      navigate("/login");

    } else {
      // console.log("Please check password and confirm password");
      toast.error("Please check password and confirm password")
    }
  };


  return (
        <div className=" bg-slate-400 h-[calc(88vh)] p-2 mx-1 rounded-md">
      <div className="flex bg-slate-200 h-full justify-center py-12">
      <div className="w-auto  bg-slate-400 rounded-lg pt-2">
        <h1 className="text-center text-3xl text-white font-semibold">SignUp</h1>

        <form action="" >
          <div className="p-4">
            {/* profile Pic */}
            <div className="flex justify-center content-center">
              <label htmlFor="profilePic" className="">
                {data.profilePic ? (
                  <img
                    src={data.profilePic}
                    alt="icon"
                    className="w-12 h-12 rounded-full overflow-hidden"
                  />
                ) : (
                  <CgProfile className="h-12 w-12 bg-slate-200 rounded-full " />
                )}
              </label>
              <input
                type="file"
                id="profilePic"
                className=" hidden"
                onChange={handleUploadPic}
              />
            </div>

            {/* name */}
            <div className="bg-slate-200 p-2 flex rounded-xl my-4 ">
              <label
                htmlFor="name"
                className="text-3xl mx-1 cursor-pointer"
              >
                {" "}
                <FaUser />{" "}
              </label>
              <div className=" ">
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={data.name}
                  required
                  onChange={handleOnChange}
                  placeholder="Enter username"
                  className="w-72 h-full outline-none bg-slate-200  px-1"
                />
              </div>
            </div>

            {/* email  */}
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
                  required
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                  className="w-72 h-full outline-none bg-slate-200 px-1 "
                />
              </div>
            </div>

            {/* set password  */}
            <div className="bg-slate-200  p-2 flex rounded-xl mt-4">
              <label htmlFor="" className="text-2xl mx-1 cursor-pointer">
                {" "}
                <RiLockPasswordFill />{" "}
              </label>
              <div className="bg-slate-100 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Set password"
                  name="password"
                  value={data.password}
                  required
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

            {/* confirm password  */}
            <div className="bg-slate-200  p-2 flex rounded-xl mt-4">
              <label htmlFor="" className="text-2xl mx-1 cursor-pointer">
                {" "}
                <FaLock />{" "}
              </label>

              <div className="bg-slate-100 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-64 h-full outline-none bg-slate-200 px-2"
                />
              </div>
              <div
                className="cursor-pointer text-md p-1 px-2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>

            <button onClick={handleSubmit} className="bg-slate-500 text-white px-6 py-2 w-full  rounded-xl  transition-all mx-auto block mt-4 hover:bg-slate-700">
              Signup
            </button>

            <p className=" flex justify-between p-2">
              Already have an account ?{" "}
              <Link
                to={"/login"}
                className=" hover:underline text-blue-900 hover:text-slate-900"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
