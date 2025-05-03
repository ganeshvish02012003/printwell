const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // username: { type: String }, // No unique constraint
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilePic: String,
    role: String,
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
