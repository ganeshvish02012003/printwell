import React, { useEffect, useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { MdDesignServices } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { LineElement, PointElement } from "chart.js";
import { Link } from "react-router-dom";
import SummaryApi from "../common"; // ✅ import your API

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
ChartJS.register(LineElement, PointElement);

const Home = () => {
  const [allJobs, setAllJobs] = useState([]);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const data = await response.json();
      setAllJobs(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    console.log(
      "All Status values:",
      allJobs.map((job) => job?.job?.status)
    );
    console.log(
      "All subStatus values:",
      allJobs.map((job) => job?.job?.subStatus)
    );
  }, [allJobs]);

  // ✅ Count Logic
  const Admin_TO_DO = allJobs.filter(
    (job) => job?.job?.status === "Pending"
  ).length;
  const Admin_Desgin = allJobs.filter(
    (job) => job?.job?.status === "Desgin"
  ).length;
  const Admin_Printing = allJobs.filter(
    (job) => job?.job?.status === "Printing"
  ).length;
  const Admin_Other_work = allJobs.filter(
    (job) => job?.job?.status === "Other_work"
  ).length;
  const Admin_Completed = allJobs.filter(
    (job) => job?.job?.status === "Completed"
  ).length;

  const Desgin_To_Do = allJobs.filter(
    (job) => job?.job?.subStatus === "To Do"
  ).length;
  const Desgin_Designer_1 = allJobs.filter(
    (job) => job?.job?.subStatus === "Designer 1"
  ).length;
  const Desgin_Designer_2 = allJobs.filter(
    (job) => job?.job?.subStatus === "Designer 2"
  ).length;
  const Desgin_Proof = allJobs.filter(
    (job) => job?.job?.subStatus === "Proof"
  ).length;
  const Desgin_Final = allJobs.filter(
    (job) => job?.job?.subStatus === "Final"
  ).length;
  const Desgin_send_to_print = allJobs.filter(
    (job) => job?.job?.subStatus === "send to print"
  ).length;

  const print_To_Do = allJobs.filter(
    (job) => job?.job?.subStatus === "Print"
  ).length;
  const print_Printer_1 = allJobs.filter(
    (job) => job?.job?.subStatus === "Printer 1"
  ).length;
  const print_Printer_2 = allJobs.filter(
    (job) => job?.job?.subStatus === "Printer 2"
  ).length;
  const print_Printer_3 = allJobs.filter(
    (job) => job?.job?.subStatus === "Printer 3"
  ).length;
  const print_Printer_4 = allJobs.filter(
    (job) => job?.job?.subStatus === "Printer 4"
  ).length;
  const print_Printer_5 = allJobs.filter(
    (job) => job?.job?.subStatus === "Printer 5"
  ).length;
  const print_Binding = allJobs.filter(
    (job) => job?.job?.subStatus === "Binding"
  ).length;

  const Bind_Binding = allJobs.filter((job) => job?.job?.subStatus === "Binding").length;
  const Bind_To_Binding = allJobs.filter((job) => job?.job?.subStatus === "To Binding").length;
  const Bind_Cutting = allJobs.filter((job) => job?.job?.subStatus === "Cutting").length;
  const Bind_perfeting = allJobs.filter((job) => job?.job?.subStatus === "perfeting").length;
  const Bind_Lamination = allJobs.filter((job) => job?.job?.subStatus === "Lamination").length;
  // const Bind_perfeting = allJobs.filter((job) => job?.job?.subStatus === "perfeting").length;

  const total_jobs =
    Admin_TO_DO + Admin_Desgin + Admin_Printing + Admin_Other_work;
  const total_ActiveJobs = Admin_Desgin + Admin_Printing + Admin_Other_work;
  const Active_Desgin =
    Desgin_Designer_1 +
    Desgin_Designer_2 +
    Desgin_Proof +
    Desgin_Final +
    Desgin_send_to_print;
  const Active_Print =
    print_Printer_1 +
    print_Printer_2 +
    print_Printer_3 +
    print_Printer_4 +
    print_Printer_5;

  const Active_Bind =
  Bind_To_Binding +
  Bind_Cutting +
  Bind_perfeting +
  Bind_Lamination;

  const data = {
    labels: ["Active", "Pending"],
    datasets: [
      {
        data: [total_ActiveJobs, Admin_TO_DO],
        backgroundColor: ["#42A5F5", "#FFA726"],
        borderWidth: 1,
      },
    ],
  };

  const Desgin_data = {
    labels: ["Active", "Pending"],
    datasets: [
      {
        data: [Active_Desgin, Desgin_To_Do],
        backgroundColor: ["#42A5F5", "#FFA726"],
        borderWidth: 1,
      },
    ],
  };

  const Print_data = {
    labels: ["Active", "Pending"],
    datasets: [
      {
        data: [Active_Print, print_To_Do],
        backgroundColor: ["#42A5F5", "#FFA726"],
        borderWidth: 1,
      },
    ],
  };

  const Bind_data = {
    labels: ["Active", "Pending"],
    datasets: [
      {
        data: [Active_Bind, Bind_Binding],
        backgroundColor: ["#42A5F5", "#FFA726"],
        borderWidth: 1,
      },
    ],
  };

  const simplePieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 0, // Removes the color box
          usePointStyle: false,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                return {
                  text: label,
                  fillStyle: "transparent", // no box color
                  strokeStyle: "transparent",
                  datasetIndex: 0,
                  index: i,
                  fontColor: dataset.backgroundColor[i], // Custom legend text color
                  color: dataset.backgroundColor[i], // ✅ Set the legend label text color (works in v3+)
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  // 🔁 Helpers to group data
  const getJobsPerDay = (jobs, key = "createdAt") => {
    const result = [0, 0, 0, 0, 0, 0, 0]; // Mon-Sun
    jobs.forEach((job) => {
      const date = new Date(job?.[key] || job?.createdAt);
      const day = date.getDay(); // 0 (Sun) to 6 (Sat)
      const index = day === 0 ? 6 : day - 1; // convert to 0=Mon, ..., 6=Sun
      result[index]++;
    });
    return result;
  };

  const getJobsPerMonth = (jobs, key = "createdAt") => {
    const result = Array(12).fill(0); // Jan - Dec
    jobs.forEach((job) => {
      const date = new Date(job?.[key] || job?.createdAt);
      const month = date.getMonth(); // 0 - Jan, 11 - Dec
      result[month]++;
    });
    return result;
  };

  // 🔁 Calculate real chart data
  const orderedJobsPerDay = getJobsPerDay(allJobs, "createdAt");
  const completedJobsPerDay = getJobsPerDay(
    allJobs.filter((job) => job?.job?.status === "Completed"),
    "job.updatedAt"
  );

  const monthlyJobs = getJobsPerMonth(allJobs, "createdAt");

  // ✅ Bar Chart: Ordered vs Completed Jobs (Mon–Sun)
  // const barData = {
  //   labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   datasets: [
  //     {
  //       label: "Ordered Jobs",
  //       data: orderedJobsPerDay,
  //       backgroundColor: "#42A5F5", // Blue
  //       borderRadius: 5,
  //     },
  //     {
  //       label: "Completed Jobs",
  //       data: completedJobsPerDay,
  //       backgroundColor: "#FFA726", // Orange
  //       borderRadius: 5,
  //     },
  //   ],
  // };

  // Generate last 7 days including today
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = d.toLocaleDateString("en-US", { weekday: "short" }); // e.g., Mon
    const date = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    days.push(`${day} ${date}/${month}`); // Format: Mon 20/07
  }
  return days;
};

