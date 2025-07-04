import React from "react";
import { AiOutlineFire } from "react-icons/ai";
import { MdDesignServices } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { LineElement, PointElement } from "chart.js";
import { Link } from "react-router-dom";

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
  const data = {
    labels: ["Active", "Completed", "Pending"],
    datasets: [
      {
        data: [12, 19, 8],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orderd Jobs",
        data: [12, 19, 8, 15, 10, 15, 2],
        backgroundColor: "#42A5F5", // Blue
        borderRadius: 5,
      },
      {
        label: "complited jobs",
        data: [5, 14, 12, 9, 6, 10, 3],
        backgroundColor: "#FFA726", // Orange
        borderRadius: 5,
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

  const lineData = {
    labels: [
      "Jun",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "jun",
      "jul",
      "Aug",
      "Set",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Jobs",
        data: [199, 204, 222, 120, 189, 208, 170, 165, 193, 223, 176, 182],
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
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#FFD54F] to-[#FFF7B2] shadow-md flex flex-col items-center justify-center text-yellow-900 font-semibold">
              <p className="text-3xl">12</p>
              <div className="flex items-center gap-2">
                <p>Active Jobs</p>
                <AiOutlineFire className="text-2xl" />
              </div>
            </div>
          </Link>
          <Link to="view-board/Desgin">
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#9C27B0] to-[#E1BEE7] shadow-md flex flex-col items-center justify-center font-semibold text-white">
              <p className="text-3xl">12</p>
              <div className="flex items-center gap-2">
                <p>Desgin</p>
                <MdDesignServices className="text-xl" />
              </div>
            </div>
          </Link>

          <Link to="view-board/Printing">
            <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#03A9F4] to-[#B3E5FC] shadow-md flex flex-col items-center justify-center font-semibold text-blue-900">
              <p className="text-3xl">12</p>
              <div className="flex items-center gap-2">
                <p>Printing</p>
                <IoIosPrint className="text-xl" />
              </div>
            </div>
          </Link>
          <div className="w-60 h-[70px] rounded-md bg-gradient-to-r from-[#E91E63] to-[#F8BBD0] shadow-md flex flex-col items-center justify-center font-semibold text-pink-900">
            <p className="text-3xl">12</p>
            <div className="flex items-center gap-2">
              <p>Binding</p>
              <FaBook className="text-xl" />
            </div>
          </div>
        </div>

        {/* =======================================Pie Chart ================================================= */}

        <div className="flex gap-2 mb-2">
          <div className="flex justify-around p-2 shadow-md bg-white  rounded-lg ">
            <div className="">
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-yellow-900 ">
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
                  <Pie data={data} options={donutOptions} />
                </div>
              </div>
            </div>
            <div className="mr-2">
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-[#03A9F4] ">
                  Printing Jobs
                </p>
                <div className="w-full h-full">
                  <Pie data={data} options={donutOptions} />
                </div>
              </div>
            </div>
            <div>
              <div className="w-[242px] h-48 bg-slate-50 rounded-md p-2 flex flex-col items-center">
                <p className="text-center font-semibold mb-1 text-[#E91E63] ">
                  Binding Jobs
                </p>
                <div className="w-full h-full">
                  <Pie data={data} options={donutOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================Bar Chart ================================================= */}

        <div className="flex gap-2">
          <div className="flex justify-around p-2 shadow-md bg-white rounded-lg ">
            <div className="w-[490px] h-48  rounded-md relative">
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
          <h2 className="text-xl font-semibold text-white p-3 rounded-md text-center bg-blue-400 mb-4">
            Recent Completed Jobs
          </h2>

          {/* Scrollable job list */}
          <div className="overflow-y-auto h-[435px] pr-1">
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
