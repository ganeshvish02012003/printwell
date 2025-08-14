import React, { useEffect, useState } from "react";

const Printing_Details = ({ initialData ,jobData = {}, onChange = () => {} }) => {

  const defaultData = {
    Machine_name: jobData.Machine_name || "",
    Operator_name: "",
    Total_set_of_print: "",
    print_no_per_set: "",
    Start_date_of_print: "",
    Start_time_of_print: "",
    End_date_of_print: "",
    End_time_of_print: "", 
    printing_description: "",
  
  };

  const [data, setData] = useState({ ...defaultData, ...initialData });

  // useEffect(() => {
  //   if (JSON.stringify(data) !== JSON.stringify({ ...defaultData, ...initialData })) {
  //     setData((prevData) => ({ ...prevData, ...initialData }));
  //   }
  // }, [initialData]); // Runs only when initialData changes


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    onChange(updatedData);
  };

useEffect(() => {
  setData(prev => ({
    ...prev,
    Machine_name: jobData.Machine_name ||data.Machine_name || ""
  }));
}, [jobData.Machine_name]);


  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
        Printing Details
      </p>
      <div className="flex">
        <div className="bg  w-3/4 p-2">
          <div className="   rounded-xl">
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Machine_name"
                className="col-span-1 text-sm pl-1  flex items-center font-normal"
              >
                Machine name
              </label>
              <select
                name="Machine_name"
                id="Machine_name"
                value={jobData.Machine_name ||data.Machine_name|| ""}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
                
              >
                 <option value={`${jobData.Machine_name}`} disabled>
                  {jobData.Machine_name}
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
                htmlFor="Customer_name"
                className="col-span-1 text-sm pl-1 mx-2 flex items-center font-normal "
              >
                Operator
              </label>
              <input
                type="text"
                id="Operator_name"
                name="Operator_name"
                placeholder="Enter Operator Name "
                value={data.Operator_name}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Total_set_of_print"
                className="col-span-1 text-sm  pl-1   flex items-center font-normal "
              >
                Total set
              </label>
              <input
                type="text"
                id="Total_set_of_print"
                name="Total_set_of_print"
                placeholder="Total set of printing "
                value={data.Total_set_of_print}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              />

              <label
                htmlFor="print_no_per_set"
                className="col-span-1 text-sm  pl-1 mx-2  flex items-center font-normal "
              >
                Per Set
              </label>
              <input
                type="text"
                id="print_no_per_set"
                name="print_no_per_set"
                placeholder="Printing Number per set"
                value={data.print_no_per_set}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Start_date_of_print"
                className="col-span-1 text-sm  pl-1  flex items-center font-normal "
              >
                state Date
              </label>
              <input
                type="date"
                id="Start_date_of_print"
                name="Start_date_of_print"
                placeholder="Quantity of paper ordered"
                value={data.Start_date_of_print}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
               
              />

              <label
                htmlFor="Start_time_of_print"
                className="col-span-1 text-sm  px-4  flex items-center font-normal "
              >
                state time
              </label>
              <input
                type="time"
                id="Start_time_of_print"
                name="Start_time_of_print"
                placeholder="Quantity of paper ordered"
                value={data.Start_time_of_print}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="End_date_of_print"
                className="col-span-1 text-sm  pl-1  flex items-center font-normal "
              >
                End Date
              </label>
              <input
                type="date"
                id="End_date_of_print"
                name="End_date_of_print"
                placeholder="Quantity of paper ordered"
                value={data.End_date_of_print}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />

              <label
                htmlFor="End_time_of_print"
                className="col-span-1 text-sm  px-4  flex items-center font-normal "
              >
                End time
              </label>
              <input
                type="time"
                id="End_time_of_print"
                name="End_time_of_print"
                placeholder="Quantity of paper ordered"
                value={data.End_time_of_print}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            <div className="grid grid-cols-6 mb-2  justify-center">
              <label
                htmlFor="printing_description"
                className="col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description:
              </label>
              <textarea
                name="printing_description"
                id="printing_description"
                placeholder="enter Job description"
                value={data.printing_description}
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

export default Printing_Details;
