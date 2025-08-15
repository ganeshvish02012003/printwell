import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { FaDownload } from "react-icons/fa";
import CustomSizeModal from "../../helpers/CustomSizeModal"; // adjust path

const Job_Details = ({
  onChange = () => {},
  initialData = {},
  jobCategories = [],
}) => {
  const defaultData = {
    jobName: "",
    jobCardId: "",
    jobStatus: "",
    priority: "",
    category: "",
    quantity: "",
    jobSize: "",
    customWidth: "",
    customHeight: "",
    unit: "mm",
    binding_type: "",
    paper_GSM: "",
    Machine_name: "",
    pages: "1",
    color: "singleColor",
    ink: "black",
    paperName: "",
    paperColor: "White",
    job_description: "",
    sampleImage: null,
    PrintingSide: "SingleSide",
    When_to_give_goods: "",
    Time_of_give_goods: "",
  };

  const [previewFile, setPreviewFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({ ...defaultData, ...initialData });
  const [viewMode, setViewMode] = useState("fit");
  const [showCustomSizeModal, setShowCustomSizeModal] = useState(false);

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

    if (name === "jobSize" && value === "Custom") {
      setShowCustomSizeModal(true); // show modal
    }

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

  const handleConfirm = () => {
    setShowCustomSizeModal(false);
    setData((prev) => ({
      ...prev,
      jobSize: "Custom",
    }));
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
                placeholder="Enter Job Name"
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-4"
                required
              />

              <input
                type="number"
                id="jobCardId"
                name="jobCardId"
                value={data.jobCardId || ""}
                onChange={handleInputChange}
                placeholder="Job Id"
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
                disabled
              />
            </div>

            {/* Job Category */}
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
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {jobCategories.map((el, index) => (
                  <option value={el.value} key={el._id || index}>
                    {el.label}
                  </option>
                ))}
              </select>

              <label
                htmlFor="binding_type"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Binding Type
              </label>
              <select
                name="binding_type"
                id="binding_type"
                value={data.binding_type || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="" disabled>
                  Select Binding Type
                </option>
                <option value="Saddle Stitching">Saddle Stitching</option>
                <option value="Perfect Binding">Perfect Binding</option>
                <option value="Hard Cover">Hard Cover (Case Binding)</option>
                <option value="Spiral Binding">Spiral Binding</option>
                <option value="Wiro Binding">Wiro Binding</option>
                <option value="Section Sewn">Section Sewn (Smyth Sewn)</option>
                <option value="Center Pin">Center Pin / Center Stitch</option>
                <option value="Comb Binding">Comb Binding</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="quantity"
                className="col-span-1 text-sm pl-1  flex items-center"
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
                required
              />

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

            {/* Job Size & Pages */}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="jobSize"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Job Size
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

                {/* 📏 ISO Standard Sizes */}
                <option value="A6">A6 (105 × 148 mm)</option>
                <option value="A5">A5 (148 × 210 mm)</option>
                <option value="A4">A4 (210 × 297 mm)</option>
                <option value="A3">A3 (297 × 420 mm)</option>
                <option value="A2">A2 (420 × 594 mm)</option>
                <option value="A1">A1 (594 × 841 mm)</option>
                <option value="A0">A0 (841 × 1189 mm)</option>

                {/* 🧾 Demy / Indian Paper Sizes */}
                <option value="Demy 1/8">Demy 1/8 (5.5" × 8.5")</option>
                <option value="Demy 1/4">Demy 1/4 (8.5" × 11")</option>
                <option value="Demy 1/2">Demy 1/2 (11" × 17")</option>

                {/* 🖨️ Commercial Printing Sizes */}
                <option value="8.5x11 inch">8.5 × 11 inch (Letter)</option>
                <option value="11x17 inch">11 × 17 inch (Tabloid)</option>
                <option value="12x18 inch">12 × 18 inch</option>
                <option value="13x19 inch">13 × 19 inch</option>
                <option value="17x22 inch">17 × 22 inch</option>
                <option value="19x25 inch">
                  19 × 25 inch (Offset sheet size)
                </option>
                <option value="23x36 inch">23 × 36 inch</option>
                <option value="25x38 inch">25 × 38 inch</option>
                <option value="SRA3">SRA3 (320 × 450 mm)</option>

                {/* 🖼️ Custom */}

                {data.jobSize === "Custom" &&
                  data.customWidth &&
                  data.customHeight && (
                    <option value="Custom">
                      Custom Size ({data.customWidth} × {data.customHeight}{" "}
                      {data.unit})
                    </option>
                  )}
                <option value="Custom">🛠️ Custom Size</option>
              </select>

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

            {/* Paper & Paper GSM*/}
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
                  Select Paper Type
                </option>
                <option value="Maplitho">Maplitho</option>
                <option value="Art Paper (Gloss)">Art Paper (Gloss)</option>
                <option value="Art Paper (Matt)">Art Paper (Matt)</option>
                <option value="Bond Paper">Bond Paper</option>
                <option value="Kraft Paper">Kraft Paper</option>
                <option value="Ivory / Bristol Board">
                  Ivory / Bristol Board
                </option>
                <option value="Duplex Board">Duplex Board</option>
                <option value="Chrome Paper">Chrome Paper</option>
                <option value="Art Card">Art Card</option>
                <option value="Newsprint">Newsprint</option>
              </select>

              <label
                htmlFor="paper_GSM"
                className="col-span-1 text-sm pl-1 ml-2 flex items-center font-normal "
              >
                Paper GSM
              </label>
              <input
                type="number"
                id="paper_GSM"
                name="paper_GSM"
                placeholder="GSM (Grams per Square Meter)"
                value={data.paper_GSM}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            {/* Machine & Paper Color*/}
            <div className="grid grid-cols-6 mb-2">
              <label
                htmlFor="Machine_name"
                className="col-span-1 text-sm pl-1  flex items-center font-normal"
              >
                Printer
              </label>
              <select
                name="Machine_name"
                id="Machine_name"
                value={data.Machine_name}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >
                <option value="" disabled>
                  Select Printer
                </option>
                <option value="Print_outside">Print outside</option>
                <option value="SWIFT_1">SWIFT 1</option>
                <option value="SWIFT_2">SWIFT 2</option>
                <option value="SWIFT_3">SWIFT 3</option>
                <option value="SAHIL">SAHIL</option>
                <option value="RULLING">RULLING</option>
                <option value="SCREEN">SCREEN</option>
                <option value="RISO">RISO</option>
                <option value="RISO_COM_COLOR">RISO COM COLOR</option>
                <option value="KONICA_MINOLTA">KONICA MINOLTA</option>
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

            {/* Delivery Date and time */}
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="When_to_give_goods"
                className="col-span-1 text-sm  pl-1  flex items-center font-normal "
              >
                Delivery Date
              </label>
              <input
                type="date"
                id="When_to_give_goods"
                name="When_to_give_goods"
                placeholder="Delivery Date"
                value={data.When_to_give_goods}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded px-0 col-span-1 "
              />
              <input
                type="time"
                id="Time_of_give_goods"
                name="Time_of_give_goods"
                placeholder="Delivery Time"
                value={data.Time_of_give_goods}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1 "
              />

              <label
                htmlFor="priority"
                className="col-span-1 text-sm pl-1 flex items-center"
              >
                Priority:
              </label>
              <select
                name="priority"
                id="priority"
                value={data.priority || "Medium"}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              >

                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
                <option value="block_away">block away</option>
              </select>
            </div>

            {/* Job Description */}
            <div className="grid grid-cols-6 ">
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
                rows={1}
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

      {/* show CustomSize Modal */}
      <CustomSizeModal
        isOpen={showCustomSizeModal}
        onClose={() => setShowCustomSizeModal(false)}
        onConfirm={handleConfirm}
        width={data.customWidth}
        height={data.customHeight}
        unit={data.unit}
        onChange={handleInputChange}
      />

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
