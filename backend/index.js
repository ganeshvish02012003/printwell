const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  }) 
);

app.use(express.json({ limit: "10mb" })); // Increased JSON payload size
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increased URL-encoded payload size



app.use(cookieParser());
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  console.log("connect to DB");
  app.listen(PORT, () => {
    console.log(`Server is runging on ${PORT}`);
  });
});
