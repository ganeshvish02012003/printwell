import React, { useEffect, useState } from 'react'

const Binding_Details = ({ initialData = {}, onChange = () => {} }) => {
  const defaultData = {
    Numbering: false,
    set_number: "",
    Perfiting: false,
    Half_cutting: false,
    Full_cutting: false,
    Binding: false,
    Spiral: false,
    Packing: false,
    Binding_description: "",
  };

  const [data, setData] = useState({ ...defaultData, ...initialData });

  useEffect(() => {
    if (
      JSON.stringify(data) !==
      JSON.stringify({ ...defaultData, ...initialData })
    ) {
      setData({ ...defaultData, ...initialData });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    const updatedData = { ...data, [name]: updatedValue };

    // ✅ If "Numbering" is unchecked, clear "set_number"
    if (name === "Numbering" && !checked) {
      updatedData.set_number = "";
    }
    setData(updatedData);
    onChange(updatedData);
  };

  return (
    <div>
      <p className="text-center text-lg font-bold py-1 bg-slate-400 mb-2 text-white rounded">
      Binding Details
      </p>
      <div className="flex">
        <div className="bg  w-3/4 p-2">
          <div className="   rounded-xl">

          <div className="grid grid-cols-6  gap-2 mb-2">
            {/* Checkbox with Text Input */}
            <div className="col-span-2 mb-2  bg-slate-50 rounded  justify-between items-center p-1">
              <label
                htmlFor="Numbering"
                className="flex-1 flex justify-between"
              >
                <span className="px-2 text-sm font-normal">Numbering</span>
                <input
                  type="checkbox"
                  name="Numbering"
                  id="Numbering"
                  checked={data.Numbering}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
              </label>
            </div>
          

            <div className="col-span-4 bg-slate-50 rounded flex justify-center items-center">
              <input
                type="text"
                name="set_number"
                placeholder="Enter start & last number"
                className="w-full px-1"
                disabled={!data.Numbering}
                value={data.set_number}
                onChange={handleInputChange}
              />
            </div>

            {/* Checkboxes */}
            {[
              "Perfiting",
              "Half_cutting",
              "Full_cutting",
              "Binding",
              "Spiral",
              "Packing",
            ].map((item) => (
              <div
                key={item}
                className="col-span-2 bg-slate-50 rounded flex justify-between items-center p-1"
              >
                <label htmlFor={item} className="flex-1 flex justify-between">
                  <span className="px-2 text-sm font-normal">
                    {item.replace("_", " ")}
                  </span>
                  <input
                    type="checkbox"
                    name={item}
                    id={item}
                    checked={data[item]}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                </label>
              </div>
            ))}

          {/* Textarea for Description */}
          

          </div>
          <div className="grid grid-cols-6 mb-2  justify-center">
              <label
                htmlFor="Binding_description"
                className="col-span-1 pl-1 text-sm flex items-start font-normal"
              >
                Description: 
              </label>
              <textarea
                name="Binding_description"
                id="Binding_description"
                placeholder="Enter Binding description"
                value={data.Binding_description}
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
}

export default Binding_Details