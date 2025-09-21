const uploadJobPermission = require("../../helpers/permission");
const jobModel = require("../../models/JobModel");
const Counter = require("../../models/CounterModel"); 
const { getIO } = require("../../io");

async function UploadJob(req, res) {
  try {
    const sessionUserId = req.userId;

    // Check user permission
    if (!uploadJobPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Increment the counter and get the new value
    const counter = await Counter.findByIdAndUpdate(
      { _id: "jobCardId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // create if not exists
    );

    const paddedJobCardId = String(counter.seq).padStart(4, "0");

    // Ensure job object exists
    if (!req.body.job) req.body.job = {};
    req.body.job.jobCardId = paddedJobCardId;
    req.body.job.status = req.body.job.status || "Pending";

    // Save the job
    const uploadJob = new jobModel(req.body);
    const saveJob = await uploadJob.save();

  const io = getIO(); // ✅ Safe access
    io.emit("jobCreated", saveJob);

    res.status(201).json({
      message: "Job added successfully",
      error: false,
      success: true,
      data: saveJob,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = UploadJob;
