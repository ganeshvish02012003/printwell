const uploadJobPermission = require("../../helpers/permission");
const jobModel = require("../../models/JobModel");

async function UploadJob(req, res) {
  try {
    const sessionUserId = req.userId;

    // Check user permission
    if (!uploadJobPermission (sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Create and save the product
    const uploadJob = new jobModel (req.body); 
    const saveJob = await uploadJob.save();

    // Send success response
    res.status(201).json({
      message: "Job Added successfully",
      error: false,
      success: true,
      data: saveJob,
    });
  } catch (err) {
    // Send error response
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = UploadJob;
