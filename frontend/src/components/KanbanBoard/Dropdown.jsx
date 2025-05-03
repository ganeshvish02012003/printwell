import React, { useEffect, useRef } from "react";

const Dropdown = (props) => {
  const dropdownRef = useRef();
  const handleClick = (e) => {
    if (dropdownRef && !dropdownRef.current.contains(e.target)) {
      if (props.onClose) props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className="dropdown absolute top-full right-0" ref={dropdownRef}>
      {props.children}
    </div>
  );
};

export default Dropdown;
