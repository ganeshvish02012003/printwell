import React, { useEffect, useState } from "react";

const Genral_Details = ({ onChange, initialData }) => {
  // Ensure initialData always has the correct structure
  const defaultData = {
    Customer_name: "",
    Mobile_number: "",
    address: "",
    genral_description: "",
  };

  const [data, setData] = useState({ ...defaultData, ...initialData });

  useEffect(() => {
    setData({ ...defaultData, ...initialData }); // Merge defaults with received data
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    onChange(updatedData);
  };

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        General Details
      </p>
      <div className="flex">
        <div className="w-3/4 p-2">
          <div className="rounded-xl">
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Customer_name"
                className="col-span-2 text-sm pl-1 flex items-center font-normal"
              >
                Customer Name:
              </label>
              <input
                type="text"
                id="Customer_name"
                name="Customer_name"
                placeholder="Enter Customer Name"
                value={data.Customer_name || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-4"
                required
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Mobile_number"
                className="col-span-2 text-sm pl-1 flex items-center font-normal"
              >
                Mobile Number:
              </label>
              <input
                type="text"
                id="Mobile_number"
                name="Mobile_number"
                placeholder="Enter Mobile Number"
                value={data.Mobile_number || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-4"
                required
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="address"
                className="col-span-2 text-sm pl-1 flex items-start font-normal"
              >
                Address:
              </label>
              <textarea
                name="address"
                id="address"
                placeholder="Enter Address"
                value={data.address || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 text-sm border rounded col-span-4"
                rows={3}
              ></textarea>
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="genral_description"
                className="col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description:
              </label>
              <textarea
                name="genral_description"
                id="genral_description"
                placeholder="Enter Job Description"
                value={data.genral_description || ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 text-sm border rounded col-span-5"
                rows={3}
              ></textarea>
            </div>
          </div>
        </div> 
          {/* Preview image */}
          <div className=" w-1/4  px-2 pt-1">
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

export default Genral_Details;
