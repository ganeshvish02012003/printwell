import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { FaDownload } from "react-icons/fa";

const Composing_Details = ({ onChange = () => {}, initialData = {} }) => {
  const defaultData = {
    jobName: "",
    category: "",
    quantity: 1,
    description: "",
    proofs: [{ id: 1, status: null }],
    finalImage: null,
  };


  const [previewFile, setPreviewFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({ ...defaultData, ...initialData });
  const [viewMode, setViewMode] = useState("fit");

  useEffect(() => {
    setData({ ...defaultData, ...initialData });
  }, [initialData]);

  useEffect(() => {
    if (data.finalImage) {
      const objectURL =
        data.finalImage instanceof Blob
          ? URL.createObjectURL(data.finalImage)
          : data.finalImage;

      setPreviewFile(objectURL);

      return () => {
        if (data.finalImage instanceof Blob) {
          URL.revokeObjectURL(objectURL);
        }
      };
    } else {
      setPreviewFile(null);
    }
  }, [data.finalImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    onChange(updatedData);
  };

  const handleUploadJob = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedData = { ...data, finalImage: file };
    setData(updatedData);
    onChange(updatedData);
  };

  const handleDeleteFile = () => {
    setData({ ...data, finalImage: null });
    onChange({ ...data, finalImage: null });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDownloadFile = () => {
    if (!previewFile) return;

    const link = document.createElement("a");
    link.href = previewFile;
    link.target = "_blank"; // Open in new tab
    link.rel = "noopener noreferrer"; // For security best practices
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const handleStatusChange = (index, status) => {
  //   const updatedProofs = (data.proofs ?? []).map((proof, index) =>
  //     i === index ? { ...proof, status } : proof
  //   );
  //   setData((prev) => ({ ...prev, proofs: updatedProofs }));
  //   if (onChange) {
  //     onChange({ ...data, proofs: updatedProofs });
  //   }
  // };

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
                value={data.jobName ||""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Mobile_number"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                WhatApp No. :
              </label>
              <input
                type="text"
                id="Mobile_number"
                name="Mobile_number"
                placeholder="WhatApp for Proof"
                value={data.Mobile_number || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
                required
              />
            </div>
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Mobile_number"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Email :
              </label>
              <input
                type="text"
                id="Mobile_number"
                name="Mobile_number"
                placeholder="Mail for Proof"
                value={data.Mobile_number || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
                required
              />
            </div>


            <div className="grid grid-cols-6 mb-2">
              <h2 className="col-span-1 pl-1 text-sm flex items-start">
                Proof Check 
              </h2>
              {/* <div className="p-2 text-sm border rounded col-span-5">
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
              </div> */}
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

        {/* final image */}
        <div className="w-1/4 px-2 pt-1">
        <label htmlFor="sampleFile" className="block">
        Final File
        </label>
        <input
          type="file"
          id="sampleFile"
          accept="image/*,application/pdf"
          onChange={handleUploadJob}
          className="hidden"
        />
        <div
          className="p-2 bg-slate-100 border rounded h-64 w-full flex justify-center items-center cursor-pointer overflow-hidden relative"
          onClick={() => document.getElementById("sampleFile").click()}
        >
          {previewFile ? (
            <>
              {previewFile.endsWith(".pdf") ? (
                <iframe
                  src={previewFile}
                  className="h-full w-full object-contain "
                  title="PDF preview"
                />
              ) : (
                <img
                  src={previewFile}
                  alt="Sample Preview"
                  className="object-contain max-h-full max-w-full"
                />
              )}
              <div className="absolute top-1 right-1 flex space-x-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent file input from opening
                    handleDownloadFile();
                  }}
                  className="bg-white p-1 rounded shadow hover:bg-green-200"
                  title="Download"
                >
                  <FaDownload size={16} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // <-- prevent file input from opening
                    openModal();
                  }}
                  className="bg-white p-1 rounded shadow hover:bg-slate-200"
                  title="Preview"
                >
                  <FaEye size={16} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // <-- prevent file input from opening
                    handleDeleteFile();
                  }}
                  className="bg-white p-1 rounded shadow hover:bg-red-200"
                  title="Delete"
                >
                  <MdDeleteForever size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-slate-500 flex flex-col items-center gap-2">
              <span className="text-4xl">📤</span>
              <p>Upload Image or PDF</p>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Preview Section */}
     

      {/* Fullscreen Modal Preview */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-slate-300 relative rounded-lg overflow-y-auto max-w-screen-xl  w-full h-screen ">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-400 hover:text-red-500"
            >
              <IoMdCloseCircle size={24} />
            </button>

            <div className="flex justify-center items-center h-full p-4">
              {previewFile?.endsWith(".pdf") ? (
                <iframe
                  src={previewFile}
                  className=" w-full h-full"
                  title="PDF preview"
                />
              ) : (
                <img
                  src={previewFile}
                  alt="Zoomed Preview"
                  onDoubleClick={() =>
                    setViewMode(viewMode === "fit" ? "max" : "fit")
                  }
                  className={`cursor-zoom-in   ${
                    viewMode === "fit"
                      ? "max-h-full max-w-full object-contain"
                      : "w-auto h-auto object-none mt-[80%] py-10"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Composing_Details;
