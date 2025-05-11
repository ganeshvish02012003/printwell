import React, { useEffect, useState } from "react";
import JobCategory from "../../helpers/JobCategory";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";


const Job_Details = ({ onChange = () => {}, initialData = {} }) => {
  const defaultData = {
    jobName: "",
    category: "",
    quantity: "",
    jobSize: "A4",
    pages: "",
    color: "singleColor",
    ink: "Black",
    paperName: "",
    paperColor: "White",
    job_description: "",
    sampleImage: null,
  };
  const [previewFile, setPreviewFile] = useState(null); // For preview modal

  const [data, setData] = useState({ ...defaultData, ...initialData });

  useEffect(() => {
    setData({ ...defaultData, ...initialData }); // Merge defaults with received data
  }, [initialData]);

  // useEffect(() => {
  //   // Clean up the object URL when the previewFile is changed
  //   return () => {
  //     if (previewFile) {
  //       URL.revokeObjectURL(previewFile);
  //     }
      
  //   };
  // }, [previewFile]);

  useEffect(() => {
    if (data.sampleImage) {
      // const objectURL = URL.createObjectURL(data.sampleImage);
      const objectURL = (data.sampleImage);
      setPreviewFile(objectURL);
  
      // return () => URL.revokeObjectURL(objectURL); // Cleanup function
    }
  }, [data.sampleImage]);




  //-------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    onChange(updatedData);
  };

 //-------------------------------
  // const handleUploadJob = (e) => {
  //   const file = e.target.files[0];
  //   setData((prev) => ({ ...prev, sampleImage: file }));
  //   if (onChange) {
  //     onChange({ ...data, sampleImage: file });
  //   }
  // };
  
  //----------------------
  const handleUploadJob = (e) => {
    const file = e.target.files[0];
    setData((prev) => {
      const updatedData = { ...prev, sampleImage: file };
      if (onChange) {
        onChange(updatedData);
      }
      return updatedData;
    });
  };

  //----------------------

  const handleDeleteFile = () => {
    setData({ ...data, sampleImage: null });
  };



    //----------------------

  // const handlePreviewFile = () => {
  //   if (data.sampleImage) {
  //     setPreviewFile(URL.createObjectURL(data.sampleImage));
  //   }
    
  // };



  const handlePreviewFile = () => {
    if (data.sampleImage && data.sampleImage instanceof Blob) {
      // setPreviewFile(URL.createObjectURL(data.sampleImage));
      setPreviewFile((data.sampleImage));
    }
  };
  console.log("Sample Image Data:", data.sampleImage);

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Job Details
      </p>
      <div className="flex">
        <div className="w-3/4 p-2">
          <div className="rounded-xl">
            {/* Job Name */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="jobName"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Job Name:
              </label>
              <input
                type="text"
                id="jobName"
                name="jobName"
                placeholder="Enter Job Name"
                value={data.jobName || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
                required
              />
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="category"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Category:
              </label>
              <select
                name="category"
                id="category"
                value={data.category || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {JobCategory.map((el, index) => (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                ))}
              </select>

              <label
                htmlFor="quantity"
                className="col-span-1 text-sm pl-1 mx-4 flex items-center font-normal"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter Quantity"
                value={data.quantity || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              />
            </div>

            {/* Job Size & Number of Pages */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="jobSize"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Job Size:
              </label>
              <select
                name="jobSize"
                id="jobSize"
                value={data.jobSize || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              >
                <option value="" disabled>
                  Select Job Size
                </option>
                <option value="A5">A5</option>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="demi1/8">Demi 1/8</option>
                <option value="demi1/4">Demi 1/4</option>
                <option value="demi1/2">Demi 1/2</option>
                <option value="12X18 inch">12X18 inch</option>
              </select>

              <label
                htmlFor="pages"
                className="col-span-1 text-sm pl-1 ml-2 flex items-center font-normal"
              >
                No. of Pages:
              </label>
              <input
                type="number"
                id="pages"
                name="pages"
                placeholder="Enter Number of Pages"
                value={data.pages || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            {/* Color & Ink */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="color"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Color:
              </label>
              <select
                name="color"
                id="color"
                value={data.color || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="singleColor">Single Color</option>
                <option value="MultiColor">Multi Color</option>
              </select>

              <label
                htmlFor="ink"
                className="col-span-1 text-sm pl-1 mx-8 flex items-center font-normal"
              >
                Ink:
              </label>
              <select
                name="ink"
                id="ink"
                value={data.ink || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"

                // disabled={formData.color === "MultiColor"}
              >
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="brown">Brown</option>
                <option value="multi" disabled>
                  Multi Color
                </option>
              </select>
            </div>

            {/* Paper Name & Color */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="paperName"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Paper Name:
              </label>
              <select
                name="paperName"
                id="paperName"
                value={data.paperName || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="" disabled>
                  Select Paper
                </option>
                <option value="Simple_paper">Simple Paper</option>
                <option value="Hanuman">Hanuman</option>
                <option value="Sirpur">Sirpur</option>
                <option value="Art">Art</option>
                <option value="Sticker">Sticker</option>
                <option value="Transparent_sticker">Transparent Sticker</option>
              </select>

              <label
                htmlFor="paperColor"
                className="col-span-1 text-sm pl-1 ml-2 flex items-center font-normal"
              >
                Paper Color:
              </label>
              <select
                name="paperColor"
                id="paperColor"
                value={data.paperColor || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Pink">Pink</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Laser">Laser</option>
              </select>
            </div>

            {/* job_description */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="job_description"
                className="col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description:
              </label>
              <textarea
                name="job_description"
                id="job_description"
                placeholder="Enter Job Description"
                value={data.job_description || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 text-sm border rounded col-span-5"
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="w-1/4 px-2 pt-1">
          <label htmlFor="sampleImage" className="mt-3 p-1 pb-2">
            Sample File:
          </label>
          <label htmlFor="sampleImage">
            <div className="p-2 bg-slate-100 border rounded h-64 w-full flex justify-center items-center cursor-pointer overflow-hidden relative">
              {data.sampleImage ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* {data.sampleImage.type === "application/pdf" ? ( */}
                  {data.sampleImage.type === "image/" ? (
                    <iframe
                      // src={URL.createObjectURL(data.sampleImage)}
                      src={(data.sampleImage)}
                      className="w-full h-full border-none"
                      style={{ minHeight: "100%", minWidth: "100%" }}
                    />
                  ) : data?.sampleImage?.type?.startsWith("image/") ? (
                    <img
                      // src={URL.createObjectURL(data.sampleImage)}
                      src={(data.sampleImage)}
                      alt="Uploaded Preview"
                      className="w-full h-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl">📄</span>
                      <p className="text-sm mt-2">{data.sampleImage.name}</p>
                      <a
                        // href={URL.createObjectURL(data.sampleImage)}
                        src={(data.sampleImage)}
                        download={data.sampleImage.name}
                        className="text-blue-500 underline mt-2 block"
                      >
                        Download File
                      </a>
                    </div>
                  )
                  }


                  {/* Preview & Delete Icons */}
                 <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      onClick={handlePreviewFile}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                    >
                      <FaEye className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteFile}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-red-200"
                    >
                      <MdDeleteForever className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">📤</span>
                  <p>Upload Final File</p>
                  <input
                    type="file"
                    id="sampleImage"
                    className="hidden"
                    accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .txt"
                    onChange={handleUploadJob}
                  />
                </div>
              )}
            </div>
          </label>

          {/* Fullscreen Preview Modal */}
          {previewFile && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center  justify-center z-50">
              <div className="w-8/12 flex justify-center">
                <button
                  onClick={() => setPreviewFile(null)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-red-200"
                >
                  <IoMdCloseCircle className="w-6 h-6 text-red-500" />
                </button>
                <div className="relative ">
                  {data?.sampleImage?.type?.startsWith("image/") ? (
                    <img
                      src={previewFile}
                      alt="Preview"
                      className=" h-screen"
                    />
                  ) : (
                    <iframe
                      src={previewFile}
                      className="w-[90vw] h-screen border-none"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

        </div>




        
      </div>
    </div>
  );
};

export default Job_Details;















import React, { useEffect, useState } from "react";
import JobCategory from "../../helpers/JobCategory";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import panzoom from "panzoom";

const Composing_Details = ({ onChange, initialData }) => {
  const [data, setData] = useState({
    jobName: "",
    category: "",
    quantity: 1,
    description: "",
    proofs: [{ id: 1, status: null }],
    finalImage: null,
  });
  const [previewFile, setPreviewFile] = useState(null); // For preview modal

  useEffect(() => {
    if (initialData) {
      setData((prev) => ({
        ...prev,
        ...initialData,
        proofs: initialData.proofs || [{ id: 1, status: null }],
      }));
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    onChange(updatedData);
  };

  const handleStatusChange = (index, status) => {
    const updatedProofs = (data.proofs ?? []).map((proof, index) =>
      i === index ? { ...proof, status } : proof
    );
    setData((prev) => ({ ...prev, proofs: updatedProofs }));
    if (onChange) {
      onChange({ ...data, proofs: updatedProofs });
    }
  };

  const handleUploadJob = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({ ...prev, finalImage: file }));

    if (onChange) {
      onChange({ ...data, finalImage: file });
    }
  };

  const handleDeleteFile = () => {
    setData({ ...data, finalImage: null });
  };

  const handlePreviewFile = () => {
    if (data.finalImage) {
      setPreviewFile(URL.createObjectURL(data.finalImage));
    }
    console.log()
  };

  useEffect(() => {
    if (previewFile && !data.finalImage.type.startsWith("image/")) {
      const elem = document.getElementById("preview-iframe");
      if (elem) {
        const instance = panzoom(elem, { minZoom: 0.5, maxZoom: 3 });
      }
    }
  }, [previewFile]);

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Composing Details
      </p>
      <div className="flex">
        <div className="w-3/4 p-2">
          <div className="rounded-xl">
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="jobName"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Job Name:
              </label>
              <input
                type="text"
                id="jobName"
                name="jobName"
                placeholder="Job Name"
                value={data.jobName}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
              />
            </div>

            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="category"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Category:
              </label>
              <select
                name="category"
                id="category"
                value={data.category}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {JobCategory.map((el, index) => (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                ))}
              </select>

              <label
                htmlFor="quantity"
                className="col-span-1 text-sm pl-1 mx-4 flex items-center"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter Quantity"
                value={data.quantity}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            <div className="grid grid-cols-6 mb-2">
              <h2 className="col-span-1 pl-1 text-sm flex items-start">
                Proof Check (Client Approval)
              </h2>
              <div className="p-2 text-sm border rounded col-span-5">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
                  {data.proofs.map((proof, index) => (
                    <button
                      key={proof.id}
                      onClick={() =>
                        handleStatusChange(
                          index,
                          proof.status === "rejected" ? null : "rejected"
                        )
                      }
                      onDoubleClick={() =>
                        handleStatusChange(index, "approved")
                      }
                      className="p-1 rounded-md text-sm"
                    >
                      <div
                        className={`h-14 rounded-md transition-all duration-300 ${
                          proof.status === "approved"
                            ? "bg-green-500"
                            : proof.status === "rejected"
                            ? "bg-red-500"
                            : "bg-slate-50"
                        }`}
                      >
                        <p className="text-sm p-1 pb-0 font-medium">
                          Proof {index + 1}
                        </p>
                        <div className="flex justify-center text-xl">
                          {proof.status === "approved"
                            ? "✅"
                            : proof.status === "rejected"
                            ? "❌"
                            : ""}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="description"
                className="col-span-1 pl-1 text-sm flex items-start"
              >
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter Composing Description"
                value={data.description}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 text-sm border rounded col-span-5"
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="w-1/4 px-2 pt-1">
          <label htmlFor="finalImage" className="mt-3 p-1 pb-2">
            Final File:
          </label>
          <label htmlFor="finalImage">
            <div className="p-2 bg-slate-100 border rounded h-64 w-full flex justify-center items-center cursor-pointer overflow-hidden relative">
              {data.finalImage ? (
                <div  className="w-full h-full flex items-center justify-center relative">
                  {data.finalImage.type === "application/pdf" ? (
                    <iframe
                      src={URL.createObjectURL(data.finalImage)}
                      className="w-full h-full border-none"
                      style={{ minHeight: "100%", minWidth: "100%" }}
                    />
                  ) : data.finalImage.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(data.finalImage)}
                      alt="Uploaded Preview"
                      className="w-full h-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl">📄</span>
                      <p className="text-sm mt-2">{data.finalImage.name}</p>
                      <a
                        href={URL.createObjectURL(data.finalImage)}
                        download={data.finalImage.name}
                        className="text-blue-500 underline mt-2 block"
                      >
                        Download File
                      </a>
                    </div>
                  )}

                  {/* Preview & Delete Icons */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                    type="button" 
                      onClick={handlePreviewFile}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                    >
                      <FaEye className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                    type="button" 
                      onClick={handleDeleteFile}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-red-200"
                    >
                      <MdDeleteForever className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">📤</span>
                  <p>Upload Final File</p>
                  <input
                    type="file"
                    id="finalImage"
                    className="hidden"
                    accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .txt"
                    onChange={handleUploadJob}
                  />
                </div>
              )}
            </div>
          </label>

          {/* Fullscreen Preview Modal */}
          {previewFile && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center  justify-center z-50">
              <div className="w-8/12 flex justify-center">
                <button
                  onClick={() => setPreviewFile(null)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-red-200"
                >
                  <IoMdCloseCircle className="w-6 h-6 text-red-500" />
                </button>
                <div className="relative ">
                  {data.finalImage.type.startsWith("image/") ? (
                    <img
                      src={previewFile}
                      alt="Preview"
                      className=" h-screen"
                    />
                  ) : (
                    <iframe
                      src={previewFile}
                      className="w-[90vw] h-screen border-none"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

     
        </div>
      </div>
    </div>
  );
};

export default Composing_Details;




















// import React, { useState, useEffect, useRef } from "react";
// import Sortable from "sortablejs";

// const Home = () => {
//   const [orders, setOrders] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [newOrder, setNewOrder] = useState({
//     clientName: "",
//     orderDetails: "",
//     deliveryDate: "",
//   });

//   const columnsRef = useRef({});

//   useEffect(() => {
//     ["design", "printing", "ready-for-delivery","hold", "on-hold"].forEach((status) => {
//       if (columnsRef.current[status]) {
//         const sortable = new Sortable(columnsRef.current[status], {
//           group: "orders",
//           animation: 150,
//           onEnd: (evt) => {
//             const draggedOrderId = evt.item.dataset.id;
//             const newStatus = evt.to.dataset.status;

//             // Ensure the dragged order exists
//             if (!orders[draggedOrderId]) return;

//             // Delay state update to prevent conflicts
//             setTimeout(() => {
//               setOrders((prev) => ({
//                 ...prev,
//                 [draggedOrderId]: { ...prev[draggedOrderId], status: newStatus },
//               }));
//             }, 0);
//           },
//         });

//         return () => {
//           sortable.destroy(); // Destroy sortable instance when component unmounts
//         };
//       }
//     });
//   }, [orders]); // Only re-run when orders change

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(true);

//   const addOrder = () => {
//     if (new Date(newOrder.deliveryDate) < new Date()) return;
//     const orderId = Math.floor(Math.random() * 1000);
//     setOrders((prev) => ({
//       ...prev,
//       [orderId]: { ...newOrder, status: "design" },
//     }));
//     setNewOrder({ clientName: "", orderDetails: "", deliveryDate: "" });
//     // handleClose();
//     handleShow()
//   };

//   return (
//     <div className="px-1">
//       <div className="bg-slate-400 h-[calc(100vh-164px)] rounded-md px-4 mx-auto p-1">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           onClick={addOrder}
//         >
//           Add Order
//         </button>

//         <div className="grid grid-cols-5 gap-1 mt-1">
//           {["design", "printing", "ready-for-delivery","hold", "on-hold"].map(
//             (status) => (
//               <div
//                 key={status}
//                 ref={(el) => (columnsRef.current[status] = el)}
//                 data-status={status}
//                 className="bg-gray-100 h-[calc(100vh-220px)] p-4 overflow-y-auto rounded-lg shadow"
//               >
//                 <h2 className="text-lg font-semibold mb-3">
//                   {status.replace("-", " ").toUpperCase()}
//                 </h2>
//                 <div>
//                   {Object.entries(orders)
//                     .filter(([_, order]) => order.status === status)
//                     .map(([id, order]) => (
//                       <div
//                         key={id}
//                         data-id={id}
//                         className="bg-white p-3 rounded-lg shadow-md mb-2"
//                       >
//                         <h5 className="font-bold">{order.clientName}</h5>
//                         <p>
//                           <strong>Delivery Date:</strong> {order.clientName}
//                           <strong>Delivery Date:</strong> {order.deliveryDate}
//                           <strong>Delivery Date:</strong> {order.deliveryDate}
//                         </p>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from "react";
import Board from "../components/KanbanBoard/Board";
import SummaryApi from "../common";
import ROLE from "../common/role";
import { useSelector } from "react-redux";
import Login from "./Login";

const Home = () => {
  const [boards, setBoards] = useState([
    {
      id: "To_Do",
      title: "To Do",
      cards: [],
    },
    {
      id: "Desgin",
      title: "Design",
      cards: [],
    },
    {
      id: "Printing",
      title: "Printing",
      cards: [],
    },
    {
      id: "Other_work",
      title: "Other Work",
      cards: [],
    },
    {
      id: "Finished",
      title: "Finished",
      cards: [],
    },
  ]);

  const [target, setTarget] = useState({ cid: "", bid: "" });
  const [cardCounter, setCardCounter] = useState(1);
  const user = useSelector((state) => state?.user?.user);

  const fetchAllJob = async () => {
    const response = await fetch(SummaryApi.allJob.url);
    const dataResponse = await response.json();
    const allJobs = dataResponse?.data || [];

    // Get current stored data
    const savedJobs = JSON.parse(localStorage.getItem("kanban_jobs")) || [];
    const savedPositions =
      JSON.parse(localStorage.getItem("kanban_card_positions")) || {};

    const isSameData =
      savedJobs.length === allJobs.length &&
      savedJobs.every((job, idx) => {
        const newJob = allJobs[idx];
        return (
          job?.job?.jobName === newJob?.job?.jobName &&
          job?.date === newJob?.date &&
          job?.desc === newJob?.desc
        );
      });

    if (!isSameData) {
      // Only update localStorage if data has changed
      localStorage.setItem("kanban_jobs", JSON.stringify(allJobs));
    }

    const tempBoards = [...boards];
    const cards = allJobs.map((job, index) => {
      const id = String(cardCounter + index).padStart(4, "0");
      const boardId = savedPositions[id] || "To_Do"; // Restore saved board or default to "To_Do"
      return {
        id,
        title: job?.job?.jobName,
        labels: [],
        tasks: [],
        date: job.date || "",
        desc: job.desc || "",
        boardId,
      };
    });

    // Clear all cards first
    tempBoards.forEach((board) => (board.cards = []));

    // Assign cards to boards based on saved boardId
    cards.forEach((card) => {
      const board = tempBoards.find((b) => b.id === card.boardId);
      if (board) board.cards.push(card);
    });

    setBoards(tempBoards);
    setCardCounter((prev) => prev + allJobs.length);
  };

  // const fetchAllJob = async () => {
  //   try {
  //     // 1. Fetch all job data
  //     const response = await fetch(SummaryApi.allJob.url);
  //     const dataResponse = await response.json();
  //     const allJobs = dataResponse?.data || [];
  
  //     // 2. Fetch card positions from backend
  //     const positionResponse = await fetch(SummaryApi.getCardPositions.url); // Add this API endpoint
  //     const positionData = await positionResponse.json();
  //     const savedPositions = positionData?.positions || {}; 
  //     // Example format: { "0001": "To_Do", "0002": "Finished" }
  
  //     // 3. Prepare a copy of boards
  //     const tempBoards = [...boards];
  
  //     // 4. Map jobs into cards
  //     const cards = allJobs.map((job, index) => {
  //       const id = String(cardCounter + index).padStart(4, "0");
  //       const boardId = savedPositions[id] || "To_Do"; // Use saved boardId or default to "To_Do"
  //       return {
  //         id,
  //         title: job?.job?.jobName,
  //         labels: [],
  //         tasks: [],
  //         date: job.date || "",
  //         desc: job.desc || "",
  //         boardId,
  //       };
  //     });
  
  //     // 5. Clear existing cards on all boards
  //     tempBoards.forEach((board) => {
  //       board.cards = [];
  //     });
  
  //     // 6. Assign each card to its corresponding board
  //     cards.forEach((card) => {
  //       const board = tempBoards.find((b) => b.id === card.boardId);
  //       if (board) {
  //         board.cards.push(card);
  //       }
  //     });
  
  //     // 7. Update state
  //     setBoards(tempBoards);
  //     setCardCounter((prev) => prev + allJobs.length);
  
  //   } catch (error) {
  //     console.error("Error fetching jobs or positions:", error);
  //   }
  // };
  

  useEffect(() => {
    fetchAllJob();
  }, []);

  // --------------------------------------------
  const addCard = (title, bid) => {
    const newId = String(cardCounter).padStart(4, "0");

    const card = {
      id: newId,
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
    setCardCounter((prev) => prev + 1);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({ cid: cid || null, bid });
  };

  const handleDragEnd = async (cid, bid) => {
    let s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    let s_cIndex = boards[s_bIndex].cards.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    let t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];
    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);

    let t_cIndex = tempBoards[t_bIndex].cards.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cIndex < 0 || target.cid === null) {
      tempBoards[t_bIndex].cards.push(tempCard);
    } else {
      tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
    }

    setBoards(tempBoards);
    setTarget({ cid: null, bid: null });

    // Save updated "kanban_jobs" (job data in To_Do board)
    const toDoBoard = tempBoards.find((b) => b.id === "To_Do");
    if (toDoBoard) {
      const jobsToSave = toDoBoard.cards.map((card) => ({
        job: { jobName: card.title },
        date: card.date,
        desc: card.desc,
      }));
      localStorage.setItem("kanban_jobs", JSON.stringify(jobsToSave));
    }

    // ✅ Save updated card positions
    const positions = {};
    tempBoards.forEach((board) => {
      board.cards.forEach((card) => {
        positions[card.id] = board.id;
      });
    });
   
    // Save updated positions to backend
    const fetchPositionData = await fetch(SummaryApi.cardPosition.url, {
      method: SummaryApi.cardPosition.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ positions }),
    });
    const PositionData = await fetchPositionData.json();

    PositionData()
      .then((res) => res.json())
      .then((data) => {
        console.log("Positions saved:", data);
      })
      .catch((error) => {
        console.error("Error saving positions:", error);
      });
  };

  

  if (!user?.role) {
    return <Login />;
  }

  return (
    <div className="h-[calc(100vh-164px)] bg-slate-400 mx-1 rounded-md px-4 flex flex-col gap-5">
      <div className="w-full border-b border-gray-300">
        {/* <h2>Kanban</h2> */}
      </div>

      <div className="flex-1 w-full overflow-x-scroll">
        <div className="min-w-fit flex gap-1">
          {boards.map((board) => (
            <Board
              key={board.id}
              boards={board}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

me चाहता हु की जब कार्ड किसी बोर्ड में ड्राप हो तो उस बोर्ड की ID कार्ड के स्टेटस में अपडेट हो जाये 
