const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// HTTPS Server
const sslOptions = {
  key: fs.readFileSync("ssl/server.key"),
  cert: fs.readFileSync("ssl/server.cert"),
};

https.createServer(sslOptions, app).listen(process.env.PORT, () => {
  console.log(`Secure server running at https://localhost:${process.env.PORT}`);
});