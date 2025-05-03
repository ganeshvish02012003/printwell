import React, { useEffect, useState } from "react";

const Finished_Details = ({ initialData, onChange }) => {

const defaultData = {

  Finished_goods_no: "",
  Finished_goods_pkt: "",
  Previous_rate: "",
  Update_Rate: "",
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
    if (JSON.stringify(data) !== JSON.stringify({ ...defaultData, ...initialData })) {
      setData((prevData) => ({ ...prevData, ...initialData }));
    }
  }, [initialData]); // Runs only when initialData changes

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
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
                htmlFor="Previous_rate"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Prev. Rate
              </label>
              <input
                type="text"
                id="Previous_rate"
                name="Previous_rate"
                placeholder="Previous Rate"
                value={data.Previous_rate}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              />

              <label
                htmlFor="Update_Rate"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Update Rate
              </label>
              <input
                type="text"
                id="Update_Rate"
                name="Update_Rate"
                placeholder="Update Rate"
                value={data.Update_Rate}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
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
                required
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
                required
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Transmission"
                className="col-span-1 text-sm pl-1 flex items-center font-normal "
              >
                Transmission
              </label>
              <input
                type="text"
                id="Transmission"
                name="Transmission"
                placeholder="Mode of Transmission "
                value={data.Transmission}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              />

              <label
                htmlFor="Transmission_date"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Date
              </label>
              <input
                type="text"
                id="Transmission_date"
                name="Transmission_date"
                placeholder="Transmission date"
                value={data.Transmission_date}
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
