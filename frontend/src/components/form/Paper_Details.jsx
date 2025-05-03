import React, { useEffect,  useState } from "react";

const Paper_Details = ({ initialData, onChange }) => {
  const defaultData = {
    Paper_name: "",
    Paper_color: "",
    paper_size: "A4",
    paper_GSM: "70 GSM",
    required_paper: "",
    Ordered_paper: "",
    DM_Challan_no: "",
    DM_Challan_date: "",
    Paper_description: "",
    
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
        Paper Details
      </p>
      <div className="flex">
        <div className="bg  w-3/4 p-2">
          <div className="   rounded-xl">
            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="Paper_name"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Paper Name
              </label>
              <select
                name="Paper_name"
                id="Paper_name"
                value={data.Paper_name}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              >
               

                
                <option value="Normal_paper">Normal-paper</option>
                <option value="Hanuman">Hanuman</option>
                <option value="Sirpur">Sirpur</option>
                <option value="Art">Art</option>
                <option value="Sticker">Sticker</option>
                <option value="Transprant_stikcer">Transprant stikcer</option>
              </select>

              <label
                htmlFor="Paper_color"
                className="col-span-1 text-sm pl-1 ml-2 flex items-center font-normal "
              >
                Paper Color
              </label>
              <select
                name="Paper_color"
                id="Paper_color"
                value={data.Paper_color}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
              > 

                <option value="White">White</option>
                <option value="Yollow">Yollow</option>
                <option value="Pink">Pink</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Laser">Laser</option>
              </select>
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="paper_size"
                className="col-span-1 text-sm pl-1 flex items-center font-normal"
              >
                Paper Size
              </label>
              <select
                name="paper_size"
                id="paper_size"
                value={data.paper_size}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              >
                <option value="" >
                  {" "}
                  Select Paper Size{" "}
                </option>

                <option value="A5">A5</option>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="demi1/8">demi 1/8</option>
                <option value="demi1/4">demi 1/4</option>
                <option value="demi1/2">demi 1/2</option>
                <option value="12X18 inch">12X18 inch</option>
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
                placeholder="Paper GSM"
                value={data.paper_GSM}
                onChange={handleInputChange}
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                required
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="required_paper"
                className="col-span-1 text-sm  pl-1   flex items-center font-normal "
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
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
               
              />

              <label
                htmlFor="Ordered_paper"
                className="col-span-1 text-sm  pl-1  flex items-center font-normal "
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
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            <div className="grid grid-cols-6 mb-2 justify-center">
              <label
                htmlFor="DM_Challan_no"
                className="col-span-1 text-sm  pl-1   flex items-center font-normal "
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
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />

              <label
                htmlFor="DM_Challan_date"
                className="col-span-1 text-sm  px-4 mx-4 flex items-center font-normal "
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
                className="p-1 bg-slate-50 border text-sm rounded col-span-2"
                
              />
            </div>

            <div className="grid grid-cols-6 mb-2  justify-center">
              <label
                htmlFor="Paper_description"
                className="col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description:
              </label>
              <textarea
                name="Paper_description"
                id="Paper_description"
                placeholder="Enter Paper description"
                value={data.Paper_description}
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

export default Paper_Details;
