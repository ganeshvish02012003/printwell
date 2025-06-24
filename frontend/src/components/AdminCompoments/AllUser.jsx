import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../ChangeUserRole";

const AllUser = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name:"",
    role:"",
    _id:""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allusers.url, {
      method: SummaryApi.allusers.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse, message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-1">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-slate-500 text-white ">
            <th className="border border-slate-400">Sr.</th>
            <th className="border border-slate-400">Name</th>
            <th className="border border-slate-400">Email</th>
            <th className="border border-slate-400">Role</th>
            <th className="border border-slate-400">Created Data</th>
            <th className="border border-slate-400">Active</th>
          </tr>
        </thead>
        <tbody className="bg-slate-200 text-center">
          {allUser.map((el, index) => {
            return (
              <tr  key={el.id || index}>
                <td className="border border-slate-400">{index + 1}</td>
                <td className="border border-slate-400">
                  {/* {" "}
                  <img
                    src={el.profilePic}
                    className="h-8 w-8 rounded-full mx-2"
                    alt={el.name}
                  />{" "} */}
                  {el.name}
                </td>
                <td className="border border-slate-400">{el.email}</td>
                <td className="border border-slate-400">{el.role}</td>
                <td className="border border-slate-400">{moment(el.createdAt).format("l")}</td>
                <td className="border border-slate-400">
                  <button
                    className="bg-slate-300 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el) 
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEditOutline />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole 
        onClose={() => setOpenUpdateRole(false)}
        name={updateUserDetails.name}
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        userId={updateUserDetails._id}
        callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUser;
