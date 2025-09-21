import React, { useEffect, useState } from "react";
import TabPanel from "../TabPanel";
import SummaryApi from "../../common";
import AdminEditJob from "../AdminEditJob";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import { io } from "socket.io-client";
import LineLoading from "../../middleware/LineLoading";

const socket = io(import.meta.env.VITE_BACKEND_DOMAIN, {
  withCredentials: true,
});

const PeymentStatus = () => {
  const [openAddJob, setOpenAddJob] = useState(false);
  const [allJob, setAllJob] = useState([]);
  const [editJobId, setEditJobId] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true); // Start loading
    try {
      const response = await fetch(SummaryApi.allJob.url, {
        method: SummaryApi.allJob.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      setAllJob(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  useEffect(() => {
    fetchAllJob();
    // Listen for job updates
    socket.on("jobUpdated", () => {
      fetchAllJob(); // refetch jobs when a job is added/updated
    });

    // Cleanup on unmount
    return () => {
      socket.off("jobUpdated");
    };
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
      // Show only jobs with status = "Completed" and subStatus = "Out_of_Stock"
      return (
        job?.job?.status?.toLowerCase() === "completed" &&
        job?.job?.subStatus?.toLowerCase() === "out_of_stock" &&
        job?.finished?.Peyment_Status?.toLowerCase() !== "paid" // 🚫 Exclude Paid
      );
    })
    .filter((job) => {
      // Apply search filters
      const jobName = job?.job?.jobName?.toLowerCase() || "";
      const customerName = job?.general?.Customer_name?.toLowerCase() || "";
      const total_Amount = job?.finished?.total_Amount?.toLowerCase() || "";
      const Advance = job?.finished?.Advance?.toLowerCase() || "";
      const Due_Amount = job?.finished?.Due_Amount?.toLowerCase() || "";
      const Peyment_Status = job?.finished?.Peyment_Status?.toLowerCase() || "";
      const Peyment_Mode = job?.finished?.Peyment_Mode?.toLowerCase() || "";
      const addedDate = job?.createdAt
        ? moment(job.createdAt).format("YYYY/MM/DD").toLowerCase()
        : "";

      return (
        jobName.includes(searchQuery.jobName) &&
        customerName.includes(searchQuery.customer) &&
        total_Amount.toLowerCase().includes(searchQuery.total_Amount) &&
        Advance.toLowerCase().includes(searchQuery.Advance) &&
        Due_Amount.toLowerCase().includes(searchQuery.Due_Amount) &&
        Peyment_Status.toLowerCase().includes(searchQuery.Peyment_Status) &&
        Peyment_Mode.toLowerCase().includes(searchQuery.Peyment_Mode) &&
        addedDate.includes(searchQuery.addedJob)
      );
    });

  // Calculate total due amount from filtered jobs
  const totalDueAmount = filteredJobs.reduce((sum, job) => {
    const due = parseFloat(job?.finished?.Due_Amount) || 0;
    return sum + due;
  }, 0);

  // Calculate total jobs
  const totalJobs = filteredJobs.length;

  // Calculate total unique clients
  const totalClients = new Set(
    filteredJobs.map((job) => job?.general?.Customer_name?.toLowerCase().trim())
  ).size;

  return (
    <div className="p-2">
      {loading && <LineLoading />}
      <div className="bg-slate-500 px-4 py-2 rounded-md flex flex-wrap justify-between items-center mb-1 gap-x-4">
        <h2 className="font-bold text-white text-lg">Payment Status</h2>

        <div className="hidden md:block">
          <span className="text-white p-4 font-semibold">Total Jobs</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {totalJobs}
          </span>
        </div>

        <div className="hidden md:block">
          <span className="text-white p-4 font-semibold">Total Client</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {totalClients}
          </span>
        </div>

        <div className="hidden md:block">
          <span className="text-white p-4 font-semibold">Credit</span>
          <span className="text-red-500 bg-slate-100 px-4 py-1 rounded-md font-semibold">
            ₹ {totalDueAmount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="border border-slate-300 overflow-hidden">
        <div className="overflow-y-auto relative z-0 h-[calc(100vh-148px)]">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-500 text-white sticky top-0 z-1">
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
                    placeholder="Add On"
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
                <th className="border  py-2">
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
                  const rowBg =
                    index % 2 === 0 ? "bg-slate-300" : "bg-slate-200";

                  return (
                    <React.Fragment key={job._id}>
                      <tr className={`hover:bg-gray-400 text-center ${rowBg}`}>
                        <td className="border border-slate-100 p-1 py-2">
                          {job?.job?.jobCardId}
                        </td>
                        <td className="border border-slate-100 p-1 py-2">
                          {job?.general?.Customer_name || "N/A"}
                        </td>
                        <td className="border border-slate-100 p-1 py-2">
                          {job?.job?.jobName || "N/A"}
                        </td>

                        <td className="border w-24 border-slate-100 p-1 py-2">
                          {job?.createdAt
                            ? moment(job.createdAt).format("YYYY/MM/DD")
                            : "N/A"}
                        </td>
                        <td className="border w-24 border-slate-100 p-1 py-2">
                          {job?.finished?.Total_Amount}
                        </td>
                        <td className="border w-24 border-slate-100 p-1 py-2">
                          {job?.finished?.Advance}
                        </td>
                        <td className="border w-24 border-slate-100 p-1 py-2 font-bold">
                          {job?.finished?.Due_Amount}
                        </td>

                        <td className="border w-24 border-slate-100 p-1 py-2">
                          {job?.finished?.Peyment_Status}
                        </td>
                        <td className="border w-28 border-slate-100 p-1 py-2">
                          {job?.finished?.Peyment_Mode}
                        </td>
                        <td className="border border-slate-100 p-1 py-2 text-center">
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

      {openAddJob && (
        <TabPanel
          onClose={() => setOpenAddJob(false)}
          fetchAllJob={fetchAllJob}
        />
      )}
    </div>
  );
};

export default PeymentStatus;
