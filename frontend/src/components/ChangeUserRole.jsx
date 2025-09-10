import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, userId, role, onClose, callFunc, }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }

    console.log("role updated", responseData);
  };

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="mx-4 w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
        onClick={onClose}
      >
        <IoMdClose />
      </button>

      {/* Header */}
      <h1 className="text-xl font-semibold text-slate-700 border-b pb-3 mb-4">
        Change User Role
      </h1>

      {/* User Info */}
      <div className="space-y-2 mb-4 text-slate-600">
        <p>
          <span className="font-medium">Name:</span> {name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
      </div>

      {/* Role Selector */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-medium text-slate-700">Role:</p>
        <select
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          value={userRole}
          onChange={handleOnChangeSelect}
        >
          {Object.values(ROLE).map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>
      </div>

      {/* Action Button */}
      <button
        className="w-full py-2 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-700 transition"
        onClick={updateUserRole}
      >
        Update Role
      </button>
    </div>
  </div>
);

};

export default ChangeUserRole;
