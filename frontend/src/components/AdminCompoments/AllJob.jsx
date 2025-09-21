import React, { useEffect, useState } from "react";
import TabPanel from "../TabPanel";
import SummaryApi from "../../common";
import AdminJobCard from "../AdminJobCard";
import moment from "moment";
import { io } from "socket.io-client";
import LineLoading from "../../middleware/LineLoading";

const socket = io(import.meta.env.VITE_BACKEND_DOMAIN, {
  withCredentials: true,
});

const AllJob = () => {
  const [openAddJob, setOpenAddJob] = useState(false);
  const [allJob, setAllJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    jobName: "",
    customer: "",
    mobile: "",
    addedJob: "",
    status: "",
    subStatus: "",
    Peyment_Status: "",
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

  const Admin_TO_DO = allJob.filter(
    (job) => job?.job?.status === "Pending"
  ).length;
  const Admin_Desgin = allJob.filter(
    (job) => job?.job?.status === "Desgin"
  ).length;
  const Admin_Printing = allJob.filter(
    (job) => job?.job?.status === "Printing"
  ).length;
  const Admin_Other_work = allJob.filter(
    (job) => job?.job?.status === "Other_work"
  ).length;
  const Admin_Completed = allJob.filter(
    (job) => job?.job?.status === "Completed"
  ).length;

  const Desgin_To_Do = allJob.filter(
    (job) => job?.job?.subStatus === "To Do"
  ).length;
  const Desgin_Designer_1 = allJob.filter(
    (job) => job?.job?.subStatus === "Designer 1"
  ).length;
  const Desgin_Designer_2 = allJob.filter(
    (job) => job?.job?.subStatus === "Designer 2"
  ).length;
  const Desgin_Proof = allJob.filter(
    (job) => job?.job?.subStatus === "Proof"
  ).length;
  const Desgin_Final = allJob.filter(
    (job) => job?.job?.subStatus === "Final"
  ).length;
  const Desgin_send_to_print = allJob.filter(
    (job) => job?.job?.subStatus === "send to print"
  ).length;

  const print_To_Do = allJob.filter(
    (job) => job?.job?.subStatus === "Print"
  ).length;
  const print_Printer_1 = allJob.filter(
    (job) => job?.job?.subStatus === "SWIFT 1"
  ).length;
  const print_Printer_2 = allJob.filter(
    (job) => job?.job?.subStatus === "SWIFT 2"
  ).length;
  const print_Printer_3 = allJob.filter(
    (job) => job?.job?.subStatus === "SWIFT 3"
  ).length;
  const print_Printer_4 = allJob.filter(
    (job) => job?.job?.subStatus === "SAHIL"
  ).length;
  const print_Printer_5 = allJob.filter(
    (job) => job?.job?.subStatus === "RULLING"
  ).length;
  const print_Printer_6 = allJob.filter(
    (job) => job?.job?.subStatus === "SCREEN"
  ).length;
  const print_Printer_7 = allJob.filter(
    (job) => job?.job?.subStatus === "RISO"
  ).length;
  const print_Printer_8 = allJob.filter(
    (job) => job?.job?.subStatus === "RISO COM COLOR"
  ).length;
  const print_Printer_9 = allJob.filter(
    (job) => job?.job?.subStatus === "KONICA MINOLTA"
  ).length;
  const print_Binding = allJob.filter(
    (job) => job?.job?.subStatus === "Binding"
  ).length;

  const Bind_Binding = allJob.filter(
    (job) => job?.job?.subStatus === "Binding"
  ).length;
  const Bind_To_Binding = allJob.filter(
    (job) => job?.job?.subStatus === "To Binding"
  ).length;
  const Bind_Cutting = allJob.filter(
    (job) => job?.job?.subStatus === "Cutting"
  ).length;
  const Bind_perfeting = allJob.filter(
    (job) => job?.job?.subStatus === "perfeting"
  ).length;
  const Bind_Lamination = allJob.filter(
    (job) => job?.job?.subStatus === "Lamination"
  ).length;

  const recent_job_end = allJob.filter(
    (job) => job?.job?.subStatus === "recent_job_end"
  ).length;
  const Draw_Bill = allJob.filter(
    (job) => job?.job?.subStatus === "Draw Bill"
  ).length;
  const For_Dispatch = allJob.filter(
    (job) => job?.job?.subStatus === "For Dispatch"
  ).length;
  const Store = allJob.filter((job) => job?.job?.subStatus === "Store").length;
  const Out_of_Stock = allJob.filter(
    (job) => job?.job?.subStatus === "Out_of_Stock"
  ).length;

  const Active_Desgin =
    Desgin_To_Do +
    Desgin_Designer_1 +
    Desgin_Designer_2 +
    Desgin_Proof +
    Desgin_Final +
    Desgin_send_to_print;
  const Active_Print =
    print_To_Do +
    print_Printer_1 +
    print_Printer_2 +
    print_Printer_3 +
    print_Printer_4 +
    print_Printer_5 +
    print_Printer_6 +
    print_Printer_7 +
    print_Printer_8 +
    print_Printer_9;

  const Active_Bind =
    Bind_To_Binding + Bind_Cutting + Bind_perfeting + Bind_Lamination;

  const finished = recent_job_end + Draw_Bill + For_Dispatch + Store;
  const total_jobs =
    Admin_TO_DO + Admin_Desgin + Admin_Printing + Admin_Other_work + finished;
  const total_ActiveJobs =
    Admin_Desgin + Admin_Printing + Admin_Other_work + finished;

  const filteredJobs = allJob
    .filter((job) => {
      const status = job?.job?.status?.toLowerCase() || "";
      const subStatus = job?.job?.subStatus?.toLowerCase() || "";
      return !(status === "completed" && subStatus === "out_of_stock");
    })
    .filter((job) => {
      const jobName = job?.job?.jobName?.toLowerCase() || "";
      const customerName = job?.general?.Customer_name?.toLowerCase() || "";
      const mobileOrAddress =
        (job?.general?.Mobile_number || "") +
        " " +
        (job?.general?.address || "");
      const addedDate = job?.createdAt
        ? moment(job.createdAt).format("L LT").toLowerCase()
        : "";
      const status = job?.job?.status?.toLowerCase() || "";
      const subStatus = job?.job?.subStatus?.toLowerCase() || "";
      const Peyment_Status = job?.finished?.Peyment_Status?.toLowerCase() || "";

      return (
        jobName.includes(searchQuery.jobName) &&
        customerName.includes(searchQuery.customer) &&
        mobileOrAddress.toLowerCase().includes(searchQuery.mobile) &&
        addedDate.includes(searchQuery.addedJob) &&
        status.includes(searchQuery.status) &&
        subStatus.includes(searchQuery.subStatus) &&
        Peyment_Status.includes(searchQuery.Peyment_Status)
      );
    });

  return (
    <div className="p-2">
      {loading && <LineLoading />}
      <div className="bg-slate-500 px-4 py-2 rounded-md flex justify-between items-center mb-1">
        {/* <h2 className="font-bold text-white text-lg">All Jobs</h2> */}
        <div className="">
          <span className="text-white p-2 font-semibold text-lg">Total</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {/* count of total jobs */} {total_jobs}
          </span>
        </div>
        <div className="hidden md:block">
          <span className="text-white p-2 font-semibold text-lg">Active</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {/* count of total jobs */} {total_ActiveJobs}
          </span>
        </div>
        <div className="hidden md:block">
          <span className="text-white p-2 font-semibold text-lg">Pending</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {/* count of total jobs */} {Admin_TO_DO}
          </span>
        </div>
        <div className="hidden xl:block">
          <span className="text-white p-2 font-semibold">Desgin</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {Active_Desgin}
          </span>
        </div>
        <div className="hidden xl:block">
          <span className="text-white p-2 font-semibold">Print</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {/* whose status is Printing */} {Active_Print}
          </span>
        </div>
        <div className="hidden xl:block">
          <span className="text-white p-2 px-2 font-semibold">Binding</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {/* whose status is Other_work */} {Admin_Other_work}
          </span>
        </div>
        <div className="hidden xl:block">
          <span className="text-white p-2 ">Complete</span>
          <span className="text-black bg-slate-100 px-4 py-1 rounded-md font-semibold">
            {/* whose status is Other_work */} {finished}
          </span>
        </div>
        <button
          className="border-2 px-3 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all rounded-full"
          onClick={() => setOpenAddJob(true)}
        >
          Add Job
        </button>
      </div>

      <div className="border border-slate-300 overflow-hidden">
        <div className="overflow-y-auto relative z-0 h-[calc(100vh-148px)]">
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
                    name="subStatus"
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
                    value={searchQuery.Peyment_Status}
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
