const express = require("express");
const router = express.Router();
const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUser");
const updateUser = require("../controller/updateUser");
const UploadJob = require("../controller/job/UploadJob");
const getJobController = require("../controller/job/getJob");
const UpdateJob = require("../controller/job/UpdateJob");


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//Job
router.post("/upload-job", authToken, UploadJob); 
// router.post("/update-job", authToken, UpdateJob )
router.post("/update-job", UpdateJob )
router.get("/get-job", getJobController);


module.exports = router;
