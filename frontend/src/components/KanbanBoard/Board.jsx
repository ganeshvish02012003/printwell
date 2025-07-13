import React, { useState } from "react";
import KanbanCard from "./KanbanCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom"; // add this at the top

const Board = ({
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

  // Mock child boards
  const childBoards = Array.from({ length: 4 }).map((_, i) => ({
    id: `${boards.id}-child-${i + 1}`,
    title: `Sub Board ${i + 1}`,
    cards: [],
  }));

  return (
    <div className="min-w-[290px] ">
      <div className="bg-slate-300 rounded border-b border-slate-400">
        <div className="flex justify-between items-center p-1 pb-0">
          <p className="flex-1 text-center text-xl font-bold">
            {boards.title}
            <span className="text-gray-500 text-base">
              {" "}
              {boards.cards.length}
            </span>
          </p>
          <div
            className="relative hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <BsThreeDotsVertical />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="board_dorpdown bg-white border rounded-md shadow-lg w-32">
                  <p
                    className="text-center rounded-md hover:bg-slate-400 hover:text-white cursor-pointer"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/view-board/${boards.id}`);
                    }}
                  >
                    View Board
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>

        <div
          className="bg-slate-50 h-[calc(100vh-175px)] rounded-md p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-100"
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

export default Board;
