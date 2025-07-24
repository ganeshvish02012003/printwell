const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("JobCategory", jobCategorySchema);
