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
  color = "",
  text="",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={`min-w-[290px]`}>
      <div
        className={` ${flex} ${color} rounded-md border-b border-slate-400 `}
      >
        <div className="flex justify-between items-center p-1 px-4 ">
          <p className={`flex-1 ${text}  text-center text-xl font-bold`}>
            {boards.title}
            <span className={` text-gray-100 ${text}  text-md`}>
              {" "}
              {boards.cards.length}
            </span>
          </p>
        </div>

        <div
          className={`${flex} bg-slate-50  h-[calc(100vh-250px)] p-2  ${hight} rounded-md overflow-y-scroll  scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200`}
          onDragEnter={() => handleDragEnter(null, boards.id)}
        >
          {boards.cards.map((card, index) => (
            <KanbanCard
              key={card._id || card.id || `${boards.id}-${index}`}
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
