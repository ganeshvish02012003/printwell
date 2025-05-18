import React, { useEffect, useState } from "react";
import JobCategory from "../../helpers/JobCategory";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { FaDownload } from "react-icons/fa";

const Job_Details = ({ onChange = () => {}, initialData = {} }) => {
  const defaultData = {
    jobName: "",
    jobCardId: "",
    jobStatus: "",
    category: "",
    quantity: "",
    jobSize: "A4",
    pages: "",
    color: "",
    ink: "",
    paperName: "",
    paperColor: "White",
    job_description: "",
    sampleImage: null,
  };

  const [previewFile, setPreviewFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({ ...defaultData, ...initialData });
  const [viewMode, setViewMode] = useState("fit");

  useEffect(() => {
    setData({ ...defaultData, ...initialData });
  }, [initialData]);

  useEffect(() => {
    if (data.sampleImage) {
      const objectURL =
        data.sampleImage instanceof Blob
          ? URL.createObjectURL(data.sampleImage)
          : data.sampleImage;

      setPreviewFile(objectURL);

      return () => {
        if (data.sampleImage instanceof Blob) {
          URL.revokeObjectURL(objectURL);
        }
      };
    } else {
      setPreviewFile(null);
    }
  }, [data.sampleImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...data, [name]: value };

    if (name === "color") {
      if (value === "MultiColor") {
        updatedData.ink = "multi";
      } else if (value === "singleColor") {
        updatedData.ink = "black";
      }
    }

    setData(updatedData);
    onChange(updatedData);
  };

  const handleUploadJob = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedData = { ...data, sampleImage: file };
    setData(updatedData);
    onChange(updatedData);
  };

  const handleDeleteFile = () => {
    setData({ ...data, sampleImage: null });
    onChange({ ...data, sampleImage: null });
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

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Job Details
      </p>
      <div className="flex">
        <div className="w-3/4 p-2">
          <div className="rounded-xl">
            {/* Job Name */}
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
                value={data.jobName || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-4"
              />
              
              <input
                type="text"
                id="jobStatus"
                name="jobStatus"
                value={data.jobStatus || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              />
            </div>

             {/* Job Name */}
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
                value={data.category || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-3"
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
                Job No:
              </label>
              <input
                type="number"
                id="jobCardId"
                name="jobCardId"
                value={data.jobCardId || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              />
              
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="PrintingSide"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Print side:
              </label>
              <select
                name="PrintingSide"
                id="PrintingSide"
                value={data.PrintingSide || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="SingleSide">Single side</option>  
                <option value="BothSide">Both side</option>

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
                value={data.quantity || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            {/* Job Size & Pages */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="jobSize"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Job Size:
              </label>
              <select
                name="jobSize"
                id="jobSize"
                value={data.jobSize || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
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
                className="col-span-1 text-sm pl-1 ml-2 flex items-center"
              >
                No. of Pages:
              </label>
              <input
                type="number"
                id="pages"
                name="pages"
                value={data.pages || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            {/* Color & Ink */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="color"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Color:
              </label>
              <select
                name="color"
                id="color"
                value={data.color || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="singleColor">Single Color</option>
                <option value="MultiColor">Multi Color</option>
              </select>

              <label
                htmlFor="ink"
                className="col-span-1 text-sm pl-1 mx-8 flex items-center"
              >
                Ink:
              </label>
              <select
                name="ink"
                id="ink"
                value={data.ink || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                disabled={data.color === "MultiColor"}
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

            {/* Paper & Description */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="paperName"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Paper Name:
              </label>
              <select
                name="paperName"
                id="paperName"
                value={data.paperName || ""}
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
                className="col-span-1 text-sm pl-1 ml-2 flex items-center"
              >
                Paper Color:
              </label>
              <select
                name="paperColor"
                id="paperColor"
                value={data.paperColor || ""}
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

            {/* Job Description */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="job_description"
                className="col-span-1 text-sm pl-1 flex items-start"
              >
                Description:
              </label>
              <textarea
                name="job_description"
                id="job_description"
                value={data.job_description || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-5"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/4 px-2 pt-1">
          <label htmlFor="sampleFile" className="block">
            Sample File:
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

export default Job_Details;
