import React, { useEffect, useState } from "react";
import JobCategory from "../../helpers/JobCategory";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";

const Job_Details = ({ onChange = () => {}, initialData = {} }) => {
  const defaultData = {
    jobName: "",
    jobCardId: "",
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
    // sampleImage: databaseImage || null, // Use databaseImage if available
  };
  const [previewFile, setPreviewFile] = useState(null); // For preview modal

  const [data, setData] = useState({ ...defaultData, ...initialData });

  useEffect(() => {
    setData({ ...defaultData, ...initialData }); // Merge defaults with received data
  }, [initialData]);

  useEffect(() => {
    if (data.sampleImage) {
      // const objectURL = URL.createObjectURL(data.sampleImage);
      const objectURL = data.sampleImage;
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

  // -----------------------

  const handlePreviewFile = () => {
    if (data.sampleImage && data.sampleImage instanceof Blob) {
      // setPreviewFile(URL.createObjectURL(data.sampleImage));
      setPreviewFile(data.sampleImage);
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
                className="p-1 bg-slate-50 border text-sm rounded col-span-3"
                required
              />

              {/* Job Id */}
              <label
                htmlFor="jobCardId"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Job Card Id:
              </label>
              <input
                type="text"
                id="jobCardId"
                name="jobCardId"
                placeholder="Enter Job Name"
                value={data.jobCardId || " "}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
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
                      src={data.sampleImage}
                      className="w-full h-full border-none"
                      style={{ minHeight: "100%", minWidth: "100%" }}
                    />
                  ) : data?.sampleImage?.type?.startsWith("image/") ? (
                    <img
                      // src={URL.createObjectURL(data.sampleImage)}
                      src={data.sampleImage}
                      alt="Uploaded Preview"
                      className="w-full h-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl">📄</span>
                      <p className="text-sm mt-2">{data.sampleImage.name}</p>
                      <a
                        // href={URL.createObjectURL(data.sampleImage)}
                        src={data.sampleImage}
                        download={data.sampleImage.name}
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
