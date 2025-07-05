import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanCard from "../KanbanBoard/KanbanCard";

const DesginBoard = ({
  boards,
  removeBoard,
  addCard,
  removeCard,
  handleDragEnd,
  handleDragEnter,
  fetchAllJob,
  flex = "",
  hight = "",
  color=""
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={`min-w-[290px]`}>
      <div
        className={` ${flex} bg-green-400 ${color} rounded border-b border-slate-400 `}
      >
        <div className="flex justify-between items-center p-1 px-4 ">
          <p className="flex-1 text-white text-center text-xl font-bold">
            {boards.title}
            <span className="text-gray-100 text-md">
              {" "}
              {boards.cards.length}
            </span>
          </p>
        </div>

        <div
          className={`${flex} bg-slate-50  h-[calc(100vh-250px)] ${hight} rounded-md p-2 overflow-y-scroll  scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200`}
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
