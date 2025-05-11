
const jobModel = require("../../models/JobModel")

const getJobController = async (req, res) => {
  try {
    const allJob = await jobModel.find().sort({createdAt : -1})

    res.json({
        message : "All Job",
        success : true,
        error : false,
        data : allJob 
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    }); 
  }
};
module.exports=getJobController