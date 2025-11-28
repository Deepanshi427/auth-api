const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api/auth", authRoutes);
// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Auth API Working");
});

module.exports = app; // export app only
