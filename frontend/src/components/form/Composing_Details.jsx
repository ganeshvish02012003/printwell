import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { FaDownload } from "react-icons/fa";

const Composing_Details = ({ onChange = () => {}, initialData = {} }) => {
  const defaultData = {
    proofChecklist: {
      design: false,
      setting: false,
      typing: false,
      master: false,
      butter: false,
    },
    proofs: [{ id: 1, status: null }],
    finalDesignPath: "",
    description: "",
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedChecklist = {
      ...data.proofChecklist,
      [name]: checked,
    };
    const updatedData = {
      ...data,
      proofChecklist: updatedChecklist,
    };
    setData(updatedData);
    onChange(updatedData);
  };

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Composing Details
      </p>
      <div className="flex">
        <div className="w-3/4 p-2">
          <div className="rounded-xl">
            <div className="mb-3 grid grid-cols-6">
              <p className="text-sm  mb-1 pl-1 col-span-1">Task</p>
              <div className="col-span-5 grid grid-cols-1 md:grid-cols-3 gap-2">
                {["design", "setting", "typing", "master", "butter"].map(
                  (item) => (
                    <div
                      key={item}
                      className="bg-slate-50 rounded flex justify-between items-center p-2 py-1"
                    >
                      <label
                        htmlFor={item}
                        className="flex-1 flex justify-between"
                      >
                        <span className="px-2 text-sm font-normal">
                          {item.replace("_", " ")}
                        </span>
                        <input
                          type="checkbox"
                          name={item}
                          id={item}
                          checked={data.proofChecklist[item]}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4"
                        />
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-6 mb-2">
              <h2 className="col-span-1 pl-1 text-sm flex items-start">
                Proof Check
              </h2>
              <div className="p-2 text-sm border rounded col-span-5">
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map((num, index) => {
                    const proof = data.proofs[index] || {
                      id: num,
                      status: null,
                    };
                    const status = proof.status;

                    let color = "bg-slate-200",
                      label = "Pending";
                    if (status === "send")
                      (color = "bg-yellow-300"), (label = "Send");
                    else if (status === "modified")
                      (color = "bg-purple-400"), (label = "Modified");
                    else if (status === "approved")
                      (color = "bg-green-500"), (label = "Approved");

                    const handleClick = () => {
                      let newStatus = "send";
                      if (status === "send") newStatus = "modified";
                      const updatedProofs = [...data.proofs];
                      updatedProofs[index] = { id: num, status: newStatus };
                      setData({ ...data, proofs: updatedProofs });
                      onChange({ ...data, proofs: updatedProofs });
                    };

                    const handleDoubleClick = () => {
                      const updatedProofs = [...data.proofs];
                      const currentProof = updatedProofs[index] || {
                        id: num,
                        status: null,
                      };
                      const currentStatus = currentProof.status;

                      const newStatus =
                        currentStatus === "approved" ? null : "approved";
                      updatedProofs[index] = { id: num, status: newStatus };

                      setData({ ...data, proofs: updatedProofs });
                      onChange({ ...data, proofs: updatedProofs });
                    };

                    return (
                      <div key={num} className="relative">
                        <button
                          type="button"
                          onClick={handleClick}
                          onDoubleClick={handleDoubleClick}
                          className={`p-1 rounded-md text-sm text-white ${color} w-[80px]`}
                          title="Click once for Send, again for Correction, double-click for Approval (or reset)"
                        >
                          <div className="h-14 flex flex-col justify-center items-center rounded-md">
                            <p className="text-sm font-medium">Proof {num}</p>
                            <span className="text-xs">{label}</span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Final Design File Path */}
            <div className="grid grid-cols-6 mb-2">
              <label className="col-span-1 text-sm pl-1 flex items-center">
                Design Path:
              </label>
              <input
                type="text"
                name="finalDesignPath"
                value={data.finalDesignPath}
                placeholder="e.g., /uploads/final_design.pdf"
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
              />
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
