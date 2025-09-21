import React from "react";

const LineLoading = () => {
  const loaderStyle = {
    height: "4px",
    width: "calc(100vw - 18px)",
    background: `no-repeat linear-gradient(#94a3b8 0 0), no-repeat linear-gradient(#94a3b8 0 0), white`,
    backgroundSize: "60% 100%",
    animation: "l16 1s infinite",
    position: "fixed",
    top: 68,
    left: 9,
    zIndex: 9999,
  };
  return (
    <div className="z-50 flex px-2 justify-center ">
      <style>
        {`
          @keyframes l16 {
            0%   {background-position: -150% 0, -150% 0}
            66%  {background-position: 250% 0, -150% 0}
            100% {background-position: 250% 0, 250% 0}
          }
        `}
      </style>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default LineLoading;