const barData = {
  labels: getLast7Days(),
  datasets: [
    {
      label: "Ordered Jobs",
      data: orderedJobsPerDay,
      backgroundColor: "#42A5F5", // Blue
      borderRadius: 5,
    },
    {
      label: "Completed Jobs",
      data: completedJobsPerDay,
      backgroundColor: "#FFA726", // Orange
      borderRadius: 5,
    },
  ],
};


  // ✅ Line Chart: Jobs Per Month
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Jobs Per Month",
        data: monthlyJobs,
        borderColor: "#03A9F4",
        backgroundColor: "rgba(156, 39, 176, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 0, // Removes the colored box
          usePointStyle: false,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                return {
                  text: label,
                  fillStyle: "transparent", // removes color box
                  strokeStyle: "transparent",
                  fontColor: dataset.backgroundColor[i], // not used in v3+
                  datasetIndex: 0,
                  index: i,
                };
              });
            }
            return [];
          },
          color: (ctx) => {
            // color legend text using dataset color
            const index = ctx.index;
            return ctx.chart.data.datasets[0].backgroundColor[index];
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          generateLabels: function (chart) {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: "transparent", // Remove colored box
              strokeStyle: "transparent",
              fontColor: dataset.backgroundColor, // This is just for older Chart.js; you’ll override below
              hidden: !chart.isDatasetVisible(i),
              datasetIndex: i,
            }));
          },
          color: (ctx) => {
            // Use dataset color for the text
            const index = ctx.datasetIndex;
            return ctx.chart.data.datasets[index].backgroundColor;
          },
          boxWidth: 0, // Remove box width entirely
        },
      },
    },
    layout: {
      padding: 0,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          color: "#03A9F4", // ✅ Make all legend text blue
          boxWidth: 0, // remove color box
          usePointStyle: false,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[calc(86vh)] flex bg-slate-400 p-2 mx-1 rounded-md ">
      <div className="bg-slate-200 p-2 rounded-md h-full">
        {/*=================== count lable ==================================*/}
        <div className="flex justify-around mb-2 p-2 shadow-md bg-white max-w-5xl rounded-lg ">
          <Link to="admin-panel/Menage-Job-Card">
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#E91E63] to-[#F8BBD0] text-pink-900 shadow-md flex flex-col items-center justify-center font-semibold">
              <p className="text-3xl"> {total_jobs}</p>
              <div className="flex items-center gap-2">
                <p>Total jobs</p>
                <AiOutlineFire className="text-2xl" />
              </div>
            </div>
          </Link>
          <Link to="view-board/Desgin">
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#9C27B0] to-[#E1BEE7] shadow-md flex flex-col items-center justify-center font-semibold text-white">
              <p className="text-3xl">{Admin_Desgin}</p>
              <div className="flex items-center gap-2">
                <p>Desgin</p>
                <MdDesignServices className="text-xl" />
              </div>
            </div>
          </Link>

          <Link to="view-board/Printing">
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#03A9F4] to-[#B3E5FC] shadow-md flex flex-col items-center justify-center font-semibold text-blue-900">
              <p className="text-3xl">{Admin_Printing}</p>
              <div className="flex items-center gap-2">
                <p>Printing</p>
                <IoIosPrint className="text-xl" />
              </div>
            </div>
          </Link>
          <Link to="view-board/Other_work">
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#FFD54F] to-[#FFF7B2] shadow-md flex flex-col items-center justify-center font-semibold text-yellow-900">
              <p className="text-3xl">{Admin_Other_work}</p>
              <div className="flex items-center gap-2">
                <p>Binding</p>
                <FaBook className="text-xl" />
              </div>
            </div>
          </Link>
        </div>

        {/* =======================================Pie Chart ================================================= */}

        <div className="flex gap-2 mb-2">
          <div className="flex justify-around p-2 shadow-md bg-white  rounded-lg ">
            <div className="">
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-[#E91E63] ">
                  Total Jobs
                </p>
                <div className="w-full h-full">
                  <Pie data={data} options={simplePieOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-around p-2 shadow-md bg-white rounded-lg ">
            <div className="mr-2">
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-[#9C27B0] ">
                  Desgin Jobs
                </p>
                <div className="w-full h-full">
                  <Pie data={Desgin_data} options={donutOptions} />
                </div>
              </div>
            </div>
            <div className="mr-2">
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-[#03A9F4] ">
                  Printing Jobs
                </p>
                <div className="w-full h-full">
                  <Pie data={Print_data} options={donutOptions} />
                </div>
              </div>
            </div>
            <div>
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-yellow-900 ">
                  Binding Jobs
                </p>
                <div className="w-full h-full">
                  <Pie data={Bind_data} options={donutOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================Bar Chart ================================================= */}

        <div className="flex gap-2">
          <div className="flex justify-around p-2 shadow-md bg-white rounded-lg ">
            <div className="w-[490px] h-48  rounded-md relative overflow-x-auto">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="flex justify-around p-2 shadow-md bg-white rounded-lg ">
            <div className="w-[490px] h-48  rounded-md relative">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>

      {/*========================= Recent Completed Jobs =======================  */}

      <div className="bg-slate-200 p-2 rounded-md ml-1 h-full w-full">
        <div className="bg-white shadow-md rounded-md w-full h-full p-2">
          <Link to="view-board/Completed">
            <div className="h-[70px] rounded-md bg-gradient-to-r from-[#66BB6A] to-[#C8E6C9] shadow-md flex flex-col items-center justify-center font-semibold text-green-900">
              <p className="text-3xl">{Admin_Completed}</p>
              <div className="flex items-center gap-2">
                <p>Recent Completed Jobs</p>
                <FaBook className="text-xl" />
              </div>
            </div>
          </Link>

          {/* Scrollable job list */}
          <div className="overflow-y-auto h-[430px] pr-1">
            {/* Job Card */}
            <div className="group bg-slate-100 shadow-md p-2 rounded mb-2 transition-all duration-300 hover:bg-slate-200 cursor-pointer">
              <p>Customer Name</p>
              <p className="flex justify-between">
                Job Name <span>Quantity</span>
              </p>

              {/* Hidden details shown on hover */}
              <div className="mt-2 text-sm text-gray-600 hidden group-hover:block">
                <p>Job Size: A4</p>
                <p>Paper Type: Glossy</p>
                <p>Completed On: 2025-07-04</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
