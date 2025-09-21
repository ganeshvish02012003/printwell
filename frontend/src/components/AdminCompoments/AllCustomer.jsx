import React, { useState, useEffect } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import Loading from "../../middleware/Loading";
import LineLoading from "../../middleware/LineLoading";

const AllCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    whatsapp: "",
    email: "",
    clientType: "",
  });

  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(SummaryApi.allCustomer.url, {
        method: SummaryApi.allCustomer.method,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setCustomers(data.data.reverse()); // reverse for newest first
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [searchQuery, setSearchQuery] = useState({
    name: "",
    address: "",
    mobile: "",
    whatsapp: "",
    email: "",
    clientType: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  const filteredCustomers = customers.filter((c) =>
    Object.entries(searchQuery).every(([key, val]) =>
      c[key]?.toLowerCase().includes(val)
    )
  );
  const totalCustomers = filteredCustomers.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("token");
      // console.log("Submitting data:", formData);

      if (editingId) {
        // Update existing customer
        const res = await fetch(SummaryApi.updateCustomer(editingId).url, {
          method: SummaryApi.updateCustomer(editingId).method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          fetchCustomers();
        } else {
          toast.error(data.message || "Failed to update customer");
        }
      } else {
        // Add new customer
        const res = await fetch(SummaryApi.addCustomer.url, {
          method: SummaryApi.addCustomer.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          fetchCustomers();
        } else {
          toast.error(data.message || "Failed to add customer");
        }
      }

      // Reset form
      setFormData({
        name: "",
        address: "",
        mobile: "",
        whatsapp: "",
        email: "",
        clientType: "",
      });
      setShowModal(false);
      setEditingId(null);
    } catch (err) {
      // console.error("Error submitting form:", err);
      toast.error("An error occurred while saving the customer");
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingId(customer.customerId); // set for update
    setShowModal(true);
  };

  return (
    <div className="p-2">
      {loading && <LineLoading />}
      <div className="w-full px-4 h-12 bg-slate-500 rounded-md flex justify-between items-center mb-1">
        <h2 className="font-bold text-white text-lg">All Client</h2>
        <div>
          {/* <span className="text-white p-4 font-semibold">Total Customers</span> */}
          <span className="text-black bg-slate-100 px-8 py-1 rounded-md font-semibold">
            {totalCustomers}
          </span>
        </div>
        <button
          className="border-2 px-2 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all rounded-full"
          onClick={() => {
            setFormData({
              name: "",
              address: "",
              mobile: "",
              whatsapp: "",
              email: "",
              clientType: "",
            });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          Add Client
        </button>
      </div>

      <div className=" border border-slate-300 overflow-hidden">
        <div className="overflow-y-auto h-[calc(100vh-142px)]">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-500 text-white sticky top-0 z-10">
              <tr>
                <th className="border p-2">Sn.</th>
                <th className="border py-2">
                  <input
                    type="text"
                    name="name"
                    value={searchQuery.name}
                    onChange={handleSearchChange}
                    placeholder=" Name"
                    className=" p-1 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border py-2">
                  <input
                    type="text"
                    name="address"
                    value={searchQuery.address}
                    onChange={handleSearchChange}
                    placeholder="Address"
                    className=" p-1 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border py-2">
                  <input
                    type="text"
                    name="mobile"
                    value={searchQuery.mobile}
                    onChange={handleSearchChange}
                    placeholder="Mobile"
                    className=" p-1 w-24 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border py-2">
                  <input
                    type="text"
                    name="whatsapp"
                    value={searchQuery.whatsapp}
                    onChange={handleSearchChange}
                    placeholder="Whatsapp"
                    className=" p-1 w-24 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border py-2">
                  <input
                    type="text"
                    name="email"
                    value={searchQuery.email}
                    onChange={handleSearchChange}
                    placeholder=" Email"
                    className=" p-1 min-w-40 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border py-2">
                  <input
                    type="text"
                    name="clientType"
                    value={searchQuery.clientType}
                    onChange={handleSearchChange}
                    placeholder=" ClientType"
                    className=" p-1  w-24 text-sm text-center text-white placeholder-white bg-slate-500 rounded border"
                  />
                </th>
                <th className="border py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c, i) => {
                  const rowBg =
                    parseInt(c.customerId) % 2 === 0
                      ? "bg-slate-300"
                      : "bg-slate-200";

                  return (
                    <tr
                      key={c._id}
                      className={`text-center hover:bg-gray-400 ${rowBg}`}
                    >
                      <td className="border border-slate-100 py-2">
                        {c.customerId}
                      </td>
                      <td className="border border-slate-100 py-2">{c.name}</td>
                      <td className="border border-slate-100 py-2">
                        {c.address}
                      </td>
                      <td className="border border-slate-100 py-2">
                        {c.mobile}
                      </td>
                      <td className="border border-slate-100 py-2">
                        {c.whatsapp}
                      </td>
                      <td className="border border-slate-100 py-2">
                        {c.email}
                      </td>
                      <td className="border border-slate-100 py-2">
                        {c.clientType}
                      </td>
                      <td className="border border-slate-100 py-2">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEdit(c)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="border px-4 py-4 text-center">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          {loading && (
            <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50">
              <Loading />
            </div>
          )}
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {editingId ? "Update Customer" : "Add New Customer"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                "name",
                "address",
                "mobile",
                "whatsapp",
                "email",
                "clientType",
              ].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required={["name", "mobile"].includes(field)}
                  className="w-full p-2 border rounded"
                />
              ))}

              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editingId ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                  }}
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

export default AllCustomer;
