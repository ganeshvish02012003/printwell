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

const KanbanCard = ({
  card,
  boardId,

  handleDragEnd,
  handleDragEnter,
  fetchAllJob,
}) => {
  const [editJob, setEditJob] = useState(false);
  return (
    <div
      className="p-2 mb-1 border rounded-md bg-white flex flex-col group hover:shadow-md transition"
      draggable
      onDragEnd={() => handleDragEnd(card?.id, boardId)}
      onDragEnter={() => handleDragEnter(card?.id, boardId)}
    >
      <div className="flex ">
        {/* Left Section */}
        <div className=" w-75% pr-2 flex flex-col gap-1 ">
          <div className="flex justify-between">
            <div className="font-bold flex items-center gap-2">
              <BiTask /> {card.job?.jobName || "- Job Name -"}
            </div>
            <div className="text-sm font-bold text-red-500">
              {card.job?.jobCardId}
            </div>
          </div>
          
          <div className="font-normal  flex items-center gap-2  ">
            <FaUserTie  className="text-gray-500"/>
            {card.general?.Customer_name || "- Customer -"}
          </div>

          <div className="flex justify-between items-center ">
            <p className="flex-1 text-base leading-none text-center  ">
              {card.job?.category || "category"}
            </p>
            <p className="flex-1 text-base leading-none text-center  ">
              {card.job?.quantity || "quantity"}
            </p>
          </div>

          <div className="flex justify-between items-center p-1 pb-0">
            <p className="flex-1 text-sm leading-none   text-center   ">
              {card.createdAt
                ? moment(card.createdAt).format("LLL")
                : "date of Order"}
            </p>
            <p className="flex-1 text-sm leading-none text-center ">
              {card.job?.When_to_give_goods
                ? moment(card.job?.When_to_give_goods).format("LLL")
                : "date of Submit"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className=" flex w-25% p-1 ">
          {/* Right side: Dropdown Icon */}
          <div className="relative   ">
      
            <TbArrowsMaximize className="transition-opacity cursor-pointer text-gray-500 hover:text-black  opacity-0 group-hover:opacity-100"/>

            <MdModeEditOutline
              onClick={() => setEditJob(true)}
              className="mt-6 transition-opacity rounded-full cursor-pointer text-gray-500 hover:text-black text-lg  opacity-0 group-hover:opacity-100 "
            />

            <IoMdPrint className=" mt-6 transition-opacitycursor-pointer text-gray-500 hover:text-black opacity-0 group-hover:opacity-100" />
          </div>

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
