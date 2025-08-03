import React, { useState, useEffect } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const JobCategory = () => {
  const [formData, setFormData] = useState({ label: "", value: "" });
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(SummaryApi.alljobCategory.url, {
        method: SummaryApi.alljobCategory.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) setCategories(data.data.reverse());
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const method = editingId
        ? SummaryApi.updatejobCategory(editingId)
        : SummaryApi.addjobCategory;
  
      const res = await fetch(method.url, {
        method: method.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || "Saved successfully");
        setFormData({ label: "", value: "" });
        setEditingId(null);
        setShowModal(false);
        fetchCategories(); 
      } else {
        toast.error(data.message || "Failed to save category");
      }
    } catch (err) {
      console.error("Error submitting category:", err);
      toast.error("Failed to save category");
    }
  };
  

  const handleEdit = (cat) => {
    setFormData({ label: cat.label, value: cat.value });
    setEditingId(cat._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(SummaryApi.deletejobCategory(id).url, {
        method: SummaryApi.deletejobCategory(id).method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="p-2">
      <div className="w-full px-4 h-12 bg-slate-500 rounded-md flex justify-between items-center mb-1">
        <h2 className="font-bold text-white text-lg">Job Categories</h2>
        <button
          className="border-2 px-3 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all rounded-full"
          onClick={() => {
            setFormData({ label: "", value: "" });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          Add Category
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by label"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />

      <div className="border border-slate-300 overflow-hidden">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-500 text-white sticky top-0">
            <tr>
              <th className="border p-2">Sn.</th> 
              <th className="border p-2">Label</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, i) => (
                <tr
                  key={cat._id}
                  className={i % 2 === 0 ? "bg-slate-200" : "bg-slate-300"}
                >
                  <td className="border py-2 text-center">{i + 1}</td>
                  <td className="border py-2 text-center">{cat.label}</td>
                  <td className="border py-2 text-center">{cat.value}</td>
                  <td className="border py-2 text-center">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline "
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {editingId ? "Update Category" : "Add New Category"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="label"
                placeholder="Label"
                value={formData.label}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={formData.value}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between pt-4 ">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editingId ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCategory;
