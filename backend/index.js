// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const router = require("./routes");
// const cookieParser = require('cookie-parser');
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();

// // ✅ CORS setup
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL, 
//     credentials: true,
//   }) 
// );

// app.use(express.json({ limit: "10mb" })); // Increased JSON payload size
// app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increased URL-encoded payload size
// app.use(cookieParser());

// app.use("/api", router);


// // ✅ Create HTTP server instead of app.listen
// const server = http.createServer(app);

// // ✅ Setup Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   },
// });

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Export io for controllers
// module.exports = { io };

// const PORT = 8080 || process.env.PORT;

// connectDB().then(() => {
//   console.log("connect to DB");
//   app.listen(PORT, () => {
//     console.log(`Server is runging on ${PORT}`);
//   });
// });

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const { init } = require("./io");

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use("/api", router);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
init(server);

// Connect DB and start server
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  console.log("Connected to DB");
  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
