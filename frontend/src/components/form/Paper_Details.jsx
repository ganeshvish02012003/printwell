import React, { useEffect, useState } from "react";
import CustomSizeModal from "../../helpers/CustomSizeModal";

const Paper_Details = ({ initialData, jobData = {}, onChange }) => {
  const defaultData = {
    Paper_name: jobData.paperName || "", // ✅ Pull from jobData
    Paper_color: jobData.paperColor || "", // ✅ Pull from jobData
    paper_size: "",
    customSize: { width: "", height: "", unit: "" },
    paper_GSM: jobData.paper_GSM || "70 GSM", // ✅ Pull from jobData
    required_paper: "",
    Ordered_paper: "",
    DM_Challan_no: "",
    DM_Challan_date: "",
    Paper_description: "",
  };

  const [data, setData] = useState({ ...defaultData, ...initialData });
  const [showCustomSizeModal, setShowCustomSizeModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    if (name === "paper_size" && value.startsWith("Custom")) {
      setShowCustomSizeModal(true);
    }

    setData(updatedData);
    onChange(updatedData);
  };

  // const handleCustomSizeChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prev) => ({
  //     ...prev,
  //     customSize: {
  //       ...prev.customSize,
  //       [name.replace("custom", "").toLowerCase()]: value, // customWidth -> width
  //     },
  //   }));
  // };

  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      const newCustomSize = {
        ...prev.customSize,
        [name.replace("custom", "").toLowerCase()]: value,
      };

      return {
        ...prev,
        customSize: newCustomSize,
        paper_size: `Custom (${newCustomSize.width} × ${newCustomSize.height} ${newCustomSize.unit})`, // 👈 live update
      };
    });
  };

  const handleConfirm = () => {
    setShowCustomSizeModal(false);
    const updatedData = {
      ...data,
      paper_size: `Custom (${data.customSize.width} × ${data.customSize.height} ${data.customSize.unit})`,
    };
    setData(updatedData);
    onChange(updatedData); // ✅ send to parent for DB saving
  };


  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      Paper_name: jobData.paperName || prevData.Paper_name,
      Paper_color: jobData.paperColor || prevData.Paper_color,
      paper_GSM: jobData.paper_GSM || prevData.paper_GSM,
      ...initialData,
    }));
  }, [initialData, jobData]);

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Paper Details
      </p>
      <div className="md:flex  h-[calc(100vh-280px)] overflow-y-auto">
        <div className=" w-full md:w-3/4 p-2">
          <div className="   rounded-xl grid gap-1">
            <div className="grid grid-cols-6 md:mb-2 gap-1 justify-center">
              <label
                htmlFor="Paper_name"
                className="col-span-6 md:col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Paper Name
              </label>
              <select
                name="Paper_name"
                id="Paper_name"
                value={data.paperName}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2 cursor-not-allowed"
                disabled
              >
                <option value={`${jobData.paperName}`}>
                  {jobData.paperName}
                </option>
              </select>

              <label
                htmlFor="Paper_color"
                className="col-span-6 md:col-span-1 text-sm pl-1 md:ml-2 flex items-center font-normal "
              >
                Paper Color
              </label>
              <select
                name="Paper_color"
                id="Paper_color"
                value={data.paperColor}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2 cursor-not-allowed"
                disabled
              >
                <option value={`${jobData.paperColor}`}>
                  {jobData.paperColor}
                </option>
              </select>
            </div>

            <div className="grid grid-cols-6 md:mb-2 gap-1  justify-center">
              <label
                htmlFor="paper_size"
                className="col-span-6 md:col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Paper Size
              </label>
              <select
                name="paper_size"
                id="paper_size"
                value={data.paper_size}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2"
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
                <option value="Demy Full">Demy Full (17.5" × 22.5")</option>
                <option value="Double Demy Full">
                  Double Demy Full (22.5" × 35")
                </option>

                {/* 🧾 DFC (Double Foolscap) Sizes */}
                <option value="DFC 1/8">DFC 1/8 (6.75" × 8.5")</option>
                <option value="DFC 1/4">DFC 1/4 (8.5" × 13.5")</option>
                <option value="DFC 1/2">DFC 1/2 (13.5" × 17")</option>
                <option value="DFC Full">DFC Full (17" × 27")</option>

                {/* 🖨️ Commercial Printing Sizes */}
                <option value="Ledger">Ledger (17" × 11")</option>
                <option value="Legal">Legal (8.5" × 14")</option>
                <option value="8.5x11 inch">8.5 × 11 inch (Letter)</option>
                <option value="11x17 inch">11 × 17 inch (Tabloid)</option>
                <option value="12x18 inch">
                  12 × 18 inch (Extra Tabloid){" "}
                </option>
                <option value="13x19 inch">13 × 19 inch</option>
                <option value="17x22 inch">17 × 22 inch</option>
                <option value="19x25 inch">
                  19 × 25 inch (Offset sheet size)
                </option>
                <option value="23x36 inch">23 × 36 inch</option>
                <option value="25x38 inch">25 × 38 inch</option>
                <option value="SRA3">SRA3 (320 × 450 mm)</option>

                {/* 🖼️ Custom */}
                <option
                  value={`Custom (${data.customSize.width} × ${data.customSize.height} ${data.customSize.unit})`}
                >
                  {data.customSize.width && data.customSize.height
                    ? `Custom (${data.customSize.width} × ${data.customSize.height} ${data.customSize.unit})`
                    : "🛠️ Custom Size"}
                </option>

              </select>

              <label
                htmlFor="paper_GSM"
                className="col-span-6 md:col-span-1 text-sm pl-1 md:ml-2 flex items-center font-normal "
              >
                Paper GSM
              </label>
              <input
                type="number"
                id="paper_GSM"
                name="paper_GSM"
                placeholder={`${jobData.paper_GSM}`}
                value={jobData.paper_GSM}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2 cursor-not-allowed"
                disabled
              />
            </div>

            <div className="grid grid-cols-6 md:mb-2 gap-1  justify-center">
              <label
                htmlFor="required_paper"
                className="col-span-6 md:col-span-1 text-sm  pl-1   flex items-center font-normal "
              >
                required paper
              </label>
              <input
                type="text"
                id="required_paper"
                name="required_paper"
                placeholder="Quantity of required paper "
                value={data.required_paper}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2"
              />

              <label
                htmlFor="Ordered_paper"
                className="col-span-6 md:col-span-1 text-sm  pl-1  flex items-center font-normal "
              >
                Ordered paper
              </label>
              <input
                type="text"
                id="Ordered_paper"
                name="Ordered_paper"
                placeholder="Quantity of paper ordered"
                value={data.Ordered_paper}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2"
              />
            </div>

            <div className="grid grid-cols-6 md:mb-2 gap-1  justify-center">
              <label
                htmlFor="DM_Challan_no"
                className="col-span-6 md:col-span-1 text-sm  pl-1   flex items-center font-normal "
              >
                Challan no
              </label>
              <input
                type="number"
                id="DM_Challan_no"
                name="DM_Challan_no"
                placeholder="D.M. Challan number"
                value={data.DM_Challan_no}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2"
              />

              <label
                htmlFor="DM_Challan_date"
                className="col-span-6 md:col-span-1 text-sm ml-1 md:px-4 md:mx-4 flex items-center font-normal "
              >
                Date
              </label>
              <input
                type="date"
                id="DM_Challan_date"
                name="DM_Challan_date"
                placeholder="Quantity of paper ordered"
                value={data.DM_Challan_date}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-6 md:col-span-2"
              />
            </div>

            <div className="grid grid-cols-6 md:mb-2 gap-1  justify-center">
              <label
                htmlFor="Paper_description"
                className="col-span-6 md:col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description:
              </label>
              <textarea
                name="Paper_description"
                id="Paper_description"
                placeholder="Enter Paper description"
                value={data.Paper_description}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 text-sm border rounded col-span-6 md:col-span-5 "
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        {/* show CustomSize Modal */}
        <CustomSizeModal
          isOpen={showCustomSizeModal}
          onClose={() => setShowCustomSizeModal(false)}
          onConfirm={handleConfirm}
          width={data.customSize.width}
          height={data.customSize.height}
          unit={data.customSize.unit}
          onChange={handleCustomSizeChange} // ✅ pass handler
        />

        {/* Preview image */}
        <div className="hidden md:block w-1/4  px-2 pt-1">
          <label htmlFor="Final_Image" className="mt-3 p-1 pb-2">
            Preview :
          </label>
          <label htmlFor="Final_Image">
            <div className="p-2 bg-slate-100 border rounded h-64 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <p>Preview</p>
              </div>
            </div>
          </label>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Paper_Details;
