const uploadJobPermission = require("../../helpers/permission");
const jobModel = require("../../models/JobModel");

async function UpdateJob(req, res) {
  try {
    const sessionUserId = req.userId;
    // Check user permission
    if (!uploadJobPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const jobId = req.body._id || req.params.id;
    if (!jobId) {
      throw new Error("_id not found");
    }

    const updatePayload = { ...req.body };
    delete updatePayload._id;

    const updatedJob = await jobModel.findByIdAndUpdate(jobId, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      throw new Error("Job not found");
    }

    res.status(200).json({
      message: "Job updated successfully",
      error: false,
      success: true,
      data: updatedJob,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = UpdateJob;
