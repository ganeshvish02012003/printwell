import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../ChangeUserRole";
import LineLoading from "../../middleware/LineLoading";

const AllUser = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    setLoading(true); // Start loading

    try {
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
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-2">
      {loading && <LineLoading />}
      <div className="border border-slate-300 overflow-hidden">
        <div className="overflow-y-auto relative z-0 h-[calc(100vh-95px)]">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-500 text-white sticky top-0 z-10">
              <tr>
                <th className="border px-2 py-2">Sr.</th>
                <th className="border px-2 py-2">Name</th>
                <th className="border px-2 py-2">Email</th>
                <th className="border px-2 py-2">Role</th>
                <th className="border px-2 py-2 ">Created Date</th>
                <th className="border px-2 py-2">Active</th>
              </tr>
            </thead>

            <tbody>
              {allUser.length > 0 ? (
                allUser.map((el, index) => {
                  const rowBg =
                    index % 2 === 0 ? "bg-slate-300" : "bg-slate-200";
                  return (
                    <tr
                      key={el._id || index}
                      className={`hover:bg-gray-400 text-center ${rowBg}`}
                    >
                      <td className="border border-slate-100 p-1">
                        {index + 1}
                      </td>
                      <td className="border border-slate-100 p-1">{el.name}</td>
                      <td className="border border-slate-100 p-1">
                        {el.email}
                      </td>
                      <td className="border border-slate-100 p-1">{el.role}</td>
                      <td className="border border-slate-100 p-1">
                        {moment(el.createdAt).format("YYYY/MM/DD")}
                      </td>
                      <td className="border border-slate-100 p-1">
                        <button
                          className="bg-slate-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                          onClick={() => {
                            setUpdateUserDetails(el);
                            setOpenUpdateRole(true);
                          }}
                        >
                          <MdModeEditOutline />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border px-4 py-4 text-center bg-slate-100"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
