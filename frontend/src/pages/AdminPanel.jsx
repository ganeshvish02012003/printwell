import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]); // ✅ added dependency array for better practice

  return (
    <div className="px-1 h-[calc(100vh-75px)] md:flex hidden">
      <aside className="bg-slate-400 w-60 mr-1 rounded-md px-1">
        <div className="h-36 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="h-20 w-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p>{user?.role}</p>
        </div>

        <div>
          <nav className="grid p-1 py-4">
            <NavLink
              to="all-user"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-slate-500 hover:text-white ${
                  isActive ? "bg-slate-600 text-white font-semibold" : ""
                }`
              }
            >
              Users
            </NavLink>

            <NavLink
              to="all-customer"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-slate-500 hover:text-white ${
                  isActive ? "bg-slate-600 text-white font-semibold" : ""
                }`
              }
            >
              All Customers
            </NavLink>
            <NavLink
              to="all-job"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-slate-500 hover:text-white ${
                  isActive ? "bg-slate-600 text-white font-semibold" : ""
                }`
              }
            >
              All Jobs
            </NavLink>
            <NavLink
              to="Menage-Job-Card"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-slate-500 hover:text-white ${
                  isActive ? "bg-slate-600 text-white font-semibold" : ""
                }`
              }
            >
              Menage Job 
            </NavLink>

            <NavLink
              to="Peyment-Status"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-slate-500 hover:text-white ${
                  isActive ? "bg-slate-600 text-white font-semibold" : ""
                }`
              }
            >
              Peyment Status
            </NavLink>
            <NavLink
              to="Job-History"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-slate-500 hover:text-white ${
                  isActive ? "bg-slate-600 text-white font-semibold" : ""
                }`
              }
            >
              Job History
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="w-full bg-slate-400 rounded">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

