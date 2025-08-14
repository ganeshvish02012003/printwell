import React, { useEffect, useState } from "react";

const Finished_Details = ({
  initialData,
  onChange,
  jobData = {},
  jobCategories = [],
}) => {
  const defaultData = {
    Finished_goods_no: "",
    Finished_goods_pkt: "",
    Rate: "",
    rate_unit: "",
    Peyment_Status: "Pending",
    Peyment_Mode: "Pending",
    Total_Amount: "0",
    Advance: "0",
    Delivery_Charge: "0",
    Discount: "0",
    Due_Amount: "0",
    Challan_no: "",
    Bill_no: "",
    Transmission: "",
    Transmission_date: "",
    HSN_Code: "",
    Tax_Rate: "",
    finished_description: "",
  };

  const [data, setData] = useState({ ...defaultData, ...initialData });

  useEffect(() => {
    if (jobData && jobData.quantity !== undefined) {
      console.log("Job Quantity:", jobData.quantity);
    }
  }, [jobData]);

  useEffect(() => {
    if (
      JSON.stringify(data) !==
      JSON.stringify({ ...defaultData, ...initialData })
    ) {
      setData((prevData) => ({ ...prevData, ...initialData }));
    }
  }, [initialData]); // Runs only when initialData changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...data, [name]: value };

    // Convert safely to numbers
    const rate = parseFloat(updatedData.Rate) || 0;
    const qty = parseFloat(jobData.quantity) || 0;
    const discount = parseFloat(updatedData.Discount) || 0;
    const delivery = parseFloat(updatedData.Delivery_Charge) || 0;
    const taxRate = parseFloat(updatedData.Tax_Rate) || 0;
    const advance = parseFloat(updatedData.Advance) || 0;

    // 1️⃣ Calculate Total Amount only from Rate × Quantity
    let totalAmount = rate * qty;
    updatedData.Total_Amount = totalAmount.toFixed(2);

    // 2️⃣ Calculate Due Amount with extra fields
    let due = totalAmount - advance - discount + delivery;
    if (taxRate > 0) {
      due += (due * taxRate) / 100;
    }
    updatedData.Due_Amount = due.toFixed(2);

    setData(updatedData);
    onChange(updatedData);
  };

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Finished Details
      </p>
      <div className="flex">
        <div className="bg  w-3/4 p-2">
          <div className="   rounded-xl">
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Finished_goods_no"
                className="col-span-1 text-sm pl-1  flex items-center font-normal "
              >
                Goods
              </label>
              <input
                type="text"
                id="Finished_goods_no"
                name="Finished_goods_no"
                placeholder="Number of Finished Goods"
                value={data.Finished_goods_no}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />

              <label
                htmlFor="Finished_goods_pkt"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Total Packet
              </label>
              <input
                type="text"
                id="Finished_goods_pkt"
                name="Finished_goods_pkt"
                placeholder="Total Bundle / packed "
                value={data.Finished_goods_pkt}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Rate"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Rate
              </label>
              <input
                type="text"
                id="Rate"
                name="Rate"
                placeholder="Rate"
                value={data.Rate}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              />
              <select
                name="Rate_unit"
                id="Rate_unit"
                value={data.Rate_unit}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              >
                <option value="" disabled>
                  Per unit
                </option>
                {jobCategories.map((el, index) => (
                  <option value={el.value} key={el._id || index}>
                    {el.label}
                  </option>
                ))}
              </select>

              <label
                htmlFor="Peyment_Status"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Peyment
              </label>
              <select
                name="Peyment_Status"
                id="Peyment_Status"
                value={data.Peyment_Status}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border  text-sm rounded col-span-1"
              >
                <option value="Pending" disabled>
                  Status
                </option>
                <option value="Semi_Paid">Semi Paid</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select
                name="Peyment_Mode"
                id="Peyment_Mode"
                value={data.Peyment_Mode}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              >
                <option value="Pending">Mode</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Total_Amount"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Total Amount
              </label>

              <input
                type="text"
                id="Total_Amount"
                name="Total_Amount"
                placeholder="Total_Amount"
                value={data.Total_Amount}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1 font-bold"
              />

              <input
                type="text"
                id="Advance"
                name="Advance"
                placeholder="Advance"
                value={data.Advance}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              />

              <label
                htmlFor="Delivery_Charge"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Other Amount
              </label>
              <input
                type="text"
                name="Delivery_Charge"
                placeholder="Delivery Charge"
                value={data.Delivery_Charge}
                onChange={handleInputChange}
                className="p-0 bg-slate-50 border text-sm rounded col-span-1"
              />
              <input
                type="text"
                id="Discount"
                name="Discount"
                placeholder="Discount "
                value={data.Discount}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Due_Amount"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Due Amount
              </label>

              <input
                type="text"
                id="Due_Amount"
                name="Due_Amount"
                placeholder="Due Amount"
                value={data.Due_Amount}
                readOnly
                className="p-1 bg-slate-50 border text-sm rounded col-span-2 font-bold"
              />

              <label
                htmlFor="Transmission"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Transmission
              </label>
              <input
                type="text"
                id="Transmission"
                name="Transmission"
                placeholder="Mode"
                value={data.Transmission}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-1"
              />
              <input
                type="Date"
                id="Transmission_date"
                name="Transmission_date"
                placeholder="date"
                value={data.Transmission_date}
                onChange={handleInputChange}
                className="p-1 px-0 bg-slate-50 border text-sm rounded col-span-1"
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Challan_no"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Challan No.
              </label>
              <input
                type="text"
                id="Challan_no"
                name="Challan_no"
                placeholder="Issue Challan Number"
                value={data.Challan_no}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />

              <label
                htmlFor="Bill_no"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Bill no.
              </label>
              <input
                type="text"
                id="Bill_no"
                name="Bill_no"
                placeholder="Bill Number"
                value={data.Bill_no}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="HSN_Code"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                HSN Code
              </label>
              <input
                type="text"
                id=" HSN_Code"
                name="HSN_Code"
                placeholder=" HSN Code "
                value={data.HSN_Code}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />

              <label
                htmlFor="Tax_Rate"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Tax Rate
              </label>
              <input
                type="text"
                id="Tax_Rate"
                name="Tax_Rate"
                placeholder="Tax Rate"
                value={data.Tax_Rate}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              />
            </div>

            <div className="grid grid-cols-6 mb-2  justify-center">
              <label
                htmlFor="finished_description"
                className="col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description:
              </label>
              <textarea
                name="finished_description"
                id="finished_description"
                placeholder="enter Job description"
                value={data.finished_description}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 text-sm border rounded col-span-5 "
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

export default Finished_Details;
