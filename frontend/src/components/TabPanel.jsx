import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, dialogClasses } from "@mui/material";
import Genral_Details from "./form/Genral_Details";
import Job_Details from "./form/Job_Details";
import Composing_Details from "./form/Composing_Details";
import Printing_Details from "./form/Printing_Details";
import Paper_Details from "./form/Paper_Details";
import Binding_Details from "./form/Binding_Details";
import Finished_Details from "./form/Finished_Details";
import uploadImage from "../helpers/uploadImage";
import uploadSampleImage from "../helpers/uploadSampleImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "../middleware/Loading";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className="bg-slate-300 border-slate-500 h-auto border-x-8 border-b-8 rounded-b-lg shadow-md"
    >
      {value === index && <Box className="p-3">{children}</Box>}
    </div>
  );
}

export default function FullWidthTabs({ onClose, fetchAllJob }) {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  // Persistent Form State
  const [formData, setFormData] = useState({
    general: {},
    job: {},
    composing: {},
    paper: {},
    printing: {},
    binding: {},
    finished: {},
  });

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // All customer fetch
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(SummaryApi.allCustomer.url, {
          method: SummaryApi.allCustomer.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setAllCustomers(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      }
    };

    fetchCustomers();
  }, []);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(SummaryApi.alljobCategory.url, {
          method: SummaryApi.alljobCategory.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setJobCategories(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch job categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Update form data dynamically
  const handleFormDataChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data }, // Merge new data with existing
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    let updatedFormData = { ...formData };

    // Handle sample image upload
    const sampleImage = formData?.job?.sampleImage;
    if (sampleImage) {
      const uploadSampleImageCloudinary = await uploadSampleImage(sampleImage);
      updatedFormData.job.sampleImage = uploadSampleImageCloudinary.url;
    }

    // Handle composing final image upload
    const composingImage = formData?.composing?.finalImage;
    if (composingImage) {
      const uploadImageCloudinary = await uploadImage(composingImage);
      updatedFormData.composing.finalImage = uploadImageCloudinary.url;
    }

    // Send data to API
    try {
      const response = await fetch(SummaryApi.uploadJob.url, {
        method: SummaryApi.uploadJob.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData?.message || "Form submitted successfully!");
        fetchAllJob();

        if (onClose) {
          onClose(); // Ensure it is defined before calling
        } else {
          console.warn("onClose function is not provided.");
        }
      } else {
        toast.error(responseData?.message || "Form submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false); // Stop loading after response
    }

    // Reset form after submission
    setFormData({
      general: {},
      job: {},
      composing: {},
      paper: {},
      printing: {},
      binding: {},
      finished: {},
    });
  };

  return (
    <div className=" z-10 fixed w-full h-full backdrop-blur-sm top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <Loading />
        </div>
      )}
      <div className="bg-slate-50 p-4 rounded w-full h-full max-w-4xl max-h-[95%] overflow-hidden">
        <div>
          <div className="flex justify-between items-center pb-3">
            <h2 className="font-bold text-lg">Add Jobs</h2>
            <div
              className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
              onClick={onClose}
            >
              <IoCloseSharp />
            </div>
          </div>
          <Box className="max-w-4xl rounded-lg">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs example"
              className="bg-slate-500 text-white rounded-t-lg p-2 pb-0"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#cbd5e1",
                },
                "& .MuiTab-root": {
                  color: "black",
                  backgroundColor: "#64748b",
                  transition: "all 0.3s ease-in-out",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  "&.Mui-selected": {
                    color: "black",
                    backgroundColor: "#cbd5e1" /* slate-300 */,
                    borderRadius: "8px 8px 0 0",
                  },
                },
              }}
            >
              <Tab label="General" />
              <Tab label="Job" />
              <Tab label="Composing" />
              <Tab label="Paper" />
              <Tab label="Printing" />
              <Tab label="Binding" />
              <Tab label="Finished" />
            </Tabs>

            {/* Form Submission */}
            <form onSubmit={handleSubmit}>
              <TabPanel value={value} index={0}>
                <Genral_Details
                  onChange={(data) => handleFormDataChange("general", data)}
                  initialData={formData.general}
                  customers={allCustomers}
                />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Job_Details
                  onChange={(data) => handleFormDataChange("job", data)}
                  initialData={formData.job}
                  jobCategories={jobCategories}
                />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <Composing_Details
                  initialData={formData.composing}
                  onChange={(data) => handleFormDataChange("composing", data)}
                />
              </TabPanel>

              <TabPanel value={value} index={3}>
                <Paper_Details
                  initialData={formData.paper}
                  jobData={formData.job} 
                  onChange={(data) => handleFormDataChange("paper", data)}
                />
              </TabPanel>

              <TabPanel value={value} index={4}>
                <Printing_Details
                  initialData={formData.printing}
                  jobData={formData.job}
                  onChange={(data) => handleFormDataChange("printing", data)}
                />
              </TabPanel>

              <TabPanel value={value} index={5}>
                <Binding_Details
                  initialData={formData.binding}
                  onChange={(data) => handleFormDataChange("binding", data)}
                />
              </TabPanel>

              <TabPanel value={value} index={6}>
                <Finished_Details
                  initialData={formData.finished}
                  jobData={formData.job} 
                  jobCategories={jobCategories}
                  onChange={(data) => handleFormDataChange("finished", data)}
                />
              </TabPanel>

              <button
                type="submit"
                className="px-4 my-2 py-2 w-full bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}
