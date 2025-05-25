import React, { useState } from "react";
import Chip from "./Chip";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import Dropdown from "./Dropdown";
import AdminEditJob from "../AdminEditJob"

const KanbanCard = ({
  card,
  boardId,
  // removeCard,
  handleDragEnd,
  handleDragEnter,
  fetchAllJob
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
    const [editJob, setEditJob] = useState(false);
  return (
    <div
      className="p-2 mb-1 border rounded-md bg-white flex flex-col group hover:shadow-md transition"
      draggable
      onDragEnd={() => handleDragEnd(card?.id, boardId)}
      onDragEnter={() => handleDragEnter(card?.id, boardId)}
    >
      <div className="flex w-full gap-2">
        {/* Left Section */}
        <div className="w-3/4">
          <div className="font-bold">{card.JobName}</div>
          <div className="font-normal ">{card.Customer}</div>
          <div className="font-normal ">{card.Customer}</div>
          <div className="font-normal">{card.title}</div>
          <div className="flex justify-between items-center mt-2">
            <p className="flex items-center gap-2 text-sm">
              <FaRegClock />
              {card.date || "No date"} 
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/4 flex flex-col items-end ">
          {/* Labels */}
          {/* <div className="flex flex-wrap justify-end gap-1">
            {card.labels?.map((label, index) => (
              <Chip key={index} text={label.text} color={label.color} />
            ))}
          </div> */}

          <div className="flex justify-between items-center w-full">
            <div className="text-sm font-bold text-red-600">{card.id}</div>

            {/* Right side: Dropdown Icon */}
            <div
              className="relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(true);
              }}
            >
              <BsThreeDotsVertical
                className={`transition-opacity ${
                  showDropdown
                    ? "opacity-100"
                    : "opacity-100 group-hover:opacity-100"
                }`}
              />
              {showDropdown && (
                <Dropdown onClose={() => setShowDropdown(false)}>
                  <div className="bg-white border rounded-md shadow-lg w-32">
                    <p className="text-center hover:bg-slate-400 hover:text-white rounded-md">
                      View Card
                    </p>
                    <p className="text-center hover:bg-slate-400 hover:text-white rounded-md" onClick={() => setEditJob(true)}>
                      Edit Card
                    </p>
                    <p
                      className="text-center hover:bg-red-400 hover:text-white rounded-md"
                      // onClick={() => removeCard(card.id, boardId)}
                    >
                      Delete Card
                    </p>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>

           {editJob && (
          <AdminEditJob job={card} onClose={() => setEditJob(false)}  fetchAllJob={fetchAllJob}/>
        )}

          {/* Bottom Content */}
          <div className="mt-auto pt-2">
            <p className="flex items-center gap-2 text-sm">
              <FaRegCheckSquare />
              <span>1/4</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
