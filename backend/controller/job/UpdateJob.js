const uploadJobPermission = require("../../helpers/permission");
const jobModel = require("../../models/JobModel");

// async function UpdateJob(req, res) {
//   try {
//     const sessionUserId = req.userId;
//     // const jobId = req.params.id; // assuming the job ID is passed in the route params

//     // Check user permission
//     if (!uploadJobPermission(sessionUserId)) {
//       throw new Error("Permission denied");
//     }

//     const {_id, ...resBody} = req.body
//     if (!_id) {
//         throw new Error("_id not found");
//       }


//     // Find and update the job
//     const updatedJob = await jobModel.findByIdAndUpdate(_id,resBody)

//     if (!updatedJob) {
//       throw new Error("Job not found");
//     }

//     // Send success response
//     res.status(200).json({
//       message: "Job updated successfully",
//       error: false,
//       success: true,
//       data: updatedJob,
//     });
//   } catch (err) {
//     // Send error response
//     res.status(400).json({
//       message: err.message || "An error occurred",
//       error: true,
//       success: false,
//     });
//   }
// }

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
