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
const updateCustomer = require("../controller/customer/updateCustomer");
const addCustomer = require("../controller/customer/addCustomer");
const allCustomers = require("../controller/customer/allCustomers");
const { AddJobCategory, AllJobCategory, UpdateJobCategory, DeleteJobCategory } = require("../controller/jobcategory/jobCategoryController");


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//Job
router.post("/upload-job", authToken, UploadJob); 
router.post("/update-job",  UpdateJob )
router.get("/get-job",authToken, getJobController);

// Customer
router.post("/add-customer", addCustomer);
router.put("/update-customer/:customerId",   updateCustomer); 
router.get("/all-customer",authToken,  allCustomers);

// jobcategory
router.post("/jobcategory/add", AddJobCategory);
router.get("/jobcategory/all",authToken, AllJobCategory);
router.put("/jobcategory/update/:id", UpdateJobCategory);
router.delete("/jobcategory/delete/:id", DeleteJobCategory); 



module.exports = router;
