import React, { useState } from "react";
import Chip from "./Chip";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import Dropdown from "./Dropdown";
import AdminEditJob from "../AdminEditJob";
import moment from "moment";
import { FaUserTie } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { FaMaximize } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import { TbArrowsMaximize } from "react-icons/tb";
import PrintableJobView from "../PrintableJobView";

const KanbanCard = ({
  card,
  boardId,

  handleDragEnd,
  handleDragEnter,
  fetchAllJob,
}) => {
  const [editJob, setEditJob] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div
      className={`p-1 mb-1 max-w-[265px] h-31 border rounded-md flex flex-col group hover:shadow-md transition
  ${
    card.job?.color === "MultiColor"
      ? "bg-gradient-to-r from-blue-400  to-red-400"
      : card.job?.priority === "Urgent"
      ? "bg-red-500"
      : card.job?.priority === "High"
      ? "bg-orange-400"
      : card.job?.priority === "block_away"
      ? "bg-black"
      : "bg-gray-100"
  }`}
      draggable
      onDragEnd={() => handleDragEnd(card?._id, boardId)}
      onDragEnter={() => handleDragEnter(card?._id, boardId)}
    >
      <div className="flex bg-white ">
        {/* Left Section */}
        <div className=" w-75% pr-2 flex flex-col gap-1 ">
          <div className="flex justify-between">
            <div className="font-bold flex items-center gap-2 max-w-[180px] truncate">
              <BiTask />{" "}
              {card.job?.jobName || "- Job Name -"}
            </div>
            <div className="text-sm font-bold text-red-500">
              {card.job?.jobCardId}
            </div>
          </div>

          <div className="font-normal  flex items-center gap-2 max-w-[220px] truncate ">
            <FaUserTie className="text-gray-500" />
            {card.general?.Customer_name || "- Customer -"}
          </div>

          <div className="flex justify-between items-center max-w-[220px]">
            <p className="text-base leading-none text-center w-[70px]">
              {card.job?.quantity || "Qty"}
            </p>
            <p
              className="flex-1 text-base leading-none text-start truncate w-[150px] "
              title={card.job?.category || "category"}
            >
              {card.job?.category || "category"}
            </p>
          </div>

          <div className="flex justify-between items-center p-1  max-w-[230px] truncate">
            <p className="flex-1 text-sm leading-none opacity-70  text-center  max-w-[220px] truncate ">
              {card.createdAt
                ? moment(card.createdAt).format("DD/MM/YYYY ")
                : "Order date"}
            </p>
            <p className="flex-1 text-sm leading-none opacity-70 text-center  max-w-[110px] truncate">
              {card.job?.When_to_give_goods
                ? moment(card.job?.When_to_give_goods).format("DD/MM/YYYY ")
                : "Submit date"}
            </p>
          </div>
          <div className="flex justify-between items-center  max-w-[230px] truncate">
            <p className="flex-1 text-xs leading-none opacity-70  text-center  max-w-[220px] truncate ">
              {card.createdAt
                ? moment(card.createdAt).format("hh:mm A")
                : "Time"}
            </p>
            <p className="flex-1 text-sm leading-none  opacity-70 text-center  max-w-[110px] truncate">
              {card.job?.When_to_give_goods
                ? moment(card.job?.When_to_give_goods).format("hh:mm A")
                : "Time"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className=" flex w-25% p-1 ">
          {/* Right side: Dropdown Icon */}
          <div className="relative   ">
            <TbArrowsMaximize
              onClick={openModal}
              className="transition-opacity cursor-pointer text-gray-500 hover:text-black  opacity-0 group-hover:opacity-100"
            />

            <MdModeEditOutline
              onClick={() => setEditJob(true)}
              className="mt-6 transition-opacity rounded-full cursor-pointer text-gray-500 hover:text-black text-lg  opacity-0 group-hover:opacity-100 "
            />

            <IoMdPrint className=" mt-6 transition-opacitycursor-pointer text-gray-500 hover:text-black opacity-0 group-hover:opacity-100" />
          </div>

          {modalOpen && (
            <PrintableJobView
              closeModal={closeModal}
              key={card.id}
              card={card}
              fetchAllJob={fetchAllJob}
            />
          )}

          {editJob && (
            <AdminEditJob
              job={card}
              onClose={() => setEditJob(false)}
              fetchAllJob={fetchAllJob}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
