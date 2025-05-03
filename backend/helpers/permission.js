// const jobModel = require("../models/JobModel");
const userModel = require("../models/userModel")

const uploadJobPermission = async (userId) => {
    if (!userId) {
        console.error("Error: userId is undefined or null");
        return false;
    }

    const user = await userModel.findById(userId)


    if (!user) {
        console.log(`Error: No user found with ID ${userId}`);
        return false;
    }

    if (user.role !== "ADMIN") {
        return false;
    }

    return true;
};

module.exports = uploadJobPermission;

