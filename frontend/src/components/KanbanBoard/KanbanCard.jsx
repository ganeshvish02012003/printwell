import React, { useState } from "react";
import Chip from "./Chip";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import Dropdown from "./Dropdown";
import AdminJobCard from "../AdminJobCard";
// import CardInfo from "./CardInfo";

const KanbanCard = ({
  card,
  boardId,
  removeCard,
  handleDragEnd,
  handleDragEnter,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div
      className="p-4 mb-1 border rounded-md bg-white flex flex-col group hover:shadow-md transition"
      draggable
      onDragEnd={() => handleDragEnd(card?.id, boardId)}
      onDragEnter={() => handleDragEnter(card?.id, boardId)}
    >
      <div className="flex justify-between ">
        <div className="flex gap-2">
          {card.labels.map((label, index) => (
            <Chip key={index} text={label.text} color={label.color} />
          ))}
        </div>

        <div
          className="relative hover:cursor-pointer flex  "
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(true);
          }}
        >
          {/* <CardInfo/> */}
          <BsThreeDotsVertical
            className={`cursor-pointer  transition-opacity ${
              showDropdown ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className=" bg-white border rounded-md shadow-lg  w-32 ">
                <p
                  className="text-center rounded-md  hover:bg-slate-400 hover:text-white "
                  onClick={() => removeCard(card.id, boardId)}
                >
                  delete Card
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="font-bold ">{card.title}</div>
      <div className="font-bold text-red-600 ">{card.id}</div>
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-2 text-sm">
          <FaRegClock />
          {card.date || "No date"}
        </p>
        <p className=" flex items-center gap-2 text-sm">
          <FaRegCheckSquare />
          1/4
        </p>
      </div>
    </div>
  );
};

export default KanbanCard;
