import React, { useState } from "react";
// import KanbanCard from "./KanbanCard";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { IoMdArrowDropdown } from "react-icons/io";
// import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom"; // add this at the top
import KanbanCard from "../KanbanBoard/KanbanCard";

const DesginBoard = ({
  boards,
  removeBoard,
  addCard,
  removeCard,
  handleDragEnd,
  handleDragEnter,
  fetchAllJob,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-w-[290px] ">
      <div className="bg-slate-50 rounded border-b border-slate-400">
        <div className="flex justify-between items-center p-1 px-4">
          <p className="flex-1 text-center text-xl font-bold">
            {boards.title}
            <span className="text-gray-500 text-base">
              {" "}
              {boards.cards.length}
            </span>
          </p>
        </div>

        <div
          className="bg-slate-50 h-[calc(100vh-255px)] rounded-md p-2 overflow-y-scroll"
          onDragEnter={() => handleDragEnter(null, boards.id)}
        >
          {boards.cards.map((card, index) => (
            <KanbanCard
              key={card.id}
              card={card}
              boardId={boards.id}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              fetchAllJob={fetchAllJob}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesginBoard;
