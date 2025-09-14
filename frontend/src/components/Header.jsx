import React, { useEffect, useState } from "react";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
                          <NavLink
                            to={"/Home/admin-panel/Menage-Job-Card"}
                            className="whitespace-nowrap shadow-lg bg-white  hover:bg-slate-100 p-2 hidden md:block "
                          >
                            {" "}
                            Admin Panel
                          </NavLink>
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
              className="drawer-overlay"
            ></label>

            <div className="bg-base-200 h-screen w-72 p-4 z-50 overflow-y-auto">
              {/* Sidebar content here */}
              <div className="bg-white relative rounded-full mb-4">
                {user?._id && (
                  <div className="text-3xl flex items-center cursor-pointer">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="h-20 w-20 border-2 border-gray-800 rounded-full"
                        alt={user?.name}
                      />
                    ) : (
                      <FaRegCircleUser />
                    )}
                    <p className="px-4">{user?.name}</p>
                  </div>
                )}
              </div>

              <ul className="menu space-y-2">
                 <li>

                  <NavLink
  to="Home"
  end
  className={({ isActive }) =>
    `block px-3 py-2 rounded-md ${
      isActive ? "bg-slate-600 text-white font-bold" : "hover:bg-slate-300"
    }`
  }
  onClick={() => {
    document.getElementById("my-drawer-3").checked = false;
  }}
>
  Home
</NavLink>

                </li>

                <li>
                  <details>
                    <summary className="cursor-pointer">Admin Panel</summary>
                    <ul className="pl-4 space-y-1">
                      <li>
                        <NavLink
                          to="Home/admin-panel/all-user"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() => {
                            document.getElementById(
                              "my-drawer-3"
                            ).checked = false;
                          }}
                        >
                          Users
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="Home/admin-panel/all-customer"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "my-drawer-3"
                            ).checked = false)
                          }
                        >
                          All Customers
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="Home/admin-panel/Menage-Job-Card"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "my-drawer-3"
                            ).checked = false)
                          }
                        >
                          Menage Jobs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="Home/admin-panel/all-job"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "my-drawer-3"
                            ).checked = false)
                          }
                        >
                          Active Jobs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="Home/admin-panel/Peyment-Status"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "my-drawer-3"
                            ).checked = false)
                          }
                        >
                          Peyment Status
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="Home/admin-panel/Job-History"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "my-drawer-3"
                            ).checked = false)
                          }
                        >
                          Job History
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="Home/admin-panel/Job-Category"
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md ${
                              isActive
                                ? "bg-slate-600 text-white font-bold"
                                : "hover:bg-slate-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "my-drawer-3"
                            ).checked = false)
                          }
                        >
                          Job Category
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>




                <li>
                  <NavLink
                    to="Home/view-board/Desgin"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-slate-600 text-white font-bold"
                          : "hover:bg-slate-300"
                      }`
                    }
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Desgin Job
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Home/view-board/Printing"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-slate-600 text-white font-bold"
                          : "hover:bg-slate-300"
                      }`
                    }
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Print Job
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Home/view-board/Other_work"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-slate-600 text-white font-bold"
                          : "hover:bg-slate-300"
                      }`
                    }
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Binding Job
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Home/view-board/Completed"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-slate-600 text-white font-bold"
                          : "hover:bg-slate-300"
                      }`
                    }
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Completed Job
                  </NavLink>
                </li>
                {/* <li>
                  {user?._id ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-400"
                        onClick={() => {
    document.getElementById("my-drawer-3").checked = false;
  }}
                    >
                      <MdLogout /> Logout
                    </button>
                  ) : (
                    <Link to="login">
                      <MdLogin /> LogIn
                    </Link>
                  )}
                </li> */}
                <li>
  {user?._id ? (
    <button
      onClick={() => {
        handleLogout();
        document.getElementById("my-drawer-3").checked = false;
      }}
      className="flex items-center flex-row gap-2 text-red-400"
    >
      <MdLogout /> Logout
    </button>
  ) : (
    <NavLink
      to="login"
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md ${
          isActive ? "bg-slate-600 text-white font-bold" : "hover:bg-slate-300"
        }`
      }
      onClick={() => {
        document.getElementById("my-drawer-3").checked = false;
      }}
    >
      <MdLogin /> LogIn
    </NavLink>
  )}
</li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
