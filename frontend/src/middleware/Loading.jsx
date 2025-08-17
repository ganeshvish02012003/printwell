// import React from 'react'

// const Loading = () => {
//   return (
//     // <div className="flex justify-center items-center space-x-1">
//     //   <div className="w-2 h-6 bg-blue-500 animate-pulse"></div>
//     //   <div className="w-2 h-6 bg-green-500 animate-pulse [animation-delay:-0.2s]"></div>
//     //   <div className="w-2 h-6 bg-red-500 animate-pulse [animation-delay:-0.4s]"></div>
//     // </div>
//     //  <div className="flex justify-center items-center space-x-4">
//     //   <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
//     //   <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
//     //   <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
//     // </div>
//     //  <div className="flex justify-center items-center h-full w-full">
//     //   <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//     // </div>
//      <div className="flex justify-center items-center">
//       <div className="w-20 h-20 border-8 border-white border-t-slate-800 rounded-full animate-spin"></div>
//     </div>
//   );
// };




// export default Loading


import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        style={{
          width: "60px",
          aspectRatio: "1",
          borderRadius: "50%",
          background: `
            radial-gradient(farthest-side,#ffffff 94%,#0000) top/10px 10px no-repeat,
            conic-gradient(#0000 30%,#1e293b)
          `,
          WebkitMask: "radial-gradient(farthest-side,#0000 calc(100% - 10px),#000 0)",
          animation: "spinLoader 1s infinite linear",
        }}
      ></div>

      {/* Keyframes in inline style */}
      <style>{`
        @keyframes spinLoader {
          100% { transform: rotate(1turn); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
