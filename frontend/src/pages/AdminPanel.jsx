import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

import { FaRupeeSign } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import {
  MdCategory,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaTasks, FaUsers, FaUserTie } from "react-icons/fa";
import { MdOutlineTask } from "react-icons/md";
import { SiTask } from "react-icons/si";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [asideExpand, setAsideExpand] = useState(true);

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/Home");
    }
  }, [user, navigate]);

  return (
    <div className="px-1 h-[calc(100vh-75px)] flex ">
      {/* Sidebar */}
      <aside
        className={`bg-slate-400 mr-1 rounded-md transition-all duration-300 hidden lg:flex flex-col 
        ${asideExpand ? "w-60" : "w-12"} `}
      >
        {/* Toggle button */}
        <div
          className="flex justify-end items-center border bg-slate-500 border-slate-500 rounded p-1 hover:cursor-pointer"
          onClick={() => setAsideExpand(!asideExpand)}
        >
          {asideExpand ? (
            <MdKeyboardArrowLeft className="text-xl" />
          ) : (
            <MdKeyboardArrowRight className="text-xl" />
          )}
        </div>


        {/* Navigation */}
        <nav className="grid p-1 ">
          <NavLink
            to="all-user"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <FaUserTie className="text-2xl" />

            {asideExpand && <span>Users</span>}

            {/* Tooltip when collapsed */}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                Users
              </span>
            )}
          </NavLink>

          <NavLink
            to="all-customer"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <FaUsers className="text-2xl" />
            {asideExpand && <span>All Client</span>}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                All Client
              </span>
            )}
          </NavLink>

          <NavLink
            to="Menage-Job-Card"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <FaTasks className="text-2xl" />
            {asideExpand && <span>Manage Jobs</span>}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                Manage Jobs
              </span>
            )}
          </NavLink>

          <NavLink
            to="all-job"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <SiTask className="text-2xl" />
            {asideExpand && <span>Active Jobs</span>}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                Active Jobs
              </span>
            )}
          </NavLink>

          <NavLink
            to="Peyment-Status"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <FaRupeeSign className="text-2xl" />
            {asideExpand && <span>Payment Status</span>}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                Payment Status
              </span>
            )}
          </NavLink>

          <NavLink
            to="Job-History"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <FaHistory className="text-2xl" />
            {asideExpand && <span>Job History</span>}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                Job History
              </span>
            )}
          </NavLink>

          <NavLink
            to="Job-Category"
            className={({ isActive }) =>
              `relative group p-2 flex items-center gap-2 rounded hover:bg-slate-500 hover:text-white ${
                isActive ? "bg-slate-600 text-white font-semibold" : ""
              }`
            }
          >
            <MdCategory className="text-2xl" />
            {asideExpand && <span>Job Category</span>}
            {!asideExpand && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                     bg-slate-700 text-white text-sm rounded opacity-0 
                     group-hover:opacity-100 z-20 whitespace-nowrap pointer-events-none"
              >
                Job Category
              </span>
            )}
          </NavLink>
        </nav>
        
        {asideExpand ? (
          // Expanded sidebar: full profile
          <div className="h-full flex justify-start items-end flex-row">
            <div className="text-5xl  h-16 w-20 p-2 cursor-pointer relative justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="h-12 w-12 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            <div className="w-full p-2 text-center">

            <p className="capitalize text-md font-semibold">{user?.name}</p>
            <p className="capitalize text-sm ">{user?.role}</p>
            </div>
          </div>
        ) : (
          // Collapsed sidebar: only profile icon
          <div className="h-full flex justify-center items-end flex-row">
            <div className="text-5xl  h-16 w-20 p-1 cursor-pointer relative justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="h-10 w-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>

          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="w-full bg-slate-400 rounded">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
