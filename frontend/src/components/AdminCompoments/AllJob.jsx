import React, { useEffect, useState } from "react";
import TabPanel from "../TabPanel";
import SummaryApi from "../../common";
import AdminJobCard from "../AdminJobCard";

const AllJob = () => {
  const [openAddJob, setOpenAddJob] = useState(false);
  const [allJob, setAllJob] = useState([]);

  const fetchAllJob = async () => {
    const response = await fetch(SummaryApi.allJob.url);
    const dataResponse = await response.json();

    // console.log("response", dataResponse);
    setAllJob(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllJob();
  }, []);

  return (
    <div className="m-2 h-[calc(100vh-180px)] overflow-y-scroll">
      <div className="bg-slate-500 px-4 py-1 flex justify-between items-center mb-1">
        <h2 className="font-bold text-white text-lg">All Jobs</h2>
        <button
          className=" border-2 px-2 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all rounded-full"
          onClick={() => setOpenAddJob(true)}
        >
          Add Job
        </button>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto  ">
        <table className="w-full border-collapse border border-slate-400">
          <thead>
            <tr className="bg-slate-500 text-white">
              <th className="border border-slate-400 px-2 py-1">Sr.</th>
              <th className="border border-slate-400 px-2 py-1">Job Name</th>
              <th className="border border-slate-400 px-2 py-1">Customer</th>
              <th className="border border-slate-400 px-2 py-1">Mobile No. / Add.</th>
              <th className="border border-slate-400 px-2 py-1">Added Job</th>
              <th className="border border-slate-400 px-2 py-1">Status</th>
              <th className="border border-slate-400 px-2 py-1">More</th>
            </tr>
          </thead>
          <tbody className="bg-slate-200 text-center ">
            {allJob.map((job, index) => (
              <AdminJobCard key={index} job={job} index={index} fetchAllJob={fetchAllJob} />
            ))} 
    
          </tbody>
        </table>
      </div>

      {openAddJob && <TabPanel onClose={() => setOpenAddJob(false)} fetchAllJob={fetchAllJob} />}
    </div>
  );
};

export default AllJob;
