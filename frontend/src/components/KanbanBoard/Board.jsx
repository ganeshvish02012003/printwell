import React, { useState } from "react";
import KanbanCard from "./KanbanCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import Editable from "./Editable";
import { IoMdArrowDropdown } from "react-icons/io";
import Dropdown from "./Dropdown";

const Board = ({
  boards,
  removeBoard,
  addCard,
  removeCard,
  handleDragEnd,
  handleDragEnter,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="min-w-[290px] ">
      <div className="bg-slate-50 rounded border-b border-slate-400">
        <div className="flex justify-between items-center p-1 px-4 ">
          <p className="  flex-1 text-center  text-xl font-bold  ">
            {boards.title}

            <span className="text-gray-500 text-base">
              {" "}
              {boards.cards.length}
            </span>
          </p>
          <div
            className="relative hover:cursor-pointer  "
            onClick={(e) => {
              e.stopPropagation(); // Prevent bubbling
              setShowDropdown(true);
            }}
          >
            <BsThreeDotsVertical />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="board_dorpdown bg-white border rounded-md shadow-lg  w-32 ">
                  <p
                    className="text-center rounded-md  hover:bg-slate-400 hover:text-white "
                    onClick={() => removeBoard(boards.id)}
                  >
                    delete board
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div
          className=" bg-slate-50 h-[calc(100vh-255px)] rounded-md p-2 overflow-y-scroll"
          onDragEnter={() => handleDragEnter(null, boards.id)}
        >
          {boards.cards.map((card, index) => {
            return (
              <KanbanCard
                key={card.id}
                card={card}
                boardId={boards.id}
                removeCard={removeCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
              />
            );
          })}

          {/* <Editable onSubmit={(value) => addCard(value, boards.id)} /> */}
        </div>
      </div>
    </div>
  );
};

export default Board;
