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
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="p-1">
        <div className="drawer  bg-slate-400 h-fit  rounded-md px-4  ">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar flex justify-between  max-w-10/12">
              <div className="flex-none lg:hidden">
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
              <div className="flex px-2 justify-center lg:justify-start">
                <Link to={"/Home"} className="text-2xl font-bold lg:text-3xl ">
                  GPCI Maneger
                </Link>
              </div>
              {/* <div className="hidden flex-none lg:block ">
                <ul className="menu menu-horizontal">

                  <li>
                    <button className="btn btn-ghost">Home</button>
                  </li>
                  <li>
                    <button className="btn btn-ghost">Order</button>
                  </li>
                  <li>
                    <button className="btn btn-ghost">Process</button>
                  </li>
                  <li>
                    <button className="btn btn-ghost">Store</button>
                  </li>
                  <li>
                    <button className="btn btn-ghost">Delevery</button>
                  </li>
                </ul>
              </div> */}
              <div className=" lg-px-2">
                <div
                  className="relative flex justify-center "
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
                <div className="text-3xl mr-4 ml-2 cursor-pointer">
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

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
