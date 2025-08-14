// import React, { useEffect, useState } from "react";
// import SummaryApi from "../../common";
// import AdminEditJob from "../AdminEditJob";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import moment from "moment";

// const JobHistory = () => {
//   const [allJob, setAllJob] = useState([]);
//   const [editJobId, setEditJobId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState({
//     jobName: "",
//     customer: "",
//     mobile: "",
//     addedJob: "",
//     status: "",
//     subStatus: "",
//   });

//   const fetchAllJob = async () => {
//     try {
//       const response = await fetch(SummaryApi.allJob.url);
//       const dataResponse = await response.json();
//       setAllJob(dataResponse?.data || []);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllJob();
//   }, []);

//   const handleSearchChange = (e) => {
//     const { name, value } = e.target;
//     setSearchQuery((prev) => ({
//       ...prev,
//       [name]: value.toLowerCase(),
//     }));
//   };

//   const filteredJobs = allJob.filter((job) => {
//     const jobName = job?.job?.jobName?.toLowerCase() || "";
//     const customerName = job?.general?.Customer_name?.toLowerCase() || "";
//     const mobileOrAddress =
//       (job?.general?.Mobile_number || "") + " " + (job?.general?.address || "");
//     const addedDate = job?.createdAt
//       ? moment(job.createdAt).format("YYYY/MM/DD LT").toLowerCase()
//       : "";
//     const status = job?.job?.status?.toLowerCase() || "";
//     const subStatus = job?.job?.subStatus?.toLowerCase() || "";

//     return (
//       jobName.includes(searchQuery.jobName) &&
//       customerName.includes(searchQuery.customer) &&
//       mobileOrAddress.toLowerCase().includes(searchQuery.mobile) &&
//       addedDate.includes(searchQuery.addedJob) &&
//       status.includes(searchQuery.status) &&
//       subStatus.includes(searchQuery.subStatus)
//     );
//   });

//   return (
//     <div className="p-2">
//       <div className="bg-slate-500 px-4 py-2 rounded-md flex justify-between items-center mb-1">
//         <h2 className="font-bold text-white text-lg">Job History</h2>

//       </div>

//       <div className="border border-slate-300 overflow-hidden">
//         <div className="overflow-y-auto h-[calc(100vh-148px)]">
//           <table className="w-full table-auto border-collapse">
//             <thead className="bg-slate-500 text-white sticky top-0 z-10">
//               <tr>
//                 <th className="border px-2 py-2">Sr.</th>
//                 <th className="border px-2 py-2">
//                   <input
//                     type="text"
//                     name="customer"
//                     value={searchQuery.customer}
//                     onChange={handleSearchChange}
//                     placeholder="Customer"
//                     className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
//                   />
//                 </th>
//                 <th className="border px-2 py-2">
//                   <input
//                     type="text"
//                     name="jobName"
//                     value={searchQuery.jobName}
//                     onChange={handleSearchChange}
//                     placeholder="Job Name"
//                     className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
//                   />
//                 </th>

//                 <th className="border px-2 py-2">
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={searchQuery.mobile}
//                     onChange={handleSearchChange}
//                     placeholder="Address"
//                     className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
//                   />
//                 </th>
//                 <th className="border px-1 py-2">
//                   <input
//                     type="text"
//                     name="addedJob"
//                     value={searchQuery.addedJob}
//                     onChange={handleSearchChange}
//                     placeholder="Added Date"
//                     className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
//                   />
//                 </th>

//                 <th className="border px-1 py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredJobs.length > 0 ? (
//                 filteredJobs.map((job, index) => {
//                    const rowBg = index % 2 === 0 ? "bg-slate-300" : "bg-slate-200";
//                   return (
//                     <React.Fragment key={job._id}>
//                       <tr className={`hover:bg-gray-400 text-center ${rowBg}`}>
//                         <td className="border border-slate-100 p-1">
//                           {job?.job?.jobCardId}
//                         </td>
//                         <td className="border border-slate-100 p-1">
//                           {job?.general?.Customer_name || "N/A"}
//                         </td>
//                         <td className="border border-slate-100 p-1">
//                           {job?.job?.jobName || "N/A"}
//                         </td>
//                         <td className="border border-slate-100 p-1">
//                           {job?.general?.address || "N/A"}
//                         </td>
//                         <td className="border border-slate-100 p-1">
//                           {job?.createdAt
//                             ? moment(job.createdAt).format("YYYY/MM/DD")
//                             : "N/A"}
//                         </td>

     
//                         <td className="border border-slate-100 p-1 text-center">
//                           <button
//                             className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
//                             onClick={() => setEditJobId(job._id)}
//                           >
//                             <BsThreeDotsVertical />
//                           </button>
//                         </td>
//                       </tr>
//                       {editJobId === job._id && (
//                         <AdminEditJob
//                           job={job}
//                           onClose={() => setEditJobId(null)}
//                           fetchAllJob={fetchAllJob}
//                         />
//                       )}
//                     </React.Fragment>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="9"
//                     className="border px-4 py-4 text-center bg-slate-100"
//                   >
//                     No jobs found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default JobHistory;

import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import AdminEditJob from "../AdminEditJob";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";

