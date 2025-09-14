import React, { useEffect, useState } from "react";
import Select from "react-select";

const Genral_Details = ({ onChange, initialData, customers = [] }) => {
  const defaultData = {
    Customer_name: "",
    Mobile_number: "",
    WhatApp_number: "",
    address: "",
    genral_description: "",
    customerId: "", // ⬅️ ensure it's tracked
  };

  const [data, setData] = useState({ ...defaultData, ...initialData });

  useEffect(() => {
    setData({ ...defaultData, ...initialData });
  }, [initialData]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const customer = selectedOption.value;
      const updatedData = {
        ...data,
        Customer_name: customer.name || "",
        Mobile_number: customer.mobile || "",
        WhatApp_number: customer.whatsapp || "",
        address: customer.address || "",
        customerId: customer.customerId || "",
      };
      setData(updatedData);
      onChange(updatedData);
    } else {
      // Clear selected customer
      const clearedData = {
        ...data,
        Customer_name: "",
        Mobile_number: "",
        WhatApp_number: "",
        address: "",
        customerId: "",
      };
      setData(clearedData);
      onChange(clearedData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    // If the customer name is being changed manually, clear the customerId to avoid mismatch
    if (name === "Customer_name") {
      updatedData.customerId = "";
    }

    setData(updatedData);
    onChange(updatedData);
  };

  const customerOptions = customers.map((c) => ({
    label: c.name,
    value: c,
  }));

  const selectedCustomerOption = customerOptions.find(
    (opt) =>
      opt.value.customerId === data.customerId ||
      opt.value.name.toLowerCase() === data.Customer_name.toLowerCase()
  );

  return (
  <div>
    <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
      General Details
    </p>

    <div className="flex h-[calc(100vh-280px)] overflow-y-auto flex-col md:flex-row">
      {/* Left side (form fields) */}
      <div className="w-full md:w-3/4 p-2">
        <div className="rounded-xl">
          {/* Customer Name Dropdown */}
          <div className="grid grid-cols-6 mb-2">
            <label
              htmlFor="Frequent"
              className="col-span-1 text-sm pl-1 flex items-center font-normal"
            ></label>
            <div className="bg-slate-50 text-sm border rounded col-span-6">
              <Select
                options={customerOptions}
                onChange={handleSelectChange}
                placeholder="Search Frequent Client ..."
                isClearable
                value={selectedCustomerOption || null}
              />
            </div>
          </div>

          {/* Customer */}
          <div className="grid md:grid-cols-6 mb-2">
            <label
              htmlFor="Customer_name"
              className="col-span-2 md:col-span-1 text-sm pl-1 flex items-center font-normal"
            >
              Customer:
            </label>
            <input
              type="text"
              id="Customer_name"
              name="Customer_name"
              placeholder="Enter Customer name"
              value={data.Customer_name ?? ""}
              onChange={handleInputChange}
              className="p-1 bg-slate-50 border text-sm rounded col-span-4 md:col-span-4"
              required
            />
            <input
              type="text"
              id="customerId"
              name="customerId"
              placeholder="Customer Id"
              value={data.customerId ?? ""}
              onChange={handleInputChange}
              className="p-1 bg-slate-50 border text-sm rounded hover:cursor-not-allowed col-span-4 md:col-span-1"
              required
              disabled
            />
          </div>

          {/* Address */}
          <div className="grid md:grid-cols-6 mb-2">
            <label
              htmlFor="address"
              className="col-span-2 md:col-span-1 text-sm pl-1 flex items-start font-normal"
            >
              Address:
            </label>
            <textarea
              name="address"
              id="address"
              placeholder="Enter Address"
              value={data.address ?? ""}
              onChange={handleInputChange}
              className="p-1 bg-slate-50 text-sm border rounded col-span-4 md:col-span-5"
              rows={1}
            />
          </div>

          {/* Mobile Number */}
          <div className="grid md:grid-cols-6 mb-2">
            <label
              htmlFor="Mobile_number"
              className="col-span-2 md:col-span-1 text-sm pl-1 flex items-center font-normal"
            >
              Mobile No.:
            </label>
            <input
              type="text"
              id="Mobile_number"
              name="Mobile_number"
              placeholder="Enter Mobile Number"
              value={data.Mobile_number ?? ""}
              onChange={handleInputChange}
              className="p-1 bg-slate-50 border text-sm rounded col-span-4 md:col-span-5"
              required
            />
          </div>

          {/* WhatsApp Number */}
          <div className="grid md:grid-cols-6 mb-2">
            <label
              htmlFor="WhatApp_number"
              className="col-span-2 md:col-span-1 text-sm pl-1 flex items-center font-normal"
            >
              WhatsApp No.:
            </label>
            <input
              type="text"
              id="WhatApp_number"
              name="WhatApp_number"
              placeholder="Enter WhatsApp Number"
              value={data.WhatApp_number ?? ""}
              onChange={handleInputChange}
              className="p-1 bg-slate-50 border text-sm rounded col-span-4 md:col-span-5"
            />
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-6 mb-2">
            <label
              htmlFor="genral_description"
              className="col-span-2 md:col-span-1 pl-1 text-sm flex items-start font-normal"
            >
              Description:
            </label>
            <textarea
              name="genral_description"
              id="genral_description"
              placeholder="Enter Description"
              value={data.genral_description ?? ""}
              onChange={handleInputChange}
              className="p-1 bg-slate-50 text-sm border rounded col-span-4 md:col-span-5"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Right side (Preview) */}
      <div className="w-full hidden md:block md:w-1/4 px-2 pt-1">
        <label htmlFor="Final_Image" className="mt-3 p-1 pb-2 block">
          Preview :
        </label>
        <label htmlFor="Final_Image">
          <div className="p-2 bg-slate-100 border rounded h-64 w-full flex justify-center items-center cursor-pointer">
            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
              <p>Preview</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
);


  // return (
  //   <div>
  //     <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
  //       General Details
  //     </p>
  //     <div className="flex">
  //       <div className="w-3/4 p-2">
  //         <div className="rounded-xl">
  //           {/* Customer Name Dropdown */}
  //           <div className="grid grid-cols-6 mb-2 justify-center">
  //             <label
  //               htmlFor="Frequent"
  //               className="col-span-1 text-sm pl-1 flex items-center font-normal"
  //             ></label>
  //             <div className=" bg-slate-50 text-sm border rounded col-span-4">
  //               <Select
  //                 options={customerOptions}
  //                 onChange={handleSelectChange}
  //                 placeholder="Search Frequent Client ..."
  //                 isClearable
  //                 value={selectedCustomerOption || null}
  //               />
  //             </div>
  //           </div>

  //           {/* customer */}
  //           <div className="grid grid-cols-6 mb-2 justify-center">
  //             <label
  //               htmlFor="Customer_name"
  //               className="col-span-1 text-sm pl-1 flex items-center font-normal"
  //             >
  //               Customer:
  //             </label>
  //             <input
  //               type="text"
  //               id="Customer_name"
  //               name="Customer_name"
  //               placeholder="Enter Customer name"
  //               value={data.Customer_name ?? ""}
  //               onChange={handleInputChange}
  //               className="p-1 bg-slate-50 border text-sm rounded col-span-4"
  //               required
  //             />
  //             <input
  //               type="text"
  //               id="customerId"
  //               name="customerId"
  //               placeholder="Customer Id"
  //               value={data.customerId ?? ""}
  //               onChange={handleInputChange}
  //               className="p-1 bg-slate-50 border text-sm rounded col-span-1"
  //               required
  //               disabled
  //             />
  //           </div>

  //           {/* Address */}
  //           <div className="grid grid-cols-6 mb-2 justify-center">
  //             <label
  //               htmlFor="address"
  //               className="col-span-1 text-sm pl-1 flex items-start font-normal"
  //             >
  //               Address:
  //             </label>
  //             <textarea
  //               name="address"
  //               id="address"
  //               placeholder="Enter Address"
  //               value={data.address ?? ""}
  //               onChange={handleInputChange}
  //               className="p-1 bg-slate-50 text-sm border rounded col-span-5"
  //               rows={1}
  //             />
  //           </div>

  //           {/* Mobile Number */}
  //           <div className="grid grid-cols-6 mb-2 justify-center">
  //             <label
  //               htmlFor="Mobile_number"
  //               className="col-span-1 text-sm pl-1 flex items-center font-normal"
  //             >
  //               Mobile No.:
  //             </label>
  //             <input
  //               type="text"
  //               id="Mobile_number"
  //               name="Mobile_number"
  //               placeholder="Enter Mobile Number"
  //               value={data.Mobile_number ?? ""}
  //               onChange={handleInputChange}
  //               className="p-1 bg-slate-50 border text-sm rounded col-span-5"
  //               required
  //             />
  //           </div>

  //           {/* WhatsApp Number */}
  //           <div className="grid grid-cols-6 mb-2 justify-center">
  //             <label
  //               htmlFor="WhatApp_number"
  //               className="col-span-1 text-sm pl-1 flex items-center font-normal"
  //             >
  //               WhatsApp No.:
  //             </label>
  //             <input
  //               type="text"
  //               id="WhatApp_number"
  //               name="WhatApp_number"
  //               placeholder="Enter WhatsApp Number"
  //               value={data.WhatApp_number ?? ""}
  //               onChange={handleInputChange}
  //               className="p-1 bg-slate-50 border text-sm rounded col-span-5"
  //             />
  //           </div>

  //           {/* Description */}
  //           <div className="grid grid-cols-6 mb-2 justify-center">
  //             <label
  //               htmlFor="genral_description"
  //               className="col-span-1 pl-1 text-sm flex items-start font-normal"
  //             >
  //               Description:
  //             </label>
  //             <textarea
  //               name="genral_description"
  //               id="genral_description"
  //               placeholder="Enter Description"
  //               value={data.genral_description ?? ""}
  //               onChange={handleInputChange}
  //               className="p-1 bg-slate-50 text-sm border rounded col-span-5"
  //               rows={3}
  //             />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Image Preview Block */}
  //       <div className="w-1/4 px-2 pt-1">
  //         <label htmlFor="Final_Image" className="mt-3 p-1 pb-2">
  //           Preview :
  //         </label>
  //         <label htmlFor="Final_Image">
  //           <div className="p-2 bg-slate-100 border rounded h-64 w-full flex justify-center items-center cursor-pointer">
  //             <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
  //               <p>Preview</p>
  //             </div>
  //           </div>
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Genral_Details;
