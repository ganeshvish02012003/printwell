const userModel = require("../models/userModel")

const uploadJobPermission = async (userId) => {  
    if (!userId) {
        // console.error("Error: 1 userId is undefined or null");
        return false;
    }

    const user = await userModel.findById(userId)

    if (!user) {
        console.log(`Error: No user found with ID ${userId}`);
        return false;
    }

    if (user.role !== "ADMIN" && user.role !== "EMPLOYEE") {
        return false;
    }

    return true;
};

module.exports = uploadJobPermission;

