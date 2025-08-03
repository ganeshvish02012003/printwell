import React from "react";

const CustomSizeModal = ({
  isOpen,
  onClose,
  onConfirm,
  width,
  height,
  unit,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">Enter Custom Size</h2>

        <div className="flex gap-2 mb-3">
          <input
            type="number"
            name="customWidth"
            placeholder="Width"
            value={width}
            onChange={onChange}
            className="w-1/2 p-2 border rounded text-sm"
          />
          <input
            type="number"
            name="customHeight"
            placeholder="Height"
            value={height}
            onChange={onChange}
            className="w-1/2 p-2 border rounded text-sm"
          />
        </div>

        <select
          name="unit"
          value={unit}
          onChange={onChange}
          className="w-full p-2 border rounded text-sm mb-4"
        >
          <option value="mm">Millimeters (mm)</option>
          <option value="cm">Centimeters (cm)</option>
          <option value="m">Meters (m)</option>
          <option value="in">Inches (in)</option>
          <option value="ft">Feet (ft)</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="text-sm px-3 py-1 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomSizeModal;
