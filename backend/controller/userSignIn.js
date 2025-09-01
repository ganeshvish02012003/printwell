const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }

    const user = await userModel.findOne({ email });

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new Error("password is incorrect");
    }

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(
        { tokenData },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 10 }
      );

      //   const tokenOption = {
      //   httpOnly: true,              // cannot be accessed by JS
      //   secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      //   sameSite: "strict",          // CSRF protection
      // };

      const tokenOption = {
        httpOnly: true, // safer, not accessible by JS
        secure: true, // Render is HTTPS, so always true
        sameSite: "None", // allow cross-site cookies
      };

      res.cookie("token", token, tokenOption).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
