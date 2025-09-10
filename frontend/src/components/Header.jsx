import React, { useEffect, useState } from "react";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import ROLE from "../common/role";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  // console.log("user header", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="p-1">
        <div className="drawer  bg-slate-400 h-fit  rounded-md px-1 lg:px-8  ">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar flex justify-between max-w-10/12">
              <div className="flex-none   lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="flex px-2  ">
                <Link to={"/Home"} className="text-xl font-bold lg:text-3xl ">
                  GPCI Maneger
                </Link>
              </div>
              <div className=" lg-px-2 ">
                <div
                  className="relative hidden lg:flex  justify-center "
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user?._id && (
                    <div className="text-3xl mx-4  cursor-pointer">
                      {user?.profilePic ? (
                        <img
                          src={user?.profilePic}
                          className="h-10 w-10 border-2 border-gray-800 rounded-full"
                          alt={user?.name}
                        />
                      ) : (
                        <FaRegCircleUser />
                      )}
                    </div>
                  )}

                  {menuDisplay && (
                    <div className="absolute bottom-0 top-11 h-fit p-2  rounded  ">
                      <nav>
                        {user?.role === ROLE.ADMIN && (
                          <Link
                            to={"/Home/admin-panel/Menage-Job-Card"}
                            className="whitespace-nowrap shadow-lg bg-white  hover:bg-slate-100 p-2 hidden md:block "
                          >
                            {" "}
                            Admin Panel
                          </Link>
                        )}
                      </nav>
                    </div>
                  )}
                </div>
                <div className="text-3xl hidden lg:flex mr-4 ml-2 cursor-pointer">
                  <div>
                    {user?._id ? (
                      <button onClick={handleLogout}>
                        <MdLogout />
                      </button>
                    ) : (
                      <Link to={"login"}>
                        <MdLogin />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* drawer side */}
          <div className="drawer-side fixed z-[80]">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay "
            ></label>

            <ul className="menu bg-base-200 h-full w-72 p-4 z-50 ">
              {/* Sidebar content here */}
              <div className="bg-white relative rounded-full">
                {user?._id && (
                  <div className="text-3xl  flex  items-center cursor-pointer">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="h-20 w-20 border-2  border-gray-800 rounded-full"
                        alt={user?.name}
                      />
                    ) : (
                      <FaRegCircleUser />
                    )}
                    <p className="px-10">{user?.name}</p>
                  </div>
                )}
              </div>

              <li>
                <Link
                  to="Home"
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Home
                </Link>
              </li>

              <li className="group">
                <details>
                  <summary className="cursor-pointer">Admin Panel</summary>
                  <ul className="pl-4 space-y-1">
                    <li>
                      <Link
                        to="Home/admin-panel/all-user"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="Home/admin-panel/all-customer"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        All Customers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="Home/admin-panel/Menage-Job-Card"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        Menage Jobs
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="Home/admin-panel/all-job"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        Active Jobs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="Home/admin-panel/Peyment-Status"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        Peyment Status
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="Home/admin-panel/Job-History"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        Job History
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="Home/admin-panel/Job-Category"
                        onClick={() => {
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        job Category
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <Link
                  to="Home/view-board/Desgin"
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Desgin Job
                </Link>
              </li>
              <li>
                <Link
                  to="Home/view-board/Printing"
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Print Job
                </Link>
              </li>
              <li>
                <Link
                  to="Home/view-board/Other_work"
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Binding Job
                </Link>
              </li>
              <li>
                <Link
                  to="Home/view-board/Completed"
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Complited Job
                </Link>
              </li>
              <li>
                <Link
                  to="Home/view-board/Completed"
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  {user?._id ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-400"
                    >
                      <MdLogout /> Logout
                    </button>
                  ) : (
                    <Link to={"login"}>
                      <MdLogin /> LogIn
                    </Link>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
