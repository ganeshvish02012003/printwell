import React, { useState } from "react";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import AdminEditJob from "./AdminEditJob";

const AdminJobCard = ({ job, index ,fetchAllJob}) => {
  const [editJob, setEditJob] = useState(false);

  return (
    <>
      <tr className="hover:bg-slate-300  ">
        <td className="border border-slate-400 px-2 py-1">{job?.job?.jobCardId}</td>
        <td className="border border-slate-400 px-2 py-1">{job?.job?.jobName || "N/A"}</td>
        <td className="border border-slate-400 px-2 py-1">{job?.general?.Customer_name || "N/A"}</td>
        <td className="border border-slate-400 px-2 py-1">{job?.general?.Mobile_number || job?.general?.address || "N/A"}</td>
        <td className="border border-slate-400 px-2 py-1">{job?.createdAt ? moment(job.createdAt).format("L LT") : "N/A"}</td>
        <td className="border border-slate-400 px-2 py-1">{job?.job?.status || "df"}</td>
        <td className="border border-slate-400 px-2 py-1">
          <button
            className="bg-green-500 text-white px-1 py-1 rounded-full hover:bg-green-600"
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
