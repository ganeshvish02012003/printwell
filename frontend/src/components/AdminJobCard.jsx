import React, { useState } from "react";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import AdminEditJob from "./AdminEditJob";

const AdminJobCard = ({ job, index ,fetchAllJob}) => {
  const [editJob, setEditJob] = useState(false);
 const rowBg =
    parseInt(job?.job?.jobCardId) % 2 === 0 ? "bg-slate-300" : "bg-slate-200";

  return (
    <>
      <tr className={`hover:bg-gray-400  ${rowBg}`}>
        <td className="border border-slate-400 p-1">{job?.job?.jobCardId}</td>
        <td className="border border-slate-400 p-1">{job?.job?.jobName || "N/A"}</td>
        <td className="border border-slate-400 p-1">{job?.general?.Customer_name || "N/A"}</td>
        <td className="border border-slate-400 p-1">{job?.general?.address || "N/A"}</td>
        <td className="border border-slate-400 p-1 text-sm w-36 ">{job?.createdAt ? moment(job.createdAt).format("YYYY/MM/DD LT") : "N/A"}</td>
        <td className="border border-slate-400 p-1 text-sm w-20">{job?.job?.status || "N/A"}</td>
        <td className="border border-slate-400 p-1 text-sm w-32">{job?.job?.subStatus || "N/A"}</td>
        <td className="border border-slate-400 p-1 text-sm w-20">{job?.job?.status || "N/A"}</td>
        <td className="border border-slate-400 p-1 text-center">
          <button
            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
            onClick={() => setEditJob(true)}
          >
            <BsThreeDotsVertical />
          </button>
        </td>
        
        {editJob && (
          <AdminEditJob job={job} onClose={() => setEditJob(false)}  fetchAllJob={fetchAllJob}/>
        )}
        

      </tr>
    </>
  );
};

export default AdminJobCard;
