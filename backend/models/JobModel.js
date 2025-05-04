const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {

    general: {
      Customer_name: { type: String, default: "" },
      Mobile_number: { type: Number, default: "" },
      address: { type: String, default: "" },
      genral_description: { type: String, default: "" },
    },
    job: {
      jobName: { type: String, default: "" },
      jobCardId: { type: String, default: "" },
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "On Hold"],
        default: "Pending"
      },
      category: { type: String, default: "" },
      quantity: { type: Number, default: "" },
      jobSize: { type: String, default: "" },
      pages: { type: Number, default: "" },
      color: { type: String, default: "" },
      ink: { type: String, default: "" },
      paperName: { type: String, default: "" },
      paperColor: { type: String, default: "" },
      job_description: { type: String, default: "" },
      sampleImage: { type: String, default: null },
    },
    composing: {
      jobName: { type: String, default: "" },
      category: { type: String, default: "" },
      quantity: { type: Number, default: 1 },
      description: { type: String, default: "" },
      proofs: {
        type: [{ id: Number, status: String }],
        default: [{ id: 1, status: null }],
      },
      finalImage: { type: String, default: null },
    },
    paper: {
      Paper_name: { type: String, default: "" },
      Paper_color: { type: String, default: "" },
      paper_size: { type: String, default: "" },
      paper_GSM: { type: String, default: "" },
      required_paper: { type: String, default: "" },
      Ordered_paper: { type: String, default: "" },
      DM_Challan_no: { type: String, default: "" },
      DM_Challan_date: { type: String, default: "" },
      Paper_description: { type: String, default: "" },
    },
    printing: {
      Machine_name: { type: String, default: "" },
      Operator_name: { type: String, default: "" },
      Total_set_of_print: { type: String, default: "" },
      print_no_per_set: { type: String, default: "" },
      Start_date_of_print: { type: String, default: "" },
      Start_time_of_print: { type: String, default: "" },
      End_date_of_print: { type: String, default: "" },
      printing_description: { type: String, default: "" },
    },
    binding: {
      Numbering: { type: String, default: "" },
      set_number: { type: String, default: "" },
      Perfiting: { type: String, default: "" },
      Half_cutting: { type: String, default: "" },
      Full_cutting: { type: String, default: "" },
      Binding: { type: String, default: "" },
      Spiral: { type: String, default: "" },
      Packing: { type: String, default: "" },
      Binding_description: { type: String, default: "" },
    },
    finished: {
      Finished_goods_no: { type: String, default: "" },
      Finished_goods_pkt: { type: String, default: "" },
      Previous_rate: { type: String, default: "" },
      Update_Rate: { type: String, default: "" },
      Challan_no: { type: String, default: "" },
      Bill_no: { type: String, default: "" },
      Transmission: { type: String, default: "" },
      Transmission_date: { type: String, default: "" },
      HSN_Code: { type: String, default: "" },
      Tax_Rate: { type: String, default: "" },
      finished_description: { type: String, default: "" },
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const jobModel = mongoose.model("job", JobSchema);

module.exports = jobModel;
