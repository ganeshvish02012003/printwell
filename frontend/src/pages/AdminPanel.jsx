import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }

  })



  return (
    <div className=" px-1  h-[calc(100vh-165px)] md:flex hidden ">
      <aside className="bg-slate-400  w-full max-w-60 mr-1 rounded-md px-1">
        <div className="h-36  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative justify-center ">
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
          <p className="capitalize text-lg font-semibold " >{user?.name}</p>
          <p>{user?.role} </p>
        </div>
            <div>
                <nav className="grid p-1 py-4">
                    <Link to={"all-user"} className=' px-2 py-1 rounded hover:bg-slate-500 hover:text-white ' > All User</Link>
                    <Link to={"all-job"} className=' px-2 py-1 rounded hover:bg-slate-500 hover:text-white' >All Job </Link>
                    

                </nav>
            </div>


      </aside>

      <main className="w-full bg-slate-400  rounded ">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