const JobHistory = () => {
  const [allJob, setAllJob] = useState([]);
  const [editJobId, setEditJobId] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    jobName: "",
    customer: "",
    total_Amount: "",
    Advance: "",
    Due_Amount: "",
    addedJob: "",
    Peyment_Status: "",
    Peyment_Mode: "",
  });

  const fetchAllJob = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const dataResponse = await response.json();
      setAllJob(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchAllJob();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  const filteredJobs = allJob
    .filter((job) => {
      // ✅ Show only Completed, Out_of_Stock and Paid jobs
      return (
        job?.job?.status?.toLowerCase() === "completed" &&
        job?.job?.subStatus?.toLowerCase() === "out_of_stock" &&
        job?.finished?.Peyment_Status?.toLowerCase() === "paid"
      );
    })
    .filter((job) => {
      const jobName = job?.job?.jobName?.toLowerCase() || "";
      const customerName = job?.general?.Customer_name?.toLowerCase() || "";
      const total_Amount = (job?.finished?.Total_Amount || "").toString().toLowerCase();
      const Advance = (job?.finished?.Advance || "").toString().toLowerCase();
      const Due_Amount = (job?.finished?.Due_Amount || "").toString().toLowerCase();
      const Peyment_Status = job?.finished?.Peyment_Status?.toLowerCase() || "";
      const Peyment_Mode = job?.finished?.Peyment_Mode?.toLowerCase() || "";
      const addedDate = job?.createdAt
        ? moment(job.createdAt).format("YYYY/MM/DD").toLowerCase()
        : "";

      return (
        jobName.includes(searchQuery.jobName) &&
        customerName.includes(searchQuery.customer) &&
        total_Amount.includes(searchQuery.total_Amount) &&
        Advance.includes(searchQuery.Advance) &&
        Due_Amount.includes(searchQuery.Due_Amount) &&
        Peyment_Status.includes(searchQuery.Peyment_Status) &&
        Peyment_Mode.includes(searchQuery.Peyment_Mode) &&
        addedDate.includes(searchQuery.addedJob)
      );
    });

  return (
    <div className="p-2">
      <div className="bg-slate-500 px-4 py-2 rounded-md flex justify-between items-center mb-1">
        <h2 className="font-bold text-white text-lg">Job History (Paid)</h2>
      </div>

      <div className="border border-slate-300 overflow-hidden">
        <div className="overflow-y-auto h-[calc(100vh-148px)]">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-500 text-white sticky top-0 z-10">
              <tr>
                <th className="border px-2 py-2">Sr.</th>
                <th className="border px-2 py-2">
                  <input
                    type="text"
                    name="customer"
                    value={searchQuery.customer}
                    onChange={handleSearchChange}
                    placeholder="Customer"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-2 py-2">
                  <input
                    type="text"
                    name="jobName"
                    value={searchQuery.jobName}
                    onChange={handleSearchChange}
                    placeholder="Job Name"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="addedJob"
                    value={searchQuery.addedJob}
                    onChange={handleSearchChange}
                    placeholder="Added On"
                    className="p-1 w-20 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-0 py-2">
                  <input
                    type="text"
                    name="total_Amount"
                    value={searchQuery.total_Amount}
                    onChange={handleSearchChange}
                    placeholder="Total Amt"
                    className="p-1 w-20 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-2 py-2">
                  <input
                    type="text"
                    name="Advance"
                    value={searchQuery.Advance}
                    onChange={handleSearchChange}
                    placeholder="Advance"
                    className="p-1 w-20 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-2 py-2">
                  <input
                    type="text"
                    name="Due_Amount"
                    value={searchQuery.Due_Amount}
                    onChange={handleSearchChange}
                    placeholder="Due Amt"
                    className="p-1 w-20 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="Peyment_Status"
                    value={searchQuery.Peyment_Status}
                    onChange={handleSearchChange}
                    placeholder="Status"
                    className="p-1 w-20 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="Peyment_Mode"
                    value={searchQuery.Peyment_Mode}
                    onChange={handleSearchChange}
                    placeholder="Mode"
                    className="p-1 px-0 w-24 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => {
                  const rowBg = index % 2 === 0 ? "bg-slate-300" : "bg-slate-200";
                  return (
                    <React.Fragment key={job._id}>
                      <tr className={`hover:bg-gray-400 text-center ${rowBg}`}>
                        <td className="border border-slate-100 p-1">
                          {job?.job?.jobCardId}
                        </td>
                        <td className="border border-slate-100 p-1">
                          {job?.general?.Customer_name || "N/A"}
                        </td>
                        <td className="border border-slate-100 p-1">
                          {job?.job?.jobName || "N/A"}
                        </td>
                        <td className="border w-24 border-slate-100 p-1">
                          {job?.createdAt
                            ? moment(job.createdAt).format("YYYY/MM/DD")
                            : "N/A"}
                        </td>
                        <td className="border w-24 border-slate-100 p-1">
                          {job?.finished?.Total_Amount}
                        </td>
                        <td className="border w-24 border-slate-100 p-1">
                          {job?.finished?.Advance}
                        </td>
                        <td className="border w-24 border-slate-100 p-1 font-bold">
                          {job?.finished?.Due_Amount}
                        </td>
                        <td className="border w-24 border-slate-100 p-1">
                          {job?.finished?.Peyment_Status}
                        </td>
                        <td className="border w-28 border-slate-100 p-1">
                          {job?.finished?.Peyment_Mode}
                        </td>
                        <td className="border border-slate-100 p-1 text-center">
                          <button
                            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
                            onClick={() => setEditJobId(job._id)}
                          >
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      </tr>
                      {editJobId === job._id && (
                        <AdminEditJob
                          job={job}
                          onClose={() => setEditJobId(null)}
                          fetchAllJob={fetchAllJob}
                        />
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="border px-4 py-4 text-center bg-slate-100"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobHistory;
