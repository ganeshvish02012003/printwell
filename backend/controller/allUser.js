const userModel = require("../models/userModel");
async function allUsers(req, res) {
  try {
    const Allusers = await userModel.find();

    //    console.log("userId all Uses", req.userId)
    //   console.log(Allusers )

    res.json({
      message: "All User",
      data: Allusers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
