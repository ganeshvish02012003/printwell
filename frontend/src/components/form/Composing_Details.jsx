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
                      // src={URL.createObjectURL(data.finalImage)}
                      className="w-full h-full border-none"
                      style={{ minHeight: "100%", minWidth: "100%" }}
                    />
                  // ) : data.finalImage.type.startsWith("image/") ? (
                  //   <img
                  //     // src={URL.createObjectURL(data.finalImage)}
                  //     alt="Uploaded Preview"
                  //     className="w-full h-full object-contain rounded"
                  //   />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl">📄</span>
                      <p className="text-sm mt-2">{data.finalImage.name}</p>
                      <a
                        // href={URL.createObjectURL(data.finalImage)}
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
                {/* <div className="relative ">
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
                </div> */}
              </div>
            </div>
          )}

     
        </div>
      </div>
    </div>
  );
};

export default Composing_Details;
