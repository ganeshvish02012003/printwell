const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        // Token expired or invalid
        res.clearCookie("token");
        return res.status(401).json({
          message: "Session expired. Please log in again.",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?.tokenData._id;
      next(); // ✅ only call next if token is valid
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Authentication failed",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;