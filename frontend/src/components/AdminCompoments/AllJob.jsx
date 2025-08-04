import React, { useEffect, useState } from "react";
import TabPanel from "../TabPanel";
import SummaryApi from "../../common";
import AdminJobCard from "../AdminJobCard";
import moment from "moment";

const AllJob = () => {
  const [openAddJob, setOpenAddJob] = useState(false);
  const [allJob, setAllJob] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    jobName: "",
    customer: "",
    mobile: "",
    addedJob: "",
    status: "",
    subStatus:""
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


  const filteredJobs = allJob.filter((job) => {
    const jobName = job?.job?.jobName?.toLowerCase() || "";
    const customerName = job?.general?.Customer_name?.toLowerCase() || "";
    const mobileOrAddress =
      (job?.general?.Mobile_number || "") + " " + (job?.general?.address || "");
    const addedDate = job?.createdAt
      ? moment(job.createdAt).format("L LT").toLowerCase()
      : "";
    const status = job?.job?.status?.toLowerCase() || "";
    const subStatus = job?.job?.subStatus?.toLowerCase() || "";

    return (
      jobName.includes(searchQuery.jobName) &&
      customerName.includes(searchQuery.customer) &&
      mobileOrAddress.toLowerCase().includes(searchQuery.mobile) &&
      addedDate.includes(searchQuery.addedJob) &&
      status.includes(searchQuery.status) &&
      subStatus.includes(searchQuery.subStatus)
    );
  });

  return (
    <div className="p-2">
      <div className="bg-slate-500 px-4 py-2 rounded-md flex justify-between items-center mb-1">
        <h2 className="font-bold text-white text-lg">All Jobs</h2>
        <button
          className="border-2 px-3 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all rounded-full"
          onClick={() => setOpenAddJob(true)}
        >
          Add Job
        </button>
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
                    name="jobName"
                    value={searchQuery.jobName}
                    onChange={handleSearchChange}
                    placeholder="Job Name"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
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
                    name="mobile"
                    value={searchQuery.mobile}
                    onChange={handleSearchChange}
                    placeholder="Address"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="addedJob"
                    value={searchQuery.addedJob}
                    onChange={handleSearchChange}
                    placeholder="Added Date"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="status"
                    value={searchQuery.status}
                    onChange={handleSearchChange}
                    placeholder="Status"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="status"
                    value={searchQuery.subStatus}
                    onChange={handleSearchChange}
                    placeholder="SubStatus"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2">
                  <input
                    type="text"
                    name="status"
                    value={searchQuery.status}
                    onChange={handleSearchChange}
                    placeholder="Peyment"
                    className="p-1 w-full text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border px-1 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <AdminJobCard
                    key={job._id}
                    job={job}
                    index={index}
                    fetchAllJob={fetchAllJob}
                  />
                ))
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

      {openAddJob && (
        <TabPanel
          onClose={() => setOpenAddJob(false)}
          fetchAllJob={fetchAllJob}
        />
      )}
    </div>
  );
};

export default AllJob;
