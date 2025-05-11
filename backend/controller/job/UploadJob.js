const uploadJobPermission = require("../../helpers/permission");
const jobModel = require("../../models/JobModel");

async function UploadJob(req, res) {
  try {
    const sessionUserId = req.userId;

    // Check user permission
    if (!uploadJobPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Pad the jobCardId to 4 digits (e.g., "0001")
    const paddedJobCardId = String(counter.seq).padStart(4, "0");

    // ✅ INSERT THIS BLOCK HERE
    if (!req.body.job) req.body.job = {};
    req.body.job.jobCardId = paddedJobCardId;
    req.body.job.status = req.body.job.status || "Pending";

    // Create and save the job
    const uploadJob = new jobModel(req.body);
    const saveJob = await uploadJob.save();

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
