import React, { useState } from "react";
import Chip from "./Chip";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import Dropdown from "./Dropdown";
import AdminJobCard from "../AdminJobCard";
// import CardInfo from "./CardInfo";

const KanbanCard = ({ card, boardId, removeCard, handleDragEnd, handleDragEnter }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="p-4 mb-1 border rounded-md bg-white flex flex-col group hover:shadow-md transition" 
    draggable 
    onDragEnd={()=>handleDragEnd(card?.id, boardId)} 
    onDragEnter={()=>handleDragEnter(card?.id, boardId)} 
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



// import React, { useState } from "react";
// import Chip from "./Chip";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaRegClock, FaRegCheckSquare } from "react-icons/fa";
// import Dropdown from "./Dropdown";
// // import CardInfo from "./CardInfo"; // You can re-enable if you want full card details

// const KanbanCard = ({ card, boardId, removeCard, handleDragEnd, handleDragEnter }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div
//       className="p-4 mb-2 border rounded-md bg-white flex flex-col group hover:shadow-md transition"
//       draggable
//       onDragEnd={() => handleDragEnd(card?.id, boardId)}
//       onDragEnter={() => handleDragEnter(card?.id, boardId)}
//     >
//       {/* Top: Labels and Menu */}
//       <div className="flex justify-between items-start">
//         <div className="flex flex-wrap gap-2">
//           {card.labels.map((label, index) => (
//             <Chip key={index} text={label.text} color={label.color} />
//           ))}
//         </div>

//         <div
//           className="relative"
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowDropdown(true);
//           }}
//         >
//           <BsThreeDotsVertical
//             className={`cursor-pointer transition-opacity ${
//               showDropdown ? "opacity-100" : "opacity-0 group-hover:opacity-100"
//             }`}
//           />

//           {showDropdown && (
//             <Dropdown onClose={() => setShowDropdown(false)}>
//               <div className="bg-white border rounded-md shadow-lg w-32">
//                 <p
//                   className="text-center p-2 hover:bg-slate-400 hover:text-white rounded-md cursor-pointer"
//                   onClick={() => removeCard(card.id, boardId)}
//                 >
//                   Delete Card
//                 </p>
//               </div>
//             </Dropdown>
//           )}
//         </div>
//       </div>

//       {/* Title */}
//       <div className="font-bold mt-2">{card.title}</div>

//       {/* Card ID (for Debugging or Tracking) */}
//       <div className="text-xs text-gray-500 font-semibold">ID: {card.id}</div>

//       {/* Footer: Date and Task Info */}
//       <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
//         <p className="flex items-center gap-2">
//           <FaRegClock /> {card.date || "No date"}
//         </p>
//         <p className="flex items-center gap-2">
//           <FaRegCheckSquare /> 1/4
//         </p>
//       </div>
//     </div>
//   );
// };

// export default KanbanCard;

