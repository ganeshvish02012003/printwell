import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const Editable = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(inputValue);
    setShowEdit(false);
    setInputValue("");
  };

  return (
    <div className="editable rounded-md">
      {showEdit ? (
        <form className="bg-slate-200 rounded-lg p-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            placeholder={props.placeholder || "Enter text"}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-1 rounded w-full"
          />
          <div className="flex justify-between pt-2">
            <button type="submit" className="bg-blue-500  px-2 py-1 rounded">
              {props.buttonText || "Add"}
            </button>
            <div className="text-3xl rounded-full flex justify-center items-center hover:bg-red-400">
              <IoIosClose
                className="cursor-pointer text-red-500 hover:text-white "
                onClick={() => setShowEdit(false)}
              />
            </div>
          </div>
        </form>
      ) : (
        <p
          onClick={() => setShowEdit(true)}
          className="cursor-pointer bg-slate-200 rounded-lg p-2 hover:bg-slate-300"
        >
          {props.text || "Add card"}
        </p>
      )}
    </div>
  );
};

export default Editable;
