// const uploadJobPermission = require("../../helpers/permission");
// const jobModel = require("../../models/JobModel");
// const {io} = require("../../index")

// async function UpdateJob(req, res) {
//   try {
//     const sessionUserId = req.userId;
//     // Check user permission
//     if (!uploadJobPermission(sessionUserId)) {
//       throw new Error("Permission denied");
//     }

//     const jobId = req.body._id || req.params.id;
//     if (!jobId) {
//       throw new Error("_id not found");
//     }

//     const updatePayload = { ...req.body };
//     delete updatePayload._id;

//     const updatedJob = await jobModel.findByIdAndUpdate(jobId, updatePayload, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedJob) {
//       throw new Error("Job not found");
//     }

//     res.status(200).json({
//       message: "Job updated successfully",
//       error: false,
//       success: true,
//       data: updatedJob,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message || "An error occurred",
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = UpdateJob;

const uploadJobPermission = require("../../helpers/permission");
const jobModel = require("../../models/JobModel");
const { getIO } = require("../../io");

async function UpdateJob(req, res) {
  try {
    const sessionUserId = req.userId;

    // ✅ Check permission
    if (!uploadJobPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const jobId = req.body._id || req.params.id;
    if (!jobId) {
      throw new Error("_id not found");
    }

    // ✅ Remove _id from payload
    const updatePayload = { ...req.body };
    delete updatePayload._id;

    // ✅ Update job
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      throw new Error("Job not found");
    }

    // ✅ Emit socket event so all clients know about the change
    const io = getIO(); // ✅ Safe access
    io.emit("jobUpdated", updatedJob);

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
